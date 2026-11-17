// Organización visual del Módulo A: unos pocos indicadores DESTACADOS (tarjeta
// con gráfico grande) + el resto agrupado por categoría en paneles compactos.
// Los destacados son las tres variables que definen la coyuntura al corte:
// inflación vs meta, el freno de la actividad y la respuesta del BCU.

export const FEATURED = ['ipc_interanual', 'pib', 'tpm'];

/** Banda objetivo dibujada detrás de la serie de un destacado (rango meta BCU). */
export const FEATURED_BAND: Record<string, [number, number]> = {
  ipc_interanual: [3, 6],
};

export interface KpiGroupDef {
  title: string;
  ids: string[];
}

export const GROUPS: KpiGroupDef[] = [
  { title: 'Precios y monetario', ids: ['ipc_mensual', 'expectativas_inflacion', 'tipo_cambio', 'reservas'] },
  { title: 'Empleo, ingresos y agro', ids: ['desempleo', 'salario_real', 'pobreza', 'novillo'] },
  { title: 'Fiscal, crédito y externo', ids: ['resultado_fiscal', 'deuda', 'ubi', 'exportaciones'] },
];

/** Indicadores de la cinta de cotizaciones del encabezado. */
export const TICKER = [
  'tipo_cambio', 'tpm', 'ipc_interanual', 'ipc_mensual', 'expectativas_inflacion', 'pib', 'desempleo',
  'novillo', 'exportaciones', 'reservas', 'resultado_fiscal', 'deuda', 'salario_real', 'pobreza', 'ubi',
];
