// Lógica de color direccional de los indicadores.
//
// Cada indicador tiene una POLARIDAD: si lo "bueno" es que SUBA ('up') o que
// BAJE ('down'), o si es neutral ('none'). El color del delta y de la tendencia
// se calcula a partir de la polaridad + el signo del cambio:
//   inflación que baja   → verde   ·  inflación que sube → rojo
//   reservas que suben    → verde   ·  reservas que bajan → rojo
//   UBI (riesgo) que baja → verde   ·  precio del novillo que sube → verde
//
// Es conocimiento de dominio estable; vive en el cliente (presentación).

import type { Sentiment } from './types';

export type Polarity = 'up' | 'down' | 'none'; // 'up' = más alto es mejor

const POLARITY: Record<string, Polarity> = {
  // precios y monetario
  ipc_mensual: 'down',
  ipc_interanual: 'down',
  expectativas_inflacion: 'down',
  tpm: 'none', // tasa de política: instrumento, no "bueno/malo" per se
  tipo_cambio: 'none', // peso flotante, libremente convertible
  // crédito soberano
  embi: 'down', // menor riesgo país = mejor (Uruguay grado inversor)
  ubi: 'down',
  // actividad y social
  pib: 'up',
  desempleo: 'down',
  salario_real: 'up',
  pobreza: 'down',
  // agro (exportador)
  novillo: 'up', // mayor precio del novillo favorece a Uruguay
  exportaciones: 'up',
  // fiscal y monetario
  resultado_fiscal: 'up', // menor déficit/superávit = bueno
  deuda: 'down',
  reservas: 'up',
};

export const polarityOf = (id: string): Polarity => POLARITY[id] ?? 'none';

/** Color del delta puntual según hacia dónde se movió. */
export function deltaTone(polarity: Polarity, delta: number): Sentiment {
  if (polarity === 'none' || delta === 0) return 'neutral';
  const favorable = polarity === 'up' ? delta > 0 : delta < 0;
  return favorable ? 'pos' : 'neg';
}

/** Color de la tendencia (serie completa: último vs primero). */
export function trendTone(polarity: Polarity, serie: number[] | undefined): Sentiment {
  if (polarity === 'none' || !serie || serie.length < 2) return 'neutral';
  const change = serie[serie.length - 1] - serie[0];
  if (change === 0) return 'neutral';
  const favorable = polarity === 'up' ? change > 0 : change < 0;
  return favorable ? 'pos' : 'neg';
}
