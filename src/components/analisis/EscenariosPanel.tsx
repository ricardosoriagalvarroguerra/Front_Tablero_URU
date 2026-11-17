import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { Escenario } from '../../types';

interface EscenariosPanelProps {
  items: Escenario[];
}

const COLOR = { base: 'var(--info)', optimista: 'var(--pos)', riesgo: 'var(--neg)' } as const;
const f = (v: number | null) => (v == null ? 's/d' : `${v.toFixed(1).replace('.', ',')}%`);

/** Escenarios 2027 con probabilidad subjetiva, narrativa y gatillos observables. */
export function EscenariosPanel({ items }: EscenariosPanelProps) {
  return (
    <Panel className="h-full flex flex-col">
      <SectionTitle id="Z4" title="Escenarios 2027" sub="Probabilidad subjetiva del tablero · qué tendría que pasar" right={<span>lectura propia</span>} />
      {/* barra de probabilidad */}
      <div className="px-4 pt-3">
        <div className="flex h-2 rounded-full overflow-hidden gap-[2px]">
          {items.map((e) => (
            <div key={e.id} style={{ width: `${e.probabilidad}%`, background: COLOR[e.id] }} title={`${e.nombre} ${e.probabilidad}%`} />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3 p-4 flex-1">
        {items.map((e) => (
          <div key={e.id} className="rounded-[8px] p-3.5 flex flex-col gap-2" style={{ background: 'var(--bg-sunk)', borderTop: `2px solid ${COLOR[e.id]}` }}>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold">{e.nombre}</span>
              <span className="mono text-[16px]" style={{ color: COLOR[e.id] }}>{e.probabilidad}%</span>
            </div>
            <div className="flex gap-4 mono text-[10.5px]">
              <span><span className="text-subtle">PIB </span>{f(e.pib2027)}</span>
              <span><span className="text-subtle">IPC </span>{f(e.ipc2027)}</span>
            </div>
            <p className="text-[11.5px] text-muted leading-snug">{e.narrativa}</p>
            <ul className="mt-auto flex flex-col gap-1">
              {e.gatillos.map((g) => (
                <li key={g} className="text-[11px] leading-snug flex gap-1.5">
                  <span style={{ color: COLOR[e.id] }}>›</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
