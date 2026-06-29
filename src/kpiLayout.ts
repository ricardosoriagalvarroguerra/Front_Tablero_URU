// Organización visual del Módulo A: unos pocos indicadores DESTACADOS (tarjeta
// con gráfico grande) + el resto agrupado por categoría en paneles compactos.
// Los tres destacados son los más seguidos de la coyuntura uruguaya: la
// estabilidad de precios dentro del rango meta, el riesgo país grado inversor y
// el crecimiento de la actividad.

export const FEATURED = ['ipc_interanual', 'ubi', 'pib'];

export interface KpiGroupDef {
  title: string;
  ids: string[];
}

export const GROUPS: KpiGroupDef[] = [
  { title: 'Precios y monetario', ids: ['ipc_mensual', 'tpm', 'expectativas_inflacion', 'tipo_cambio'] },
  { title: 'Actividad y social', ids: ['desempleo', 'salario_real', 'novillo'] },
  { title: 'Crédito y fiscal', ids: ['resultado_fiscal', 'deuda', 'reservas'] },
];
