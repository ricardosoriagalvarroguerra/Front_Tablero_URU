// Datos del "Tablero Inteligente URU" — snapshot REAL de Uruguay al 17-nov-2026.
// Revisado contra fuentes OFICIALES/primarias (INE, BCU, MEF/UGD, INAC/ACG, Uruguay
// XXI, DGI, MIEM/UTE/ADME, FMI) y medios reputados que las citan (El Observador, la
// diaria, Ámbito, Búsqueda, Montevideo Portal, Infobae/EFE, Bloomberg Línea). Lo no
// corroborable se marca s/d; lo que no pudo re-verificarse conserva su fecha
// original y se señala «sin actualizar». Ver docs/SOURCES.md.
//
// Coyuntura (17-nov-2026): la economía se estancó —PIB 2T −0,5% i/a (−0,8% t/t) por
// la sequía que hundió al agro (−22%)— mientras la inflación subió a 4,87% (oct),
// por encima del centro de la meta (4,5%) aunque dentro del rango 3–6%. El BCU
// cortó la pausa con una suba preventiva a 6,00% (8-oct) y la mantuvo el 16-nov.
// El déficit del SPG volvió a −4,7% del PIB (12m a sep) con la recaudación cayendo
// (−2,9% real en sep). En el frente externo, exportaciones planas (+1% ene-oct) con
// carne récord (novillo ≥ US$6/kg) compensando el desplome de la soja (−37%).
// S&P (BBB+) y Moody's (Baa1) ratificaron el grado inversor en noviembre.

import type {
  Kpi, AgroData, MercadosData, ActividadData, EnergiaData, ExternoData, FiscalData,
  Noticia, Evento, Fuente, AnalisisData,
} from '../types';

const pct1 = (v: number) => v.toFixed(1).replace('.', ',');
const pct2 = (v: number) => v.toFixed(2).replace('.', ',');
const miles = (v: number) => v.toLocaleString('es-UY');
const tc = (v: number) => '$' + v.toFixed(2).replace('.', ',');

/** Fecha de corte del snapshot (ancla del calendario y de las noticias). */
export const SNAPSHOT = { fecha: '17-nov-2026', iso: '2026-11-17' };

