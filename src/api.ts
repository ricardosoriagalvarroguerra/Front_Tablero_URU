// Cliente del backend (Fastify). Las respuestas ya vienen con la forma que
// consumen los componentes; este módulo sólo tipa y centraliza los fetch.

import type {
  MercadosData,
  AgroData,
  ActividadData,
  EnergiaData,
  ExternoData,
  FiscalData,
  Noticia,
  Evento,
  Fuente,
  Kpi,
} from './types';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5174';

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { signal });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// Los indicadores del API no traen la función fmt(); la reconstruimos aquí.
export interface ApiKpi extends Omit<Kpi, 'fmt' | 'value' | 'unit' | 'def' | 'source'> {
  value: number | null;
  unit: string | null;
  def: string | null;
  source: string | null;
  decimales: number;
}

function makeFmt(codigo: string, decimales: number): (v: number) => string {
  // tipo de cambio (UYU/USD) → prefijo $ con 2 decimales (coma); novillo → USD/kg;
  // 0 decimales → miles (UBI pb, reservas); resto → coma decimal fija (es-UY).
  if (codigo === 'tipo_cambio') return (v) => '$' + v.toFixed(2).replace('.', ',');
  if (codigo === 'novillo') return (v) => v.toFixed(2).replace('.', ',');
  if (decimales === 0) return (v) => v.toLocaleString('es-UY');
  return (v) => v.toFixed(decimales).replace('.', ',');
}

export function toKpi(k: ApiKpi): Kpi {
  return {
    ...k,
    value: k.value ?? 0,
    unit: k.unit ?? undefined,
    def: k.def ?? '',
    source: k.source ?? '',
    fmt: makeFmt(k.id, k.decimales),
  };
}

export const api = {
  indicadores: (signal?: AbortSignal) => get<ApiKpi[]>('/api/indicadores', signal),
  agro: (signal?: AbortSignal) => get<AgroData>('/api/agro', signal),
  mercados: (signal?: AbortSignal) => get<MercadosData>('/api/mercados', signal),
  actividad: (signal?: AbortSignal) => get<ActividadData>('/api/actividad', signal),
  energia: (signal?: AbortSignal) => get<EnergiaData>('/api/energia', signal),
  externo: (signal?: AbortSignal) => get<ExternoData>('/api/externo', signal),
  fiscal: (signal?: AbortSignal) => get<FiscalData>('/api/fiscal', signal),
  noticias: (signal?: AbortSignal) => get<Noticia[]>('/api/noticias', signal),
  noticia: (codigo: string) => get<Noticia>(`/api/noticias/${codigo}`),
  eventos: (signal?: AbortSignal) => get<Evento[]>('/api/eventos', signal),
  fuentes: (signal?: AbortSignal) => get<Fuente[]>('/api/fuentes', signal),
};
