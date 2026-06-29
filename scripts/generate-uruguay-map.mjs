// Build-time generator: geometría real de los 19 departamentos de Uruguay →
// paths SVG compactos, agrupados por zona económica (para el mapa coroplético de
// actividad agro/económica departamental).
//
// Fuente: geoBoundaries gbOpen URY ADM1 (OpenStreetMap / Wambacher), licencia
//   ODbL 1.0 — datos públicos abiertos.
//
// Pipeline: cargar GeoJSON → simplificar Douglas–Peucker → ajustar una proyección
// Mercator a un viewBox compacto → emitir src/data/uruguayGeo.ts con el path `d`,
// el centroide de etiqueta, la zona de cada departamento, las constantes de
// proyección y un project(lon,lat). Uruguay es territorio continental compacto:
// no requiere recorte de reclamos ni de islas lejanas (a diferencia de Argentina).
//
// Re-generar tras cambiar la fuente o la tolerancia:  npm run gen:map

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { geoMercator, geoPath } from 'd3-geo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, 'uruguay-adm1.geojson');
const OUT = resolve(__dirname, '../src/data/uruguayGeo.ts');

// viewBox + layout knobs
const WIDTH = 560;
const PAD = 22;
const SIMPLIFY_TOLERANCE = 0.012; // grados
const COORD_DECIMALS = 1;

const RAD = Math.PI / 180;

const norm = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

// Catálogo: nombre geoBoundaries (shapeName) → { id, label corto, zona económica }.
// Zonas: montevideo · metropolitana (Sur) · litoral (Oeste, frontera con
// Argentina) · centro · norte · este. Agrupación para la leyenda; el color de
// cada departamento se calcula por SU PROPIO valor de actividad.
const DEPTOS = {
  'montevideo': { id: 'montevideo', label: 'Montevideo', zona: 'montevideo' },
  'canelones': { id: 'canelones', label: 'Canelones', zona: 'metropolitana' },
  'san jose': { id: 'sanjose', label: 'San José', zona: 'metropolitana' },
  'colonia': { id: 'colonia', label: 'Colonia', zona: 'litoral' },
  'soriano': { id: 'soriano', label: 'Soriano', zona: 'litoral' },
  'rio negro': { id: 'rionegro', label: 'Río Negro', zona: 'litoral' },
  'paysandu': { id: 'paysandu', label: 'Paysandú', zona: 'litoral' },
  'salto': { id: 'salto', label: 'Salto', zona: 'litoral' },
  'artigas': { id: 'artigas', label: 'Artigas', zona: 'litoral' },
  'durazno': { id: 'durazno', label: 'Durazno', zona: 'centro' },
  'flores': { id: 'flores', label: 'Flores', zona: 'centro' },
  'florida': { id: 'florida', label: 'Florida', zona: 'centro' },
  'tacuarembo': { id: 'tacuarembo', label: 'Tacuarembó', zona: 'norte' },
  'rivera': { id: 'rivera', label: 'Rivera', zona: 'norte' },
  'cerro largo': { id: 'cerrolargo', label: 'Cerro Largo', zona: 'norte' },
  'maldonado': { id: 'maldonado', label: 'Maldonado', zona: 'este' },
  'rocha': { id: 'rocha', label: 'Rocha', zona: 'este' },
  'lavalleja': { id: 'lavalleja', label: 'Lavalleja', zona: 'este' },
  'treinta y tres': { id: 'treintaytres', label: 'Treinta y Tres', zona: 'este' },
};

const ZONAS = [
  { codigo: 'montevideo', nombre: 'Montevideo' },
  { codigo: 'metropolitana', nombre: 'Metropolitana' },
  { codigo: 'litoral', nombre: 'Litoral' },
  { codigo: 'centro', nombre: 'Centro' },
  { codigo: 'norte', nombre: 'Norte' },
  { codigo: 'este', nombre: 'Este' },
];