// ─────────────────────────────────────────────────────────────────────
// MÓDULO A — Indicadores macro (15 KPIs; series con anclas reales y período)
// ─────────────────────────────────────────────────────────────────────
export const KPIS: Kpi[] = [
  {
    id: 'ipc_interanual',
    label: 'Inflación interanual',
    value: 4.87,
    unit: '%',
    fmt: pct2,
    delta: 0.19,
    deltaLabel: '+0,19 pp',
    sentiment: 'neg',
    // INE, var. 12 meses (abr 3,16 · may 3,77 · jun 4,25 · jul 4,27 · ago 4,55 · sep 4,68 · oct 4,87)
    spark: [3.16, 3.77, 4.25, 4.27, 4.55, 4.68, 4.87],
    periodos: ['abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct'],
    historicoNota: 'dic/dic (INE) · 2026* = oct',
    historico: [{ periodo: '2015', valor: 9.44 }, { periodo: '2016', valor: 8.1 }, { periodo: '2017', valor: 6.55 }, { periodo: '2018', valor: 7.96 }, { periodo: '2019', valor: 8.79 }, { periodo: '2020', valor: 9.41 }, { periodo: '2021', valor: 7.96 }, { periodo: '2022', valor: 8.29 }, { periodo: '2023', valor: 5.11 }, { periodo: '2024', valor: 5.49 }, { periodo: '2025', valor: 3.65 }, { periodo: '2026*', valor: 4.87 }],
    source: 'INE · IPC octubre 2026',
    asof: 'oct 2026',
    def: 'Variación del IPC en los últimos 12 meses (INE). Octubre 2026: 4,87% (0,59% en el mes), cuarto mes consecutivo por encima del centro de la meta del BCU (4,5%) aunque dentro del rango 3%–6%. Acumulado del año 4,82%. Empujaron vestimenta (+2,97% por cambio de temporada), gasoil y hortalizas; en septiembre, alimentos (+1,73%; tomate +49%).',
    extra: { label: 'vs centro de la meta', value: '+0,37 pp', tone: 'neg' },
  },
  {
    id: 'pib',
    label: 'PIB',
    value: -0.5,
    unit: '% i/a',
    fmt: pct1,
    delta: -1.4,
    deltaLabel: '−1,4 pp',
    sentiment: 'neg',
    // BCU, PIB i/a trimestral: 1T25 3,6 · 2T 2,3 · 3T 1,2 · 4T 0,1 · 1T26 0,9 · 2T26 −0,5
    spark: [3.6, 2.3, 1.2, 0.1, 0.9, -0.5],
    periodos: ['1T25', '2T25', '3T25', '4T25', '1T26', '2T26'],
    historicoNota: 'variación anual, base 2016 (BCU) · 2026* = 2T i/a',
    historico: [{ periodo: '2015', valor: 0.4 }, { periodo: '2016', valor: 1.7 }, { periodo: '2017', valor: 1.6 }, { periodo: '2018', valor: 0.5 }, { periodo: '2019', valor: 0.9 }, { periodo: '2020', valor: -7.4 }, { periodo: '2021', valor: 5.8 }, { periodo: '2022', valor: 4.6 }, { periodo: '2023', valor: 0.8 }, { periodo: '2024', valor: 3.3 }, { periodo: '2025', valor: 1.8 }, { periodo: '2T26*', valor: -0.5 }],
    source: 'BCU · Cuentas Nacionales',
    asof: '2T 2026',
    def: 'PIB, variación interanual del 2T 2026: −0,5% (−0,8% desestacionalizado vs 1T). Primera caída interanual desde 2023, explicada por la sequía: el agro se desplomó −22,2% (incidencia −1,7 pp). Crecieron construcción (+4,2%), comercio (+2,8%), servicios financieros (+2,3%) e industria (+1,9%); el consumo privado subió +2,6%. El IMAE de agosto cayó −1,1% m/m. El 3T se publica el 15-dic.',
    extra: { label: 'trimestral', value: '−0,8%', tone: 'neg' },
  },
  {
    id: 'tpm',
    label: 'Tasa de política',
    value: 6.0,
    unit: '%',
    fmt: pct2,
    delta: 0,
    deltaLabel: 'mantuvo',
    sentiment: 'neutral',
    // decisiones del COPOM: mantuvo 5,75 (mar, may, 1-jul, 18-ago) · subió a 6,00 (8-oct) · mantuvo (16-nov)
    spark: [5.75, 5.75, 5.75, 5.75, 6.0, 6.0],
    periodos: ['mar', 'may', '1-jul', '18-ago', '8-oct', '16-nov'],
    historicoNota: 'TPM a fin de año; antes de sep-2020 no había tasa de política',
    historico: [{ periodo: '2020', valor: 4.5 }, { periodo: '2021', valor: 5.75 }, { periodo: '2022', valor: 11.5 }, { periodo: '2023', valor: 9.0 }, { periodo: '2024', valor: 8.75 }, { periodo: '2025', valor: 7.5 }, { periodo: '2026*', valor: 6.0 }],
    source: 'BCU · COPOM',
    asof: '16 nov',
    def: 'Tasa de Política Monetaria. El COPOM la subió 25 pb a 6,00% el 8-oct-2026 (unánime, primera suba desde abr-2025, sorprendió al consenso) como medida preventiva ante dos meses de inflación sobre el centro de la meta, y la mantuvo el 16-nov con «riesgos equilibrados»: ve la inflación transitoriamente sobre 4,5% por petróleo y alimentos, y descarta presiones generalizadas. Minuta: 24-nov.',
    extra: { label: '1ª suba desde 2025', value: '', tone: 'neutral' },
  },
  {
    id: 'ipc_mensual',
    label: 'Inflación mensual',
    value: 0.59,
    unit: '%',
    fmt: pct2,
    delta: 0.05,
    deltaLabel: '+0,05 pp',
    sentiment: 'neg',
    spark: [0.7, 0.07, 0.24, 0.54, 0.59],
    periodos: ['may', 'jul', 'ago', 'sep', 'oct'],
    source: 'INE · IPC',
    asof: 'oct 2026',
    def: 'Variación mensual del IPC (INE). Octubre 2026: 0,59%, tras 0,54% en septiembre: dos meses seguidos por encima de 0,5%. Julio había sido casi nulo (0,07%) por la baja de combustibles. La subyacente (sin frutas, verduras ni combustibles) fue 4,47% en septiembre. El IPC de noviembre se publica el 3-dic.',
  },
  {
    id: 'expectativas_inflacion',
    label: 'Expectativas 24m',
    value: 4.57,
    unit: '%',
    fmt: pct2,
    delta: 0.03,
    deltaLabel: '+0,03 pp',
    sentiment: 'neutral',
    spark: [4.5, 4.51, 4.54, 4.57],
    periodos: ['may', 'jun', 'oct', 'nov'],
    source: 'BCU · encuesta de expectativas',
    asof: 'nov 2026',
    def: 'Expectativas de inflación a 24 meses (horizonte de política) según el comunicado del COPOM del 16-nov: analistas 4,57%, operadores financieros 4,6%, empresas ~5%. Siguen cerca del centro de la meta pese al repunte del IPC; a 12 meses los analistas esperan 4,6% (oct). Para el cierre de 2026 la encuesta de noviembre apunta a ~5,1%.',
    extra: { label: 'ancladas cerca de 4,5%', value: '', tone: 'pos' },
  },
  {
    id: 'tipo_cambio',
    label: 'Dólar',
    value: 40.61,
    fmt: tc,
    delta: 1.0,
    deltaLabel: '+1,0% m/m',
    sentiment: 'neutral',
    // BCU interbancario: 26-jun 40,22 · 31-jul 40,27 · ago ~40,24 · 30-oct ~40,19 · 5-nov 40,31 · 13-nov 40,61
    spark: [40.22, 40.27, 40.24, 40.19, 40.31, 40.61],
    periodos: ['26-jun', 'jul', 'ago', 'oct', '5-nov', '13-nov'],
    historicoNota: 'cierre de diciembre (interbancario BCU) · 2015–2019 s/d',
    historico: [{ periodo: '2020', valor: 42.34 }, { periodo: '2021', valor: 44.695 }, { periodo: '2022', valor: 40.071 }, { periodo: '2023', valor: 39.022 }, { periodo: '2024', valor: 44.066 }, { periodo: '2025', valor: 39.04 }, { periodo: '2026*', valor: 40.61 }],
    source: 'BCU · interbancario',
    asof: '13 nov',
    def: 'Tipo de cambio interbancario peso/dólar (BCU): $40,61 al 13-nov-2026, máximo desde junio; acumula más de 100 ruedas por encima de $40 y se mueve en una franja estrecha ($40,0–40,7). El BCU cumplió cinco años sin intervenir en el mercado cambiario. La encuesta de noviembre espera ~$40,50 al cierre de 2026.',
  },
  {
    id: 'reservas',
    label: 'Reservas',
    value: 18216,
    unit: 'M USD',
    fmt: miles,
    delta: -336,
    deltaLabel: '−336 M',
    sentiment: 'neutral',
    spark: [18463, 18243, 18474, 17699, 17486, 18552, 18216],
    periodos: ['abr', 'may', 'jun*', 'jul', 'ago', 'sep', 'oct'],
    historicoNota: 'activos de reserva a fin de año, US$ M · 2026* = oct',
    historico: [{ periodo: '2015', valor: 15630 }, { periodo: '2016', valor: 13470 }, { periodo: '2017', valor: 15959 }, { periodo: '2018', valor: 15560 }, { periodo: '2019', valor: 14504 }, { periodo: '2020', valor: 16250 }, { periodo: '2021', valor: 16963 }, { periodo: '2022', valor: 15100 }, { periodo: '2023', valor: 16200 }, { periodo: '2024', valor: 17370 }, { periodo: '2025', valor: 18978 }, { periodo: '2026*', valor: 18216 }],
    source: 'BCU (vía Trading Economics)',
    asof: 'oct 2026',
    def: 'Activos de reserva del BCU, fin de mes: US$18.216 M en octubre 2026, tras recuperarse a US$18.552 M en septiembre desde el mínimo de agosto (US$17.486 M). Récord: US$19.948 M (feb-2026). *jun = dato del 25-jun. Confianza media: serie tomada de Trading Economics, pendiente de cotejo con la planilla del BCU.',
    extra: { label: 'vs récord', value: '−US$1.732 M', tone: 'neutral' },
  },
  {
    id: 'desempleo',
    label: 'Desempleo',
    value: 7.1,
    unit: '%',
    fmt: pct1,
    delta: -0.1,
    deltaLabel: '−0,1 pp',
    sentiment: 'pos',
    spark: [7.5, 7.6, 7.0, 7.0, 7.2, 7.1],
    periodos: ['abr', 'may', 'jun', 'jul', 'ago', 'sep'],
    historicoNota: 'promedio anual (INE ECH) · 2021 s/d (cambio de encuesta) · 2026* = sep',
    historico: [{ periodo: '2015', valor: 7.5 }, { periodo: '2016', valor: 7.8 }, { periodo: '2017', valor: 7.9 }, { periodo: '2018', valor: 8.3 }, { periodo: '2019', valor: 8.9 }, { periodo: '2020', valor: 10.4 }, { periodo: '2022', valor: 7.9 }, { periodo: '2023', valor: 8.3 }, { periodo: '2024', valor: 8.2 }, { periodo: '2025', valor: 7.5 }, { periodo: '2026*', valor: 7.1 }],
    source: 'INE · ECH',
    asof: 'sep 2026',
    def: 'Tasa de desempleo (INE, ECH). Septiembre 2026: 7,1% (Montevideo e Interior iguales), estable frente a 7,2% de agosto. Empleo 59,6%, actividad 64,1%. Mujeres 8,6%, hombres 5,8%; jóvenes (14-24) 21,6%. La informalidad bajó a 21,0% (−1,3 pp i/a). El dato de octubre sale el 30-nov.',
  },
  {
    id: 'salario_real',
    label: 'Salario real',
    value: 1.25,
    unit: '% i/a',
    fmt: pct2,
    delta: 0.37,
    deltaLabel: '+0,37 pp',
    sentiment: 'pos',
    spark: [2.05, 1.9, 1.29, 0.88, 1.25],
    periodos: ['feb', 'abr', 'may', 'jun', 'sep'],
    historicoNota: 'variación del promedio anual (IMS/IPC) · 2019 s/d · 2026* = sep i/a',
    historico: [{ periodo: '2015', valor: 1.6 }, { periodo: '2016', valor: 1.6 }, { periodo: '2017', valor: 3.0 }, { periodo: '2018', valor: 0.2 }, { periodo: '2020', valor: -1.7 }, { periodo: '2021', valor: -1.5 }, { periodo: '2022', valor: -0.6 }, { periodo: '2023', valor: 3.7 }, { periodo: '2024', valor: 2.6 }, { periodo: '2025', valor: 1.1 }, { periodo: '2026*', valor: 1.25 }],
    source: 'INE · IMS',
    asof: 'sep 2026',
    def: 'Salario real (IMS deflactado por IPC), variación interanual. Septiembre 2026: +1,25% (nominal +5,98%); en el mes −0,43% y +0,99% acumulado en el año. La ganancia de poder de compra se desaceleró desde +2,05% en febrero a medida que subió la inflación. El sector público cayó −0,50% real en septiembre.',
  },
  {
    id: 'pobreza',
    label: 'Pobreza',
    value: 14.8,
    unit: '%',
    fmt: pct1,
    delta: -2.9,
    deltaLabel: '−2,9 pp',
    sentiment: 'pos',
    spark: [17.7, 14.8],
    periodos: ['1S25', '1S26'],
    historicoNota: 'personas, método 2017 (INE) · años sin dato omitidos · 2026* = 1S',
    historico: [{ periodo: '2019', valor: 17.3 }, { periodo: '2023', valor: 19.7 }, { periodo: '2024', valor: 17.3 }, { periodo: '2025', valor: 16.6 }, { periodo: '2026*', valor: 14.8 }],
    source: 'INE · ECH (pobreza)',
    asof: '1S 2026',
    def: 'Incidencia de la pobreza en personas (INE, método 2017). 1S 2026: 14,8%, frente a 17,7% un año antes: unas 95.000 personas salieron de la pobreza y es el mínimo de la serie. Hogares 11,6%; indigencia 1,2%. Pobreza en menores de 6 años 24,9% (vs 32,4%, cifra difundida por Presidencia en base al INE).',
    extra: { label: 'mínimo de la serie', value: '', tone: 'pos' },
  },
  {
    id: 'novillo',
    label: 'Novillo',
    value: 6.01,
    unit: 'USD/kg',
    fmt: pct2,
    delta: 0.2,
    deltaLabel: '+0,2%',
    sentiment: 'pos',
    spark: [5.57, 5.58, 6.0, 5.78, 6.0, 6.01],
    periodos: ['jun', 'jul', 'ago', 'sep', 'oct', 'nov'],
    source: 'ACG · INAC',
    asof: 'sem 44-45',
    def: 'Precio del novillo gordo (USD/kg carcasa, grilla ACG). El 30-oct superó por primera vez en la historia los US$6/kg; a inicios de noviembre US$6,01 (especial 6,05), con negocios en US$5,95–6,00 al 16-nov. El Novillo Tipo (INAC) marcó US$2.212/cabeza en octubre, máximo histórico, y el precio medio de exportación US$6.240/t. Pesos de carcasa récord (314 kg).',
    extra: { label: 'récord histórico', value: '', tone: 'pos' },
  },
  {
    id: 'exportaciones',
    label: 'Exportaciones',
    value: 1089,
    unit: 'M USD',
    fmt: miles,
    delta: 1,
    deltaLabel: '+1% i/a',
    sentiment: 'neutral',
    spark: [1219, 1155, 1398, 1089],
    periodos: ['jul', 'ago*', 'sep', 'oct'],
    historicoNota: 'anual, US$ M (Uruguay XXI, c/zonas francas) · 2015, 2016 y 2020 s/d · 2026 en curso: ene-oct 11.430',
    historico: [{ periodo: '2017', valor: 9058 }, { periodo: '2018', valor: 9088 }, { periodo: '2019', valor: 9119 }, { periodo: '2021', valor: 11549 }, { periodo: '2022', valor: 13356 }, { periodo: '2023', valor: 11518 }, { periodo: '2024', valor: 12845 }, { periodo: '2025', valor: 13493 }],
    source: 'Uruguay XXI (c/zonas francas)',
    asof: 'oct 2026',
    def: 'Exportaciones de bienes (solicitudes, incluye zonas francas). Octubre 2026: US$1.089 M (+1% i/a); acumulado ene-oct US$11.430 M (+1%). Por primera vez la UE fue el primer destino del mes (16%). La celulosa lideró octubre (US$229 M, +37%); la soja acumula −37% por la sequía. *ago estimado por diferencia de acumulados. Confianza media: el valor de octubre coincide con el publicado para oct-2025; el acumulado ene-oct (11.430 vs 11.356 en 2025) sí es distinto.',
    extra: { label: 'ene-oct', value: 'US$11.430 M', tone: 'neutral' },
  },
  {
    id: 'resultado_fiscal',
    label: 'Resultado fiscal',
    value: -4.7,
    unit: '% PIB',
    fmt: pct1,
    delta: -0.4,
    deltaLabel: '−0,4 pp',
    sentiment: 'neg',
    spark: [-4.7, -4.6, -4.3, -4.3, -4.4, -4.7, -4.7],
    periodos: ['mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep'],
    historicoNota: 'SPG, % del PIB; sin FSS desde 2018; hasta 2019 PIB base 2005 · 2026* = 12m sep',
    historico: [{ periodo: '2015', valor: -3.5 }, { periodo: '2016', valor: -4.0 }, { periodo: '2017', valor: -3.5 }, { periodo: '2018', valor: -4.2 }, { periodo: '2019', valor: -4.7 }, { periodo: '2020', valor: -6.0 }, { periodo: '2021', valor: -4.1 }, { periodo: '2022', valor: -3.4 }, { periodo: '2023', valor: -3.6 }, { periodo: '2024', valor: -4.1 }, { periodo: '2025', valor: -4.8 }, { periodo: '2026*', valor: -4.7 }],
    source: 'MEF',
    asof: '12m sep 2026',
    def: 'Resultado del Sector Público Global sin ingresos del FSS II (año móvil): −4,7% del PIB a septiembre 2026 ($170.015 M), igual que en agosto y peor que el −4,3% de mitad de año: la caída de los ingresos (DGI −2,9% real en sep) y un gasto estable. Con FSS II: −4,3%. Gobierno Central-BPS −4,1% (meta Rendición de Cuentas 2026: −4,1%).',
    extra: { label: 'GC-BPS', value: '−4,1%', tone: 'neg' },
  },
  {
    id: 'deuda',
    label: 'Deuda bruta',
    value: 73.2,
    unit: '% PIB',
    fmt: pct1,
    delta: -1.9,
    deltaLabel: '−1,9 pp',
    sentiment: 'neutral',
    spark: [66.4, 75.1, 73.2],
    periodos: ['2024', '2025', 'mar-26'],
    historicoNota: 'deuda bruta SPG, % del PIB (BCU, base 2016) · 2015–2018 s/d · 2026* = mar',
    historico: [{ periodo: '2019', valor: 59.9 }, { periodo: '2020', valor: 74.5 }, { periodo: '2021', valor: 69.8 }, { periodo: '2022', valor: 67.1 }, { periodo: '2023', valor: 67.4 }, { periodo: '2024', valor: 66.4 }, { periodo: '2025', valor: 75.1 }, { periodo: '2026*', valor: 73.2 }],
    source: 'BCU · MEF/UGD',
    asof: 'mar 2026',
    def: 'Deuda bruta del Sector Público Global: 73,2% del PIB (US$63.861 M) a marzo 2026; neta 54,0%; 59% en moneda nacional. La del Gobierno Central (UGD) subió a 62,5% bruta / 58,2% neta a septiembre. En 2026 el 92% de los bonos emitidos (US$4.403 M de US$4.802 M) se colocó en moneda nacional: desdolarización récord.',
    extra: { label: 'neta', value: '54,0%', tone: 'neutral' },
  },
  {
    id: 'embi',
    label: 'Riesgo país',
    value: 84,
    unit: 'pb',
    fmt: miles,
    delta: 6,
    deltaLabel: '+6 pb',
    sentiment: 'neutral',
    // EMBI de JP Morgan, cierre de mes (Bloomberg Línea): jun 58 · jul 68 · ago 65 · sep 78 · oct 84
    spark: [58, 68, 65, 78, 84],
    periodos: ['jun', 'jul', 'ago', 'sep', 'oct'],
    source: 'JP Morgan · EMBI',
    asof: 'oct 2026',
    def: 'Riesgo país según el EMBI de JP Morgan (spread soberano sobre bonos del Tesoro de EE.UU.): 84 pb al cierre de octubre 2026 (83 pb el 2-nov), desde 58 pb en junio. Sigue siendo el más bajo de América Latina: Chile 104, Paraguay 122, Perú 127, Brasil 194, Argentina 787. La suba acompaña el aumento del riesgo regional que mencionó el BCU. El UBI de República AFAP no tiene datos publicados de 2026.',
    extra: { label: 'el más bajo de la región', value: '', tone: 'pos' },
  },
  {
    id: 'ubi_hist',
    label: 'Riesgo país UBI (fin de año)',
    value: 66,
    unit: 'pb',
    fmt: miles,
    delta: -13,
    deltaLabel: '−13 pb',
    sentiment: 'pos',
    spark: [130, 114, 105, 70, 70, 79, 66],
    periodos: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    historicoNota: 'UBI de República AFAP a fin de año (vía UCU) · distinto del EMBI que usa la tarjeta actual',
    historico: [{ periodo: '2019', valor: 130 }, { periodo: '2020', valor: 114 }, { periodo: '2021', valor: 105 }, { periodo: '2022', valor: 70 }, { periodo: '2023', valor: 70 }, { periodo: '2024', valor: 79 }, { periodo: '2025', valor: 66 }],
    source: 'República AFAP · UBI (vía UCU)',
    asof: 'dic 2025',
    def: 'Uruguay Bond Index de República AFAP a fin de cada año (pb). Bajó de 130 pb en 2019 a 66 pb en 2025, en línea con la mejora de la calificación (BBB+ de S&P en 2023, Baa1 de Moody\'s en 2024). No se encadena con el EMBI de JP Morgan que usa la tarjeta vigente.',
  },
  {
    id: 'cuenta_corriente',
    label: 'Cuenta corriente',
    value: -0.8,
    unit: '% PIB',
    fmt: pct1,
    delta: -0.3,
    deltaLabel: '−0,3 pp',
    sentiment: 'neutral',
    spark: [1.3, -0.6, -2.4, -3.5, -3.0, -0.8, -0.5, -0.8],
    periodos: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '12m jun-26'],
    historicoNota: '% del PIB (BCU) · 2016–2018 de ediciones anteriores · 2026* = 12m a jun',
    historico: [{ periodo: '2016', valor: 0.8 }, { periodo: '2017', valor: 1.6 }, { periodo: '2018', valor: -0.5 }, { periodo: '2019', valor: 1.3 }, { periodo: '2020', valor: -0.6 }, { periodo: '2021', valor: -2.4 }, { periodo: '2022', valor: -3.5 }, { periodo: '2023', valor: -3.0 }, { periodo: '2024', valor: -0.8 }, { periodo: '2025', valor: -0.5 }, { periodo: '2026*', valor: -0.8 }],
    source: 'BCU · Balanza de Pagos',
    asof: '12m jun 2026',
    def: 'Saldo de la cuenta corriente de la balanza de pagos en % del PIB. Tras el déficit de 2022–2023 (−3,5% y −3,0%) volvió a niveles mínimos (−0,8% en los 12 meses a junio de 2026): no hay restricción externa.',
  },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO AGRO — complejo agroexportador (módulo estrella, 17-nov-2026)
