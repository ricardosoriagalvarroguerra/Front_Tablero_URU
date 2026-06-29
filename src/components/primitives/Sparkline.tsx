import { useMemo } from 'react';
import { useTheme } from '../../theme';
import { buildLineChart } from '../../charts/line';
import type { Sentiment } from '../../types';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  sentiment?: Sentiment;
  filled?: boolean;
}

const colorOf = (s: Sentiment): string =>
  s === 'pos'
    ? 'var(--pos)'
    : s === 'neg'
      ? 'var(--neg)'
      : s === 'accent'
        ? 'var(--accent)'
        : 'var(--fg-muted)';

export function Sparkline({
  data,
  width = 110,
  height = 24,
  sentiment = 'neutral',
  filled = true,
}: SparklineProps) {
  const theme = useTheme();
  // Geometría con d3 (escala lineal + generadores de línea/área, curva monótona).
  const chart = useMemo(() => buildLineChart(data, width, height, 1.5), [data, width, height]);
  if (!data || !data.length) return null;

  const color = colorOf(sentiment);
  const last = chart.points[chart.points.length - 1];

  return (
    <svg key={theme} width={width} height={height} className="block" style={{ overflow: 'visible' }}>
      {filled && <path d={chart.area} opacity="0.08" style={{ fill: color }} />}
      <path d={chart.line} strokeWidth="1" style={{ fill: 'none', stroke: color }} />
      <circle cx={last[0]} cy={last[1]} r="1.6" style={{ fill: color }} />
    </svg>
  );
}
