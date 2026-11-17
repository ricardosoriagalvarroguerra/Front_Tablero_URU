// Genera db/seed.sql a partir de los MISMOS datos que usa el frontend
// (src/data/mockData.ts), de modo que la BDR refleje exactamente el tablero.
//
//   node db/generate-seed.mjs   (Node ≥ 22 lee .ts vía type-stripping)
//
// Reemplazar estos INSERT por la ingesta real (INE/BCU/MEF/INAC/Uruguay XXI/DGI/
// MIEM/República AFAP/agregador RSS) en producción. Las FK se referencian por
// código vía subconsultas.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  KPIS, AGRO, MERCADOS, ACTIVIDAD, ENERGIA, EXTERNO, FISCAL, NOTICIAS, EVENTOS, FUENTES, ANALISIS,
} from '../src/data/mockData.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'seed.sql');

// ── helpers ─────────────────────────────────────────────────────────────
const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const num = (v) => (v === null || v === undefined ? 'NULL' : String(v));
const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const sub = (table, col, val) => `(SELECT id FROM ${table} WHERE ${col} = ${q(val)})`;

const lines = [];
const w = (s = '') => lines.push(s);
const section = (t) => { w(); w(`-- ── ${t} ${'─'.repeat(Math.max(0, 60 - t.length))}`); };

const NOW = new Date(Date.UTC(2026, 10, 17, 12, 0, 0)); // 17 nov 2026 09:00 UYT
const BASE_DATE = new Date(Date.UTC(2026, 10, 17));

// fechas mensuales terminando en nov-2026 (orden; la etiqueta real va en `periodo`)
const monthDatesEnding = (n) => {
  const end = 2026 * 12 + 10; // nov-2026
  return Array.from({ length: n }, (_, i) => {
    const idx = end - (n - 1 - i);
    const y = Math.floor(idx / 12);
    const mo = idx % 12;
    return ymd(new Date(Date.UTC(y, mo + 1, 0)));
  });
};
// fechas diarias terminando en BASE_DATE
const dayDatesEnding = (n) =>
  Array.from({ length: n }, (_, i) => ymd(new Date(Date.UTC(2026, 10, 17 - (n - 1 - i)))));

w('-- AUTO-GENERADO por db/generate-seed.mjs — no editar a mano.');
w('-- Datos del tablero (snapshot Uruguay 17 nov 2026), idénticos a src/data/mockData.ts.');
w('BEGIN;');
w('SET search_path = public;');

// ── zonas ───────────────────────────────────────────────────────────────
section('zonas (mapa departamental)');
const ZONAS = [
  ['montevideo', 'Montevideo'], ['metropolitana', 'Metropolitana'], ['litoral', 'Litoral'],
  ['centro', 'Centro'], ['norte', 'Norte'], ['este', 'Este'],
];
w('INSERT INTO zonas (codigo, nombre) VALUES');
w(ZONAS.map(([c, n]) => `  (${q(c)}, ${q(n)})`).join(',\n') + ';');

// ── departamentos ─────────────────────────────────────────────────────
section('departamentos (19)');
w('INSERT INTO departamentos (codigo, nombre, zona_codigo) VALUES');
w(ACTIVIDAD.departamentos.map((d) =>
  `  (${q(d.codigo)}, ${q(d.nombre)}, ${q(d.zona)})`,
).join(',\n') + ';');

// ── fuentes ──────────────────────────────────────────────────────────────
section('fuentes');
const FUENTE_META = {
  ine: ['oficial', 'https://www.ine.gub.uy/'],
  bcu: ['oficial', 'https://www.bcu.gub.uy/'],
  mef: ['oficial', 'https://www.gub.uy/ministerio-economia-finanzas/'],
  inac: ['oficial', 'https://www.inac.uy/'],
  uruguayxxi: ['oficial', 'https://www.uruguayxxi.gub.uy/'],
  dgi: ['oficial', 'https://www.gub.uy/direccion-general-impositiva/'],
  adme: ['oficial', 'https://adme.com.uy/'],
  jpm: ['mercado', 'https://www.jpmorgan.com/'],
  rating: ['mercado', 'https://deuda.mef.gub.uy/'],
  news: ['agregador', null],
};
const fuenteNombre = Object.fromEntries(FUENTES.map((f) => [f.id, f.name]));
fuenteNombre.news = 'Agregador de prensa';
w('INSERT INTO fuentes (codigo, nombre, categoria, url) VALUES');
w(Object.keys(FUENTE_META).map((code) => {
  const [cat, url] = FUENTE_META[code];
  return `  (${q(code)}, ${q(fuenteNombre[code] || code)}, ${q(cat)}, ${q(url)})`;
}).join(',\n') + ';');

