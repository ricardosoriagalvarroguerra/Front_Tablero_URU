import { useState } from 'react';
import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { UruguayMap } from '../UruguayMap';
import type { DepartamentoActividad } from '../../types';

interface DepartamentosPanelProps {
  departamentos: DepartamentoActividad[];
  asof?: string;
}

const fmt = (v: number | null) => (v == null ? 's/d' : v.toFixed(0));

export function DepartamentosPanel({ departamentos, asof }: DepartamentosPanelProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Orden por valor de actividad descendente (Montevideo y el área metropolitana
  // concentran el peso económico; el litoral y el norte, la producción agro).
  const ordered = [...departamentos].sort((a, b) => (b.valor ?? -1) - (a.valor ?? -1));
  const vals = ordered.map((r) => r.valor).filter((v): v is number => v != null);
  const min = vals.length ? Math.min(...vals) : 0;
  const max = vals.length ? Math.max(...vals) : 1;
  const range = max - min || 1;
  const opacityOf = (v: number | null) => (v == null ? 0.06 : 0.16 + ((v - min) / range) * 0.72);

  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle
        id="DP ·"
        title="Actividad económica por departamento"
        right={<span>{asof ?? ''}</span>}
      />
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* map */}
        <div className="relative flex-1 min-h-[340px] md:min-h-0 p-3 md:p-4" style={{ minWidth: 0 }}>
          <UruguayMap departamentos={departamentos} hovered={hovered} setHovered={setHovered} />
        </div>

        {/* legend / list */}
        <div className="w-full md:w-[240px] lg:w-[260px] flex flex-col border-t md:border-t-0 md:border-l border-token shrink-0">
          <div className="px-3 h-8 flex items-center border-b border-token shrink-0">
            <div className="eyebrow">19 departamentos</div>
          </div>
          <div className="overflow-y-auto scrollbar-thin flex-1">
            {ordered.map((r) => (
              <button
                key={r.codigo}
                onMouseEnter={() => setHovered(r.codigo)}
                onMouseLeave={() => setHovered(null)}
                className="w-full text-left flex items-center gap-2 px-3 py-2 border-b border-token last:border-b-0 row-hover"
                style={hovered === r.codigo ? { background: 'var(--bg-sunk)' } : {}}
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: 'var(--accent)', opacity: opacityOf(r.valor) }}
                />
                <span className="text-[11px] text-muted flex-1 truncate">
                  {r.nombre}
                </span>
                <span className="mono text-[13px] tabular-nums shrink-0">{fmt(r.valor)}</span>
                {r.valorAlt != null && (
                  <span className="text-[11px] text-subtle shrink-0 w-12 text-right">
                    {r.valorAlt.toFixed(1)}%
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-token text-[11px] text-subtle shrink-0" title="Índice de peso económico (base 100 = Montevideo) y participación en el PIB nacional, estimación a partir del PIB departamental de la OPP.">
            Base 100 = Montevideo · OPP
          </div>
        </div>
      </div>
    </Panel>
  );
}
