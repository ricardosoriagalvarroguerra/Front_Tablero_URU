import { useState } from 'react';
import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { RiesgoItem } from '../../types';

interface RiesgosPanelProps {
  items: RiesgoItem[];
}

const IMP = { alto: 3, medio: 2, bajo: 1 } as const;

/** Mapa de riesgos y oportunidades, ordenado por impacto. */
export function RiesgosPanel({ items }: RiesgosPanelProps) {
  const [f, setF] = useState<'todos' | 'riesgo' | 'oportunidad'>('todos');
  const list = items
    .filter((i) => f === 'todos' || i.tipo === f)
    .sort((a, b) => IMP[b.impacto] - IMP[a.impacto]);
  return (
    <Panel className="h-full flex flex-col">
      <SectionTitle
        id="Z5"
        title="Riesgos y catalizadores"
        sub="Qué puede mover el escenario · ordenado por impacto"
        right={
          <div className="flex gap-1">
            {(['todos', 'riesgo', 'oportunidad'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setF(k)}
                className={`mono text-[9.5px] uppercase tracking-wider px-2 py-1 rounded-[5px] ${f === k ? '' : 'text-subtle hover:text-[color:var(--fg)]'}`}
                style={f === k ? { background: 'var(--bg-sunk)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', color: 'var(--fg)' } : undefined}
              >
                {k === 'todos' ? 'todos' : k === 'riesgo' ? 'riesgos' : 'oportunidades'}
              </button>
            ))}
          </div>
        }
      />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {list.map((r) => {
          const c = r.tipo === 'riesgo' ? 'var(--neg)' : 'var(--pos)';
          return (
            <div key={r.titulo} className="px-4 py-3 border-b border-token last:border-b-0 flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0 w-10">
                <span className="mono text-[13px] leading-none" style={{ color: c }}>{r.tipo === 'riesgo' ? '▼' : '▲'}</span>
                <div className="flex gap-[2px]">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="w-2 h-1 rounded-full" style={{ background: i <= IMP[r.impacto] ? c : 'var(--border-strong)' }} />
                  ))}
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12.5px] font-medium">{r.titulo}</span>
                  <span className="mono text-[9px] uppercase tracking-wider text-subtle">impacto {r.impacto} · {r.horizonte}</span>
                </div>
                <p className="text-[11.5px] text-muted leading-snug mt-0.5">{r.detalle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