// ── medios ───────────────────────────────────────────────────────────────
section('medios');
const MEDIO_META = {
  'Ámbito': ['nacional', 'UY'], 'El País': ['nacional', 'UY'], 'El Observador': ['nacional', 'UY'],
  'Búsqueda': ['nacional', 'UY'], 'la diaria': ['nacional', 'UY'], 'Montevideo Portal': ['nacional', 'UY'],
  'El Cronista': ['internacional', 'UY'], 'Infobae': ['internacional', 'AR'], 'En Perspectiva': ['nacional', 'UY'],
  'INE': ['nacional', 'UY'], 'S&P Global': ['agencia', 'US'], 'EFE': ['agencia', 'ES'],
  'Investing.com': ['internacional', 'US'], 'Shale24': ['internacional', 'AR'], 'Prensa Latina': ['agencia', 'CU'],
  'Bloomberg Línea': ['internacional', 'US'], 'FMI': ['internacional', 'US'], 'El Telégrafo': ['nacional', 'UY'],
};
const medios = [...new Set(NOTICIAS.map((n) => n.fuente))];
w('INSERT INTO medios (nombre, tipo, pais) VALUES');
w(medios.map((m) => {
  const meta = MEDIO_META[m] || ['nacional', 'UY'];
  return `  (${q(m)}, ${q(meta[0])}, ${q(meta[1])})`;
}).join(',\n') + ';');

// ── categorías ───────────────────────────────────────────────────────────
section('categorias_noticia');
const catNoticia = [...new Set(NOTICIAS.map((n) => n.tag))];
w('INSERT INTO categorias_noticia (codigo, nombre) VALUES');
w(catNoticia.map((c) => `  (${q(slug(c))}, ${q(c)})`).join(',\n') + ';');

section('categorias_evento');
const catEvento = [...new Set(EVENTOS.map((e) => e.tag))];
w('INSERT INTO categorias_evento (codigo, nombre) VALUES');
w(catEvento.map((c) => `  (${q(slug(c))}, ${q(c)})`).join(',\n') + ';');

// ── agencias calificadoras ─────────────────────────────────────────────
section('agencias_calificadoras');
const AG_CODE = { 'S&P': 'sp', Fitch: 'fitch', "Moody's": 'moodys', DBRS: 'dbrs' };
w('INSERT INTO agencias_calificadoras (codigo, nombre) VALUES');
w(MERCADOS.ratings.map((r) => `  (${q(AG_CODE[r.agencia] || slug(r.agencia))}, ${q(r.agencia)})`).join(',\n') + ';');

// ── bonos ────────────────────────────────────────────────────────────────
section('bonos_soberanos');
w('INSERT INTO bonos_soberanos (codigo, nombre, moneda, tipo, vencimiento, orden) VALUES');
w(MERCADOS.bonos.map((b, i) =>
  `  (${q(b.id)}, ${q(b.name)}, ${q(b.moneda)}, ${q(b.tipo)}, ${q(b.vencimiento ?? null)}, ${i})`,
).join(',\n') + ';');

// ── índices de riesgo ──────────────────────────────────────────────────
section('indices_riesgo');
w("INSERT INTO indices_riesgo (codigo, nombre, unidad) VALUES");
w("  ('EMBI', 'EMBI · riesgo país (JP Morgan)', 'pb'),");
w("  ('UBI', 'Uruguay Bond Index · riesgo país (República AFAP)', 'pb');");

