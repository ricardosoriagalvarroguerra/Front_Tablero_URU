# Adaptación BOL / ARG → URU · decisiones de diseño

Estado al 17-jun-2026. Cómo se adaptaron los Tableros Inteligentes BOL y ARG a la
coyuntura uruguaya, conservando estética, paleta y lógica.

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

## 3. KPIs de la tira (13)

Destacados: **IPC interanual · Riesgo país (UBI) · PIB**. Grupos: Precios y
monetario (IPC m/m, TPM, expectativas, dólar) · Actividad y social (desempleo,
salario real, novillo) · Crédito y fiscal (resultado fiscal, deuda, reservas).

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
