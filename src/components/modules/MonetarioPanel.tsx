import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { FiscalData } from '../../types';

interface MonetarioPanelProps {
  data: FiscalData;
}

const pct = (v: number | null, dec = 2) => (v == null ? 's/d' : `${v.toFixed(dec).replace('.', ',')}%`);

// Rango meta de inflación del BCU (3% – 6%).
const META_PISO = 3;
const META_TECHO = 6;

export function MonetarioPanel({ data }: MonetarioPanelProps) {
  const { reservas, tasaPolitica, expectativas } = data;
  const exp24 = expectativas.inflacion24m;
  const pos = exp24 != null ? Math.max(0, Math.min(1, (exp24 - META_PISO) / (META_TECHO - META_PISO))) * 100 : null;

  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="$$ ·" title="Monetario · BCU" right={<span>BCU</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Reservas */}
        <div className="px-3 py-3 border-b border-token">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle">Activos de reserva del BCU</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="mono text-[24px]">
              {reservas.valorUsd != null ? reservas.valorUsd.toLocaleString('es-UY') : 's/d'}
            </span>
            <span className="mono text-[10px] text-subtle">M USD · {reservas.asof}</span>
          </div>
          <div className="mono text-[9px] text-subtle mt-0.5">{reservas.source}</div>
        </div>

        {/* TPM + Expectativas 24m */}
        <div className="px-3 py-2.5 grid grid-cols-2 gap-3 border-b border-token">
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">{tasaPolitica.nombre || 'Tasa de política (TPM)'}</div>
            <div className="mono text-[20px]">{pct(tasaPolitica.valor)}</div>
            <div className="mono text-[9px] text-subtle">{tasaPolitica.asof}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Expectativas infl. 24m</div>
            <div className="mono text-[20px]">{pct(expectativas.inflacion24m, 1)}</div>
            <div className="mono text-[9px] text-subtle">mediana analistas · {expectativas.asof}</div>
          </div>
        </div>

        {/* Rango meta de inflación */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle mb-1">
            Rango meta BCU · {META_PISO}%–{META_TECHO}%
          </div>
          <div className="relative surface rounded-[3px] h-3 overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="absolute inset-0 hatch" />
            {pos != null && (
              <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, width: 2, background: 'var(--accent)' }} />
            )}
          </div>
          <div className="mt-1 flex items-center justify-between mono text-[9px] text-subtle">
            <span>piso {META_PISO}%</span>
            <span className="text-accent">expectativa 24m {pct(expectativas.inflacion24m, 1)}</span>
            <span>techo {META_TECHO}%</span>
          </div>
          <div className="mono text-[9px] text-subtle mt-1.5">
            Expectativas 12m {pct(expectativas.inflacion12m, 1)} · {expectativas.source}
          </div>
        </div>

        {/* nota régimen */}
        <div className="px-3 py-2.5 mono text-[9px] text-subtle leading-snug">
          El BCU conduce la política monetaria por metas de inflación, fijando la Tasa de Política Monetaria
          (TPM) en cada reunión del COPOM. La meta es un rango de 3% a 6% con horizonte de 24 meses; el peso
          flota libremente y es de libre convertibilidad.
        </div>
      </div>
    </Panel>
  );
}