// ── productos agro ──────────────────────────────────────────────────────
section('productos_agro');
w('INSERT INTO productos_agro (codigo, nombre, orden, precio, precio_unidad, var_precio, export_usd, participacion, destino_top, polaridad, asof, fuente, nota) VALUES');
w(AGRO.productos.map((p, i) =>
  `  (${q(p.id)}, ${q(p.nombre)}, ${i}, ${num(p.precio)}, ${q(p.precioUnidad)}, ${num(p.varPrecio)}, ${num(p.exportUsd)}, ${num(p.participacion)}, ${q(p.destinoTop)}, ${q(p.polaridad)}, ${q(p.asof)}, ${q(p.fuente)}, ${q(p.nota ?? null)})`,
).join(',\n') + ';');

// ── agro destinos ──────────────────────────────────────────────────────
section('agro_destinos');
w('INSERT INTO agro_destinos (orden, pais, valor) VALUES');
w(AGRO.destinos.map((d, i) => `  (${i}, ${q(d.pais)}, ${num(d.valor)})`).join(',\n') + ';');

// ── términos ─────────────────────────────────────────────────────────────
section('terminos (keywords)');
const terminos = [...new Set(NOTICIAS.flatMap((n) => n.keywords || []))];
w('INSERT INTO terminos (termino) VALUES');
w(terminos.map((t) => `  (${q(t)})`).join(',\n') + ';');

// ── indicadores ──────────────────────────────────────────────────────────
section('indicadores (KPIs macro)');
const IND_META = {
  ipc_interanual: { cat: 'precios', per: 'mensual', fuente: 'ine', dec: 2, unidad: '%' },
  embi: { cat: 'mercados', per: 'mensual', fuente: 'jpm', dec: 0, unidad: 'pb' },
  pib: { cat: 'actividad', per: 'trimestral', fuente: 'bcu', dec: 1, unidad: '% i/a' },
  ipc_mensual: { cat: 'precios', per: 'mensual', fuente: 'ine', dec: 2, unidad: '%' },
  tpm: { cat: 'monetario', per: 'mensual', fuente: 'bcu', dec: 2, unidad: '%' },
  expectativas_inflacion: { cat: 'precios', per: 'mensual', fuente: 'bcu', dec: 2, unidad: '%' },
  tipo_cambio: { cat: 'monetario', per: 'diaria', fuente: 'bcu', dec: 2, unidad: null },
  desempleo: { cat: 'social', per: 'mensual', fuente: 'ine', dec: 1, unidad: '%' },
  salario_real: { cat: 'social', per: 'mensual', fuente: 'ine', dec: 2, unidad: '% i/a' },
  novillo: { cat: 'agro', per: 'semanal', fuente: 'inac', dec: 2, unidad: 'USD/kg' },
  pobreza: { cat: 'social', per: 'semestral', fuente: 'ine', dec: 1, unidad: '%' },
  exportaciones: { cat: 'externo', per: 'mensual', fuente: 'uruguayxxi', dec: 0, unidad: 'M USD' },
  resultado_fiscal: { cat: 'fiscal', per: 'mensual', fuente: 'mef', dec: 1, unidad: '% PIB' },
  deuda: { cat: 'fiscal', per: 'anual', fuente: 'mef', dec: 1, unidad: '% PIB' },
  reservas: { cat: 'monetario', per: 'mensual', fuente: 'bcu', dec: 0, unidad: 'M USD' },
};
w('INSERT INTO indicadores (codigo, nombre, unidad, categoria, sentido, decimales, definicion, asof, periodicidad, fuente_id, extra_label, extra_valor, extra_tono) VALUES');
w(KPIS.map((k) => {
  const m = IND_META[k.id];
  const e = k.extra;
  return `  (${q(k.id)}, ${q(k.label)}, ${q(m.unidad)}, ${q(m.cat)}, ${q(k.sentiment)}, ${m.dec}, ${q(k.def)}, ${q(k.asof)}, ${q(m.per)}, ${sub('fuentes', 'codigo', m.fuente)}, ${q(e ? e.label : null)}, ${q(e ? e.value : null)}, ${e ? q(e.tone) : 'NULL'})`;
}).join(',\n') + ';');

