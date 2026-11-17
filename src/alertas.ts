// Alertas: reglas explícitas evaluadas sobre los datos vigentes. MISMO archivo
// en el front (Front_Tablero_URU/src/alertas.ts) para el modo sin API: mantener
// ambos idénticos. Cada regla declara su umbral; nada de cajas negras.

import { frescura, type Periodicidad } from './frescura.ts';

export type NivelAlerta = 'alta' | 'media' | 'info';

export interface Alerta {
  id: string;
  nivel: NivelAlerta;
  titulo: string;
  detalle: string;
  indicador: string;
  valor: number | null;
  umbral: number | null;
}

/** Datos mínimos de un indicador que necesitan las reglas. */
export interface DatoAlerta {
  id: string;
  label: string;
  value: number;
  spark?: number[];
  periodos?: string[];
  fecha?: string | null;
  periodicidad?: Periodicidad | string | null;
}

/** Meta de inflación del BCU (rango 3–6%, centro 4,5%). */
const META = { piso: 3, centro: 4.5, techo: 6 };

const c = (v: number, d = 1) => v.toFixed(d).replace('.', ',');

export function evaluarAlertas(kpis: DatoAlerta[], hoy: Date = new Date()): Alerta[] {
  const by = Object.fromEntries(kpis.map((k) => [k.id, k])) as Record<string, DatoAlerta | undefined>;
  const out: Alerta[] = [];
  const push = (a: Alerta) => out.push(a);

  const ipc = by['ipc_interanual']?.value;
  if (ipc != null) {
    if (ipc > META.techo)
      push({ id: 'ipc_techo', nivel: 'alta', titulo: 'Inflación fuera del rango meta', detalle: `IPC ${c(ipc, 2)}% supera el techo de ${META.techo}%.`, indicador: 'ipc_interanual', valor: ipc, umbral: META.techo });
    else if (ipc > META.centro)
      push({ id: 'ipc_centro', nivel: 'media', titulo: 'Inflación sobre el centro de la meta', detalle: `IPC ${c(ipc, 2)}% vs centro ${c(META.centro)}% (rango ${META.piso}–${META.techo}%).`, indicador: 'ipc_interanual', valor: ipc, umbral: META.centro });
    else if (ipc < META.piso)
      push({ id: 'ipc_piso', nivel: 'media', titulo: 'Inflación bajo el piso de la meta', detalle: `IPC ${c(ipc, 2)}% por debajo de ${META.piso}%.`, indicador: 'ipc_interanual', valor: ipc, umbral: META.piso });
  }

  const exp = by['expectativas_inflacion']?.value;
  if (exp != null && exp > 4.75)
    push({ id: 'expectativas', nivel: exp > 5 ? 'alta' : 'media', titulo: 'Expectativas de inflación desancladas', detalle: `Expectativa a 24 meses ${c(exp, 2)}% (umbral 4,75%).`, indicador: 'expectativas_inflacion', valor: exp, umbral: 4.75 });

  const tpm = by['tpm']?.value;
  if (tpm != null && exp != null) {
    const real = tpm - exp;
    if (real < 0.5)
      push({ id: 'tasa_real', nivel: real < 0 ? 'alta' : 'media', titulo: 'Tasa real baja', detalle: `TPM ${c(tpm, 2)}% − expectativa ${c(exp, 2)}% = ${c(real)} pp.`, indicador: 'tpm', valor: real, umbral: 0.5 });
  }

  const pib = by['pib']?.value;
  if (pib != null && pib < 1)
    push({ id: 'pib', nivel: pib < 0 ? 'alta' : 'media', titulo: pib < 0 ? 'Contracción de la actividad' : 'Crecimiento débil', detalle: `PIB ${pib > 0 ? '+' : ''}${c(pib)}% interanual.`, indicador: 'pib', valor: pib, umbral: pib < 0 ? 0 : 1 });

  const fiscal = by['resultado_fiscal']?.value;
  if (fiscal != null && fiscal < -3.5)
    push({ id: 'deficit', nivel: fiscal < -4.5 ? 'alta' : 'media', titulo: 'Déficit fiscal elevado', detalle: `Resultado global ${c(fiscal)}% del PIB (umbral −4,5%).`, indicador: 'resultado_fiscal', valor: fiscal, umbral: -4.5 });

  const deuda = by['deuda']?.value;
  if (deuda != null && deuda > 70)
    push({ id: 'deuda', nivel: 'media', titulo: 'Deuda bruta sobre 70% del PIB', detalle: `Deuda bruta ${c(deuda)}% del PIB.`, indicador: 'deuda', valor: deuda, umbral: 70 });

  const des = by['desempleo']?.value;
  if (des != null && des > 8.5)
    push({ id: 'desempleo', nivel: 'media', titulo: 'Desempleo alto', detalle: `Desempleo ${c(des)}% (umbral 8,5%).`, indicador: 'desempleo', valor: des, umbral: 8.5 });

  const sal = by['salario_real']?.value;
  if (sal != null && sal < 0)
    push({ id: 'salario', nivel: 'media', titulo: 'Caída del salario real', detalle: `Salario real ${c(sal, 2)}% interanual.`, indicador: 'salario_real', valor: sal, umbral: 0 });

  const riesgo = by['embi'];
  if (riesgo) {
    if (riesgo.value > 150)
      push({ id: 'riesgo_nivel', nivel: 'alta', titulo: 'Riesgo país elevado', detalle: `${c(riesgo.value, 0)} pb (umbral 150 pb).`, indicador: 'embi', valor: riesgo.value, umbral: 150 });
    const s = riesgo.spark ?? [];
    if (s.length >= 2) {
      const min = Math.min(...s);
      const i = s.indexOf(min);
      const suba = riesgo.value - min;
      if (suba >= 20)
        push({ id: 'riesgo_suba', nivel: 'info', titulo: 'Riesgo país en suba', detalle: `+${c(suba, 0)} pb desde ${riesgo.periodos?.[i] ?? 'el mínimo de la serie'} (${c(min, 0)} → ${c(riesgo.value, 0)} pb).`, indicador: 'embi', valor: suba, umbral: 20 });
    }
  }

  const res = by['reservas'];
  if (res && res.spark && res.spark.length >= 2) {
    const max = Math.max(...res.spark);
    const caida = (res.value / max - 1) * 100;
    if (caida < -5)
      push({ id: 'reservas', nivel: 'info', titulo: 'Reservas en baja', detalle: `${c(caida)}% vs el máximo de la serie.`, indicador: 'reservas', valor: caida, umbral: -5 });
  }

  const viejos = kpis.filter((k) => frescura(k.fecha, k.periodicidad, hoy)?.estado === 'desactualizado');
  if (viejos.length)
    push({ id: 'frescura', nivel: 'info', titulo: `${viejos.length} indicador${viejos.length > 1 ? 'es' : ''} desactualizado${viejos.length > 1 ? 's' : ''}`, detalle: viejos.map((k) => k.label).join(', '), indicador: viejos[0].id, valor: viejos.length, umbral: null });

  const orden: Record<NivelAlerta, number> = { alta: 0, media: 1, info: 2 };
  return out.sort((a, b) => orden[a.nivel] - orden[b.nivel]);
}
