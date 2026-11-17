import { useMemo } from 'react';
import { useTheme } from '../../theme';
import { Delta } from '../primitives/Delta';
import { scaleLinear } from 'd3-scale';
import { line as d3line, area as d3area, curveMonotoneX } from 'd3-shape';
import { polarityOf, deltaTone, trendTone } from '../../tone';
import type { Kpi } from '../../types';

interface FeaturedKpiCardProps {
  k: Kpi;
  onClick?: (k: Kpi) => void;
  /** Banda objetivo (p. ej. rango meta de inflación) dibujada detrás de la serie. */
  band?: [number, number];
}

const W = 300;
const H = 64;
const toneVar = (t: 'pos' | 'neg' | 'neutral') =>
  t === 'pos' ? 'var(--pos)' : t === 'neg' ? 'var(--neg)' : 'var(--fg-muted)';

export function FeaturedKpiCard({ k, onClick, band }: FeaturedKpiCardProps) {
  const theme = useTheme();
  const pol = polarityOf(k.id);
  const tone = trendTone(pol, k.spark);
  const color = tone === 'pos' ? 'var(--pos)' : tone === 'neg' ? 'var(--neg)' : 'var(--info)';

  // Escala Y común a la serie y a la banda, para que la banda quede a escala.
  const geo = useMemo(() => {
    const all = band ? [...k.spark, band[0], band[1]] : k.spark;
    let lo = Math.min(...all);
    let hi = Math.max(...all);
    if (lo === hi) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.1;
    const x = scaleLinear().domain([0, Math.max(1, k.spark.length - 1)]).range([2, W - 3]);
    const y = scaleLinear().domain([lo - pad, hi + pad]).range([H, 0]);
    const pts = k.spark.map((v, i) => [x(i), y(v)] as [number, number]);
    const lg = d3line<[number, number]>().x((d) => d[0]).y((d) => d[1]).curve(curveMonotoneX);
    const ag = d3area<[number, number]>().x((d) => d[0]).y0(H).y1((d) => d[1]).curve(curveMonotoneX);
    return { y, path: lg(pts) ?? '', area: ag(pts) ?? '', last: pts[pts.length - 1] };
  }, [k.spark, band]);
  const p0 = k.periodos?.[0];
  const pN = k.periodos?.[k.periodos.length - 1];

  return (
    <button
      onClick={() => onClick && onClick(k)}
      className="card card-hover text-left flex flex-col p-4 h-full"
      style={{ minHeight: 184 }}
      title={k.def}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted">{k.label}</div>
        <Delta value={k.delta} label={k.deltaLabel} sentiment={deltaTone(pol, k.delta)} />
      </div>

      <div className="mt-2.5 flex items-baseline gap-1.5 flex-wrap">
        <span className="mono text-[36px] font-medium leading-none" style={{ letterSpacing: '-0.03em' }}>
          {k.fmt(k.value)}
        </span>
        {k.unit && <span className="mono text-[12px] text-muted">{k.unit}</span>}
      </div>
      {k.extra && (
        <div className="mt-1.5">
          <span
            className="mono text-[9.5px] uppercase tracking-wider px-1.5 py-[2px] rounded-[4px]"
            style={{
              color: toneVar(k.extra.tone),
              background: k.extra.tone === 'pos' ? 'var(--pos-soft)' : k.extra.tone === 'neg' ? 'var(--neg-soft)' : 'var(--bg-sunk)',
            }}
          >
            {k.extra.label} · {k.extra.value}
          </span>
        </div>
      )}

      <div className="mt-auto pt-3 flex-1 flex flex-col justify-end min-h-[80px]">
        <svg key={theme} viewBox={`0 0 ${W} ${H}`} className="w-full block flex-1" style={{ minHeight: 64, maxHeight: 150, overflow: 'visible' }} preserveAspectRatio="none">
          {band && (
            <rect x="0" width={W} y={geo.y(band[1])} height={Math.max(0, geo.y(band[0]) - geo.y(band[1]))} style={{ fill: 'var(--pos-soft)' }} />
          )}
          <path d={geo.area} opacity="0.1" style={{ fill: color }} />
          <path d={geo.path} strokeWidth="1.8" vectorEffect="non-scaling-stroke" style={{ fill: 'none', stroke: color }} />
          
        </svg>
        <div className="mt-1.5 flex items-center justify-between mono text-[9px] text-subtle uppercase tracking-wider">
          <span>{p0 ?? `${k.spark.length} datos`}</span>
          {band && <span className="text-pos normal-case tracking-normal">▮ rango meta</span>}
          <span>{pN ?? k.asof}</span>
        </div>
      </div>
    </button>
  );
}