// ── indicador_observaciones ────────────────────────────────────────────
section('indicador_observaciones (series reales + valor vigente)');
const obsRows = [];
for (const k of KPIS) {
  const n = k.spark.length;
  const dates = monthDatesEnding(n);
  for (let i = 0; i < n; i++) {
    const last = i === n - 1;
    obsRows.push(`  (${sub('indicadores', 'codigo', k.id)}, ${q(dates[i])}, ${num(k.spark[i])}, ${q(k.periodos?.[i] ?? null)}, ${last ? num(k.delta) : 'NULL'}, ${last ? q(k.deltaLabel) : 'NULL'})`);
  }
}
w('INSERT INTO indicador_observaciones (indicador_id, fecha, valor, periodo, variacion, variacion_etiqueta) VALUES');
w(obsRows.join(',\n') + ';');

// ── bono_cotizaciones ──────────────────────────────────────────────────
section('bono_cotizaciones (cierre vigente)');
w('INSERT INTO bono_cotizaciones (bono_id, fecha, precio, rendimiento, variacion) VALUES');
w(MERCADOS.bonos.map((b) =>
  `  (${sub('bonos_soberanos', 'codigo', b.id)}, ${q(ymd(BASE_DATE))}, ${num(b.price)}, ${num(b.yield)}, ${num(b.chg)})`,
).join(',\n') + ';');

// ── indice_riesgo_observaciones (UBI) ──────────────────────────────────
section('indice_riesgo_observaciones (EMBI)');
const ubiRows = [];
{
  const serie = MERCADOS.ubi.series;
  const n = serie.length;
  const dates = monthDatesEnding(n + 1).slice(0, n); // cierres de mes hasta oct-2026
  for (let i = 0; i < n; i++) {
    const last = i === n - 1;
    ubiRows.push(`  (${sub('indices_riesgo', 'codigo', 'EMBI')}, ${q(dates[i])}, ${num(serie[i])}, ${q(MERCADOS.ubi.periodos?.[i] ?? null)}, ${last ? num(MERCADOS.ubi.chg) : 'NULL'})`);
  }
}
w('INSERT INTO indice_riesgo_observaciones (indice_id, fecha, valor, periodo, variacion) VALUES');
w(ubiRows.join(',\n') + ';');

// ── calificaciones ─────────────────────────────────────────────────────
section('calificaciones');
const MES = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };
const PERSP = { Estable: 'estable', Negativo: 'negativa', Positivo: 'positiva', 'En revisión': 'en_revision', '—': 'na' };
const parseMesAnio = (s) => {
  const [mes, anio] = s.split(' ');
  return ymd(new Date(Date.UTC(+anio, MES[mes] ?? 0, 1)));
};
w('INSERT INTO calificaciones (agencia_id, calificacion, perspectiva, fecha) VALUES');
w(MERCADOS.ratings.map((r) =>
  `  (${sub('agencias_calificadoras', 'nombre', r.agencia)}, ${q(r.rating)}, ${q(PERSP[r.outlook] || 'estable')}, ${q(parseMesAnio(r.actualizado))})`,
).join(',\n') + ';');

// ── ipc_rubros ─────────────────────────────────────────────────────────
section('ipc_rubros');
w('INSERT INTO ipc_rubros (orden, label, valor, asof) VALUES');
w(ACTIVIDAD.ipcRubros.map((r, i) => `  (${i}, ${q(r.label)}, ${num(r.value)}, ${q('sep-oct 2026')})`).join(',\n') + ';');

// ── pib_sectores ───────────────────────────────────────────────────────
section('pib_sectores');
w('INSERT INTO pib_sectores (orden, label, valor, asof) VALUES');
w(ACTIVIDAD.pibSectores.map((r, i) => `  (${i}, ${q(r.label)}, ${num(r.value)}, ${q(ACTIVIDAD.pib.asof)})`).join(',\n') + ';');

