// ─────────────────────────────────────────────────────────────────────
// Domain types for "Tablero Inteligente URU".
// Mapean 1:1 al backend API y al esquema relacional (BDR PostgreSQL `uruguay`).
// Adaptados a la coyuntura uruguaya: complejo agroexportador (módulo estrella),
// crédito soberano grado inversor (UBI, bonos UYU/USD/UI, SSLB), actividad &
// precios con mapa departamental, matriz energética renovable, externo (comercio,
// turismo, IED) y fiscal/monetario (regla fiscal, TPM, expectativas BCU).
// ─────────────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';

export type Sentiment = 'pos' | 'neg' | 'neutral' | 'accent';
export type Tone = 'neutral' | 'accent' | 'pos' | 'neg' | 'info';

// ─── MÓDULO A — Indicadores macro ─────────────────────────────────────
export interface KpiExtra {
  label: string;
  value: string;
  tone: 'neg' | 'pos' | 'neutral';
}

export interface Kpi {
  id: string;
  label: string;
  value: number;
  unit?: string;
  /** Display formatter for the headline value. */
  fmt: (v: number) => string;
  delta: number;
  deltaLabel: string;
  sentiment: Sentiment;
  /** 6–12 punto sparkline series. */
  spark: number[];
  /** Etiqueta de período de cada punto de `spark` (eje X del gráfico). */
  periodos?: string[];
  /** Serie histórica anual (2015 → último año cerrado, y el dato vigente marcado «2026*»). */
  historico?: { periodo: string; valor: number }[];
  /** Definición de la serie histórica cuando difiere del dato vigente (p. ej. «dic/dic»). */
  historicoNota?: string;
  source: string;
  asof: string;
  def: string;
  extra?: KpiExtra;
}

// ─── MÓDULO AGRO — complejo agroexportador (módulo estrella) ───────────
// Reemplaza al módulo "Dólar" de Argentina: en Uruguay el peso flota libre y no
// hay brecha, pero el agro es el motor de divisas. Carne, celulosa, soja,
// lácteos, arroz, trigo, madera.
export interface ProductoAgro {
  id: string;
  nombre: string;
  /** Precio de referencia (novillo USD/kg, soja/celulosa USD/ton, etc.). */
  precio: number | null;
  precioUnidad: string;
  /** Variación del precio (% mensual). */
  varPrecio: number | null;
  /** Exportaciones (USD millones, acumulado del año o anual). */
  exportUsd: number | null;
  /** Participación en las exportaciones totales de bienes (%). */
  participacion: number | null;
  /** Principal destino del producto. */
  destinoTop: string;
  /** Serie reciente (precio o exportaciones) para el sparkline. */
  spark: number[];
  /** 'up' = mayor precio/volumen favorece a Uruguay (exportador). */
  polaridad: 'up' | 'down' | 'none';
  asof: string;
  fuente: string;
  nota?: string;
}

/** Destino de exportación (para el donut de destinos). */
export interface DestinoExport {
  pais: string;
  valor: number; // % del total
}

export interface AgroData {
  productos: ProductoAgro[];
  /** Exportaciones del complejo agroindustrial (USD millones, acumulado/anual). */
  exportTotalAgro: number | null;
  /** Participación del agro en las exportaciones totales de bienes (%). */
  participacionAgro: number | null;
  /** Precio del novillo gordo (USD/kg), referencia del complejo cárnico. */
  novilloPrecio: number | null;
  novilloVar: number | null;
  /** Faena vacuna reciente (miles de cabezas, semana/mes). */
  faena: number | null;
  faenaPeriodo: string;
  /** Destinos del complejo cárnico/agro (para el donut). */
  destinos: DestinoExport[];
  asof: string;
  fuente: string;
  /** Descripción de coyuntura del complejo agroexportador. */
  resumen: string;
}

// ─── MÓDULO MERCADOS — grado inversor (UBI, bonos, SSLB, ratings) ──────
// Uruguay es grado inversor: el espejo positivo de la Argentina. UBI ≈ riesgo
// país (calculado por República AFAP); bonos globales en USD, pesos (UYU) y
// Unidades Indexadas (UI); SSLB = bono soberano sustentable (1º del mundo).
export interface Bono {
  id: string;
  name: string;
  /** Moneda de emisión. */
  moneda: 'USD' | 'UYU' | 'UI';
  price: number | null;
  /** Rendimiento (TIR, %). */
  yield: number | null;
  /** 'global' (ley NY/internacional), 'sslb' (sustentable), 'local' (mercado local). */
  tipo: 'global' | 'sslb' | 'local';
  chg: number | null;
  vencimiento?: string;
}

export interface Rating {
  agencia: string;
  rating: string;
  outlook: string;
  actualizado: string;
}

