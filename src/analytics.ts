// Motor analítico del tablero: indicadores DERIVADOS calculados en el cliente a
// partir de los datos de fuente (no son datos nuevos, son relaciones entre datos).
// Cada derivado trae su fórmula explícita y una interpretación por reglas
// transparentes, para que el usuario vea el razonamiento y no sólo la cifra.

import type { Kpi, FiscalData, Estado } from './types';

/** Meta de inflación del BCU: rango 3%–6%, centro 4,5% (horizonte 24 meses). */
export const META = { piso: 3, centro: 4.5, techo: 6 } as const;
/** Crecimiento potencial de referencia: Comité de Expertos del MEF (2026). */
export const POTENCIAL = 1.9;

export interface Derivado {
  id: string;
  label: string;
  value: number | null;
  unit: string;
  formula: string;
  estado: Estado;
  lectura: string;
}

const c = (v: number, d = 1) => v.toFixed(d).replace('.', ',');
const sg = (v: number, d = 1) => `${v > 0 ? '+' : ''}${c(v, d)}`;

function val(kpis: Kpi[], id: string): number | null {
  const k = kpis.find((x) => x.id === id);
  return k ? k.value : null;
}

export function derivados(kpis: Kpi[], fiscal: FiscalData): Derivado[] {
  const ipc = val(kpis, 'ipc_interanual');
  const tpm = fiscal.tasaPolitica.valor ?? val(kpis, 'tpm');
  const e12 = fiscal.expectativas.inflacion12m;
  const e24 = fiscal.expectativas.inflacion24m ?? val(kpis, 'expectativas_inflacion');
  const des = val(kpis, 'desempleo');
  const pib = val(kpis, 'pib');
  const rg = fiscal.resultadoGlobal.pctPib;
  const rp = fiscal.resultadoPrimario.pctPib;

  const out: Derivado[] = [];

  // 1. Tasa real ex-ante: postura monetaria efectiva.
  if (tpm != null && e12 != null) {
    const r = tpm - e12;
    out.push({
      id: 'tasa_real',
      label: 'Tasa real ex-ante',
      value: r,
      unit: 'pp',
      formula: `TPM ${c(tpm, 2)}% − expectativa 12m ${c(e12, 2)}%`,
      estado: r >= 1.5 ? 'pos' : r >= 0 ? 'neutral' : 'neg',
      lectura:
        r >= 2
          ? 'Postura contractiva: la tasa supera holgadamente la inflación esperada; frena crédito y consumo.'
          : r >= 1
            ? 'Postura moderadamente contractiva, consistente con llevar la inflación al centro de la meta.'
            : r >= 0
              ? 'Postura cercana a neutral: poco margen si la inflación sigue subiendo.'
              : 'Tasa real negativa: la política monetaria es expansiva frente a la inflación esperada.',
    });
  }

  // 2. Brecha de inflación vs el centro de la meta.
  if (ipc != null) {
    const b = ipc - META.centro;
    const dentro = ipc >= META.piso && ipc <= META.techo;
    out.push({
      id: 'brecha_meta',
      label: 'Brecha vs centro de la meta',
      value: b,
      unit: 'pp',
      formula: `IPC ${c(ipc, 2)}% − centro ${c(META.centro)}%`,
      estado: !dentro ? 'neg' : Math.abs(b) <= 0.25 ? 'pos' : 'neutral',
      lectura: !dentro
        ? `Fuera del rango ${META.piso}–${META.techo}%: el BCU queda obligado a reaccionar.`
        : b > 0.25
          ? 'Dentro del rango pero por encima del centro: presiona al COPOM a no bajar (o subir) la TPM.'
          : b < -0.5
            ? 'Por debajo del centro: abre espacio para recortes de tasa.'
            : 'Prácticamente en el centro de la meta: régimen anclado.',
    });
  }

  // 3. Anclaje de expectativas (24 meses vs centro).
  if (e24 != null) {
    const a = e24 - META.centro;
    out.push({
      id: 'anclaje',
      label: 'Anclaje de expectativas 24m',
      value: a,
      unit: 'pp',
      formula: `Expectativa 24m ${c(e24, 2)}% − centro ${c(META.centro)}%`,
      estado: Math.abs(a) <= 0.3 ? 'pos' : Math.abs(a) <= 0.8 ? 'neutral' : 'neg',
      lectura:
        Math.abs(a) <= 0.3
          ? 'Expectativas ancladas al centro: credibilidad del BCU intacta.'
          : a > 0
            ? 'Expectativas por encima del centro: el mercado duda de la convergencia.'
            : 'Expectativas por debajo del centro.',
    });
  }

  // 4. Índice de miseria (Okun): desempleo + inflación.
  if (des != null && ipc != null) {
    const m = des + ipc;
    out.push({
      id: 'miseria',
      label: 'Índice de miseria',
      value: m,
      unit: 'pts',
      formula: `Desempleo ${c(des)}% + IPC ${c(ipc, 2)}%`,
      estado: m <= 11 ? 'pos' : m <= 13.5 ? 'neutral' : 'neg',
      lectura:
        m <= 11
          ? 'Nivel bajo para la historia uruguaya (promedio 2010-2024 ≈ 15): bienestar macro favorable.'
          : m <= 13.5
            ? 'Nivel intermedio; por debajo del promedio histórico (~15) pero sin holgura.'
            : 'Nivel elevado: combinación de inflación y desempleo que erosiona el bienestar.',
    });
  }

  // 5. Esfuerzo fiscal: intereses implícitos = primario − global.
  if (rg != null && rp != null) {
    const it = rp - rg;
    out.push({
      id: 'intereses',
      label: 'Carga de intereses implícita',
      value: it,
      unit: '% PIB',
      formula: `Primario ${sg(rp)}% − global ${sg(rg)}%`,
      estado: it <= 2.5 ? 'neutral' : 'neg',
      lectura: `La deuda cuesta ~${c(it)} pp del PIB por año en intereses: aun con primario equilibrado persistiría un déficit global.`,
    });
  }

  // 6. Crecimiento vs potencial (Comité de Expertos del MEF: ~1,9%).
  if (pib != null) {
    const g = pib - POTENCIAL;
    out.push({
      id: 'brecha_producto',
      label: 'Crecimiento vs potencial',
      value: g,
      unit: 'pp',
      formula: `PIB i/a ${c(pib)}% − potencial ~${c(POTENCIAL)}%`,
      estado: g >= 0 ? 'pos' : g >= -1 ? 'neutral' : 'neg',
      lectura:
        g >= 0
          ? 'La economía crece en o por encima de su potencial.'
          : g >= -1
            ? 'Crecimiento algo por debajo del potencial: brecha de producto que se abre lentamente.'
            : 'Crecimiento claramente por debajo del potencial: la recaudación y el empleo lo van a sentir.',
    });
  }

  return out;
}

export const estadoColor = (e: Estado) => (e === 'pos' ? 'var(--pos)' : e === 'neg' ? 'var(--neg)' : 'var(--accent)');
export const estadoSoft = (e: Estado) => (e === 'pos' ? 'var(--pos-soft)' : e === 'neg' ? 'var(--neg-soft)' : 'var(--accent-soft)');
