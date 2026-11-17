# Diseño, análisis y decisiones · Tablero URU

Estado al **17-nov-2026**. La sección 0 documenta la versión 0.2 (rediseño + capa
analítica); las secciones 1–6 conservan las decisiones de la adaptación BOL/ARG → URU.

## 0. Versión 0.2 — «llevar el tablero a otro nivel»

### 0.1 Capa analítica (Módulo Z, pestaña **Análisis**)

El tablero pasó de *mostrar datos* a *interpretarlos*, manteniendo separado el dato
de fuente del juicio:

| Pieza | Qué es | Dónde |
|---|---|---|
| **Tesis** | Lectura de conjunto: titular, bajada y 6 puntos clave | `ANALISIS.tesis` |
| **Semáforo macro** | 8 dimensiones con estado, score 1–5, tendencia y dato ancla | `ANALISIS.semaforo` |
| **Indicadores derivados** | Tasa real ex-ante, brecha vs centro de la meta, anclaje de expectativas, índice de miseria, carga de intereses implícita, crecimiento vs potencial — **calculados en vivo** con fórmula visible y reglas de interpretación | `src/analytics.ts` |
| **Proyecciones** | Tabla MEF / BCU / encuesta / FMI / calificadoras / CEPAL / BBVA, con rango de dispersión | `ANALISIS.proyecciones` |
| **Escenarios 2027** | Base / optimista / riesgo con probabilidad subjetiva y gatillos observables | `ANALISIS.escenarios` |
| **Riesgos y catalizadores** | Mapa filtrable ordenado por impacto | `ANALISIS.riesgos` |
| **Lecturas** | Párrafo analítico al tope de cada pestaña y por KPI (en el modal) | `ANALISIS.lecturas`, `kpiLecturas` |

En la BDR vive como documento `jsonb` en la tabla `analisis` (clave `vigente`) y se sirve
en `GET /api/analisis`. Si el backend no expone el endpoint, el front usa la capa
embebida (no rompe el resto de los datos en vivo).

Reglas de los derivados (umbrales explícitos en `analytics.ts`): tasa real ≥1,5 pp
contractiva · brecha |≤0,25 pp| «en el centro» · anclaje |≤0,3 pp| «anclado» · índice de
miseria ≤11 bajo / ≤13,5 intermedio · potencial 1,9% (Comité de Expertos del MEF).

### 0.2 Rediseño de la interfaz

- **Tokens nuevos:** neutros fríos, acento ámbar «sol» + celeste informativo, tonos
  `*-soft` para rellenos, sombras sutiles y degradé de fondo; tarjetas `card` (radio 10px).
- **Encabezado:** marca con sol, estado de la conexión y fecha de corte, búsqueda
  ampliada (también busca en definiciones) y **cinta de cotizaciones** animada.
- **Pestañas** tipo «pill» con código de módulo y atajos `1–8`.
- **KPIs:** destacados = IPC (con banda del rango meta), PIB y TPM; grupos con etiqueta
  completa (antes se truncaba a «I…»), fecha por indicador y delta compacto.
- **Gráficos** (`SeriesChart`): ejes con períodos reales, banda meta, líneas de
  referencia, barras ± para déficit/PIB y tooltip. Las series ahora llevan `periodos`.
- **Paneles:** Monetario con inflación vs meta, trayectoria del COPOM y regla de
  anclaje; Fiscal con barras del déficit vs meta estructural y pilares visuales;
  Actividad con barras divergentes por sector; Agro con ranking de exportaciones y
  notas por producto; Mercados con escalones sobre grado inversor; agenda semanal sin
  solapes; feed con altura fija y filtros tipo chip; modal de KPI con min/máx/promedio,
  cambio en la ventana y lectura.
- **Honestidad visual:** los datos que no pudieron re-verificarse muestran su fecha
  original y la etiqueta «sin actualizar» (UBI, turismo, competitividad).

## Adaptación BOL / ARG → URU

Cómo se adaptaron los Tableros Inteligentes BOL y ARG a la coyuntura uruguaya.

## 1. Qué se conservó (1:1)