// var. de precio: vs el corte anterior del tablero (jun-2026) salvo indicación.
// ─────────────────────────────────────────────────────────────────────
export const AGRO: AgroData = {
  productos: [
    {
      id: 'carne', nombre: 'Carne bovina', precio: 6.01, precioUnidad: 'USD/kg', varPrecio: 7.9,
      exportUsd: 2220, participacion: 19.4, destinoTop: 'EE.UU. / China / UE',
      spark: [5.57, 5.58, 6.0, 5.78, 6.0, 6.01], polaridad: 'up', asof: 'ene-oct', fuente: 'Uruguay XXI · INAC · ACG',
      nota: '1er producto (US$2.220 M ene-oct, +2%). Novillo récord ≥ US$6/kg; precio de exportación US$6.240/t (oct). Faena −14% i/a por menor oferta. EE.UU. fue el 1er comprador de carne en octubre; China usó sólo ~31% de su cuota (324 mil t al 12%).',
    },
    {
      id: 'celulosa', nombre: 'Celulosa', precio: 620, precioUnidad: 'USD/ton', varPrecio: 3.3,
      exportUsd: 1998, participacion: 17.5, destinoTop: 'UE / China / EE.UU.',
      spark: [600, 620], polaridad: 'up', asof: 'ene-oct', fuente: 'Uruguay XXI · Suzano (lista China, prensa)',
      nota: '2º producto (US$1.998 M ene-oct, +2%) y 1º de octubre (US$229 M, +37%; 40% a la UE). Precio: ref. de prensa ~US$610–630/t en China tras la suba de Suzano (+US$20/t, 11-nov); no comparable con el índice Fastmarkets de junio (US$668).',
    },
    {
      id: 'soja', nombre: 'Soja', precio: 12.27, precioUnidad: 'USD/bushel', varPrecio: 10.5,
      exportUsd: 834, participacion: 7.3, destinoTop: 'China',
      spark: [11.1, 12.27], polaridad: 'up', asof: 'ene-oct', fuente: 'Uruguay XXI · CBOT (USDA AMS)',
      nota: 'La gran víctima de la sequía: US$834 M ene-oct (−37%; volumen −42%) y sin envíos a China en octubre. CBOT nov-26 US$12,27 (12-nov), +10,5% desde junio. Intención 2026/27: ~1,26–1,3 M ha; USDA proyecta 3,1 Mt.',
    },
    {
      id: 'lacteos', nombre: 'Lácteos', precio: 3971, precioUnidad: 'USD/ton', varPrecio: 7.2,
      exportUsd: 772, participacion: 6.8, destinoTop: 'Brasil / Argelia',
      spark: [3706, 3605, 3760, 3971], polaridad: 'up', asof: 'ene-oct', fuente: 'Uruguay XXI · GDT',
      nota: '4º producto (US$772 M ene-oct); octubre +21% i/a. Leche en polvo entera GDT evento 415 (3-nov): US$3.971/t, tercera suba consecutiva (+10% desde el 8-oct).',
    },
    {
      id: 'concentrado', nombre: 'Concentrado de bebidas', precio: null, precioUnidad: 'USD/ton', varPrecio: null,
      exportUsd: 711, participacion: 6.2, destinoTop: 's/d',
      spark: [711], polaridad: 'none', asof: 'ene-oct', fuente: 'Uruguay XXI',
      nota: '5º producto (US$711 M ene-oct); octubre US$78 M (+23% i/a). Industrial (zona franca), no agro.',
    },
    {
      id: 'ganado', nombre: 'Ganado en pie', precio: null, precioUnidad: 'USD/cab', varPrecio: null,
      exportUsd: 368, participacion: 3.2, destinoTop: 'Turquía / región',
      spark: [368], polaridad: 'up', asof: '2026', fuente: 'Uruguay XXI',
      nota: 'US$368 M (+24% i/a): compite con la faena local por la oferta de ganado.',
    },
    {
      id: 'arroz', nombre: 'Arroz', precio: 514, precioUnidad: 'USD/ton', varPrecio: 11.5,
      exportUsd: 350, participacion: 3.1, destinoTop: 'Brasil / Perú',
      spark: [383, 461, 514], polaridad: 'up', asof: 'abr-sep', fuente: 'Uruguay XXI · Blasina',
      nota: 'Exportación US$350 M (−21% por menor zafra). Precio de exportación US$514/t en sep (+35% i/a, +11,5% vs jul). Precio provisorio 2025/26 US$9,10/bolsa, el definitivo sería mayor.',
    },
    {
      id: 'trigo', nombre: 'Trigo', precio: 5.84, precioUnidad: 'USD/bushel', varPrecio: 1.9,
      exportUsd: null, participacion: null, destinoTop: 'Brasil',
      spark: [5.73, 5.84], polaridad: 'up', asof: 'nov 2026', fuente: 'DIEA · CBOT',
      nota: 'Arrancó la cosecha de invierno: 268.540 ha de trigo (zafra total de invierno 825.712 ha con cebada, colza y carinata). CBOT dic-26 US$5,84 (12-nov).',
    },
  ],
  // Suma de los 6 principales rubros agro listados con dato ene-oct (cálculo del tablero).
  exportTotalAgro: 6542,
  participacionAgro: 57,
  novilloPrecio: 6.01,
  novilloVar: null,
  faena: 47.2,
  faenaPeriodo: 'sem 8-14 nov: 47.213 cab (−15% i/a); acum. 2026 −14,3% i/a',
  destinos: [
    { pais: 'China', valor: 20 },
    { pais: 'Brasil', valor: 15 },
    { pais: 'Unión Europea', valor: 14 },
    { pais: 'Otros', valor: 51 },
  ],
  asof: 'ene-oct 2026',
  fuente: 'Uruguay XXI · INAC · ACG',
  resumen:
    'Precios récord contra volumen en caída. Las exportaciones de bienes suman US$11.430 M en ene-oct (+1% i/a): la sequía bajó la soja −37% y la faena −14%, pero la carne (novillo ≥ US$6/kg, exportación US$6.240/t), la celulosa (+37% en octubre) y los lácteos (+21%) sostuvieron el valor. Cambia el mapa de destinos: China perdió peso (no compró soja en octubre y usa ~31% de su cuota cárnica) y la UE (16%) y EE.UU. (14%) ganaron terreno; en octubre la UE fue, por primera vez, el primer destino.',
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO MERCADOS — grado inversor (UBI, bonos, SSLB, ratings)
// ─────────────────────────────────────────────────────────────────────
export const MERCADOS: MercadosData = {
  ubi: {
    value: 84, chg: 6, series: [58, 68, 65, 78, 84], periodos: ['jun', 'jul', 'ago', 'sep', 'oct'],
    indice: 'EMBI · JP Morgan', asof: 'oct 2026',
    regional: [
      { pais: 'Uruguay', pb: 84 }, { pais: 'Chile', pb: 104 }, { pais: 'Paraguay', pb: 122 },
      { pais: 'Perú', pb: 127 }, { pais: 'Brasil', pb: 194 }, { pais: 'Argentina', pb: 787 },
    ],
  },
  bonos: [
    { id: 'usd2037', name: 'Global USD 2037', moneda: 'USD', price: null, yield: 5.36, tipo: 'global', chg: null, vencimiento: '2037' },
    { id: 'uyu2035', name: 'Global UYU 2035', moneda: 'UYU', price: 101.58, yield: 7.75, tipo: 'global', chg: null, vencimiento: '2035' },
    { id: 'sslb2034', name: 'SSLB 2034', moneda: 'USD', price: null, yield: null, tipo: 'sslb', chg: null, vencimiento: '2034' },
    { id: 'ui2034', name: 'Nota Global UI 2034', moneda: 'UI', price: null, yield: 2.74, tipo: 'global', chg: null, vencimiento: '2034' },
  ],
  gradoInversor: {
    agencias: 4,
    nota:
      'Grado inversor ratificado en noviembre: S&P reafirmó BBB+ estable (11-nov; proyecta un déficit del gobierno general de ~3,7% del PIB en 2026, bajando a 3% en 2029) y Moody\'s mantuvo Baa1 estable (10-nov; PIB 1,6% en 2026 y 1,9% en 2027; riesgos: crecimiento bajo el potencial, deterioro fiscal y deuda sobre el tope). Fitch ratificó BBB estable (11-sep; proyecta PIB 1% y deuda del gobierno general de 68% del PIB en 2026) y DBRS mantiene BBB (última confirmación nov-2025). Rendimientos: colocación primaria del 28-jul (Global UYU 2035 a 7,75%, USD 2037 a 5,356%, spread 75 pb); UI 2034: corte de feb.',
  },
  sslb: {
    nota:
      'Bono Indexado a Indicadores de Sostenibilidad: el primer bono soberano del mundo con cupón atado a metas ambientales (2022). ~US$2.200 M, vto. 2034. 4º Reporte Anual (jun-2026, datos 2024): KPI-1 a −48% (a 2 pp de la meta −50% a 2025 → riesgo de step-up); KPI-2 (bosque nativo) en cumplimiento. El dato 2025 del KPI-1, que define el ajuste, se publicaría en el reporte de 2027; el step-up se activa si la reducción queda bajo 50% (step-down sobre 52%).',
    cupon: '5,75% · ±15 pb por meta (desde oct-2027)',
    kpi1: 'Reducir la intensidad de emisiones de GEI por unidad de PIB (−48% a 2024; meta −50% a 2025).',
    kpi2: 'Mantener/aumentar el área de bosque nativo vs la línea de base 2012 (en cumplimiento).',
  },
  ratingsHistoria: [
    { anio: 2015, sp: 'BBB', moodys: 'Baa2' }, { anio: 2016, sp: 'BBB (neg.)', moodys: 'Baa2 (neg.)' },
    { anio: 2017, sp: 'BBB', moodys: 'Baa2' }, { anio: 2018, sp: 'BBB', moodys: 'Baa2' },
    { anio: 2019, sp: 'BBB', moodys: 'Baa2' }, { anio: 2020, sp: 'BBB', moodys: 'Baa2' },
    { anio: 2021, sp: 'BBB', moodys: 'Baa2' }, { anio: 2022, sp: 'BBB', moodys: 'Baa2' },
    { anio: 2023, sp: 'BBB+', moodys: 'Baa2 (pos.)' }, { anio: 2024, sp: 'BBB+', moodys: 'Baa1' },
    { anio: 2025, sp: 'BBB+', moodys: 'Baa1' }, { anio: 2026, sp: 'BBB+', moodys: 'Baa1' },
  ],
  ratings: [
    { agencia: 'S&P', rating: 'BBB+', outlook: 'Estable', actualizado: 'nov 2026' },
    { agencia: "Moody's", rating: 'Baa1', outlook: 'Estable', actualizado: 'nov 2026' },
    { agencia: 'Fitch', rating: 'BBB', outlook: 'Estable', actualizado: 'sep 2026' },
    { agencia: 'DBRS', rating: 'BBB', outlook: 'Estable', actualizado: 'nov 2025' },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO ACTIVIDAD & PRECIOS (BCU, INE)
// ─────────────────────────────────────────────────────────────────────
export const ACTIVIDAD: ActividadData = {
  pib: {
    varInteranual: -0.5, anual2025: 1.8, trimestral: -0.8,
    series: [3.6, 2.3, 1.2, 0.1, 0.9, -0.5],
    periodos: ['1T25', '2T25', '3T25', '4T25', '1T26', '2T26'],
    asof: '2T 2026', source: 'BCU · Cuentas Nacionales',
  },
  industria: { varInteranual: 7.7, varMensual: null, asof: 'sep 2026', source: 'INE · IVFIM (+1,8% sin refinería)' },
  // PIB por sector, var. i/a 2T 2026 (BCU · Cuentas Nacionales)
  pibSectores: [
    { label: 'Construcción', value: 4.2 },
    { label: 'Comercio, alojamiento y comidas', value: 2.8 },
    { label: 'Servicios financieros', value: 2.3 },
    { label: 'Industria manufacturera', value: 1.9 },
    { label: 'Electricidad, gas y agua', value: 1.0 },
    { label: 'Transporte y TIC', value: -0.2 },
    { label: 'Agro, pesca y minería', value: -22.2 },
  ],
  // IPC — rubros destacados de los últimos meses (variación % mensual, INE)
  ipcRubros: [
    { label: 'Tomates (sep)', value: 48.86 },
    { label: 'Cebollas (sep)', value: 25.45 },
    { label: 'Vestimenta (oct)', value: 2.97 },
    { label: 'Alimentos y bebidas (sep)', value: 1.73 },
  ],
  departamentos: [
    { codigo: 'montevideo', nombre: 'Montevideo', zona: 'montevideo', valor: 100, valorAlt: 47.0 },
    { codigo: 'canelones', nombre: 'Canelones', zona: 'metropolitana', valor: 28, valorAlt: 9.5 },
    { codigo: 'maldonado', nombre: 'Maldonado', zona: 'este', valor: 14, valorAlt: 5.8 },
    { codigo: 'colonia', nombre: 'Colonia', zona: 'litoral', valor: 10, valorAlt: 3.8 },
    { codigo: 'sanjose', nombre: 'San José', zona: 'metropolitana', valor: 9, valorAlt: 3.2 },
    { codigo: 'paysandu', nombre: 'Paysandú', zona: 'litoral', valor: 7.5, valorAlt: 2.6 },
    { codigo: 'salto', nombre: 'Salto', zona: 'litoral', valor: 7.5, valorAlt: 2.6 },
    { codigo: 'soriano', nombre: 'Soriano', zona: 'litoral', valor: 7, valorAlt: 2.5 },
    { codigo: 'rionegro', nombre: 'Río Negro', zona: 'litoral', valor: 6.5, valorAlt: 2.4 },
    { codigo: 'tacuarembo', nombre: 'Tacuarembó', zona: 'norte', valor: 6.5, valorAlt: 2.3 },
    { codigo: 'rivera', nombre: 'Rivera', zona: 'norte', valor: 5.5, valorAlt: 2.1 },
    { codigo: 'cerrolargo', nombre: 'Cerro Largo', zona: 'norte', valor: 5, valorAlt: 1.9 },
    { codigo: 'durazno', nombre: 'Durazno', zona: 'centro', valor: 4.5, valorAlt: 1.7 },
    { codigo: 'florida', nombre: 'Florida', zona: 'centro', valor: 4.5, valorAlt: 1.7 },
    { codigo: 'rocha', nombre: 'Rocha', zona: 'este', valor: 4.5, valorAlt: 1.7 },
    { codigo: 'lavalleja', nombre: 'Lavalleja', zona: 'este', valor: 4, valorAlt: 1.5 },
    { codigo: 'artigas', nombre: 'Artigas', zona: 'litoral', valor: 4, valorAlt: 1.5 },
    { codigo: 'treintaytres', nombre: 'Treinta y Tres', zona: 'este', valor: 3.5, valorAlt: 1.3 },
    { codigo: 'flores', nombre: 'Flores', zona: 'centro', valor: 2.5, valorAlt: 0.9 },
  ],
  social: {
    desempleo: 7.1,
    desempleoPeriodo: 'sep 2026',
    empleo: 59.6,
    salarioReal: 1.25,
    salarioRealPeriodo: 'sep 2026',
    pobreza: 14.8,
    pobrezaPeriodo: '1S 2026',
    source: 'INE · ECH / IMS / pobreza',
  },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO ENERGÍA — matriz renovable (ADME/UTE, 2026)
// ─────────────────────────────────────────────────────────────────────
export const ENERGIA: EnergiaData = {
  matriz: [
    { id: 'hidraulica', nombre: 'Hidráulica', pct: 51.2 },
    { id: 'eolica', nombre: 'Eólica', pct: 32.4 },
    { id: 'biomasa', nombre: 'Biomasa', pct: 12.3 },
    { id: 'solar', nombre: 'Solar fotovoltaica', pct: 2.7 },
    { id: 'termica', nombre: 'Térmica (fósil)', pct: 1.3 },
  ],
  renovablePct: 98.7,
  demandaMax: 2507,
  potenciaInstalada: 5299,
  exportacion: {
    destino: 'Argentina / Brasil',
    valorGwh: 1022,
    nota: 'En 2025 Uruguay exportó 1.022 GWh e importó 633 GWh (MIEM). En 2026 la exportación fue irregular por la sequía: récord del año en mayo (130 GWh), pero en junio se importaron 124 GWh de Brasil con el precio spot más alto desde 2014. UTE reportó en el 1S una ganancia de US$193 M con exportaciones −18% i/a. Récord invernal de demanda: 2.362 MW (jul-2026); el máximo histórico sigue siendo 2.507 MW (mar-2025).',
  },
  combustibles: [
    { producto: 'Nafta Súper 95', precio: 90.45, unidad: '$/L' },
    { producto: 'Nafta Premium 97', precio: 93.01, unidad: '$/L' },
    { producto: 'Gasoil 50S', precio: 62.79, unidad: '$/L' },
    { producto: 'Gasoil 10S', precio: 72.05, unidad: '$/L' },
    { producto: 'Supergás', precio: 93.56, unidad: '$/kg' },
  ],
  hidrogeno: {
    proyecto: 'HIF Global · Paysandú',
    inversionUsd: 5385,
    estado: 'en evaluación ambiental · relocalización',
    nota: 'Proyecto de e-combustibles a partir de hidrógeno verde. Solicitud de Autorización Ambiental Previa presentada en mar-2026; en sep-2026 se anunció su relocalización a un predio de ANCAP (~48 ha, cerca de ALUR) tras los reclamos de Argentina. Inversión estimada US$5.385 M. Además, Solaria firmó (oct) un memorando por US$5.700 M para 500 MW de centros de datos con 350 MW solares.',
  },
  asof: '1S 2026 · oct 2026',
  source: 'ADME · UTE · MIEM/URSEA',
  resumen:
    'La matriz se mantuvo ~99% renovable pese a la sequía: en el 1S 2026 la generación fue 51% hidráulica, 32% eólica, 12% biomasa y 3% solar, con sólo 1,3% fósil. Tras el mínimo eólico e hídrico de junio, las represas se recuperaron: octubre cerró 99,7% renovable (hidráulica 58,9%) y el 28-oct se llegó a 100% instantáneo. Los combustibles de noviembre quedaron congelados pese a que la paridad de importación indicaba subas.',
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO EXTERNO & COMERCIO (Uruguay XXI, BCU, Mintur)
// ─────────────────────────────────────────────────────────────────────
export const EXTERNO: ExternoData = {
  commodities: [
    { id: 'novillo', label: 'Novillo gordo (carcasa)', value: 6.01, unit: 'USD/kg', chgMensual: 0.2, chgAnual: null, polarity: 'up', source: 'ACG · INAC', asof: 'nov 2026', nota: 'Superó US$6/kg por primera vez (30-oct).' },
    { id: 'carne_export', label: 'Carne (precio medio export)', value: 6240, unit: 'USD/ton', chgMensual: null, chgAnual: 25, polarity: 'up', source: 'INAC', asof: 'oct 2026', nota: '2º mayor registro; la última semana marcó récord de US$6.650/t.' },
    { id: 'celulosa', label: 'Celulosa (China, ref. prensa)', value: 620, unit: 'USD/ton', chgMensual: 3.3, chgAnual: null, polarity: 'up', source: 'Suzano · prensa', asof: '11 nov', nota: 'Suzano subió US$20/t en China; rango ~US$610–630.' },
    { id: 'soja', label: 'Soja (CBOT nov-26)', value: 12.27, unit: 'USD/bushel', chgMensual: null, chgAnual: null, polarity: 'up', source: 'USDA AMS · CBOT', asof: '12 nov', nota: '+10,5% desde junio (US$11,10).' },
    { id: 'trigo', label: 'Trigo (CBOT dic-26)', value: 5.84, unit: 'USD/bushel', chgMensual: null, chgAnual: null, polarity: 'up', source: 'USDA AMS · CBOT', asof: '12 nov', nota: 'Arranca la cosecha local (268 mil ha).' },
    { id: 'leche', label: 'Leche en polvo entera (GDT)', value: 3971, unit: 'USD/ton', chgMensual: 10.2, chgAnual: null, polarity: 'up', source: 'GlobalDairyTrade', asof: 'GDT 415 · 3-nov', nota: 'Tercera suba seguida (desde US$3.605 el 8-oct).' },
    { id: 'arroz', label: 'Arroz (precio export)', value: 514, unit: 'USD/ton', chgMensual: null, chgAnual: 35, polarity: 'up', source: 'Blasina · Uruguay XXI', asof: 'sep 2026', nota: 'Repunte desde el piso de US$383 (abr).' },
  ],
  // Balanza en base aduanera del BCU (exp. cumplidas s/zonas francas); valores aprox.
  balanza: { exportaciones: 1140, importaciones: 1180, saldo: -35, periodo: 'sep 2026 · base BCU (aprox.)', source: 'BCU · Comercio Ext. de Bienes · ene-sep −US$1.260 M' },
  destinos: [
    { pais: 'Unión Europea', valor: 16 },
    { pais: 'Brasil', valor: 16 },
    { pais: 'China', valor: 15 },
    { pais: 'EE.UU.', valor: 14 },
    { pais: 'Argentina', valor: 5 },
    { pais: 'Otros', valor: 34 },
  ],
  turismo: {
    ingresosUsd: 348,
    visitantes: 629,
    saldoUsd: -24,
    nota: 'Receptivo 2T 2026: US$348 M (+12% i/a) con 629 mil visitantes (−8%): menos turistas pero que gastan más (US$554 por persona). El saldo del trimestre fue ~−US$24 M (estimado) porque los uruguayos viajan más (emisivo 1S US$777 M). La rebaja de 9 puntos de IVA a turistas se prorrogó hasta el 30-abr-2027; las reservas para la temporada 2026-27 vienen en niveles récord.',
    asof: '2T 2026',
    source: 'Mintur',
  },
  ied: { valorUsd: null, pctPib: 0.5, asof: '2025', source: 'BCU vía UCU (Indicadores de Coyuntura)' },
  cuentaCorriente: { pctPib: -0.8, periodo: '12m a jun 2026', source: 'BCU · Balanza de Pagos (−US$689 M)' },
  competitividad: {
    tcrBrecha: -9.9,
    tcrNota:
      'El BCU estimó un atraso cambiario de −9,9% respecto de los fundamentos al cierre de 2025. En 2026 el tipo de cambio real mejoró algo (ITCR +2,3% i/a en junio), pero el TCR extrarregional sigue ~25% por debajo de su promedio del siglo (UCU).',
    ipfFrontera: 25.0,
    ipfNota:
      'Comprar en Salto costaba 25% más que en Concordia en julio 2026 (UCU), tras el mínimo de 15% en mayo: la brecha con Argentina volvió a ampliarse.',
    asof: '2025 · jul 2026',
    source: 'BCU · UCU',
  },
  deuda: { brutaPct: 73.2, totalUsd: 63861, asof: 'mar 2026', source: 'BCU · MEF/UGD' },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO FISCAL & MONETARIO (MEF, DGI, BCU)
// ─────────────────────────────────────────────────────────────────────
export const FISCAL: FiscalData = {
  resultadoGlobal: {
    pctPib: -4.7, periodo: '12m sep 2026 · sin FSS II',
    series: [-4.7, -4.6, -4.3, -4.3, -4.4, -4.7, -4.7],
    periodos: ['mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep'],
    source: 'MEF',
  },
  // Estimación del tablero: GC-BPS −4,1% + intereses GC-BPS ~2,3% del PIB (MEF, may).
  resultadoPrimario: { pctPib: -1.8, periodo: 'est. 12m sep · GC-BPS', source: 'MEF (estimación del tablero)' },
  reglaFiscal: {
    resultadoEstructural: -3.9,
    topeGastoReal: 5.7,
    deudaNetaTope: 3450,
    cumple: false,
    nota:
      'Evaluación 2025: 2 de 3 pilares cumplidos (estructural −3,9% y endeudamiento neto bajo el tope de US$3.450 M; el gasto real creció 5,7% y superó el tope). Para 2026 la nueva regla (Ley 20.446) fija un resultado estructural de −4,0% del PIB y un ancla de deuda neta de 65% (el MEF proyecta 63,5% en 2029). El Consejo Fiscal Autónomo (jul-2026) advirtió que, si se materializan los riesgos, el estructural podría desviarse ~0,5% del PIB de la meta.',
    source: 'MEF · Consejo Fiscal Autónomo',
  },
  deuda: { brutaPct: 73.2, netaPct: 54.0, monedaLocalPct: 59, asof: 'mar 2026', source: 'BCU · MEF/UGD' },
  recaudacion: { varRealInteranual: -2.9, periodo: 'sep 2026', source: 'DGI · bruta $62.881 M (+1,7% nominal, −2,9% real): IVA −5,2%, IRAE −3,0%, IRPF +1,7%. Acum. ene-sep +1,2% real; 12m +0,2%' },
  tasaPolitica: { valor: 6.0, nombre: 'Tasa de Política Monetaria (TPM)', asof: 'COPOM 16-nov-2026', source: 'BCU' },
  reservas: { valorUsd: 18216, asof: 'oct 2026', source: 'BCU (vía Trading Economics)' },
  baseMonetaria: { valorMM: 113072, asof: 'may 2026', source: 'BCU · Emisión (sin actualizar)' },
  expectativas: { inflacion12m: 4.6, inflacion24m: 4.57, asof: 'oct–nov 2026', source: 'BCU · encuesta de expectativas (analistas)' },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO D — Feed de noticias (titulares reales sep–nov 2026; orden recencia).
// mins = minutos antes del corte (17-nov-2026 09:00 UYT).
// ─────────────────────────────────────────────────────────────────────
export const NOTICIAS: Noticia[] = [
  {
    id: 'n01', t: '−14h', mins: 840, fuente: 'Infobae', tag: 'Económico',
    titular: 'Uruguay mantiene en 6% su Tasa de Política Monetaria',
    resumen: 'El COPOM mantuvo la TPM en 6% por unanimidad tras la suba de octubre, en línea con lo esperado por el mercado.',
    breaking: true,
    url: 'https://www.infobae.com/america/agencias/2026/11/16/uruguay-mantiene-en-6-su-tasa-de-politica-monetaria/',
    body: 'El Banco Central del Uruguay mantuvo la Tasa de Política Monetaria en 6% por unanimidad, después de la suba de 25 pb de octubre. La inflación a 12 meses llegó a 4,87% en octubre y la subyacente a 4,6%. El BCU señaló que el petróleo moderó las presiones de octubre, pero que persisten riesgos por energía y alimentos, y que en la región subieron el riesgo soberano y la volatilidad cambiaria. Las expectativas a 24 meses se ubican en 4,57% (analistas), 4,6% (operadores) y 5% (empresas).',
    keywords: ['BCU', 'TPM', 'Inflación', 'COPOM'],
    relacionados: ['TPM · BCU', 'IPC interanual', 'Expect. infl. 24m'],
  },
  {
    id: 'n02', t: '−20h', mins: 1200, fuente: 'Infobae', tag: 'Internacional',
    titular: 'Orsi reivindica en Madrid a Uruguay como base de operaciones para Europa en el Mercosur',
    resumen: 'En el Nueva Economía Fórum el presidente presentó la inversión de Solaria y se reunió con Pedro Sánchez para tratar el acuerdo Mercosur-UE.',
    breaking: false,
    url: 'https://www.infobae.com/america/agencias/2026/11/16/orsi-reivindica-en-madrid-a-uruguay-como-base-de-operaciones-para-europa-en-el-mercosur/',
    body: 'Yamandú Orsi presentó en Madrid a Uruguay como plataforma para las empresas europeas en el Mercosur. Destacó que España concentra cerca del 20% del stock de inversión extranjera directa en el país (unos US$7.500 M) y que entre mayo y septiembre Uruguay exportó US$860 M a la Unión Europea, 12% más que un año antes. Se reunió con Pedro Sánchez, con el acuerdo Mercosur-UE como tema central.',
    keywords: ['Orsi', 'España', 'Mercosur-UE', 'Inversión'],
    relacionados: ['Externo & comercio'],
  },
  {
    id: 'n03', t: '−6d', mins: 8640, fuente: 'Investing.com', tag: 'Económico',
    titular: 'S&P reafirma la calificación BBB+ de Uruguay con perspectiva estable',
    resumen: 'S&P ratificó la nota soberana en moneda extranjera y local; espera un déficit del gobierno general de ~3,7% del PIB en 2026.',
    breaking: false,
    url: 'https://mx.investing.com/news/world-news/sp-reafirma-calificacion-bbb-de-uruguay-con-perspectiva-estable-3845242',
    body: 'S&P Global Ratings reafirmó la calificación soberana de Uruguay en BBB+ con perspectiva estable, tanto en moneda extranjera como local. La agencia espera un déficit del gobierno general cercano a 3,7% del PIB en 2026, que bajaría gradualmente hacia 3% en 2029, y destacó la solidez institucional y el acceso al financiamiento en moneda local.',
    keywords: ['S&P', 'Calificación', 'Grado inversor', 'Déficit'],
    relacionados: ['Mercados · ratings', 'Result. fiscal'],
  },
  {
    id: 'n04', t: '−6d', mins: 8700, fuente: 'Shale24', tag: 'Sectorial',
    titular: 'Eni y APA perforarán el primer pozo offshore de Uruguay en más de una década',
    resumen: 'Eni, socio de YPF, operará junto a APA el primer pozo exploratorio en aguas uruguayas desde 2016, con el equipo Noble BlackHawk.',
    breaking: false,
    url: 'https://www.shale24.com/en/oil-and-gas/eni-and-apa-to-drill-uruguays-first-offshore-well-in-more-than-decade-test-for-ypfs-neighboring-block-n2026',
    body: 'Eni y APA perforarán el primer pozo exploratorio offshore de Uruguay desde 2016, con el equipo Noble BlackHawk y unos 50 días de contrato. Sería el cuarto pozo offshore del país, después de Lobo, Gaviotín y Raya X-1. Eni financia la mayor parte. En paralelo, Chevron obtuvo un año adicional en el bloque OFF-1 y QatarEnergy y Chevron se sumaron a Shell en OFF-2/OFF-7.',
    keywords: ['ANCAP', 'Offshore', 'Eni', 'Petróleo'],
    relacionados: ['Energía'],
  },
  {
    id: 'n05', t: '−7d', mins: 10080, fuente: 'Infobae', tag: 'Económico',
    titular: "Moody's mantiene a Uruguay en Baa1 con perspectiva estable",
    resumen: "Moody's proyecta un crecimiento de 1,6% en 2026 y 1,9% en 2027; advierte por el crecimiento bajo el potencial y el deterioro fiscal.",
    breaking: false,
    url: 'https://www.infobae.com/america/agencias/2026/11/10/moodys-otorga-una-nota-de-perspectiva-estable-a-la-economia-de-uruguay/',
    body: "Moody's ratificó la calificación Baa1 de Uruguay con perspectiva estable. Proyecta un crecimiento de 1,6% en 2026 y 1,9% en 2027, y señaló como riesgos a la baja un crecimiento por debajo del potencial, un deterioro fiscal y una deuda por encima del tope oficial. Destacó la desdolarización de la deuda y la inversión de Solaria en centros de datos.",
    keywords: ["Moody's", 'Baa1', 'Crecimiento', 'Deuda'],
    relacionados: ['Mercados · ratings', 'Deuda bruta'],
  },
  {
    id: 'n06', t: '−8d', mins: 11520, fuente: 'El Observador', tag: 'Económico',
    titular: 'Uruguay afianza la desdolarización de su deuda: el 92% de la emisión de bonos del año se colocó en moneda nacional',
    resumen: 'Entre enero y octubre se emitieron US$4.802 M en bonos, de los cuales US$4.403 M fueron en pesos y UI.',
    breaking: false,
    url: 'https://www.elobservador.com.uy/uruguay-afianza-la-desdolarizacion-su-deuda-el-92-la-emision-bonos-el-ano-se-coloco-moneda-nacional-n6063002',
    body: 'Entre enero y octubre de 2026 el gobierno emitió US$4.802 M en bonos: US$3.107 M en plaza local y US$1.697 M en el exterior; el 92% en moneda nacional. La emisión externa fue en julio: reapertura del Global en pesos 2035 (TIR 7,75%) y del Global en dólares 2037 (5,356%, spread de 75 pb). La deuda bruta del Gobierno Central se ubicó en 62,5% del PIB a septiembre.',
    keywords: ['Deuda', 'Desdolarización', 'Bonos', 'MEF'],
    relacionados: ['Deuda bruta', 'Mercados'],
  },
  {
    id: 'n07', t: '−11d', mins: 15840, fuente: 'Infobae', tag: 'Económico',
    titular: 'La inflación interanual en Uruguay sube al 4,87% en octubre',
    resumen: 'El IPC subió 0,59% en el mes: cuarto mes por encima del centro de la meta (4,5%), aunque dentro del rango 3%–6%.',
    breaking: false,
    url: 'https://www.infobae.com/america/agencias/2026/11/06/la-inflacion-interanual-en-uruguay-sube-al-487-en-octubre/',
    body: 'El INE informó que el IPC subió 0,59% en octubre y 4,87% en los últimos 12 meses, frente a 4,68% en septiembre. En el año acumula 4,82%. Influyeron vestimenta (+2,97% por cambio de temporada), gasoil y hortalizas. El Informe de Política Monetaria del BCU proyecta 4,9% al cierre de 2026 y 4,1% en 2027.',
    keywords: ['IPC', 'Inflación', 'INE', 'BCU'],
    relacionados: ['IPC interanual', 'IPC mensual'],
  },
  {
    id: 'n08', t: '−13d', mins: 18720, fuente: 'la diaria', tag: 'Internacional',
    titular: 'Exportaciones en octubre crecieron 1% interanual y la Unión Europea fue el principal destino',
    resumen: 'Según Uruguay XXI, octubre sumó US$1.089 M (+1%) y ene-oct US$11.430 M (+1%); la celulosa lideró con +37%.',
    breaking: false,
    url: 'https://ladiaria.com.uy/economia/articulo/2026/11/exportaciones-en-octubre-crecieron-1-interanual-y-la-union-europea-fue-el-principal-destino/',
    body: 'Las exportaciones de octubre fueron US$1.089 M (+1% i/a) y las de enero-octubre US$11.430 M (+1%). La celulosa fue el principal producto, con US$229 M (21% del total, +37%); la carne bovina exportó US$210 M (−4%) y los lácteos US$118 M (+21%). La Unión Europea fue el primer destino con US$179 M, por primera vez. China no compró soja en octubre (US$87 M un año antes).',
    keywords: ['Exportaciones', 'Uruguay XXI', 'Celulosa', 'UE'],
    relacionados: ['Exportaciones', 'Agroexportador'],
  },
  {
    id: 'n09', t: '−14d', mins: 20160, fuente: 'El Observador', tag: 'Sectorial',
    titular: 'Noviembre comenzó con nuevos récords para la ganadería',
    resumen: 'El novillo superó por primera vez los US$6/kg carcasa y el precio de exportación de octubre fue US$6.240/t (+25% i/a).',
    breaking: false,
    url: 'https://www.elobservador.com.uy/agro/noviembre-comenzo-nuevos-records-la-ganaderia-n6063017',
    body: 'El novillo gordo promedió US$6,01/kg carcasa en la semana 44 (ACG), por primera vez por encima de US$6. El precio medio de exportación de octubre fue US$6.240/t (+25% i/a, dato preliminar del INAC). La faena de la semana del 25 al 31 de octubre fue de 47.510 vacunos, pero el acumulado de 2026 está 14,3% por debajo de 2025. China compra menos; EE.UU. y la UE compensan en parte.',
    keywords: ['Carne', 'Novillo', 'INAC', 'China'],
    relacionados: ['Novillo gordo', 'Agroexportador'],
  },
  {
    id: 'n10', t: '−14d', mins: 20200, fuente: 'Prensa Latina', tag: 'Sectorial',
    titular: 'Uruguay mantiene el paso en el uso de fuentes renovables de energía',
    resumen: 'En octubre el 99,7% de la generación fue renovable, con las represas como principal fuente tras la sequía del otoño.',
    breaking: false,
    url: 'https://www.prensa-latina.cu/2026/11/03/uruguay-mantiene-el-paso-en-uso-de-fuentes-renovables-de-energia/',
    body: 'En octubre la generación eléctrica fue 99,7% renovable: hidráulica 765 GWh (58,9%), eólica 358 GWh (27,6%) y sólo 4 GWh de origen fósil. Septiembre había cerrado con 99,2% renovable y la mayor demanda de su historia para ese mes (+11% i/a, por el frío). El 28-oct se alcanzó 100% de generación renovable instantánea.',
    keywords: ['Energía', 'Renovables', 'UTE', 'Hidráulica'],
    relacionados: ['Energía'],
  },
  {
    id: 'n11', t: '−18d', mins: 25920, fuente: 'la diaria', tag: 'Sectorial',
    titular: 'El gobierno mantiene el precio de los combustibles en noviembre',
    resumen: 'La nafta Súper sigue en $90,45, el gasoil 50S en $62,79 y el supergás en $93,56/kg, pese a que la paridad de importación indicaba subas.',
    breaking: false,
    url: 'https://ladiaria.com.uy/politica/articulo/2026/10/el-gobierno-mantiene-el-precio-de-los-combustibles-en-noviembre/',
    body: 'El MIEM anunció que los precios de los combustibles de noviembre quedan iguales a los de octubre: nafta Súper 95 $90,45/L, Premium 97 $93,01/L, gasoil 50S $62,79/L y supergás $93,56/kg. El Precio de Paridad de Importación de URSEA indicaba subas. El gobierno continúa la estrategia de amortiguación aplicada desde abril por la suba del petróleo.',
    keywords: ['Combustibles', 'ANCAP', 'MIEM', 'URSEA'],
    relacionados: ['Energía', 'IPC mensual'],
  },
  {
    id: 'n12', t: '−18d', mins: 26000, fuente: 'El Telégrafo', tag: 'Económico',
    titular: 'La caída de los ingresos y la estabilidad del gasto mantuvieron el déficit fiscal en 4,7% del PBI',
    resumen: 'En los 12 meses a septiembre el Sector Público Global tuvo un déficit de 4,7% del PIB sin FSS II (4,3% con él).',
    breaking: false,
    url: 'https://www.eltelegrafo.com/2026/10/la-caida-de-los-ingresos-y-la-estabilidad-del-gasto-mantuvieron-el-deficit-fiscal-en-47-del-pbi/',
    body: 'El déficit del Sector Público Global se ubicó en 4,7% del PIB en el año móvil a septiembre, sin contar los ingresos del Fideicomiso de la Seguridad Social (4,3% con ellos). El Gobierno Central-BPS registró −4,1% sin FSS II. La caída de los ingresos y un gasto estable explican que el déficit no baje; la meta del MEF para el GC-BPS en 2026 es −4,1%.',
    keywords: ['Déficit fiscal', 'MEF', 'FSS', 'Regla fiscal'],
    relacionados: ['Result. fiscal', 'Fiscal · regla fiscal'],
  },
  {
    id: 'n13', t: '−20d', mins: 28800, fuente: 'Montevideo Portal', tag: 'Político',
    titular: 'Encuesta Factum: la aprobación de Orsi es de 26% y la desaprobación de 52%',
    resumen: 'La aprobación se mantiene y la desaprobación baja de 55% a 52%; Factum habla de estabilización tras meses de caída.',
    breaking: false,
    url: 'https://www.montevideo.com.uy/Noticias/Encuesta-Factum-aprobacion-de-Orsi-es-de-26-y-desaprobacion-de-52--uc980247',
    body: 'La medición del quinto bimestre de Factum ubicó la aprobación del presidente Yamandú Orsi en 26% y la desaprobación en 52% (desde 55%); el 22% ni aprueba ni desaprueba. En el primer bimestre la aprobación era 37% y la desaprobación 41%. Cifra, con campo entre el 30-sep y el 12-oct, dio 24% de aprobación y 57% de desaprobación.',
    keywords: ['Orsi', 'Encuestas', 'Factum', 'Aprobación'],
    relacionados: [],
  },
  {
    id: 'n14', t: '−24d', mins: 34560, fuente: 'Ámbito', tag: 'Económico',
    titular: 'La recaudación cayó un 2,9% en setiembre, arrastrada por el retroceso del IVA',
    resumen: 'La recaudación bruta de la DGI cayó 2,9% real por menor IVA (−5,2%) e IRAE (−3,0%); el acumulado del año sigue +1,2% real.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/la-recaudacion-cayo-un-29-setiembre-arrastrada-el-retroceso-del-iva-n6337381',
    body: 'La DGI recaudó $62.881 M brutos en septiembre: +1,7% nominal y −2,9% real interanual. El IVA cayó 5,2% real y el IRAE 3,0%, mientras el IRPF subió 1,7%. En enero-septiembre la recaudación suma $548.575 M, +1,2% real; en 12 meses, +0,2%. La debilidad del consumo gravado presiona sobre la meta fiscal.',
    keywords: ['DGI', 'Recaudación', 'IVA', 'Consumo'],
    relacionados: ['Result. fiscal'],
  },
  {
    id: 'n15', t: '−24d', mins: 34600, fuente: 'EFE', tag: 'Social',
    titular: 'Uruguay mantiene el desempleo en el 7,1% en septiembre y la informalidad bajó en un año',
    resumen: 'El desempleo fue 7,1% (agosto 7,2%); empleo 59,6% y actividad 64,1%. La informalidad cayó a 21%.',
    breaking: false,
    url: 'https://noticiassin.com/economia/2026/10/24/uruguay-mantiene-el-desempleo-en-el-71-en-septiembre-y-la-informalidad-bajo-en-un-ano-2152950',
    body: 'Según la ECH del INE, el desempleo fue 7,1% en septiembre, similar al de agosto (7,2%) y al de septiembre de 2025. La tasa de empleo fue 59,6% y la de actividad 64,1%. El desempleo de las mujeres fue 8,6% y el de los hombres 5,8%; entre jóvenes de 14 a 24 años, 21,6%. La informalidad bajó a 21% (−1,3 pp i/a).',
    keywords: ['Desempleo', 'ECH', 'INE', 'Informalidad'],
    relacionados: ['Desempleo'],
  },
  {
    id: 'n16', t: '−33d', mins: 47520, fuente: 'Infobae', tag: 'Sectorial',
    titular: 'Uruguay anunció una inversión de US$5.700 millones para instalar centros de datos',
    resumen: 'Solaria firmó un memorando para un parque de centros de datos de 500 MW con 350 MW solares: la mayor inversión de la historia del país, según el gobierno.',
    breaking: false,
    url: 'https://www.infobae.com/america/america-latina/2026/10/15/uruguay-anuncio-una-inversion-de-usd-5700-millones-para-instalar-centros-de-datos-cinco-claves-del-proyecto/',
    body: 'La española Solaria firmó un memorando de entendimiento con el gobierno para instalar un parque de centros de datos de 500 MW con 350 MW de generación solar, entre Canelones, San José y Florida, bajo régimen de zona franca. La inversión prevista es de US$5.700 M. La ministra de Industria, Fernanda Cardona, habló de 1.500 empleos permanentes.',
    keywords: ['Solaria', 'Data centers', 'Inversión', 'Solar'],
    relacionados: ['Energía', 'Externo & comercio'],
  },
  {
    id: 'n17', t: '−40d', mins: 57600, fuente: 'Bloomberg Línea', tag: 'Económico',
    titular: 'Uruguay sube su tasa de interés al 6% tras dos meses de inflación sobre el objetivo',
    resumen: 'El COPOM subió 25 pb por unanimidad, la primera suba desde abril de 2025, en una decisión que sorprendió al consenso.',
    breaking: false,
    url: 'https://www.bloomberglinea.com/latinoamerica/uruguay/uruguay-sube-su-tasa-de-interes-al-6-tras-dos-meses-de-inflacion-sobre-el-objetivo/',
    body: 'El Banco Central del Uruguay subió la Tasa de Política Monetaria de 5,75% a 6% el 8 de octubre, por unanimidad, cortando una pausa de cuatro reuniones. Fue una suba preventiva: la inflación llevaba dos meses sobre el centro de la meta, presionada por bienes importados, frutas, verduras y combustibles, y el BCU buscó evitar que se trasladara a las expectativas.',
    keywords: ['BCU', 'TPM', 'Suba de tasas', 'Inflación'],
    relacionados: ['TPM · BCU'],
  },
  {
    id: 'n18', t: '−40d', mins: 57700, fuente: 'Infobae', tag: 'Social',
    titular: 'La pobreza cayó casi 3 puntos en Uruguay: 95.000 personas salieron de esa condición en 2026',
    resumen: 'El INE ubicó la pobreza en 14,8% de las personas en el primer semestre, frente a 17,7% un año antes: mínimo de la serie.',
    breaking: false,
    url: 'https://www.infobae.com/america/america-latina/2026/10/08/la-pobreza-cayo-casi-3-puntos-en-uruguay-95000-personas-salieron-de-esa-condicion-durante-el-2026/',
    body: 'La pobreza alcanzó al 14,8% de las personas en el primer semestre de 2026 (17,7% un año antes) y al 11,6% de los hogares; la indigencia bajó a 1,2%. Unas 95.000 personas salieron de la pobreza. Según Presidencia, en base al INE, la pobreza en menores de 6 años bajó de 32,4% a 24,9%.',
    keywords: ['Pobreza', 'INE', 'Infancia', 'Ingresos'],
    relacionados: ['Pobreza'],
  },
  {
    id: 'n19', t: '−54d', mins: 77760, fuente: 'FMI', tag: 'Internacional',
    titular: 'FMI concluye la misión del Artículo IV 2026: crecimiento de 1,3% este año y 2,4% en 2027',
    resumen: 'El staff del FMI recortó su proyección de crecimiento 2026 (desde 1,8%) y prevé un déficit del GC-BPS de 4,1% del PIB.',
    breaking: false,
    url: 'https://www.imf.org/es/news/articles/2026/09/24/cs-092426-uruguay-staff-concluding-statement-2026-aiv-mission',
    body: 'La misión del FMI, encabezada por Raphael Espinoza (14 al 24 de septiembre), proyectó un crecimiento de 1,3% en 2026 —desde 1,8% en abril— y 2,4% en 2027, con inflación de 4,5%. Estimó un déficit del Gobierno Central-BPS de 4,1% del PIB en 2026 sin ingresos extraordinarios de pensiones, similar a 2025.',
    keywords: ['FMI', 'Artículo IV', 'PIB', 'Fiscal'],
    relacionados: ['PIB · actividad', 'Result. fiscal'],
  },
  {
    id: 'n20', t: '−56d', mins: 80640, fuente: 'la diaria', tag: 'Político',
    titular: 'La Cámara de Senadores dio sanción definitiva a la Rendición de Cuentas con los votos del FA',
    resumen: 'El Senado aprobó sin cambios la primera Rendición de Cuentas de Orsi, sin impacto fiscal y con reasignaciones hacia infancia y seguridad.',
    breaking: false,
    url: 'https://ladiaria.com.uy/politica/articulo/2026/9/la-camara-de-senadores-dio-sancion-definitiva-a-la-rendicion-de-cuentas-con-los-votos-del-fa/',
    body: 'El Senado dio sanción definitiva el 22 de septiembre a la Rendición de Cuentas, sin modificaciones respecto a lo votado por Diputados (50 a 49 en agosto) y sólo con votos del Frente Amplio. El proyecto, de 312 artículos, no tiene impacto fiscal: reasigna recursos hacia infancia, educación, seguridad y situación de calle desde el 1-ene-2027. El MEF proyecta un déficit GC-BPS de 4,1% en 2026 que baja a 2,5% en 2030.',
    keywords: ['Rendición de Cuentas', 'Senado', 'Frente Amplio', 'Fiscal'],
    relacionados: ['Result. fiscal', 'Fiscal · regla fiscal'],
  },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO E — Agenda (hitos reales, ventana 17-nov → 17-dic 2026).
// d = días desde el corte (17-nov). «estim.» = fecha estimada por calendario
// habitual de la fuente.
// ─────────────────────────────────────────────────────────────────────
export const EVENTOS: Evento[] = [
  { d: 7, tag: 'BCU', title: 'Minuta del COPOM (decisión del 16-nov)', tone: 'info' },
  { d: 10, tag: 'MIEM', title: 'Precios de combustibles de diciembre (estim.)', tone: 'neutral' },
  { d: 13, tag: 'INE', title: 'Mercado laboral ECH · octubre y salario real', tone: 'info' },
  { d: 13, tag: 'BCU', title: 'IMAE · actividad de septiembre (estim.)', tone: 'info' },
  { d: 13, tag: 'MEF', title: 'Resultado fiscal a octubre (estim.)', tone: 'accent' },
  { d: 16, tag: 'INE', title: 'IPC noviembre · inflación', tone: 'accent' },
  { d: 17, tag: 'Mercosur', title: 'Cumbre en Montevideo y 1er Consejo del acuerdo con la UE', tone: 'accent' },
  { d: 17, tag: 'Uruguay XXI', title: 'Exportaciones de noviembre (estim.)', tone: 'info' },
  { d: 22, tag: 'Fed', title: 'Decisión del FOMC (EE.UU.)', tone: 'neutral' },
  { d: 27, tag: 'BCU', title: 'Encuesta de expectativas · diciembre (estim.)', tone: 'info' },
  { d: 28, tag: 'BCU', title: 'PIB 3T 2026 · Cuentas Nacionales', tone: 'accent' },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO F — Fuentes (última publicación relevante al 17-nov-2026)
// ─────────────────────────────────────────────────────────────────────
export const FUENTES: Fuente[] = [
  { id: 'ine', name: 'INE · IPC/empleo/pobreza', latency: 180, status: 'ok', last: '5 nov' },
  { id: 'bcu', name: 'BCU · TPM/PIB/TC/reservas', latency: 150, status: 'live', last: '16 nov' },
  { id: 'mef', name: 'MEF · fiscal/deuda', latency: 320, status: 'ok', last: '30 oct' },
  { id: 'inac', name: 'INAC · carne/faena', latency: 90, status: 'live', last: '14 nov' },
  { id: 'uruguayxxi', name: 'Uruguay XXI · comercio', latency: 240, status: 'ok', last: '4 nov' },
  { id: 'dgi', name: 'DGI · recaudación', latency: 300, status: 'ok', last: '24 oct' },
  { id: 'adme', name: 'ADME/UTE · energía', latency: 60, status: 'ok', last: '3 nov' },
  { id: 'jpm', name: 'JP Morgan · EMBI', latency: 380, status: 'ok', last: '2 nov' },
  { id: 'rating', name: 'Calificadoras', latency: 410, status: 'ok', last: '11 nov' },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO Z — Análisis. Juicio analítico del tablero (no es dato de fuente):
// se apoya en las cifras de arriba y explicita sus anclas. Probabilidades de
// escenarios = evaluación subjetiva del tablero al corte.
// ─────────────────────────────────────────────────────────────────────
export const ANALISIS: AnalisisData = {
  asof: SNAPSHOT.fecha,
  tesis: {
    titulo: 'La economía se frenó, la inflación subió y el fiscal no tiene margen',
    bajada:
      'Shock agrícola por la sequía (PIB 2T −0,5%), inflación sobre el centro de la meta (4,87%) y déficit de 4,7% del PIB; el ancla es institucional: grado inversor ratificado y expectativas cerca de 4,5%.',
    puntos: [
      'El freno es agrícola y transitorio: sin el agro, la economía crece ~1,3%.',
      'El BCU subió a 6% y las expectativas siguen ancladas en ~4,6%.',
      'El déficit no baja porque caen los ingresos, no por más gasto.',
      'La carne en récord y la UE compensan el repliegue de China.',
      'Empleo firme y pobreza en mínimo; el salario real se desacelera.',
      'Grado inversor ratificado: el riesgo es fiscal, no de liquidez.',
    ],
  },
  semaforo: [
    { id: 'precios', dimension: 'Precios', estado: 'neutral', score: 3, tendencia: 'empeora', ancla: 'IPC 4,87% i/a (oct)', lectura: 'Dentro del rango 3–6% pero cuatro meses sobre el centro; presión de combustibles, frescos y vestimenta. El IPOM ve un pico transitorio hasta el 1T-27.' },
    { id: 'monetaria', dimension: 'Credibilidad monetaria', estado: 'pos', score: 4, tendencia: 'estable', ancla: 'TPM 6,00% · exp. 24m 4,57%', lectura: 'La suba preventiva de octubre reforzó el ancla: expectativas de analistas y mercado cerca de 4,5%; las de empresas (~5%) son la señal a vigilar.' },
    { id: 'actividad', dimension: 'Actividad', estado: 'neg', score: 2, tendencia: 'empeora', ancla: 'PIB 2T −0,5% i/a · IMAE ago −1,1% m/m', lectura: 'Contracción concentrada en el agro (−22%); el resto de la economía crece poco. Riesgo de que el 3T también sea débil.' },
    { id: 'empleo', dimension: 'Empleo e ingresos', estado: 'pos', score: 4, tendencia: 'estable', ancla: 'Desempleo 7,1% · pobreza 14,8%', lectura: 'Desempleo estable e informalidad a la baja; pobreza en mínimo de la serie. El salario real se desacelera y es el eslabón más expuesto a la inflación.' },
    { id: 'fiscal', dimension: 'Fiscal', estado: 'neg', score: 2, tendencia: 'empeora', ancla: 'SPG −4,7% PIB · DGI −2,9% real', lectura: 'El déficit volvió a 4,7% por caída de ingresos. Con bajo crecimiento, la consolidación prevista (GC-BPS −2,5% en 2030) luce exigente.' },
    { id: 'externo', dimension: 'Sector externo', estado: 'neutral', score: 3, tendencia: 'estable', ancla: 'Export. +1% ene-oct · CC −0,8% PIB', lectura: 'Sin desequilibrio externo: la cuenta corriente es chica y el precio compensa el volumen. El atraso cambiario sigue restando competitividad.' },
    { id: 'credito', dimension: 'Crédito soberano', estado: 'pos', score: 5, tendencia: 'estable', ancla: 'BBB+ / Baa1 ratificados (nov)', lectura: 'Grado inversor con 4 agencias, emisiones con sobredemanda y 92% de los bonos del año en pesos: el principal activo del país.' },
    { id: 'agro', dimension: 'Agro', estado: 'neutral', score: 3, tendencia: 'mejora', ancla: 'Novillo US$6,01 · soja −37%', lectura: 'Precios récord en carne y repunte de lácteos/celulosa frente a volúmenes golpeados. La zafra de invierno y la soja 26/27 (~3,1 Mt) apuntan a recuperación.' },
  ],
  proyecciones: [
    { fuente: 'MEF · Rendición de Cuentas', fecha: 'jun 2026', pib2026: 1.6, pib2027: 2.1, ipc2026: null, ipc2027: null, tc2026: null, fiscal2026: -4.7 },
    { fuente: 'BCU · IPOM 3T', fecha: 'oct 2026', pib2026: 1.0, pib2027: 2.5, ipc2026: 4.9, ipc2027: 4.1, tc2026: null, fiscal2026: null },
    { fuente: 'BCU · encuesta de analistas', fecha: 'nov 2026', pib2026: 1.0, pib2027: 1.7, ipc2026: 5.1, ipc2027: null, tc2026: 40.5, fiscal2026: null },
    { fuente: 'FMI · Artículo IV', fecha: 'sep 2026', pib2026: 1.3, pib2027: 2.4, ipc2026: 4.5, ipc2027: null, tc2026: null, fiscal2026: -4.1 },
    { fuente: "Moody's", fecha: 'nov 2026', pib2026: 1.6, pib2027: 1.9, ipc2026: null, ipc2027: null, tc2026: null, fiscal2026: null },
    { fuente: 'S&P Global', fecha: 'nov 2026', pib2026: null, pib2027: null, ipc2026: null, ipc2027: null, tc2026: null, fiscal2026: -3.7 },
    { fuente: 'CEPAL · Estudio Económico', fecha: 'ago 2026', pib2026: 1.5, pib2027: null, ipc2026: null, ipc2027: null, tc2026: null, fiscal2026: null },
    { fuente: 'BBVA Research', fecha: '2026', pib2026: 1.3, pib2027: 1.8, ipc2026: null, ipc2027: null, tc2026: null, fiscal2026: null },
  ],
  escenarios: [
    {
      id: 'base', nombre: 'Recuperación gradual', probabilidad: 55, pib2027: 1.9, ipc2027: 4.4,
      narrativa: 'Cosecha normal y consumo sostienen la recuperación; la inflación vuelve a la meta a mediados de 2027.',
      gatillos: ['PIB 3T (15-dic) sin nueva caída t/t', 'IPC i/a cede hacia 4,5% en el 1T-27', 'Recaudación vuelve a terreno real positivo'],
    },
    {
      id: 'optimista', nombre: 'Rebote con apertura', probabilidad: 20, pib2027: 2.6, ipc2027: 4.0,
      narrativa: 'Zafra récord, pleno aprovechamiento del acuerdo con la UE e inversiones grandes cierran el déficit sin ajuste.',
      gatillos: ['Reparto de las cuotas UE dentro del Mercosur', 'Novillo y celulosa sostienen máximos', 'Ejecución del proyecto Solaria/HIF'],
    },
    {
      id: 'riesgo', nombre: 'Estanflación leve', probabilidad: 25, pib2027: 0.8, ipc2027: 5.4,
      narrativa: 'Petróleo y dólar fuertes dejan la inflación en 5–5,5%, el BCU sube más y el déficit no baja.',
      gatillos: ['IPC i/a supera 5,5%', 'Expectativas empresariales > 5,5%', 'Déficit SPG > 5% del PIB'],
    },
  ],
  riesgos: [
    { titulo: 'Desvío de la meta fiscal', detalle: 'Con PIB ~1% y IVA en caída, el resultado estructural 2026 podría desviarse ~0,5% del PIB de la meta (−4,0%), como advirtió el CFA. Es el principal riesgo para el rating.', tipo: 'riesgo', impacto: 'alto', horizonte: '2026-27' },
    { titulo: 'Inflación importada (petróleo, dólar global)', detalle: 'Los combustibles se congelaron en noviembre pese a que la paridad indicaba subas: hay un ajuste pendiente que puede trasladarse al IPC y a expectativas.', tipo: 'riesgo', impacto: 'medio', horizonte: '3-6 meses' },
    { titulo: 'Repliegue de China', detalle: 'China no compró soja en octubre y usa ~31% de su cuota cárnica; una menor demanda china presiona precios y obliga a redirigir volúmenes.', tipo: 'riesgo', impacto: 'medio', horizonte: '2027' },
    { titulo: 'Volatilidad regional', detalle: 'El BCU señaló suba del riesgo soberano y volatilidad cambiaria en la región; un abaratamiento de Argentina golpearía turismo y comercio de frontera en la temporada.', tipo: 'riesgo', impacto: 'medio', horizonte: 'temporada 26-27' },
    { titulo: 'Atraso cambiario persistente', detalle: 'Dólar estable (~$40,6) con inflación local sobre la de EE.UU.: la desalineación del TCR (−9,9% a 2025) sigue erosionando a exportadores no-commodity.', tipo: 'riesgo', impacto: 'bajo', horizonte: 'estructural' },
    { titulo: 'Recuperación de la cosecha', detalle: 'Soja 2026/27 con ~1,3 M ha y 3,1 Mt proyectadas (USDA) más la zafra de invierno: el agro pasaría de restar a sumar al PIB en 2027.', tipo: 'oportunidad', impacto: 'alto', horizonte: '2027' },
    { titulo: 'Acuerdo Mercosur-UE', detalle: 'Rige en forma provisional desde el 1-may-2026 y la UE ya es el primer destino mensual; falta repartir las cuotas (carne, arroz, lácteos) dentro del Mercosur. El primer Consejo del Acuerdo se reúne en la cumbre de Montevideo (4-dic).', tipo: 'oportunidad', impacto: 'alto', horizonte: '2027' },
    { titulo: 'Ola de inversión verde y digital', detalle: 'Solaria (US$5.700 M, 500 MW de data centers) y HIF (US$5.385 M) sostendrían inversión y empleo, apoyados en una matriz ~99% renovable.', tipo: 'oportunidad', impacto: 'medio', horizonte: '2027-29' },
    { titulo: 'Desdolarización de la deuda', detalle: 'El 92% de los bonos de 2026 se colocó en moneda nacional: menor riesgo cambiario del stock y mayor potencia de la política monetaria.', tipo: 'oportunidad', impacto: 'medio', horizonte: 'estructural' },
  ],
  lecturas: {
    agro: 'Precio récord, volumen en caída: el golpe es climático, no de demanda, y con una cosecha normal el agro vuelve a sumar en 2027.',
    mercados: 'El crédito es el ancla del país: ratings ratificados, emisiones con sobredemanda y 92% de la deuda nueva en pesos.',
    actividad: 'El agro restó 1,7 pp al PIB; el resto de la economía crece ~1,3%, por debajo de su potencial (1,9%).',
    energia: 'Aun con sequía la matriz fue ~99% renovable; el costo se vio en junio, con importación y precio spot récord.',
    externo: 'Sin restricción externa (cuenta corriente −0,8% del PIB); el cambio es de destinos: la UE gana y China se repliega.',
    fiscal: 'El déficit se atascó en 4,7% por ingresos débiles; la suba de tasa fue preventiva y las expectativas siguen ancladas.',
  },
  kpiLecturas: {
    ipc_interanual: 'Pico transitorio esperado: el IPOM proyecta 4,9% al cierre de 2026 y 4,1% en 2027. Lo que importa es que no contamine expectativas.',
    pib: 'Shock agrícola (sequía). Sin el agro, el PIB habría crecido; la recuperación depende de la cosecha 2026/27.',
    tpm: 'Tasa real ex-ante ~1,4 pp: postura moderadamente contractiva. El mercado no descuenta nuevas subas inmediatas.',
    ipc_mensual: 'Dos meses seguidos sobre 0,5% m/m; el congelamiento de combustibles en noviembre contiene el dato de corto plazo.',
    expectativas_inflacion: 'El ancla aguanta: 24m en 4,57% pese al IPC en 4,87%. Las expectativas de empresas (~5%) son el eslabón débil.',
    tipo_cambio: 'Estabilidad notable sin intervención: el peso se sostiene por flujos de inversión y deuda en pesos.',
    reservas: 'Cobertura holgada; la variación mensual responde a movimientos del Tesoro y encajes más que a presión cambiaria.',
    desempleo: 'Mercado laboral resistente al shock agrícola; la informalidad en baja es una mejora de calidad del empleo.',
    salario_real: 'La desaceleración es mecánica: salarios nominales ~6% contra inflación que sube; riesgo para el consumo de 2027.',
    pobreza: 'Mínimo histórico apoyado en el empleo y las transferencias; la Rendición focaliza recursos en primera infancia.',
    novillo: 'Precio de escasez: falta ganado (faena −14%). Bueno para el productor, presión de costos para la industria frigorífica.',
    exportaciones: 'Valor plano, volumen en caída: el precio hace el trabajo. Cambio de mix hacia celulosa y destinos UE/EE.UU.',
    resultado_fiscal: 'Atascado en 4,7% por ingresos débiles. Con PIB de 1% la meta estructural de −4,0% está en riesgo.',
    deuda: 'Nivel alto pero de mejor calidad: más en pesos y a mayor plazo. El ancla de deuda neta (65%) es el límite a vigilar.',
    embi: 'Subió 26 pb desde junio con el riesgo regional, pero Uruguay sigue siendo el menor spread de la región.',
  },
};