// ── actividad_departamental ────────────────────────────────────────────
section('actividad_departamental');
w('INSERT INTO actividad_departamental (departamento_codigo, valor, valor_alt, asof) VALUES');
w(ACTIVIDAD.departamentos.map((d) =>
  `  (${q(d.codigo)}, ${num(d.valor)}, ${num(d.valorAlt)}, ${q('2025')})`,
).join(',\n') + ';');

// ── energia_matriz ─────────────────────────────────────────────────────
section('energia_matriz');
w('INSERT INTO energia_matriz (codigo, nombre, orden, pct) VALUES');
w(ENERGIA.matriz.map((f, i) => `  (${q(f.id)}, ${q(f.nombre)}, ${i}, ${num(f.pct)})`).join(',\n') + ';');

// ── energia_combustibles ───────────────────────────────────────────────
section('energia_combustibles');
w('INSERT INTO energia_combustibles (orden, producto, precio, unidad) VALUES');
w(ENERGIA.combustibles.map((c, i) => `  (${i}, ${q(c.producto)}, ${num(c.precio)}, ${q(c.unidad)})`).join(',\n') + ';');

// ── commodities ────────────────────────────────────────────────────────
section('commodities');
w('INSERT INTO commodities (codigo, nombre, unidad, valor, var_mensual, var_anual, polaridad, fuente, asof, nota) VALUES');
w(EXTERNO.commodities.map((c) =>
  `  (${q(c.id)}, ${q(c.label)}, ${q(c.unit)}, ${num(c.value)}, ${num(c.chgMensual)}, ${num(c.chgAnual)}, ${q(c.polarity)}, ${q(c.source)}, ${q(c.asof)}, ${q(c.nota ?? null)})`,
).join(',\n') + ';');

// ── comercio_destinos ──────────────────────────────────────────────────
section('comercio_destinos');
w('INSERT INTO comercio_destinos (orden, pais, valor) VALUES');
w(EXTERNO.destinos.map((d, i) => `  (${i}, ${q(d.pais)}, ${num(d.valor)})`).join(',\n') + ';');

// ── metricas (escalares por módulo) ─────────────────────────────────────
section('metricas (escalares por módulo)');
const M = [];
const pm = (modulo, clave, valor, valorTexto = null, unidad = null, asof = null, fuente = null, nota = null) =>
  M.push(`  (${q(modulo)}, ${q(clave)}, ${num(valor)}, ${q(valorTexto)}, ${q(unidad)}, ${q(asof)}, ${q(fuente)}, ${q(nota)})`);