- **Estética y paleta:** tokens monocromáticos + acento ámbar, modo claro/oscuro,
  Inter + JetBrains Mono, densidad Bloomberg. Primitivos (`Sparkline`, `Delta`,
  `Donut`, `Panel`, `Tag`, `SectionTitle`), `Header`, `Tabs`, `KpiCard`/`KpiGroup`,
  `KpiModal`, `NewsPanel`/`NewsModal`, `CalendarioPanel`, `HealthFooter`.
- **Arquitectura:** React + Vite + Tailwind ↔ Fastify + `pg` ↔ PostgreSQL con
  vistas `v_*`; fallback offline a `mockData.ts`; seed generado desde el mock.
- **Lógica:** color direccional por polaridad (`tone.ts`), tira de KPIs siempre
  visible + pestañas, búsqueda, atajos de teclado, mapa coroplético + leyenda.
- **Regla de oro:** no inventar; todo corroborado (ver `SOURCES.md`).

## 2. Qué cambió (contexto uruguayo)

| Bolivia / Argentina | Uruguay | Por qué |
|---|---|---|
| Mapa de **bloqueos** (BOL) / pestaña **Dólar** con brecha y bandas (ARG) | Pestaña **Agro** (complejo agroexportador) | El peso uruguayo flota libre y es convertible: no hay brecha. El eje real es el agroexportador, motor de divisas. |
| Riesgo país alto, ratings basura (ARG B-/Caa1) | **Grado inversor** (UBI ~53 pb, S&P BBB+, Moody's Baa1, Fitch BBB, DBRS BBB) + **SSLB** | Uruguay es el espejo positivo: la historia es la solidez crediticia, no la fragilidad. |
| Energía = **Vaca Muerta** (petróleo/gas, ARG) | Pestaña **Energía** = matriz **~98% renovable** + hidrógeno verde | El diferencial energético uruguayo es la generación limpia, no los hidrocarburos. |
| Mapa provincial de **inflación** (24 jurisdicciones, ARG) | Mapa departamental de **actividad económica** (19 deptos) | Uruguay no publica IPC por departamento; el dato relevante y disponible es el peso económico-productivo. |
| Ancla fiscal = **superávit** (ARG) | **Regla fiscal** (3 pilares) con **déficit ~4,7% PIB** y tensión política | En Uruguay el frente fiscal es el principal riesgo del rating, no un logro. |
| Externo con **FMI** (ARG) | Externo con **turismo** (sensible a Argentina), IED, destinos | Uruguay no tiene programa con el FMI; su externo gira en torno al comercio agro y el turismo. |

## 3. KPIs de la tira (15)

Destacados: **IPC interanual · PIB · TPM**. Grupos: Precios y monetario (IPC m/m,
expectativas, dólar, reservas) · Empleo, ingresos y agro (desempleo, salario real,
pobreza, novillo) · Fiscal, crédito y externo (resultado fiscal, deuda, UBI,
exportaciones).

## 4. Módulo estrella: Agro

Reemplaza al Dólar de Argentina. Hero del **novillo** (referencia carne) + faena +
**donut de destinos del complejo cárnico** (EE.UU./NAFTA, China, UE) + grilla de
7 productos (carne, celulosa, soja, lácteos, trigo, madera, arroz) con precio,
exportaciones, participación y sparkline. Header con la coyuntura del complejo.

## 5. Mapa departamental

19 departamentos coloreados por **índice de actividad económica** (base 100 =
Montevideo). Geometría real de geoBoundaries (ODbL), proyectada con Mercator en
build-time. Zonas (Montevideo, Metropolitana, Litoral, Centro, Norte, Este) para
agrupar la leyenda. El `valor_alt` muestra el peso aproximado en el PIB nacional.

## 6. Pendiente (decisión del usuario)

- **Ingesta en vivo:** conectores automáticos a INE, BCU, MEF/UGD,
  INAC/Uruguay XXI, DGI, MIEM/ADME y República AFAP/BEVSA.
- **PIB departamental:** hoy el mapa usa un índice de peso económico relativo
  (ilustrativo); falta una serie oficial de actividad por departamento.
- **Precios ANCAP, base monetaria, importaciones mensuales, precios secundarios de
  bonos y demanda eléctrica** quedan en `s/d` hasta tener fuente puntual.