export interface MercadosData {
  /** Uruguay Bond Index — riesgo país (puntos básicos). */
  ubi: {
    value: number;
    chg: number;
    series: number[];
    periodos?: string[];
    /** Índice usado como riesgo país (EMBI de JP Morgan; históricamente el UBI). */
    indice?: string;
    asof?: string;
    /** Comparación regional del mismo índice (pb). */
    regional?: { pais: string; pb: number }[];
  };
  bonos: Bono[];
  /** Resumen del estatus grado inversor (cuántas agencias, escalones sobre el umbral). */
  gradoInversor: { agencias: number; nota: string };
  /** Bono sustentable indexado a indicadores ambientales (SSLB), si aplica. */
  sslb: { nota: string; cupon: string; kpi1: string; kpi2: string } | null;
  ratings: Rating[];
  /** Calificación a fin de cada año (línea de tiempo). */
  ratingsHistoria?: { anio: number; sp: string; moodys: string }[];
}

// ─── MÓDULO ACTIVIDAD & PRECIOS ───────────────────────────────────────
/** Actividad económica por departamento (alimenta el mapa coroplético). */
export interface DepartamentoActividad {
  codigo: string; // montevideo, canelones, ...
  nombre: string;
  zona: string;
  /** Índice/peso de actividad económica que pinta el mapa. */
  valor: number | null;
  /** Dato secundario (p.ej. peso en el PIB, stock ganadero). */
  valorAlt: number | null;
}

export interface ActividadData {
  pib: {
    varInteranual: number | null; // % i/a del último trimestre
    anual2025: number | null; // % del año 2025
    trimestral: number | null; // % desestacionalizado t/t
    series: number[]; // PIB i/a trimestral reciente
    periodos?: string[];
    asof: string;
    source: string;
  };
  industria: { varInteranual: number | null; varMensual: number | null; asof: string; source: string };
  /** PIB por sector de actividad (variación i/a del último trimestre). */
  pibSectores: { label: string; value: number }[];
  /** Variación mensual del IPC por división (rubros). */
  ipcRubros: { label: string; value: number }[];
  /** Actividad por departamento (para el mapa). */
  departamentos: DepartamentoActividad[];
  social: {
    desempleo: number | null;
    desempleoPeriodo: string;
    empleo: number | null; // tasa de empleo
    salarioReal: number | null; // var. i/a del salario real (IMS)
    salarioRealPeriodo: string;
    pobreza: number | null;
    pobrezaPeriodo: string;
    source: string;
  };
}

// ─── MÓDULO ENERGÍA — matriz renovable (pestaña dedicada) ──────────────
export interface FuenteGeneracion {
  id: string; // hidraulica, eolica, solar, biomasa, termica
  nombre: string;
  pct: number; // % de la generación eléctrica
}

export interface EnergiaData {
  /** Matriz de generación eléctrica por fuente (% del total). */
  matriz: FuenteGeneracion[];
  /** Porcentaje de generación renovable. */
  renovablePct: number | null;
  /** Demanda máxima de potencia (MW). */
  demandaMax: number | null;
  /** Potencia instalada total (MW). */
  potenciaInstalada: number | null;
  /** Exportación de energía eléctrica a la región. */
  exportacion: { destino: string; valorGwh: number | null; nota: string };
  /** Precios de combustibles (ANCAP). */
  combustibles: { producto: string; precio: number | null; unidad: string }[];
  /** Proyecto insignia de hidrógeno verde. */
  hidrogeno: { proyecto: string; inversionUsd: number | null; estado: string; nota: string };
  asof: string;
  source: string;
  resumen: string;
}

// ─── MÓDULO EXTERNO & COMERCIO ────────────────────────────────────────
export interface Commodity {
  id: string;
  label: string;
  value: number;
  unit: string;
  chgMensual: number | null;
  chgAnual: number | null;
  /** 'up' = mayor precio favorece a Uruguay (exportador). */
  polarity: 'up' | 'down' | 'none';
  source: string;
  asof: string;
  nota?: string;
}

export interface ExternoData {
  commodities: Commodity[];
  balanza: {
    exportaciones: number | null; // USD millones
    importaciones: number | null;
    saldo: number | null;
    periodo: string;
    source: string;
  };
  /** Exportaciones por destino (donut). */
  destinos: DestinoExport[];
  /** Turismo — clave en Uruguay, sensible a la competitividad con Argentina. */
  turismo: {
    ingresosUsd: number | null; // USD millones
    visitantes: number | null; // miles de visitantes
    saldoUsd: number | null; // saldo de la balanza turística
    nota: string;
    asof: string;
    source: string;
  };
  /** Inversión Extranjera Directa. */
  ied: { valorUsd: number | null; pctPib: number | null; asof: string; source: string };
  /** Cuenta corriente de la balanza de pagos. */
  cuentaCorriente: { pctPib: number | null; periodo: string; source: string };
  /** Competitividad: tipo de cambio real (atraso cambiario) y brecha de precios de frontera. */
  competitividad: {
    /** Desalineación del TCR vs fundamentos (%); negativo = peso sobrevaluado (atraso cambiario). */
    tcrBrecha: number | null;
    tcrNota: string;
    /** Índice de Precios Fronterizos Salto-Concordia (%): cuánto más caro es Salto que Concordia. */
    ipfFrontera: number | null;
    ipfNota: string;
    asof: string;
    source: string;
  };
  deuda: {
    brutaPct: number | null; // % del PIB
    totalUsd: number | null; // USD millones
    asof: string;
    source: string;
  };
}