// agro
pm('agro', 'export_total', AGRO.exportTotalAgro, null, 'USD M', AGRO.asof, AGRO.fuente);
pm('agro', 'participacion', AGRO.participacionAgro, null, '%');
pm('agro', 'novillo_precio', AGRO.novilloPrecio, null, 'USD/kg');
pm('agro', 'novillo_var', AGRO.novilloVar, null, '% i/a');
pm('agro', 'faena', AGRO.faena, null, 'mil cab.');
pm('agro', 'faena_periodo', null, AGRO.faenaPeriodo);
pm('agro', 'resumen', null, AGRO.resumen, null, AGRO.asof, AGRO.fuente);
// mercados
pm('mercados', 'grado_agencias', MERCADOS.gradoInversor.agencias);
pm('mercados', 'riesgo_indice', null, MERCADOS.ubi.indice ?? null, null, MERCADOS.ubi.asof ?? null);
pm('mercados', 'riesgo_regional', null, MERCADOS.ubi.regional ? JSON.stringify(MERCADOS.ubi.regional) : null);
pm('mercados', 'grado_nota', null, MERCADOS.gradoInversor.nota);
if (MERCADOS.sslb) {
  pm('mercados', 'sslb_nota', null, MERCADOS.sslb.nota);
  pm('mercados', 'sslb_cupon', null, MERCADOS.sslb.cupon);
  pm('mercados', 'sslb_kpi1', null, MERCADOS.sslb.kpi1);
  pm('mercados', 'sslb_kpi2', null, MERCADOS.sslb.kpi2);
}
// actividad
const A = ACTIVIDAD;
pm('actividad', 'pib_var_interanual', A.pib.varInteranual, null, '% i/a', A.pib.asof, A.pib.source);
pm('actividad', 'pib_anual2025', A.pib.anual2025, null, '%', A.pib.asof, A.pib.source);
pm('actividad', 'pib_trimestral', A.pib.trimestral, null, '%', A.pib.asof, A.pib.source);
pm('actividad', 'industria_var_interanual', A.industria.varInteranual, null, '% i/a', A.industria.asof, A.industria.source);
pm('actividad', 'industria_var_mensual', A.industria.varMensual, null, '%', A.industria.asof, A.industria.source);
pm('actividad', 'social_desempleo', A.social.desempleo, null, '%', A.social.desempleoPeriodo, A.social.source);
pm('actividad', 'social_empleo', A.social.empleo, null, '%', A.social.desempleoPeriodo, A.social.source);
pm('actividad', 'social_salario_real', A.social.salarioReal, null, '% i/a', A.social.salarioRealPeriodo, A.social.source);
pm('actividad', 'social_pobreza', A.social.pobreza, null, '%', A.social.pobrezaPeriodo, A.social.source);
pm('actividad', 'social_desempleo_periodo', null, A.social.desempleoPeriodo);
pm('actividad', 'social_pobreza_periodo', null, A.social.pobrezaPeriodo);
pm('actividad', 'social_salario_real_periodo', null, A.social.salarioRealPeriodo);
// energia
const EN = ENERGIA;
pm('energia', 'renovable_pct', EN.renovablePct, null, '%', EN.asof, EN.source);
pm('energia', 'demanda_max', EN.demandaMax, null, 'MW', EN.asof, EN.source);
pm('energia', 'potencia_instalada', EN.potenciaInstalada, null, 'MW', EN.asof, EN.source);
pm('energia', 'exportacion_destino', null, EN.exportacion.destino);
pm('energia', 'exportacion_gwh', EN.exportacion.valorGwh, null, 'GWh', EN.asof, EN.source, EN.exportacion.nota);
pm('energia', 'hidrogeno_proyecto', null, EN.hidrogeno.proyecto);
pm('energia', 'hidrogeno_inversion', EN.hidrogeno.inversionUsd, null, 'USD M', null, null, EN.hidrogeno.nota);
pm('energia', 'hidrogeno_estado', null, EN.hidrogeno.estado);
pm('energia', 'resumen', null, EN.resumen, null, EN.asof, EN.source);
// externo
const E = EXTERNO;
pm('externo', 'balanza_export', E.balanza.exportaciones, null, 'USD M', E.balanza.periodo, E.balanza.source);
pm('externo', 'balanza_import', E.balanza.importaciones, null, 'USD M', E.balanza.periodo, E.balanza.source);
pm('externo', 'balanza_saldo', E.balanza.saldo, null, 'USD M', E.balanza.periodo, E.balanza.source);
pm('externo', 'balanza_periodo', null, E.balanza.periodo);
pm('externo', 'turismo_ingresos', E.turismo.ingresosUsd, null, 'USD M', E.turismo.asof, E.turismo.source, E.turismo.nota);
pm('externo', 'turismo_visitantes', E.turismo.visitantes, null, 'mil', E.turismo.asof, E.turismo.source);
pm('externo', 'turismo_saldo', E.turismo.saldoUsd, null, 'USD M', E.turismo.asof, E.turismo.source);
pm('externo', 'ied_valor', E.ied.valorUsd, null, 'USD M', E.ied.asof, E.ied.source);
pm('externo', 'ied_pctpib', E.ied.pctPib, null, '% PIB', E.ied.asof, E.ied.source);
pm('externo', 'deuda_bruta_pct', E.deuda.brutaPct, null, '% PIB', E.deuda.asof, E.deuda.source);
pm('externo', 'deuda_total_usd', E.deuda.totalUsd, null, 'USD M', E.deuda.asof, E.deuda.source);
pm('externo', 'cc_pct', E.cuentaCorriente.pctPib, null, '% PIB', E.cuentaCorriente.periodo, E.cuentaCorriente.source);
pm('externo', 'cc_periodo', null, E.cuentaCorriente.periodo);
pm('externo', 'tcr_brecha', E.competitividad.tcrBrecha, null, '%', E.competitividad.asof, E.competitividad.source, E.competitividad.tcrNota);
pm('externo', 'ipf_frontera', E.competitividad.ipfFrontera, null, '%', E.competitividad.asof, E.competitividad.source, E.competitividad.ipfNota);
// fiscal
const F = FISCAL;
pm('fiscal', 'result_global_pct', F.resultadoGlobal.pctPib, null, '% PIB', F.resultadoGlobal.periodo, F.resultadoGlobal.source);
pm('fiscal', 'result_global_periodo', null, F.resultadoGlobal.periodo);
pm('fiscal', 'result_primario_pct', F.resultadoPrimario.pctPib, null, '% PIB', F.resultadoPrimario.periodo, F.resultadoPrimario.source);
pm('fiscal', 'result_primario_periodo', null, F.resultadoPrimario.periodo);
pm('fiscal', 'regla_estructural', F.reglaFiscal.resultadoEstructural, null, '% PIB', null, F.reglaFiscal.source);
pm('fiscal', 'regla_gasto', F.reglaFiscal.topeGastoReal, null, '%', null, F.reglaFiscal.source);
pm('fiscal', 'regla_deuda_tope', F.reglaFiscal.deudaNetaTope, null, 'USD M', null, F.reglaFiscal.source);
pm('fiscal', 'regla_cumple', F.reglaFiscal.cumple == null ? null : (F.reglaFiscal.cumple ? 1 : 0), null, null, null, F.reglaFiscal.source, F.reglaFiscal.nota);
pm('fiscal', 'deuda_bruta_pct', F.deuda.brutaPct, null, '% PIB', F.deuda.asof, F.deuda.source);
pm('fiscal', 'deuda_neta_pct', F.deuda.netaPct, null, '% PIB', F.deuda.asof, F.deuda.source);
pm('fiscal', 'deuda_moneda_local_pct', F.deuda.monedaLocalPct, null, '%', F.deuda.asof, F.deuda.source);
pm('fiscal', 'recaudacion_var_real', F.recaudacion.varRealInteranual, null, '% real i/a', F.recaudacion.periodo, F.recaudacion.source);
pm('fiscal', 'recaudacion_periodo', null, F.recaudacion.periodo);
pm('fiscal', 'tasa_valor', F.tasaPolitica.valor, null, '%', F.tasaPolitica.asof, F.tasaPolitica.source);
pm('fiscal', 'tasa_nombre', null, F.tasaPolitica.nombre);
pm('fiscal', 'reservas_valor', F.reservas.valorUsd, null, 'M USD', F.reservas.asof, F.reservas.source);
pm('fiscal', 'expect_12m', F.expectativas.inflacion12m, null, '%', F.expectativas.asof, F.expectativas.source);
pm('fiscal', 'expect_24m', F.expectativas.inflacion24m, null, '%', F.expectativas.asof, F.expectativas.source);
pm('fiscal', 'base_monetaria', F.baseMonetaria.valorMM, null, 'M $', F.baseMonetaria.asof, F.baseMonetaria.source);
w('INSERT INTO metricas (modulo, clave, valor, valor_texto, unidad, asof, fuente, nota) VALUES');
w(M.join(',\n') + ';');

