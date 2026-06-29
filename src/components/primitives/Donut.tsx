import { useMemo } from 'react';
import { useTheme } from '../../theme';
import { buildDonut } from '../../charts/line';

interface DonutDatum {
  v: number;
  color: string;
}

interface DonutProps {
  data: DonutDatum[];
  size?: number;
}

export function Donut({ data, size = 64 }: DonutProps) {
  const theme = useTheme();
  const stroke = size / 8;
  // Segmentos del anillo con d3-shape (pie + arc).
  const arcs = useMemo(
    () => buildDonut(data.map((d) => ({ value: d.v, color: d.color })), size, stroke),
    [data, size, stroke],
  );

  return (
    <svg key={theme} width={size} height={size} className="block" viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2},${size / 2})`}>
        {arcs.map((a, i) => (
          <path key={i} d={a.d} style={{ fill: a.color }} />
        ))}
      </g>
    </svg>
  );
}