// ── Douglas–Peucker en un anillo (planar lon/lat; suficiente para un país) ──
function simplifyRing(points, tol) {
  if (points.length < 3) return points;
  const sqTol = tol * tol;
  const sqSegDist = (p, a, b) => {
    let x = a[0];
    let y = a[1];
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = b[0];
        y = b[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  };
  const keep = new Array(points.length).fill(false);
  keep[0] = keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxd = 0;
    let idx = -1;
    for (let i = first + 1; i < last; i++) {
      const d = sqSegDist(points[i], points[first], points[last]);
      if (d > maxd) {
        idx = i;
        maxd = d;
      }
    }
    if (maxd > sqTol && idx !== -1) {
      keep[idx] = true;
      stack.push([first, idx], [idx, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function simplifyGeometry(geom, tol) {
  const ring = (r) => {
    const s = simplifyRing(r, tol);
    return s.length >= 4 ? s : r; // nunca colapsar bajo un triángulo
  };
  if (geom.type === 'Polygon') {
    return { type: 'Polygon', coordinates: geom.coordinates.map(ring) };
  }
  if (geom.type === 'MultiPolygon') {
    return {
      type: 'MultiPolygon',
      coordinates: geom.coordinates.map((poly) => poly.map(ring)),
    };
  }
  return geom;
}

// d3-geo (esférico) espera el anillo exterior en sentido HORARIO y los huecos en
// antihorario. RFC 7946 usa el convenio inverso; reorientamos cada anillo por
// separado con el área planar firmada.
function signedArea(ring) {
  let a = 0;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return a / 2; // >0 antihorario, <0 horario (ejes lon/lat, lat hacia arriba)
}
function rewindRings(rings) {
  return rings.map((ring, i) => {
    const cw = signedArea(ring) < 0;
    const wantCw = i === 0; // exterior horario; huecos antihorario
    return cw === wantCw ? ring : ring.slice().reverse();
  });
}
function rewindGeometry(geom) {
  if (geom.type === 'Polygon') return { type: 'Polygon', coordinates: rewindRings(geom.coordinates) };
  if (geom.type === 'MultiPolygon') {
    return { type: 'MultiPolygon', coordinates: geom.coordinates.map(rewindRings) };
  }
  return geom;
}

// ── cargar + simplificar ────────────────────────────────────────────────
const raw = JSON.parse(readFileSync(SRC, 'utf8'));
const features = [];
for (const f of raw.features) {
  const key = norm(f.properties.shapeName || f.properties.nombre || '');
  const meta = DEPTOS[key];
  if (!meta) {
    console.warn('  ⚠ departamento sin mapeo (omitido):', f.properties.shapeName);
    continue;
  }
  features.push({
    type: 'Feature',
    properties: { id: meta.id, name: meta.label, zona: meta.zona },
    geometry: rewindGeometry(simplifyGeometry(f.geometry, SIMPLIFY_TOLERANCE)),
  });
}
const fc = { type: 'FeatureCollection', features };

// ── ajustar la proyección a un viewBox compacto ────────────────────────
const innerW = WIDTH - 2 * PAD;
const projection = geoMercator().fitWidth(innerW, fc);
let path = geoPath(projection);
const bounds = path.bounds(fc);
const innerH = bounds[1][1] - bounds[0][1];
const HEIGHT = Math.ceil(innerH + 2 * PAD);

const [tx0, ty0] = projection.translate();
projection.translate([tx0 - bounds[0][0] + PAD, ty0 - bounds[0][1] + PAD]);
path = geoPath(projection);

const scale = projection.scale();
const [tx, ty] = projection.translate();

const projectLocal = (lon, lat) => [
  tx + scale * (lon * RAD),
  ty - scale * Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2)),
];
for (const [lon, lat] of [[-56, -34], [-57, -32], [-54, -31]]) {
  const a = projection([lon, lat]);
  const b = projectLocal(lon, lat);
  const err = Math.hypot(a[0] - b[0], a[1] - b[1]);
  if (err > 0.01) throw new Error(`projectLocal mismatch at ${lon},${lat}: err=${err}`);
}

const round = (n) => +n.toFixed(COORD_DECIMALS);
const roundPath = (d) => d.replace(/-?\d+\.?\d*/g, (m) => String(round(+m)));

const departamentos = features
  .map((f) => {
    const [cx, cy] = path.centroid(f);
    return {
      id: f.properties.id,
      name: f.properties.name,
      zona: f.properties.zona,
      d: roundPath(path(f)),
      labelX: Math.round(cx),
      labelY: Math.round(cy),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

// ── emitir ──────────────────────────────────────────────────────────────
const banner = `// AUTO-GENERATED by scripts/generate-uruguay-map.mjs — do not edit by hand.
// Fuente: geoBoundaries gbOpen URY ADM1 (OpenStreetMap / Wambacher, ODbL 1.0).
// Proyección Mercator ajustada al viewBox. Re-generar con: npm run gen:map\n`;

const ts = `${banner}
export interface DepartamentoShape {
  id: string;
  name: string;
  /** Zona económica (montevideo | metropolitana | litoral | centro | norte | este). */
  zona: string;
  /** SVG path data en coordenadas del viewBox. */
  d: string;
  /** Ancla de la etiqueta (centroide proyectado). */
  labelX: number;
  labelY: number;
}

export interface Zona {
  codigo: string;
  nombre: string;
}

export const MAP_VIEWBOX = { width: ${WIDTH}, height: ${HEIGHT} } as const;

/** Constantes de la proyección Mercator con la que se generó la geometría. */
const PROJ = { scale: ${round(scale)}, tx: ${round(tx)}, ty: ${round(ty)} } as const;
const RAD = Math.PI / 180;

/** Proyecta [lon, lat] al viewBox con la MISMA proyección que las formas. */
export function project(lon: number, lat: number): [number, number] {
  return [
    +(PROJ.tx + PROJ.scale * (lon * RAD)).toFixed(1),
    +(PROJ.ty - PROJ.scale * Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))).toFixed(1),
  ];
}

/** Normaliza un nombre a slug (sin diacríticos ni espacios). */
export function deptoSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/\\s+/g, '');
}

export const ZONAS: Zona[] = ${JSON.stringify(ZONAS, null, 2)};

export const DEPARTAMENTOS: DepartamentoShape[] = ${JSON.stringify(departamentos, null, 2)};
`;

writeFileSync(OUT, ts);

const bytes = Buffer.byteLength(ts, 'utf8');
console.log(`✓ wrote ${OUT}`);
console.log(`  viewBox ${WIDTH}×${HEIGHT}, ${departamentos.length} departamentos, ${(bytes / 1024).toFixed(1)} KB`);
console.log('  por zona:', ZONAS.map((z) => `${z.nombre}:${departamentos.filter((p) => p.zona === z.codigo).length}`).join(' · '));