// ── series (sparklines por módulo) ──────────────────────────────────────
section('series (sparklines por módulo)');
const S = [];
const ps = (modulo, clave, serie, periodos = []) =>
  serie.forEach((v, i) => S.push(`  (${q(modulo)}, ${q(clave)}, ${i}, ${num(v)}, ${q(periodos[i] ?? null)})`));
ps('actividad', 'pib', ACTIVIDAD.pib.series, ACTIVIDAD.pib.periodos);
ps('fiscal', 'result_global', FISCAL.resultadoGlobal.series, FISCAL.resultadoGlobal.periodos);
for (const p of AGRO.productos) ps('agro', p.id, p.spark);
w('INSERT INTO series (modulo, clave, idx, valor, periodo) VALUES');
w(S.join(',\n') + ';');

// ── fuente_estado ──────────────────────────────────────────────────────
section('fuente_estado (health-check vigente)');
w('INSERT INTO fuente_estado (fuente_id, estado, latencia_ms, ultima_actualizacion, verificado_en) VALUES');
w(FUENTES.map((f) =>
  `  (${sub('fuentes', 'codigo', f.id)}, ${q(f.status)}, ${num(f.latency)}, ${q(f.last)}, ${q(NOW.toISOString())})`,
).join(',\n') + ';');