// ─── MÓDULO FISCAL & MONETARIO ────────────────────────────────────────
export interface FiscalData {
  resultadoGlobal: {
    pctPib: number | null; // resultado global del Sector Público (móvil 12m, % PIB)
    periodo: string;
    series: number[]; // resultado global reciente
    periodos?: string[];
    source: string;
  };
  resultadoPrimario: { pctPib: number | null; periodo: string; source: string };
  /** Regla fiscal (3 pilares): resultado estructural, tope de gasto, tope de deuda. */
  reglaFiscal: {
    resultadoEstructural: number | null; // % PIB
    topeGastoReal: number | null; // % crecimiento real
    deudaNetaTope: number | null; // USD millones tope de endeudamiento neto
    cumple: boolean | null;
    nota: string;
    source: string;
  };
  deuda: {
    brutaPct: number | null; // % PIB
    netaPct: number | null;
    monedaLocalPct: number | null; // % de la deuda en moneda local (pesos/UI)
    asof: string;
    source: string;
  };
  recaudacion: {
    varRealInteranual: number | null; // % real i/a
    periodo: string;
    source: string;
  };
  tasaPolitica: { valor: number | null; nombre: string; asof: string; source: string };
  reservas: { valorUsd: number | null; asof: string; source: string };
  /** Base monetaria (Emisión, saldo fin de mes; millones de pesos). */
  baseMonetaria: { valorMM: number | null; asof: string; source: string };
  /** Expectativas de inflación de la encuesta del BCU. */
  expectativas: { inflacion12m: number | null; inflacion24m: number | null; asof: string; source: string };
}

// ─── MÓDULO D — Noticias ──────────────────────────────────────────────
export type NewsTag = 'Económico' | 'Político' | 'Social' | 'Internacional' | 'Sectorial';

export interface Noticia {
  id: string;
  t: string;
  mins: number;
  fuente: string;
  tag: NewsTag;
  titular: string;
  resumen: string;
  breaking: boolean;
  body?: string;
  keywords?: string[];
  relacionados?: string[];
  url?: string;
}

// ─── MÓDULO E — Calendario ────────────────────────────────────────────
export type EventTone = 'info' | 'accent' | 'neg' | 'neutral';

export interface Evento {
  d: number;
  tag: string;
  title: string;
  tone: EventTone;
}

// ─── MÓDULO F — Fuentes ───────────────────────────────────────────────
export type FuenteStatus = 'ok' | 'lag' | 'live' | 'cold' | 'down';

export interface Fuente {
  id: string;
  name: string;
  latency: number | null;
  status: FuenteStatus;
  last: string;
}

// ─── MÓDULO Z — Análisis (capa de inteligencia sobre los datos) ────────
// Juicio analítico explícito y fechado: tesis, semáforo por dimensión,
// proyecciones de consenso, escenarios, riesgos/catalizadores y lecturas por
// pestaña. Se distingue siempre del dato duro (fuente) con la etiqueta «lectura».
export type Estado = 'pos' | 'neutral' | 'neg';
export type Tendencia = 'mejora' | 'estable' | 'empeora';

export interface SemaforoItem {
  id: string;
  dimension: string;
  estado: Estado;
  /** 1 (frágil) – 5 (sólido). */
  score: number;
  tendencia: Tendencia;
  /** Dato que ancla la evaluación (p. ej. «IPC 4,9% i/a»). */
  ancla: string;
  lectura: string;
}

export interface Proyeccion {
  fuente: string;
  fecha: string;
  pib2026: number | null;
  pib2027: number | null;
  ipc2026: number | null;
  ipc2027: number | null;
  tc2026: number | null;
  fiscal2026: number | null; // resultado global % PIB
}

export interface Escenario {
  id: 'base' | 'optimista' | 'riesgo';
  nombre: string;
  probabilidad: number; // %
  pib2027: number | null;
  ipc2027: number | null;
  narrativa: string;
  gatillos: string[];
}

export interface RiesgoItem {
  titulo: string;
  detalle: string;
  tipo: 'riesgo' | 'oportunidad';
  impacto: 'alto' | 'medio' | 'bajo';
  horizonte: string;
}

export interface AnalisisData {
  asof: string;
  tesis: { titulo: string; bajada: string; puntos: string[] };
  semaforo: SemaforoItem[];
  proyecciones: Proyeccion[];
  escenarios: Escenario[];
  riesgos: RiesgoItem[];
  /** Lectura analítica por pestaña (agro, mercados, actividad, energia, externo, fiscal). */
  lecturas: Record<string, string>;
  /** Lectura breve por indicador (id de KPI → texto), mostrada en el modal. */
  kpiLecturas: Record<string, string>;
}
