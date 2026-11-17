// Frescura de un indicador: cuán viejo es su último dato respecto de lo que
// cabe esperar para su periodicidad. MISMO archivo en el front
// (Front_Tablero_URU/src/frescura.ts): mantener ambos idénticos.
//
// Umbral = días de vigencia + rezago habitual de publicación. Por ejemplo, el
// desempleo de septiembre lo publica el INE a fines de octubre: un dato mensual
// de 48 días está «al día». Hasta 2× el umbral es «rezago»; más, «desactualizado».

export type Periodicidad = 'diaria' | 'semanal' | 'mensual' | 'trimestral' | 'semestral' | 'anual';
export type EstadoFrescura = 'al_dia' | 'rezago' | 'desactualizado';

export const UMBRAL_DIAS: Record<Periodicidad, number> = {
  diaria: 4,
  semanal: 14,
  mensual: 75,
  trimestral: 170,
  semestral: 290,
  anual: 500,
};

export function frescura(
  fechaIso: string | null | undefined,
  periodicidad: Periodicidad | string | null | undefined,
  hoy: Date = new Date(),
): { estado: EstadoFrescura; dias: number } | null {
  if (!fechaIso || !periodicidad) return null;
  const umbral = UMBRAL_DIAS[periodicidad as Periodicidad];
  if (!umbral) return null;
  const t = Date.parse(fechaIso.length === 10 ? `${fechaIso}T00:00:00Z` : fechaIso);
  if (Number.isNaN(t)) return null;
  const dias = Math.max(0, Math.floor((hoy.getTime() - t) / 86_400_000));
  const estado: EstadoFrescura = dias <= umbral ? 'al_dia' : dias <= 2 * umbral ? 'rezago' : 'desactualizado';
  return { estado, dias };
}
