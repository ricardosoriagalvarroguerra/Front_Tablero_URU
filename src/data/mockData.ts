// Datos del "Tablero Inteligente URU" — snapshot REAL de Uruguay al 29-jun-2026.
// Revisado contra fuentes OFICIALES/primarias (INE, BCU, MEF/Unidad de Gestión de
// Deuda, INAC/ACG/Blasina, Uruguay XXI, DGI, MIEM/ADME/ANCAP, República AFAP) y
// medios reputados que las citan (El País, El Observador, Búsqueda, Ámbito Uruguay,
// Infobae, Montevideo Portal). Cifras titulares con verificación cruzada. Lo no
// corroborable se marca s/d. Ver docs/SOURCES.md.
//
// Coyuntura: Yamandú Orsi (Frente Amplio) en su 2º año (asumió 1-mar-2025);
// ministro de Economía Gabriel Oddone. Inflación dentro del rango meta del BCU
// (IPC may 0,70% m/m, 3,77% i/a), TPM en 5,75% (COPOM mantuvo; próxima reunión
// 8-jul; el mercado descuenta +25 pb a 6% recién en octubre). Grado inversor por las
// 4 calificadoras (S&P BBB+, Moody's Baa1, Fitch BBB, DBRS BBB; +R&I BBB+) y UBI
// ~53 pb, el riesgo país más bajo de la región. El dólar ~$40,2 (cierre 26-jun);
// reservas US$18.474 M (25-jun). Tensión fiscal: déficit del SPG ~4,7% del PIB y la
// recaudación DGI cayó a −0,8% real en mayo; la primera Rendición de Cuentas de Orsi
// se presenta el 30-jun (sin impacto fiscal, US$31 M en 4 prioridades). Uruguay asume
// la presidencia pro tempore del Mercosur el 1-jul. Motor: el complejo agroexportador
// (novillo ~US$5,57/kg, faena recuperándose; celulosa, soja, lácteos). Reemplazar por
// ingesta en vivo (// TODO).

import type {
  Kpi, AgroData, MercadosData, ActividadData, EnergiaData, ExternoData, FiscalData,
  Noticia, Evento, Fuente,
} from '../types';

const pct1 = (v: number) => v.toFixed(1).replace('.', ',');
const pct2 = (v: number) => v.toFixed(2).replace('.', ',');
const miles = (v: number) => v.toLocaleString('es-UY');
const tc = (v: number) => '$' + v.toFixed(2).replace('.', ',');

