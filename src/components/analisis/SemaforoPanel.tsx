import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { estadoColor } from '../../analytics';
import type { SemaforoItem } from '../../types';

interface SemaforoPanelProps {
  items: SemaforoItem[];
  compact?: boolean;
}

const TREND = { mejora: ['↗', 'mejora', 'var(--pos)'], estable: ['→', 'estable', 'var(--fg-muted)'], empeora: ['↘', 'empeora', 'var(--neg)'] } as const;

function Score({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex gap-[3px]" aria-label={`${score} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="h-1.5 w-4 rounded-full" style={{ background: i <= score ? color : 'var(--border-strong)' }} />
      ))}
    </div>
  );
}

/** Semáforo macro: estado (1–5) y tendencia de cada dimensión, con su ancla. */
export function SemaforoPanel({ items, compact }: SemaforoPanelProps) {
  const prom = items.reduce((a, b) => a + b.score, 0) / Math.max(1, items.length);
  return (
    <Panel className="h-full flex flex-col">
      <SectionTitle
        id="Z1"
        title="Semáforo macro"
        sub="Solidez por dimensión (1 frágil · 5 sólido) y hacia dónde va"
        right={<span className="mono text-[11px]">prom. <span style={{ color: 'var(--fg)' }}>{prom.toFixed(1).replace('.', ',')}</span>/5</span>}
      />
      <div className={`grid gap-px flex-1 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2 xl:grid-cols-4'}`} style={{ background: 'var(--border)' }}>
        {items.map((it) => {
          const color = estadoColor(it.estado);
          const [arrow, tlabel, tcolor] = TREND[it.tendencia];
          return (
            <div key={it.id} className="px-4 py-3 flex flex-col gap-1.5" style={{ background: 'var(--bg-elev)' }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 18%, transparent)` }} />
                  <span className="text-[12.5px] font-medium truncate">{it.dimension}</span>
                </div>
                <span className="mono text-[10px] shrink-0" style={{ color: tcolor }}>
                  {arrow} {tlabel}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Score score={it.score} color={color} />
                <span className="mono text-[10px] text-muted truncate">{it.ancla}</span>
              </div>
              <p className="text-[11.5px] text-muted leading-snug">{it.lectura}</p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
