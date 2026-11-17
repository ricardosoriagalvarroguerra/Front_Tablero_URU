# Tablero Inteligente URU · Command Center

Dashboard de inteligencia económica sobre Uruguay: un *command center* que
consolida, en una sola vista, las señales relevantes para decisiones
financieras, institucionales y de planificación.

Portado de la estética del **Tablero Inteligente BOL / ARG**: densidad informativa
(Bloomberg), tipografía y jerarquías (Linear), minimalismo (Vercel), calma
visual (Are.na). Paleta monocromática + un acento ámbar funcional, modo
claro/oscuro, tipografía Inter + JetBrains Mono. **React 18 + TypeScript + Vite +
Tailwind CSS + d3**, backend **Fastify + `pg`**, BDR **PostgreSQL** (`uruguay`).

> **Regla de oro (igual que BOL/ARG): no inventar datos.** Cada cifra está
> corroborada contra fuente oficial/primaria (INE, BCU, MEF/UGD, INAC, Uruguay
> XXI, DGI, MIEM/ADME, República AFAP) o medio reputado que la cita, con
> verificación cruzada de las cifras titulares. Lo no corroborable se marca `s/d`.
> Ver [`docs/SOURCES.md`](docs/SOURCES.md).

## Coyuntura (snapshot 17-nov-2026)

Yamandú Orsi (Frente Amplio) cerca de cumplir dos años de gobierno, con Gabriel Oddone
en Economía. La economía **se estancó**: el PIB cayó **−0,5% i/a en el 2T** (−0,8% t/t)
porque la sequía hundió al agro (**−22%**), aunque consumo, construcción e industria
siguieron creciendo. La inflación subió a **4,87% (oct)**, por encima del centro de la
meta (4,5%) pero dentro del rango 3–6%, y el BCU respondió con una **suba preventiva a
6,00%** (8-oct), que mantuvo el 16-nov. El frente débil es **fiscal**: déficit del SPG
de **−4,7% del PIB** (12m a sep) con la recaudación cayendo (−2,9% real en sep). Lo
compensan un mercado laboral resistente (desempleo 7,1%), pobreza en mínimo (14,8%),
**precios récord de la carne** (novillo ≥ US$6/kg) y el **grado inversor ratificado**
por S&P (BBB+) y Moody's (Baa1) en noviembre. El peso sigue flotando libre (~$40,6).

## Adaptación respecto de los tableros de Bolivia y Argentina

Bolivia tenía un **mapa de bloqueos**; Argentina lo reemplazó por el módulo
estrella **Dólar** (multi-cotización + brecha + bandas). Para Uruguay nada de eso
aplica (no hay brecha cambiaria), así que se reemplazó por lo verdaderamente
distintivo de su realidad económica:

- **Módulo estrella `Agro`** — el complejo agroexportador (carne/novillo,
  celulosa, soja, lácteos, arroz, trigo, madera): precios, exportaciones,
  participación y destinos (China/UE/EE.UU.). Es el motor de divisas del país.
- **`Mercados` en clave grado inversor** — UBI (riesgo país), bonos globales en
  USD/pesos/UI, el **SSLB** (1er bono soberano del mundo atado a metas
  ambientales) y los ratings BBB de las 4 calificadoras.
- **Pestaña `Energía`** — la matriz eléctrica **~98% renovable**, exportación de
  excedentes y proyectos de hidrógeno verde (un diferencial global de Uruguay).
- **Mapa departamental de actividad** — coroplético de los **19 departamentos**
  por índice de actividad económica (reemplaza el mapa de inflación regional
  manteniendo la identidad visual del mapa).

## Módulos

| ID | Pestaña / módulo | Descripción |
|----|------------------|-------------|
| A | Indicadores macro | Tira de 15 KPIs (IPC i/a y m/m, PIB, TPM, expectativas, dólar, reservas, desempleo, salario real, pobreza, novillo, exportaciones, resultado fiscal, deuda, UBI) + cinta de cotizaciones + modal con serie por período, estadísticas y lectura. |
| Z | **Análisis** | Tesis, semáforo macro (8 dimensiones), indicadores derivados calculados en vivo, proyecciones de consenso, escenarios 2027 y mapa de riesgos/catalizadores. |
| AG | **Agro** | Complejo agroexportador: novillo, faena, destinos y grilla de productos (módulo estrella). |
| C | Mercados | **Grado inversor**: UBI, bonos USD/UYU/UI, SSLB, ratings de las 4 calificadoras. |
| AC | Actividad & precios | PIB, industria, salario real, empleo, pobreza, IPC + **mapa departamental de actividad**. |
| EN | **Energía** | Matriz renovable (eólica/hidro/solar/biomasa), exportación eléctrica, combustibles ANCAP, hidrógeno verde. |
| EX | Externo & comercio | Balanza (Uruguay XXI), destinos, turismo (sensible a Argentina), IED, deuda, commodities agro. |
| F$ | Fiscal & monetario | Resultado global/primario, **regla fiscal (3 pilares)**, deuda, recaudación DGI, TPM, reservas, expectativas BCU. |
| D | Feed prioritario | Noticias reales filtrables, indicador *breaking* y modal de detalle. |
| E | Calendario | Línea de 30 días con hitos del INE, el BCU (COPOM), Uruguay XXI, INAC, la UGD y feriados. |
| F | Health-check | Estado, latencia y última actualización de cada fuente. |

