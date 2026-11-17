// Hook de datos del tablero. Intenta el backend; si falla, cae a los datos
// embebidos (mockData) para que la UI funcione siempre, online u offline.

import { useEffect, useState } from 'react';
import { api, toKpi } from './api';
import {
  KPIS,
  AGRO,
  MERCADOS,
  ACTIVIDAD,
  ENERGIA,
  EXTERNO,
  FISCAL,
  NOTICIAS,
  EVENTOS,
  FUENTES,
  ANALISIS,
} from './data/mockData';
import type {
  Kpi,
  AgroData,
  MercadosData,
  ActividadData,
  EnergiaData,
  ExternoData,
  FiscalData,
  Noticia,
  Evento,
  Fuente,
  AnalisisData,
  RegionData,
} from './types';
import { evaluarAlertas, type Alerta } from './alertas';

export interface DashboardData {
  indicadores: Kpi[];
  agro: AgroData;
  mercados: MercadosData;
  actividad: ActividadData;
  energia: EnergiaData;
  externo: ExternoData;
  fiscal: FiscalData;
  noticias: Noticia[];
  eventos: Evento[];
  fuentes: Fuente[];
  analisis: AnalisisData;
  /** Comparador regional; vacío hasta que la ingesta del FMI corre en el backend. */
  region: RegionData;
  alertas: Alerta[];
}

const REGION_VACIA: RegionData = { vintage: null, paises: [], indicadores: [], datos: {} };

function fromMock(): DashboardData {
  return {
    indicadores: KPIS,
    agro: AGRO,
    mercados: MERCADOS,
    actividad: ACTIVIDAD,
    energia: ENERGIA,
    externo: EXTERNO,
    fiscal: FISCAL,
    noticias: NOTICIAS,
    eventos: EVENTOS,
    fuentes: FUENTES,
    analisis: ANALISIS,
    region: REGION_VACIA,
    alertas: evaluarAlertas(KPIS),
  };
}

export type DataSource = 'api' | 'mock' | 'loading';

export function useDashboardData(): DashboardData & { source: DataSource; reload: () => void } {
  const [data, setData] = useState<DashboardData>(fromMock);
  const [source, setSource] = useState<DataSource>('loading');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const [indicadores, agro, mercados, actividad, energia, externo, fiscal, noticias, eventos, fuentes] =
          await Promise.all([
            api.indicadores(ctrl.signal),
            api.agro(ctrl.signal),
            api.mercados(ctrl.signal),
            api.actividad(ctrl.signal),
            api.energia(ctrl.signal),
            api.externo(ctrl.signal),
            api.fiscal(ctrl.signal),
            api.noticias(ctrl.signal),
            api.eventos(ctrl.signal),
            api.fuentes(ctrl.signal),
          ]);
        // El análisis es opcional en el backend: si el endpoint no existe (API
        // anterior), se conserva la capa analítica embebida.
        const analisis = await api.analisis(ctrl.signal).catch(() => ANALISIS);
        // Piezas v0.9: si el backend es anterior, se degradan sin romper el resto.
        const [region, alertasApi] = await Promise.all([
          api.region(ctrl.signal).catch(() => REGION_VACIA),
          api.alertas(ctrl.signal).catch(() => null),
        ]);
        const kpis = indicadores.map(toKpi);
        setData({
          indicadores: kpis,
          agro,
          mercados,
          actividad,
          energia,
          externo,
          fiscal,
          noticias,
          eventos,
          fuentes,
          analisis,
          region,
          alertas: alertasApi ?? evaluarAlertas(kpis),
        });
        setSource('api');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setSource('mock'); // mantiene el fallback
      }
    })();
    return () => ctrl.abort();
  }, [tick]);

  return { ...data, source, reload: () => setTick((t) => t + 1) };
}