// ─────────────────────────────────────────────────────────────────────
// MÓDULO A — Indicadores macro (13 KPIs; series con anclas reales)
// ─────────────────────────────────────────────────────────────────────
export const KPIS: Kpi[] = [
  {
    id: 'ipc_interanual',
    label: 'IPC INTERANUAL',
    value: 3.77,
    unit: '%',
    fmt: pct2,
    delta: 0.61,
    deltaLabel: '+0,6 pp',
    sentiment: 'pos',
    // INE, var. últimos 12 meses; anclas reales: abr 3,16 · may 3,77 (resto aprox.)
    spark: [4.7, 4.5, 4.4, 4.2, 3.9, 3.4, 3.16, 3.77],
    source: 'INE · IPC mayo 2026',
    asof: 'may 2026',
    def: 'Variación del IPC en los últimos 12 meses (INE). Mayo 2026: 3,77%, dentro del rango meta del BCU (3%–6%) y por debajo del centro (4,5%). Montevideo 3,95%, Interior 3,6%. Acumulado del año 2,95%.',
    extra: { label: 'RANGO META', value: '3–6%', tone: 'pos' },
  },
  {
    id: 'ubi',
    label: 'RIESGO PAÍS (UBI)',
    value: 53,
    unit: 'pb',
    fmt: miles,
    delta: 3,
    deltaLabel: '+3 pb',
    sentiment: 'pos',
    // República AFAP; anclas: 50 (récord 10-abr) · 58 (8-may) · 53 (18-may)
    spark: [62, 58, 50, 55, 53],
    source: 'República AFAP · UBI',
    asof: '18 may',
    def: 'Uruguay Bond Index (República AFAP): spread soberano sobre los bonos del Tesoro de EE.UU. 53 pb al 18-may-2026, cerca del mínimo histórico de 50 pb (10-abr). El riesgo país más bajo de América Latina (Argentina ~538 pb). EMBI de JP Morgan ~56 pb; IRU de BEVSA ~64 pb.',
    extra: { label: 'REGIÓN', value: 'el más bajo', tone: 'pos' },
  },
  {
    id: 'pib',
    label: 'PIB · ACTIVIDAD',
    value: 0.9,
    unit: '% i/a',
    fmt: pct1,
    delta: 0.8,
    deltaLabel: '+0,8 pp i/a',
    sentiment: 'pos',
    // BCU, PIB i/a trimestral: 1T25 3,6 · 2T 2,3 · 3T 1,2 · 4T 0,1 · 1T26 0,9
    spark: [3.6, 2.3, 1.2, 0.1, 0.9],
    source: 'BCU · Cuentas Nacionales',
    asof: '1T 2026',
    def: 'PIB, variación interanual del 1T 2026 (+0,9%; +0,8% desestacionalizado vs 4T 2025). Leve reaceleración tras cerrar 2025 con +1,8% anual. Impulsaron servicios financieros (+3,1%), transporte/TIC (+2,2%) y comercio (+1,4%); restaron agro (−3,7%) y construcción (−3,4%).',
    extra: { label: '2025', value: '+1,8%', tone: 'neutral' },
  },
  {
    id: 'ipc_mensual',
    label: 'IPC MENSUAL',
    value: 0.7,
    unit: '%',
    fmt: pct2,
    delta: 0,
    deltaLabel: '0,70% m/m',
    sentiment: 'neutral',
    spark: [0.5, 0.6, 0.4, 0.8, 0.5, 0.7],
    source: 'INE · IPC',
    asof: 'may 2026',
    def: 'Variación mensual del IPC (INE). Mayo 2026: 0,70%. Mayores incidencias: Transporte (combustibles: gasoil +14%, nafta +7%), Alimentos y Vivienda (tributos domiciliarios, supergás). La inflación subyacente/núcleo que vigila el BCU se aceleró a ~3,5% i/a.',
  },
  {
    id: 'tpm',
    label: 'TPM · BCU',
    value: 5.75,
    unit: '%',
    fmt: pct2,
    delta: 0,
    deltaLabel: 'sin cambios',
    sentiment: 'neutral',
    // 7 recortes desde jul-2025 (6,5 → 5,75 en mar-2026), luego mantenida
    spark: [6.5, 6.25, 6.0, 5.75, 5.75, 5.75],
    source: 'BCU · COPOM',
    asof: '26 may',
    def: 'Tasa de Política Monetaria. El COPOM la mantuvo en 5,75% el 26-may-2026 (2ª vez consecutiva), buscando converger la inflación a la meta de 4,5%, tras siete recortes desde jul-2025. Próxima reunión: 8-jul. El mercado descuenta una suba de +25 pb (a 6,0%) recién hacia octubre, por la presión del petróleo.',
  },
  {
    id: 'expectativas_inflacion',
    label: 'EXPECT. INFL. 24M',
    value: 4.5,
    unit: '%',
    fmt: pct1,
    delta: 0,
    deltaLabel: 'ancladas',
    sentiment: 'pos',
    spark: [4.8, 4.7, 4.6, 4.5, 4.5],
    source: 'BCU · encuesta',
    asof: 'jun 2026',
    def: 'Expectativas de inflación a 24 meses de la encuesta del BCU (mediana de analistas y mercado): 4,5%, en el centro del rango meta. A 12 meses 4,90% (encuesta de mayo). Empresarios ~5%.',
  },
  {
    id: 'tipo_cambio',
    label: 'DÓLAR (UYU/USD)',
    value: 40.22,
    fmt: tc,
    delta: 0.1,
    deltaLabel: '+0,1%',
    sentiment: 'neutral',
    // BCU interbancario; serie reciente real (16-jun 40,17 · 25-jun 39,39 · 26-jun 40,22)
    spark: [39.48, 39.95, 40.67, 40.17, 39.39, 40.22],
    source: 'BCU · interbancario',
    asof: '26 jun',
    def: 'Tipo de cambio interbancario peso/dólar (BCU). Cerró en ~$40,22 el 26-jun-2026 (rebote de +2,1% en el día desde $39,39), estable frente a los ~$40,17 del 16-jun. El peso flota libremente y es de libre convertibilidad: no hay cepo ni brecha cambiaria. Los analistas del BCU proyectan ~$41,6 para fin de 2026.',
  },
  {
    id: 'desempleo',
    label: 'DESEMPLEO',
    value: 7.5,
    unit: '%',
    fmt: pct1,
    delta: -0.3,
    deltaLabel: '−0,3 pp',
    sentiment: 'pos',
    spark: [7.9, 7.4, 7.8, 7.5],
    source: 'INE · ECH',
    asof: 'abr 2026',
    def: 'Tasa de desempleo (INE, Encuesta Continua de Hogares). Abril 2026: 7,5%, baja desde 7,8% de marzo. Empleo 59,5%; actividad 64,2%. Desempleo juvenil (14-24) 23,3%.',
  },
  {
    id: 'salario_real',
    label: 'SALARIO REAL',
    value: 2.33,
    unit: '% i/a',
    fmt: pct2,
    delta: 2.33,
    deltaLabel: '+2,3% i/a',
    sentiment: 'pos',
    spark: [0.8, 1.2, 1.5, 1.8, 2.33],
    source: 'INE · IMS',
    asof: '1T 2026',
    def: 'Salario real (Índice Medio de Salarios deflactado por IPC), variación interanual. 1T 2026: +2,33%, el mayor poder de compra en 50 años (lo destacaron Orsi y el MEF). El IMS nominal de abril fue +5,12% i/a.',
  },
  {
    id: 'novillo',
    label: 'NOVILLO GORDO',
    value: 5.57,
    unit: 'USD/kg',
    fmt: pct2,
    delta: -2.5,
    deltaLabel: '−2,5% m/m',
    sentiment: 'neutral',
    spark: [4.7, 5.0, 5.3, 5.6, 5.71, 5.57],
    source: 'ACG · Blasina',
    asof: 'sem 25 jun',
    def: 'Precio del novillo gordo (USD/kg carcasa), referencia del complejo cárnico. ~US$5,57/kg en la semana 25 (16–22 jun, ACG), que cedió levemente desde los US$5,71 de mayo pero sigue cerca de récords. El índice "Novillo Tipo" por cabeza (Blasina) marca +23% i/a. La faena se recuperó (~45 mil cab/semana, +5% i/a) tras el piso de abril, aunque el acumulado 2026 cae −17% i/a.',
    extra: { label: 'NIVEL', value: 'cerca récord', tone: 'pos' },
  },
  {
    id: 'resultado_fiscal',
    label: 'RESULT. FISCAL',
    value: -4.7,
    unit: '% PIB',
    fmt: pct1,
    delta: -0.3,
    deltaLabel: '−0,3 pp',
    sentiment: 'neg',
    spark: [-3.6, -4.1, -4.4, -4.7, -4.7],
    source: 'MEF',
    asof: '12m mar 2026',
    def: 'Resultado del Sector Público Global (déficit), año móvil 12 meses a marzo 2026: −4,7% del PIB, estable vs febrero y vs el cierre 2025 (~−4,4%). En línea con la meta del Presupuesto, pero señalado como principal riesgo para el rating soberano. A abril el MEF reportó el Gobierno Central-BPS en −4,6% del PIB.',
    extra: { label: 'GC-BPS', value: '−3,7%', tone: 'neg' },
  },
  {
    id: 'deuda',
    label: 'DEUDA BRUTA',
    value: 74.9,
    unit: '% PIB',
    fmt: pct1,
    delta: 8.6,
    deltaLabel: '+8,6 pp',
    sentiment: 'neg',
    spark: [64.0, 66.3, 70.0, 74.9],
    source: 'MEF · UGD',
    asof: 'cierre 2025',
    def: 'Deuda bruta del Sector Público Global: 74,9% del PIB (US$64.129 M) al cierre de 2025, +8,6 pp vs 2024. El salto se explica por el déficit fiscal y la apreciación del peso (encarece la deuda en moneda nacional). Deuda neta 54,6% del PIB; 59% de la bruta en moneda nacional.',
    extra: { label: 'NETA', value: '54,6%', tone: 'neutral' },
  },
  {
    id: 'reservas',
    label: 'RESERVAS BCU',
    value: 18474,
    unit: 'M USD',
    fmt: miles,
    delta: 231,
    deltaLabel: '+231 M',
    sentiment: 'neutral',
    spark: [19948, 18581, 18463, 18243, 18474],
    source: 'BCU',
    asof: '25 jun',
    def: 'Activos de reserva del BCU: US$18.474 M al 25-jun-2026 (pico reciente US$19.948 M en feb). El cierre de mayo fue US$18.243 M y el de abril US$18.463 M. Las reservas equivalen a ~24% del PIB; reservas netas ~US$10.300 M.',
    extra: { label: '% PIB', value: '~24%', tone: 'neutral' },
  },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO AGRO — complejo agroexportador (módulo estrella, 29-jun-2026)
// ─────────────────────────────────────────────────────────────────────
export const AGRO: AgroData = {
  productos: [
    {
      id: 'carne', nombre: 'Carne bovina', precio: 5.57, precioUnidad: 'USD/kg', varPrecio: -2.5,
      exportUsd: 1054, participacion: 20, destinoTop: 'China / EE.UU.',
      spark: [4.7, 5.0, 5.3, 5.6, 5.71, 5.57], polaridad: 'up', asof: 'ene-may', fuente: 'Uruguay XXI · INAC',
      nota: 'Novillo ~US$5,57/kg (sem 25 jun), cerca de récords; faena recuperándose (~45 mil cab/sem) tras el piso de abril. 1er producto de exportación; mayo −14% i/a por menor volumen.',
    },
    {
      id: 'celulosa', nombre: 'Celulosa', precio: 668, precioUnidad: 'USD/ton', varPrecio: -7,
      exportUsd: 931, participacion: 17, destinoTop: 'China / UE',
      spark: [205, 198, 191, 191], polaridad: 'up', asof: 'ene-may', fuente: 'Uruguay XXI · ref. BHK China',
      nota: 'UPM (Fray Bentos + UPM2) y Montes del Plata. 2º producto; mayo −7% i/a. UPM pidió ampliar Fray Bentos de 1,3 a 1,5 M t/año. Precio: referencia BHK reventa China (~US$668/t, Fastmarkets).',
    },
    {
      id: 'soja', nombre: 'Soja', precio: 11.10, precioUnidad: 'USD/bushel', varPrecio: 45,
      exportUsd: 180, participacion: null, destinoTop: 'China (~70%)',
      spark: [120, 140, 160, 180], polaridad: 'up', asof: 'may 2026', fuente: 'Uruguay XXI · CBOT',
      nota: 'Exportación de mayo +45% i/a (US$180 M). Precio CBOT ~US$11,1/bushel (mínimo desde feb). Cosecha 2025/26 ~1,95 M t, la mitad de la zafra récord previa.',
    },
    {
      id: 'lacteos', nombre: 'Lácteos', precio: 3706, precioUnidad: 'USD/ton', varPrecio: 29,
      exportUsd: 346, participacion: 6, destinoTop: 'Brasil / Argelia',
      spark: [70, 78, 85, 85], polaridad: 'up', asof: 'ene-may', fuente: 'Uruguay XXI · GDT',
      nota: '3er producto. Mayo +29% i/a. Conaprole. Precio: leche en polvo entera GDT Event 405 (2-jun) US$3.706/t (−2,2%).',
    },
    {
      id: 'trigo', nombre: 'Trigo', precio: 5.73, precioUnidad: 'USD/bushel', varPrecio: 9,
      exportUsd: 155, participacion: 5, destinoTop: 'Brasil',
      spark: [120, 135, 145, 155], polaridad: 'up', asof: '1T 2026', fuente: 'Uruguay XXI · CBOT',
      nota: 'Exportación acumulada 1T +9% i/a. Precio CBOT ~US$5,73/bushel (mínimo desde abr).',
    },
    {
      id: 'madera', nombre: 'Madera', precio: null, precioUnidad: 'USD/ton', varPrecio: 17,
      exportUsd: 129, participacion: 4, destinoTop: 'China',
      spark: [95, 110, 120, 129], polaridad: 'up', asof: '1T 2026', fuente: 'Uruguay XXI',
      nota: 'Acumulado 1T +17% i/a.',
    },
    {
      id: 'arroz', nombre: 'Arroz', precio: null, precioUnidad: 'USD/ton', varPrecio: -19,
      exportUsd: 91, participacion: 3, destinoTop: 'Brasil / Perú',
      spark: [115, 105, 98, 91], polaridad: 'up', asof: '1T 2026', fuente: 'Uruguay XXI',
      nota: 'Acumulado 1T −19% i/a por menor zafra.',
    },
  ],
  exportTotalAgro: 10300,
  participacionAgro: 76,
  novilloPrecio: 5.57,
  novilloVar: null,
  faena: 45,
  faenaPeriodo: 'sem 25 (16-22 jun): ~45 mil cab, +5% i/a; acum. 2026 −17% i/a',
  destinos: [
    { pais: 'China', valor: 31 },
    { pais: 'EE.UU.', valor: 28 },
    { pais: 'Unión Europea', valor: 25 },
    { pais: 'Otros', valor: 16 },
  ],
  asof: 'ene-may 2026',
  fuente: 'Uruguay XXI · INAC',
  resumen:
    'El complejo agroexportador es el motor de divisas de Uruguay. En ene-may 2026 las exportaciones de bienes sumaron US$5.271 M (+3% i/a); en mayo US$1.142 M (−3%). La carne bovina lidera el acumulado (US$1.054 M); el novillo cedió levemente a ~US$5,57/kg (sem 25 jun) pero sigue cerca de récords, con la faena recuperándose (~45 mil cab/sem) tras el piso de abril (acum. 2026 −17% i/a). La celulosa es 2ª (US$931 M); la soja fue lo más dinámico (+45% i/a en mayo, ~70% a China). China es el principal destino (~27% del total en mayo), seguido de la UE y Brasil.',
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO MERCADOS — grado inversor (UBI, bonos, SSLB, ratings)
// ─────────────────────────────────────────────────────────────────────
export const MERCADOS: MercadosData = {
  ubi: { value: 53, chg: 3, series: [62, 58, 50, 55, 53] },
  bonos: [
    { id: 'usd2037', name: 'Global USD 2037', moneda: 'USD', price: null, yield: 4.73, tipo: 'global', chg: null, vencimiento: '2037' },
    { id: 'uyu2035', name: 'Global UYU 2035', moneda: 'UYU', price: null, yield: 8.0, tipo: 'global', chg: null, vencimiento: '2035' },
    { id: 'sslb2034', name: 'SSLB 2034', moneda: 'USD', price: null, yield: 5.75, tipo: 'sslb', chg: null, vencimiento: '2034' },
    { id: 'ui2034', name: 'Nota UI 2034', moneda: 'UI', price: null, yield: 2.55, tipo: 'local', chg: null, vencimiento: '2034' },
  ],
  gradoInversor: {
    agencias: 4,
    nota:
      'Grado inversor por las 4 calificadoras con perspectiva estable: S&P BBB+ (nov-2025), Moody\'s Baa1 (ratif. ene-2026), Fitch BBB (sep-2025), DBRS BBB (nov-2025). En ene-2026 la japonesa R&I asignó además BBB+ estable. Calificadoras no solicitadas (JCR, HR Ratings) lo ubican un escalón más alto (A−). Es el nivel crediticio más alto de la historia del país. Única operación de deuda de 2026: reapertura de la Nota Global UI 2034 (feb, corte 2,74%).',
  },
  sslb: {
    nota:
      'Bono Indexado a Indicadores de Sostenibilidad: el primer bono soberano del mundo con cupón atado a metas ambientales (2022). ~US$2.200 M, vto. 2034. 4º Reporte Anual (jun-2026, datos 2024): KPI-1 a −48% (a 2 pp de la meta −50% a 2025 → riesgo de step-up); KPI-2 (bosque nativo) en cumplimiento.',
    cupon: '5,75% · step ±30 pb (efectivo may-2027)',
    kpi1: 'Reducir la intensidad de emisiones de GEI por unidad de PIB (−48% a 2024; meta −50% a 2025).',
    kpi2: 'Mantener/aumentar el área de bosque nativo vs la línea de base 2012 (en cumplimiento).',
  },
  ratings: [
    { agencia: 'S&P', rating: 'BBB+', outlook: 'Estable', actualizado: 'nov 2025' },
    { agencia: "Moody's", rating: 'Baa1', outlook: 'Estable', actualizado: 'ene 2026' },
    { agencia: 'Fitch', rating: 'BBB', outlook: 'Estable', actualizado: 'sep 2025' },
    { agencia: 'DBRS', rating: 'BBB', outlook: 'Estable', actualizado: 'nov 2025' },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO ACTIVIDAD & PRECIOS (BCU, INE)
// ─────────────────────────────────────────────────────────────────────
export const ACTIVIDAD: ActividadData = {
  pib: {
    varInteranual: 0.9, anual2025: 1.8, trimestral: 0.8,
    series: [3.6, 2.3, 1.2, 0.1, 0.9], asof: '1T 2026', source: 'BCU · Cuentas Nacionales',
  },
  industria: { varInteranual: 4.0, varMensual: null, asof: 'abr 2026', source: 'INE · IVFIM' },
  // PIB por sector, var. i/a 1T 2026 (BCU · Cuentas Nacionales)
  pibSectores: [
    { label: 'Servicios financieros', value: 3.1 },
    { label: 'Transporte y TIC', value: 2.2 },
    { label: 'Comercio, alojamiento y comidas', value: 1.4 },
    { label: 'Industria manufacturera', value: 1.3 },
    { label: 'Construcción', value: -3.4 },
    { label: 'Agro, pesca y minería', value: -3.7 },
  ],
  // IPC mayo 2026 — principales aumentos del mes (variación %), datos INE
  ipcRubros: [
    { label: 'Gasoil', value: 14.0 },
    { label: 'Supergás', value: 7.0 },
    { label: 'Nafta', value: 7.0 },
    { label: 'Tributos domiciliarios', value: 2.2 },
    { label: 'Transporte c/chofer', value: 1.6 },
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
    desempleo: 7.5,
    desempleoPeriodo: 'abr 2026',
    empleo: 59.5,
    salarioReal: 2.33,
    salarioRealPeriodo: '1T 2026',
    pobreza: 17.7,
    pobrezaPeriodo: '1S 2025',
    source: 'INE · ECH / pobreza',
  },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO ENERGÍA — matriz renovable (MIEM / ADME, cierre 2025)
// ─────────────────────────────────────────────────────────────────────
export const ENERGIA: EnergiaData = {
  matriz: [
    { id: 'hidraulica', nombre: 'Hidráulica', pct: 46 },
    { id: 'eolica', nombre: 'Eólica', pct: 34 },
    { id: 'biomasa', nombre: 'Biomasa', pct: 14 },
    { id: 'solar', nombre: 'Solar fotovoltaica', pct: 4 },
    { id: 'termica', nombre: 'Térmica (fósil)', pct: 2 },
  ],
  renovablePct: 98,
  demandaMax: 2507,
  potenciaInstalada: 5298,
  exportacion: {
    destino: 'Argentina / Brasil',
    valorGwh: 1043,
    nota: 'Uruguay exportó ~8% de la generación de 2025 (13.040 GWh totales) como excedentes a la región. En mayo de 2026 la exportación eléctrica alcanzó 130 GWh, su mayor nivel del año (+364% i/a).',
  },
  combustibles: [
    { producto: 'Nafta Súper 95', precio: 93.36, unidad: '$/L' },
    { producto: 'Gasoil 50S', precio: 61.76, unidad: '$/L' },
    { producto: 'Supergás', precio: 101.26, unidad: '$/kg' },
  ],
  hidrogeno: {
    proyecto: 'HIF Global · Paysandú',
    inversionUsd: 5300,
    estado: 'en evaluación ambiental',
    nota: 'Proyecto de e-combustibles a partir de hidrógeno verde (Paysandú). Inversión revisada al alza a ~US$5.300 M; Solicitud de Autorización Ambiental Previa presentada (mar-2026) y posible relocalización dentro de Paysandú tras reclamos de Argentina. Producirá ~170.540 t/año de H2 verde para e-metanol y e-gasolina (primeras exportaciones previstas 2029).',
  },
  asof: '2025',
  source: 'MIEM · ADME / UTE',
  resumen:
    'Uruguay cerró 2025 con el 98% de su generación eléctrica de origen renovable (hidráulica 46%, eólica 34%, biomasa 14%, solar 4%), uno de los mayores porcentajes del mundo, con sólo 2% de respaldo térmico fósil.',
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO EXTERNO & COMERCIO (Uruguay XXI, BCU, Mintur)
// ─────────────────────────────────────────────────────────────────────
export const EXTERNO: ExternoData = {
  // precios de referencia que mueven las exportaciones de Uruguay.
  commodities: [
    { id: 'novillo', label: 'Novillo gordo (carcasa)', value: 5.57, unit: 'USD/kg', chgMensual: -2.5, chgAnual: null, polarity: 'up', source: 'ACG · Blasina', asof: 'sem 25 jun', nota: 'Cedió leve desde US$5,71 (may); sigue cerca de récords.' },
    { id: 'carne_export', label: 'Carne (precio medio export)', value: 6078, unit: 'USD/ton', chgMensual: null, chgAnual: 37, polarity: 'up', source: 'INAC', asof: 'may 2026', nota: 'Precio de exportación +37% i/a en mayo pese a menor volumen.' },
    { id: 'celulosa', label: 'Celulosa (BHK China, ref.)', value: 668, unit: 'USD/ton', chgMensual: null, chgAnual: null, polarity: 'up', source: 'Fastmarkets', asof: 'jun 2026', nota: 'Reventa BHK en China (~US$668/t neto); 2º producto exportador.' },
    { id: 'soja', label: 'Soja (CBOT, ref.)', value: 11.10, unit: 'USD/bushel', chgMensual: null, chgAnual: null, polarity: 'up', source: 'Trading Economics · CBOT', asof: 'jun 2026', nota: 'Mínimo desde febrero 2026.' },
    { id: 'trigo', label: 'Trigo (CBOT, ref.)', value: 5.73, unit: 'USD/bushel', chgMensual: null, chgAnual: null, polarity: 'up', source: 'Trading Economics · CBOT', asof: 'jun 2026', nota: 'Mínimo desde el 10-abr-2026.' },
    { id: 'leche', label: 'Leche en polvo entera (GDT)', value: 3706, unit: 'USD/ton', chgMensual: -2.2, chgAnual: null, polarity: 'up', source: 'GlobalDairyTrade', asof: 'GDT 405 · 2-jun', nota: 'Evento GDT 405; lácteos 3er producto exportador.' },
  ],
  // Balanza en base aduanera del BCU (exp. cumplidas s/zonas francas), única base
  // coherente para el saldo. Por solicitudes (Uruguay XXI, c/zonas francas) las
  // exportaciones de mayo fueron US$1.142 M (acum. ene-may US$5.271 M, +3% i/a).
  balanza: { exportaciones: 720, importaciones: 1151, saldo: -431, periodo: 'abr 2026 · base BCU', source: 'BCU · Comercio Ext. de Bienes' },
  destinos: [
    { pais: 'China', valor: 27 },
    { pais: 'Brasil', valor: 17 },
    { pais: 'Unión Europea', valor: 16 },
    { pais: 'EE.UU.', valor: 6 },
    { pais: 'Otros', valor: 34 },
  ],
  turismo: {
    ingresosUsd: 843,
    visitantes: 1182,
    saldoUsd: 438,
    nota: 'Ingresos receptivos US$843 M en el 1T 2026 (gasto/persona +9,5%) pese a −13,6% de visitantes; argentinos −17,6% (66% del total). Refleja la sensibilidad a la competitividad con Argentina: cuando Argentina está barata, caen los turistas argentinos y los uruguayos cruzan a gastar (emisivo +15,8%).',
    asof: '1T 2026',
    source: 'Mintur',
  },
  ied: { valorUsd: 687, pctPib: 0.8, asof: '2025', source: 'BCU · Uruguay XXI' },
  cuentaCorriente: { pctPib: -0.44, periodo: 'año 2025', source: 'BCU · Balanza de Pagos' },
  competitividad: {
    tcrBrecha: -9.9,
    tcrNota:
      'El BCU estimó una desalineación del tipo de cambio real de −9,9% respecto de sus fundamentos al cierre de 2025: el peso está sobrevaluado en términos reales («atraso cambiario»), preocupación del agro y la industria. En junio de 2026 el ITCRE se consolidó por encima de 200 puntos y el TCR extrarregional cayó −7,7% en 8 meses; el BCU proyecta corregir ~la mitad en 24 meses.',
    ipfFrontera: 15.0,
    ipfNota:
      'Índice de Precios Fronterizos (UCU · Obs. Económico Salto): comprar en Salto cuesta ~15,0% más que en Concordia (may-2026), cerca de mínimos históricos, tras encarecerse Argentina. Sensible al descuento de IMESI a los combustibles en la frontera.',
    asof: '2025 · may 2026',
    source: 'BCU · UCU',
  },
  deuda: { brutaPct: 74.9, totalUsd: 64129, asof: 'cierre 2025', source: 'MEF · UGD' },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO FISCAL & MONETARIO (MEF, DGI, BCU)
// ─────────────────────────────────────────────────────────────────────
export const FISCAL: FiscalData = {
  resultadoGlobal: {
    pctPib: -4.7, periodo: '12m mar 2026', series: [-3.6, -4.1, -4.4, -4.7, -4.7], source: 'MEF',
  },
  resultadoPrimario: { pctPib: -1.4, periodo: '12m mar 2026 · GC-BPS', source: 'MEF' },
  reglaFiscal: {
    resultadoEstructural: -3.9,
    topeGastoReal: 5.7,
    deudaNetaTope: 3450,
    cumple: false,
    nota:
      '2 de 3 pilares cumplidos en 2025: resultado fiscal estructural (−3,9% PIB) y tope de endeudamiento neto (US$3.079 M, bajo el límite de US$3.450 M) SÍ; tope de crecimiento del gasto real NO (el gasto creció 5,7% vs ~2,5% potencial). El Consejo Fiscal Autónomo alertó al MEF. La Ley N°20.446 (dic-2025) instauró una nueva regla fiscal dual (ancla de deuda neta + metas operativas) vigente desde 2026.',
    source: 'MEF · Consejo Fiscal Autónomo',
  },
  deuda: { brutaPct: 74.9, netaPct: 54.6, monedaLocalPct: 59, asof: 'cierre 2025', source: 'MEF · UGD' },
  recaudacion: { varRealInteranual: -0.8, periodo: 'may 2026', source: 'DGI · recaudación bruta $59.716 M (+2,9% nominal, −0,8% real); fuerte caída desde +9,9% de abril; acum. 12m +0,8% real' },
  tasaPolitica: { valor: 5.75, nombre: 'Tasa de Política Monetaria (TPM)', asof: 'COPOM 26-may-2026', source: 'BCU' },
  reservas: { valorUsd: 18474, asof: '25 jun', source: 'BCU' },
  baseMonetaria: { valorMM: 113072, asof: 'may 2026', source: 'BCU · Emisión (Agregados Monetarios)' },
  expectativas: { inflacion12m: 4.9, inflacion24m: 4.5, asof: 'may 2026', source: 'BCU · encuesta de expectativas' },
};

// ─────────────────────────────────────────────────────────────────────
// MÓDULO D — Feed de noticias (titulares reales abr–jun 2026; orden recencia)
// ─────────────────────────────────────────────────────────────────────
export const NOTICIAS: Noticia[] = [
  {
    id: 'n17', t: 'hoy', mins: 180, fuente: 'Ámbito', tag: 'Internacional',
    titular: 'Uruguay asume la presidencia pro tempore del Mercosur con foco en abrir el bloque a nuevos mercados',
    resumen: 'En la cumbre de Luque (Paraguay), Uruguay recibe la presidencia rotativa el 1-jul con la prioridad de ejecutar el acuerdo con la UE, negociar con Asia (India, Japón, Vietnam) e impulsar el ingreso de nuevos miembros.',
    breaking: true,
    url: 'https://www.ambito.com/uruguay/asumira-la-presidencia-del-mercosur-la-apertura-nuevos-mercados-y-el-ingreso-paises-agenda-n6293893',
    body: 'Uruguay asume el 1 de julio la presidencia pro tempore del Mercosur en la 68ª cumbre del bloque, reunida en Luque (Paraguay) por el 35° aniversario del Tratado de Asunción. La agenda uruguaya prioriza ejecutar el acuerdo con la Unión Europea (incluido el reparto de cuotas), abrir negociaciones comerciales hacia Asia (India, Japón, Vietnam) e impulsar el ingreso de nuevos socios (Venezuela, Colombia, Panamá, Trinidad y Tobago), buscando un "efecto dominó" de apertura comercial.',
    keywords: ['Mercosur', 'Orsi', 'Comercio', 'UE'],
    relacionados: ['Externo & comercio'],
  },
  {
    id: 'n18', t: '−1d', mins: 1560, fuente: 'Subrayado', tag: 'Internacional',
    titular: 'Comienza la cumbre del Mercosur en la que Uruguay recibe la presidencia pro tempore del bloque',
    resumen: 'La cumbre arranca en Luque con cancilleres y jefes de Estado; Uruguay recibe la presidencia de manos de Paraguay con el acuerdo UE y la situación de Venezuela sobre la mesa.',
    breaking: false,
    url: 'https://www.subrayado.com.uy/comienza-este-lunes-cumbre-del-mercosur-la-que-uruguay-recibe-presidencia-pro-tempore-del-bloque-n1011479',
    body: 'La 68ª cumbre del Mercosur comenzó con la reunión de cancilleres y, al día siguiente, la de jefes de Estado en la sede de la Conmebol (Luque, Paraguay), en el 35° aniversario del Tratado de Asunción. Uruguay recibe la presidencia pro tempore de manos de Paraguay, con la implementación del acuerdo con la Unión Europea y la situación de Venezuela como temas centrales del traspaso.',
    keywords: ['Mercosur', 'Cumbre', 'Paraguay'],
    relacionados: ['Externo & comercio'],
  },
  {
    id: 'n19', t: '−2d', mins: 3000, fuente: 'Caras y Caretas', tag: 'Económico',
    titular: 'El gobierno aumentará el gasto en US$31 millones y estima reducir 25% la pobreza infantil',
    resumen: 'La Rendición de Cuentas suma US$31 M centrados en infancia; el gobierno estima que los cambios en transferencias sociales reducirían cerca de 25% la pobreza infantil.',
    breaking: false,
    url: 'https://www.carasycaretas.com.uy/politica/gobierno-aumentara-gasto-us-31-millones-y-estiman-reducir-25-pobreza-infantil-n96887',
    body: 'El gobierno presentará una Rendición de Cuentas con un aumento adicional de gasto de US$31 millones, centrado principalmente en la infancia. Estima que los cambios en las transferencias sociales (asignaciones familiares) reducirían la pobreza infantil en torno a 25%. Sumado a lo previsto en el Presupuesto, la inversión en las cuatro prioridades (infancia, seguridad, educación y situación de calle) alcanza unos US$81 millones, financiados con reasignaciones para no afectar la meta fiscal.',
    keywords: ['Rendición de Cuentas', 'Pobreza infantil', 'Gasto'],
    relacionados: ['Result. fiscal', 'Fiscal · regla fiscal'],
  },
  {
    id: 'n20', t: '−3d', mins: 4440, fuente: 'Subrayado', tag: 'Social',
    titular: 'El gobierno plantea unificar las asignaciones familiares, que llegarán hasta $10.000 en la Rendición',
    resumen: 'El Ejecutivo propone unificar las asignaciones familiares con el aumento de US$31 M: hasta $10.000 para niños de 0-3 años en los deciles más vulnerables, impactando a unos 50.000 niños.',
    breaking: false,
    url: 'https://www.subrayado.com.uy/gobierno-plantea-unificacion-asignaciones-familiares-que-alcanzaran-10000-algunos-casos-rendicion-n1011346',
    body: 'El gobierno propone en la Rendición de Cuentas unificar el régimen de asignaciones familiares con un incremento de US$31 millones. Las prestaciones llegarían hasta $10.000 para niños de 0 a 3 años en los deciles más vulnerables y $6.600 en otros tramos, beneficiando a unos 50.000 niños, como herramienta central para reducir la pobreza infantil.',
    keywords: ['Asignaciones familiares', 'Rendición de Cuentas', 'Infancia'],
    relacionados: ['Result. fiscal'],
  },
  {
    id: 'n14', t: '−6d', mins: 8760, fuente: 'Ámbito', tag: 'Político',
    titular: 'Orsi salió a blindar la gestión económica ante el desgaste de su imagen en las encuestas',
    resumen: 'El presidente defendió los resultados económicos —desempleo en 7,5%, +26.000 empleos y el mayor poder de compra en 50 años— tras caer su aprobación a 20% (Opción Consultores).',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/yamandu-orsi-salio-blindar-la-gestion-economica-el-desgaste-su-imagen-publica-las-encuestas-n6292030',
    body: 'El presidente Yamandú Orsi salió a defender la gestión económica de su gobierno ante el deterioro de su imagen en las encuestas. Destacó que el desempleo bajó de 8,2% a 7,5% en un año, que se crearon más de 26.000 puestos de trabajo (casi 20.000 mujeres incorporadas), que el ingreso real de los hogares creció 2,7% (máximo registrado por el INE) y que el salario real subió 2,3% en 2026, el mayor poder de compra en cinco décadas. La encuesta de Opción Consultores ubicó la aprobación en 20% (−3 pp vs el 1T) y la desaprobación en 48%.',
    keywords: ['Orsi', 'Empleo', 'Salario real', 'Encuestas'],
    relacionados: ['Desempleo', 'Salario real'],
  },
  {
    id: 'n21', t: '−7d', mins: 10080, fuente: 'MEF', tag: 'Económico',
    titular: 'El equipo económico ratifica el rumbo del gobierno: estabilidad, protección social y crecimiento',
    resumen: 'El MEF reafirmó su estrategia de estabilidad macro y protección social, destacando que en 2025 se crearon 26.000 empleos, la inflación cerró en 3,65% y el PIB creció 1,8%.',
    breaking: false,
    url: 'https://www.gub.uy/ministerio-economia-finanzas/comunicacion/noticias/equipo-economico-ratifica-rumbo-del-gobierno-haciendo-foco-estabilidad',
    body: 'El Ministerio de Economía y Finanzas difundió un comunicado ratificando la estrategia del gobierno centrada en la estabilidad macroeconómica, la protección social y el crecimiento. Destacó que en 2025 se crearon 26.000 puestos de trabajo, la inflación cerró en 3,65% (mínimo en décadas) y el PIB creció 1,8%, en el marco del proyecto de ley de competitividad. El comunicado se difundió el día de la interpelación a Oddone en el Senado.',
    keywords: ['MEF', 'Oddone', 'Estabilidad', 'Empleo'],
    relacionados: ['PIB · actividad', 'Result. fiscal'],
  },
  {
    id: 'n15', t: '−7d', mins: 10200, fuente: 'Ámbito', tag: 'Económico',
    titular: 'La oposición interpeló a Gabriel Oddone en el Senado por el rumbo de la economía',
    resumen: 'El ministro de Economía fue interpelado por el nacionalista Sergio Botana; Oddone defendió la gestión, ratificó que no habrá cambios impositivos en el período y reafirmó la apuesta por la inversión y la apertura.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/la-oposicion-interpela-gabriel-oddone-un-debate-el-rumbo-la-economia-n6291336',
    body: 'El ministro de Economía Gabriel Oddone fue interpelado en el Senado por el senador Sergio Botana (Partido Nacional), que cuestionó el desempeño económico ("la actividad está casi un punto por debajo de diciembre de 2024") y señaló problemas de empleo y competitividad. Oddone defendió la gestión —inflación en mínimos de tres décadas, 26.000 empleos, salario real al alza— y confirmó que no habrá modificaciones impositivas en este período de gobierno, ratificando el foco en la estabilidad macroeconómica, la inversión y la integración internacional.',
    keywords: ['Oddone', 'Interpelación', 'Economía', 'Senado'],
    relacionados: ['Result. fiscal', 'PIB · actividad'],
  },
  {
    id: 'n16', t: '−12d', mins: 17400, fuente: 'Ámbito', tag: 'Económico',
    titular: 'El gobierno defiende una Rendición de Cuentas sin impacto fiscal y con prioridades definidas',
    resumen: 'El Ejecutivo confirmó que la Rendición de Cuentas, a presentar el 30-jun, no tendrá impacto fiscal: un aumento de US$31 M financiado con reasignaciones, con foco en infancia, seguridad, educación y situación de calle.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/el-gobierno-defiende-una-rendicion-cuentas-impacto-fiscal-y-prioridades-definidas-n6289764',
    body: 'El gobierno de Yamandú Orsi defendió que su primera Rendición de Cuentas —a presentarse al Parlamento el 30 de junio— no tendrá impacto fiscal. El director de la OPP, Rodrigo Arim, aclaró que se trata de "un presupuesto que no tiene impacto fiscal", no de "gasto cero": habrá incrementos relevantes en las áreas prioritarias (infancia, seguridad, educación y atención a personas en situación de calle) financiados mediante reasignaciones de recursos. El aumento ronda los US$31 M, que sumados a los US$50 M ya previstos en el Presupuesto totalizan US$81 M. Sectores del Frente Amplio (MPP) presionan por mayores márgenes de gasto.',
    keywords: ['Rendición de Cuentas', 'OPP', 'Arim', 'Fiscal'],
    relacionados: ['Result. fiscal', 'Fiscal · regla fiscal'],
  },
  {
    id: 'n1', t: '−13d', mins: 18840, fuente: 'Ámbito', tag: 'Económico',
    titular: 'La economía creció 0,9% en el primer trimestre, a pesar de la caída del campo y la construcción',
    resumen: 'El BCU informó que el PIB creció 0,9% interanual en el 1T-2026 (+0,8% desestacionalizado), con recuperación de servicios pese al retroceso del agro.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/la-economia-crecio-09-el-primer-trimestre-pesar-la-caida-del-campo-y-la-construccion-n6288981',
    body: 'El Banco Central del Uruguay informó que el Producto Interno Bruto creció 0,9% interanual en el primer trimestre de 2026 y 0,8% en términos desestacionalizados respecto al cuarto trimestre de 2025. Impulsaron servicios financieros (+3,1%), transporte e información y comunicaciones (+2,2%) y comercio (+1,4%), mientras que el sector agropecuario retrocedió 3,7% (por menor producción de soja y arroz) y la construcción cayó 3,4%.',
    keywords: ['PIB', 'BCU', 'Actividad', 'Agro'],
    relacionados: ['PIB · actividad', 'Agroexportador'],
  },
  {
    id: 'n8', t: '−14d', mins: 20280, fuente: 'Ámbito', tag: 'Internacional',
    titular: 'Uruguay sacará ventaja en exportaciones de carne a China ante el arancel del 55% que frenará a Brasil y Australia',
    resumen: 'Analistas prevén que Uruguay podría ganar participación en el mercado chino de carne vacuna frente a competidores afectados por aranceles; el USDA proyecta +2% de exportaciones cárnicas en 2026.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/sacara-ventaja-exportaciones-carne-china-el-arancel-del-55-que-frenara-brasil-y-australia-n6281338',
    body: 'Analistas del sector prevén que Uruguay podría ganar participación en el mercado chino de carne vacuna frente a competidores como Brasil y Australia, afectados por aranceles del 55%. El USDA proyecta un crecimiento de 2% de las exportaciones cárnicas uruguayas en 2026. China es el principal destino individual de la carne uruguaya.',
    keywords: ['Carne', 'China', 'Aranceles', 'INAC'],
    relacionados: ['Agroexportador', 'Novillo gordo'],
  },
  {
    id: 'n10', t: '−16d', mins: 23160, fuente: 'El Cronista', tag: 'Sectorial',
    titular: 'Ministerio de Ambiente analiza el pedido de UPM para aumentar la producción en Fray Bentos',
    resumen: 'UPM solicitó elevar la producción de su planta de Fray Bentos de 1,3 a unos 1,5 millones de toneladas anuales; el Ministerio de Ambiente evalúa el impacto.',
    breaking: false,
    url: 'https://www.cronista.com/uruguay/politica-uy/ministerio-de-ambiente-analiza-el-pedido-de-upm-para-aumentar-la-produccion-en-fray-bentos/',
    body: 'UPM solicitó al Ministerio de Ambiente autorización para elevar la producción de su planta de celulosa de Fray Bentos de 1,3 a aproximadamente 1,5 millones de toneladas anuales (+200.000 t). La celulosa fue el segundo producto de exportación de Uruguay en 2025. El Ministerio evalúa el impacto ambiental de la solicitud.',
    keywords: ['UPM', 'Celulosa', 'Fray Bentos', 'Ambiente'],
    relacionados: ['Agroexportador'],
  },
  {
    id: 'n6', t: '−17d', mins: 24600, fuente: 'Ámbito', tag: 'Político',
    titular: 'Los lineamientos de gasto cero en la Rendición de Cuentas generan tensiones en el Frente Amplio',
    resumen: 'La primera Rendición de Cuentas del gobierno de Orsi (antes del 30 de junio) enfrenta al MEF, que defiende el compromiso fiscal, con sectores del FA que presionan por más gasto.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/los-lineamientos-gasto-cero-la-rendicion-cuentas-generan-tensiones-el-frente-amplio-n6282068',
    body: 'La primera Rendición de Cuentas del gobierno de Yamandú Orsi, que debe presentarse al Parlamento antes del 30 de junio, enfrenta al ministro Gabriel Oddone y al MEF —que defienden el compromiso fiscal y las metas— con sectores del Frente Amplio que presionan por mayor gasto público. El gobierno habla de reasignación de recursos antes que de recortes de suma cero.',
    keywords: ['Rendición de Cuentas', 'Oddone', 'Frente Amplio', 'Fiscal'],
    relacionados: ['Result. fiscal', 'Fiscal · regla fiscal'],
  },
  {
    id: 'n5', t: '−18d', mins: 26040, fuente: 'Ámbito', tag: 'Sectorial',
    titular: 'El INAC admitió el error de la exportación de carne contaminada a China y lo comparó con el caso del año pasado',
    resumen: 'China detectó residuos de antibiótico por encima del límite en carne de un frigorífico de Tacuarembó; el INAC reconoció el error y anunció trabajo con productores.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/el-inac-admitio-el-error-la-exportacion-carne-contaminada-china-y-lo-comparo-el-ano-pasado-n6287922',
    body: 'China detectó residuos de antibiótico por encima del límite permitido en un embarque de carne de un frigorífico de Tacuarembó. El presidente del Instituto Nacional de Carnes (INAC), Gastón Scayola, reconoció el error y anunció un trabajo con los productores sobre los plazos de tratamiento, recordando un caso similar del año anterior. China es el principal destino individual de la carne uruguaya.',
    keywords: ['INAC', 'Carne', 'China', 'Exportaciones'],
    relacionados: ['Agroexportador'],
  },
  {
    id: 'n9', t: '−18d', mins: 26050, fuente: 'Búsqueda', tag: 'Económico',
    titular: 'Consejo Fiscal advierte que el estancamiento económico podría seguir en 2026 y alerta sobre riesgos fiscales',
    resumen: 'El Consejo Fiscal Autónomo advirtió que el bajo crecimiento podría persistir en 2026 y alertó sobre los riesgos fiscales de cara a la Rendición de Cuentas.',
    breaking: false,
    url: 'https://www.busqueda.com.uy/economia/consejo-advierte-que-el-estancamiento-economico-podria-seguir-2026-y-alerta-riesgos-fiscales-n5411020',
    body: 'El Consejo Fiscal Autónomo advirtió que el bajo crecimiento de la economía uruguaya podría persistir en 2026 y alertó sobre los riesgos fiscales que enfrenta el gobierno de cara a la Rendición de Cuentas. El MEF recortó su proyección de PIB 2026 de 2,2% a 1,6%.',
    keywords: ['Consejo Fiscal', 'PIB', 'Déficit', 'Crecimiento'],
    relacionados: ['PIB · actividad', 'Result. fiscal'],
  },
  {
    id: 'n11', t: '−20d', mins: 28920, fuente: 'Ámbito', tag: 'Sectorial',
    titular: 'El turismo creció en gasto pero no en volumen: la temporada 2026 dejó US$928 millones',
    resumen: 'En el verano ingresaron 1,18 millones de visitantes y el gasto alcanzó US$928 M (+2,8% interanual); el volumen cayó por menor llegada de argentinos, pero el gasto subió.',
    breaking: false,
    url: 'https://www.ambito.com/uruguay/ingreso-us-843-millones-turismo-el-primer-trimestre-pesar-la-caida-visitantes-n6272856',
    body: 'El Ministerio de Turismo informó que en la temporada de verano (dic-feb) ingresaron divisas por US$928 millones (+2,8% interanual) pese a una caída del volumen de visitantes (186.000 turistas menos), por menor llegada de argentinos. En el primer trimestre los ingresos receptivos fueron US$843 M con 1.181.795 visitantes (−13,6%), confirmando la sensibilidad cambiaria con Argentina.',
    keywords: ['Turismo', 'Argentina', 'Mintur', 'Punta del Este'],
    relacionados: ['Externo & comercio'],
  },
  {
    id: 'n2', t: '−23d', mins: 33240, fuente: 'INE', tag: 'Económico',
    titular: 'IPC de mayo 2026: variación mensual 0,70% e interanual 3,77%',
    resumen: 'La inflación de mayo fue 0,70% mensual y 3,77% en los últimos 12 meses, dentro del rango meta del BCU; mayores incidencias en transporte, alimentos y vivienda.',
    breaking: false,
    url: 'https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/HTML/IPC/2026/PC%20Mayo%202026.html',
    body: 'El Instituto Nacional de Estadística informó que el Índice de Precios del Consumo registró una variación mensual de 0,70% en mayo de 2026 y de 3,77% en los últimos doce meses, dentro del rango meta del Banco Central (3%-6%) y por debajo de su centro (4,5%). Las mayores incidencias provinieron de Transporte (gasoil +14%, nafta +7%), Alimentos y bebidas, y Vivienda (tributos domiciliarios y supergás).',
    keywords: ['IPC', 'Inflación', 'INE', 'BCU'],
    relacionados: ['IPC interanual', 'IPC mensual'],
  },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO E — Calendario (hitos reales, ventana 29-jun → 29-jul 2026).
// d = días desde HOY (29-jun); el componente ancla d=0 a la fecha real de
// ejecución. Fuentes: calendarios de difusión del INE, el BCU (COPOM, próxima
// reunión 8-jul), Uruguay XXI, INAC, la UGD/MEF y el calendario de feriados.
// ─────────────────────────────────────────────────────────────────────
export const EVENTOS: Evento[] = [
  { d: 1, tag: 'Parlamento', title: 'Rendición de Cuentas 2026 (plazo · 30-jun)', tone: 'accent' },
  { d: 2, tag: 'Mercosur', title: 'Uruguay asume la presidencia pro tempore', tone: 'info' },
  { d: 4, tag: 'INE', title: 'IPC junio · inflación', tone: 'accent' },
  { d: 4, tag: 'INE', title: 'Mercado laboral ECH · mayo', tone: 'info' },
  { d: 7, tag: 'Uruguay XXI', title: 'Comercio exterior · exportaciones junio', tone: 'info' },
  { d: 7, tag: 'INAC', title: 'Indicadores del sector cárnico', tone: 'info' },
  { d: 9, tag: 'BCU', title: 'Reunión del COPOM · decisión de TPM', tone: 'accent' },
  { d: 16, tag: 'BCU', title: 'Encuesta de expectativas de inflación', tone: 'info' },
  { d: 19, tag: 'Feriado', title: 'Jura de la Constitución de 1830', tone: 'neutral' },
];

// ─────────────────────────────────────────────────────────────────────
// MÓDULO F — Fuentes (estado al 29 jun 2026)
// ─────────────────────────────────────────────────────────────────────
export const FUENTES: Fuente[] = [
  { id: 'ine', name: 'INE · IPC/PIB/empleo', latency: 180, status: 'ok', last: '3 jun' },
  { id: 'bcu', name: 'BCU · PIB/TC/reservas/base', latency: 150, status: 'ok', last: '25 jun' },
  { id: 'mef', name: 'MEF · fiscal/deuda', latency: 320, status: 'ok', last: 'abr 2026' },
  { id: 'inac', name: 'INAC · carne/faena', latency: 90, status: 'live', last: 'jun 2026' },
  { id: 'uruguayxxi', name: 'Uruguay XXI · comercio', latency: 240, status: 'ok', last: 'may 2026' },
  { id: 'dgi', name: 'DGI · recaudación', latency: 300, status: 'ok', last: 'may 2026' },
  { id: 'adme', name: 'ADME/UTE · energía', latency: 60, status: 'live', last: 'jun 2026' },
  { id: 'rafap', name: 'República AFAP · UBI', latency: 520, status: 'lag', last: '18 may' },
  { id: 'rating', name: 'Calificadoras', latency: null, status: 'cold', last: 'ene 2026' },
];