## Arquitectura (full-stack)

```
React (src/) ──fetch──> Fastify (server/) ──pg──> PostgreSQL (db/ · uruguay · vistas v_*)
        └── fallback a mockData si la API no responde ──┘
```

Correr todo:

```bash
# 1) BDR (una vez)
psql -d uruguay -f db/schema.sql && node db/generate-seed.mjs && psql -d uruguay -f db/seed.sql
# 2) API
cd server && npm install && npm run dev      # :5174
# 3) Frontend
npm install && npm run dev                   # :5180
```

Si la API no responde, el frontend usa los datos embebidos
(`src/data/mockData.ts`); el footer indica el origen («BDR en vivo» / «datos
locales»).

> El **backend** vive en su propio repo (**Back_Tablero_URU**) y la **BDR** se
> aprovisiona en Railway con `db/schema.sql` + `db/seed.sql`.

## Despliegue (Railway)

- **Frontend** (este repo): build estático con `npm run build` → servir `dist/`.
  Start command sugerido en Railway: `npx serve -s dist -l $PORT`. Setear, **antes
  del build**, la variable `VITE_API_URL` con la URL pública del backend (Vite la
  inlinea en build-time); si falta, el front cae a los datos locales.
- **Backend** (`Back_Tablero_URU`): Node + `npm start`; setear `DATABASE_URL`,
  `CORS_ORIGIN` (la URL de este front) y dejar que Railway inyecte `PORT`.
- **BDR**: `psql "$DATABASE_URL" -f db/schema.sql && node db/generate-seed.mjs && psql "$DATABASE_URL" -f db/seed.sql`.

## Atajos de teclado

- `/` — enfocar búsqueda · `1–8` — cambiar de módulo · `D` — modo claro/oscuro · `R` — refrescar · `Esc` — cerrar overlays

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # type-check + build de producción a dist/
npm run typecheck  # solo verificación de tipos
npm run gen:map    # regenerar el mapa departamental (scripts/generate-uruguay-map.mjs)
```

## Mapa de Uruguay · datos geográficos

El mapa usa **geometría cartográfica real** de los 19 departamentos. Pipeline
(build-time, `npm run gen:map`):

1. Fuente: **geoBoundaries · gbOpen URY ADM1** (OpenStreetMap / Wambacher, ODbL
   1.0) → [`scripts/uruguay-adm1.geojson`](scripts/uruguay-adm1.geojson).
2. Simplificación Douglas–Peucker + reorientación de winding por anillo.
3. Proyección **Mercator** ajustada al viewBox → paths SVG compactos.
4. Salida: [`src/data/uruguayGeo.ts`](src/data/uruguayGeo.ts) con paths,
   centroides de etiqueta, la zona económica de cada departamento y
   `project(lon,lat)`.

Cada departamento se colorea por su **índice de actividad económica** (peso
relativo, base 100 = Montevideo). Las zonas (Montevideo, Metropolitana, Litoral,
Centro, Norte, Este) agrupan los departamentos para la leyenda.

> **Atribución:** límites departamentales de **geoBoundaries** (ODbL 1.0,
> OpenStreetMap). `d3-geo` se usa sólo en build-time; no entra al bundle.

## Integración de datos reales (próxima fase)

Los puntos de conexión están marcados con `// TODO` en `src/data/mockData.ts`:

- **INE** — IPC, IVFIM industria, empleo (ECH), pobreza, IMS salario real.
- **BCU** — PIB (Cuentas Nacionales), tipo de cambio, reservas, TPM (COPOM),
  encuesta de expectativas, balanza de pagos.
- **MEF / UGD** — resultado fiscal, regla fiscal, deuda soberana, ratings.
- **INAC / Uruguay XXI** — carne (novillo, faena, exportaciones), comercio
  exterior por producto y destino, IED.
- **DGI** — recaudación. **MIEM / ADME / UTE** — matriz de generación, demanda.
- **República AFAP / BEVSA** — UBI / IRU (riesgo país).
- **Agregador RSS** — El País, El Observador, Búsqueda, la diaria, Montevideo
  Portal, Ámbito Uruguay.
