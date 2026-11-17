import { Panel } from '../primitives/Panel';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { polarityOf, deltaTone, trendTone } from '../../tone';
import type { Kpi } from '../../types';

interface KpiGroupProps {
  title: string;
  items: Kpi[];
  onOpen?: (k: Kpi) => void;
}

export function KpiGroup({ title, items, onOpen }: KpiGroupProps) {
  return (
    <Panel className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3.5 h-9 border-b border-token">
        <span className="text-[11.5px] font-semibold">{title}</span>
        <span className="mono text-[9px] text-subtle">{items.length}</span>
      </div>
      <div className="flex flex-col flex-1">
        {items.map((k) => {
          const pol = polarityOf(k.id);
          return (
            <button
              key={k.id}
              onClick={() => onOpen && onOpen(k)}
              className="w-full text-left px-3.5 py-2 border-b border-token last:border-b-0 row-hover flex-1"
              title={k.def}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="mono text-[9.5px] uppercase tracking-[0.1em] text-subtle truncate">{k.label}</span>
                <span className="mono text-[9px] text-subtle shrink-0">{k.asof}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="mono text-[17px] tabular-nums leading-none tracking-[-0.02em] shrink-0">
                  {k.fmt(k.value)}
                  {k.unit && <span className="text-subtle text-[9.5px] tracking-normal"> {k.unit}</span>}
                </span>
                <span className="flex-1 min-w-0 overflow-hidden">
                  <Delta compact value={k.delta} label={k.deltaLabel} sentiment={deltaTone(pol, k.delta)} />
                </span>
                <Sparkline data={k.spark} sentiment={trendTone(pol, k.spark)} width={44} height={20} />
              </div>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