// ── noticias ───────────────────────────────────────────────────────────
section('noticias');
w('INSERT INTO noticias (codigo, publicado_en, medio_id, categoria_id, titular, resumen, cuerpo, breaking, url) VALUES');
w(NOTICIAS.map((n) => {
  const pub = new Date(NOW.getTime() - n.mins * 60000).toISOString();
  return `  (${q(n.id)}, ${q(pub)}, ${sub('medios', 'nombre', n.fuente)}, ${sub('categorias_noticia', 'nombre', n.tag)}, ${q(n.titular)}, ${q(n.resumen)}, ${q(n.body)}, ${n.breaking}, ${q(n.url ?? null)})`;
}).join(',\n') + ';');

// noticia_terminos
section('noticia_terminos (M:N)');
const ntRows = [];
for (const n of NOTICIAS) for (const kw of n.keywords || [])
  ntRows.push(`  ((SELECT id FROM noticias WHERE codigo = ${q(n.id)}), ${sub('terminos', 'termino', kw)})`);
w('INSERT INTO noticia_terminos (noticia_id, termino_id) VALUES');
w(ntRows.join(',\n') + ';');

// noticia_vinculos
section('noticia_vinculos ("vinculado a")');
const vinRows = [];
for (const n of NOTICIAS) for (const rel of n.relacionados || [])
  vinRows.push(`  ((SELECT id FROM noticias WHERE codigo = ${q(n.id)}), 'otro', ${q(rel)})`);
w('INSERT INTO noticia_vinculos (noticia_id, tipo, etiqueta) VALUES');
w(vinRows.join(',\n') + ';');

// ── eventos ────────────────────────────────────────────────────────────
section('eventos (calendario 30 días)');
w('INSERT INTO eventos (fecha, categoria_id, titulo, tono) VALUES');
w(EVENTOS.map((e) => {
  const fecha = ymd(new Date(Date.UTC(2026, 10, 17 + e.d)));
  return `  (${q(fecha)}, ${sub('categorias_evento', 'nombre', e.tag)}, ${q(e.title)}, ${q(e.tone)})`;
}).join(',\n') + ';');

// ── analisis (Módulo Z) ─────────────────────────────────────────────────
section('analisis (capa analítica vigente)');
w('INSERT INTO analisis (clave, asof, contenido) VALUES');
w(`  ('vigente', ${q(ANALISIS.asof)}, ${q(JSON.stringify(ANALISIS))}::jsonb);`);

w();
w('COMMIT;');

writeFileSync(OUT, lines.join('\n') + '\n');
console.log(`✓ wrote ${OUT} (${lines.length} líneas)`);
console.log(`  análisis: ${ANALISIS.semaforo.length} dimensiones · ${ANALISIS.escenarios.length} escenarios · ${ANALISIS.riesgos.length} riesgos`);
console.log(`  ${KPIS.length} indicadores · ${AGRO.productos.length} productos agro · ${MERCADOS.bonos.length} bonos · ${MERCADOS.ratings.length} ratings · ${EXTERNO.commodities.length} commodities · ${ENERGIA.matriz.length} fuentes energía · ${NOTICIAS.length} noticias · ${EVENTOS.length} eventos`);
