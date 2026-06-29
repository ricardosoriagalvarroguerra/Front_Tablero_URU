import { useMemo } from 'react';
import { useTheme } from '../../theme';
import { Delta } from '../primitives/Delta';
import { buildLineChart } from '../../charts/line';
import { polarityOf, deltaTone, trendTone } from '../../tone';
import type { Kpi } from '../../types';

interface FeaturedKpiCardProps {
  k: Kpi;
  onClick?: (k: Kpi) => void;
}

const W = 300;
const H = 60;

export function FeaturedKpiCard({ k, onClick }: FeaturedKpiCardProps) {
  const theme = useTheme();
  const pol = polarityOf(k.id);
  const tone = trendTone(pol, k.spark);
  const color = tone === 'pos' ? 'var(--pos)' : tone === 'neg' ? 'var(--neg)' : 'var(--fg-muted)';

  // Gráfico de área con d3 (escala lineal + generadores línea/área, curva monótona).
  const chart = useMemo(() => buildLineChart(k.spark, W, H, 4), [k.spark]);

  return (
    <button
      onClick={() => onClick && onClick(k)}
      className="surface rounded-[6px] text-left flex flex-col p-4 hover:ring-accent transition-shadow"
      style={{ minHeight: 168 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted">{k.label}</div>
        <Delta value={k.delta} label={k.deltaLabel} sentiment={deltaTone(pol, k.delta)} />
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="mono text-[34px] font-medium leading-none" style={{ letterSpacing: '-0.02em' }}>
          {k.fmt(k.value)}
        </span>
        {k.unit && <span className="mono text-[12px] text-muted">{k.unit}</span>}
        {k.extra && (
          <span className="ml-1 mono text-[11px]" style={{ color: 'var(--neg)' }}>
            {k.extra.label} {k.extra.value}
          </span>
        )}
      </div>

      <div className="mt-auto pt-3">
        <svg
          key={theme}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full block"
          style={{ height: 60 }}
          preserveAspectRatio="none"
        >
          <path d={chart.area} opacity="0.1" style={{ fill: color }} />
          <path
            d={chart.line}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ fill: 'none', stroke: color }}
          />
        </svg>
        <div className="mt-1.5 flex items-center justify-between mono text-[9px] text-subtle uppercase tracking-wider">
          <span>{k.spark.length} datos</span>
          <span>{k.asof}</span>
        </div>
      </div>
    </button>
  );
}
