import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { pointer } from 'd3-selection';
import { useTheme } from '../../theme';
import { Delta } from '../primitives/Delta';
import { buildLineChart } from '../../charts/line';
import { polarityOf, deltaTone, trendTone } from '../../tone';
import type { Kpi } from '../../types';

interface KpiModalProps {
  kpi: Kpi | null;
  onClose: () => void;
}

const W = 720;
const H = 220;

export function KpiModal({ kpi, onClose }: KpiModalProps) {
  const theme = useTheme();
  const [hi, setHi] = useState<number | null>(null); // índice bajo el cursor

  // serie histórica REAL (la misma que entrega la BDR / v_indicadores_actuales)
  const data = useMemo(() => (kpi ? kpi.spark : []), [kpi]);
  // Geometría con d3 (escalas + generadores línea/área); las escalas se reusan
  // para ubicar marcadores y para mapear el cursor → índice (x.invert).
  const chart = useMemo(() => buildLineChart(data, W, H, 10), [data]);

  useEffect(() => {
    setHi(null);
  }, [kpi]);

  if (!kpi) return null;

  const tone = trendTone(polarityOf(kpi.id), data);
  const color = tone === 'pos' ? 'var(--pos)' : tone === 'neg' ? 'var(--neg)' : 'var(--fg-muted)';

  // d3.pointer → coordenadas en el espacio del viewBox; x.invert → índice.
  function onMove(e: MouseEvent<SVGRectElement>) {
    const [px] = pointer(e.nativeEvent, e.currentTarget);
    const idx = Math.round(chart.x.invert(px));
    setHi(Math.max(0, Math.min(data.length - 1, idx)));
  }

  // caja del tooltip (en coordenadas del viewBox)
  let tip: { x: number; y: number; bx: number; by: number; lbl: string; val: string } | null = null;
  if (hi != null && chart.points[hi]) {
    const [x, y] = chart.points[hi];
    const boxW = 104;
    const boxH = 34;
    tip = {
      x,
      y,
      bx: Math.min(Math.max(x - boxW / 2, 2), W - boxW - 2),
      by: Math.max(y - boxH - 12, 2),
      lbl: hi === data.length - 1 ? 'dato actual' : `${hi + 1} / ${data.length}`,
      val: kpi.fmt(data[hi]) + (kpi.unit ? ` ${kpi.unit}` : ''),
    };
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div
        className="surface rounded-[6px] w-full max-w-[860px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '86vh' }}
      >
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-token">
          <div>
            <div className="mono text-[9px] uppercase tracking-[0.18em] text-subtle">
              {kpi.label} · serie histórica
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="mono text-[32px] leading-none" style={{ letterSpacing: '-0.02em' }}>
                {kpi.fmt(kpi.value)}
              </span>
              {kpi.unit && <span className="mono text-[12px] text-muted">{kpi.unit}</span>}
              <Delta value={kpi.delta} label={kpi.deltaLabel} sentiment={deltaTone(polarityOf(kpi.id), kpi.delta)} />
            </div>
            <div className="mt-1 text-[11px] text-muted max-w-[640px] leading-snug">{kpi.def}</div>
          </div>
          <button
            onClick={onClose}
            className="mono text-[10px] uppercase tracking-wider text-muted hover:text-accent"
          >
            cerrar [esc]
          </button>
        </div>
        <div className="p-5">
          <svg key={theme} viewBox={`0 0 ${W} ${H}`} className="w-full block" style={{ overflow: 'visible' }}>
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1="0"
                y1={H * t}
                x2={W}
                y2={H * t}
                strokeWidth="0.5"
                strokeDasharray="2 3"
                style={{ stroke: 'var(--border)' }}
              />
            ))}
            <path d={chart.area} opacity="0.08" style={{ fill: color }} />
            <path d={chart.line} strokeWidth="1.25" style={{ fill: 'none', stroke: color }} />
            {chart.points.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2" style={{ fill: color }} />
            ))}

            {/* tooltip al pasar el cursor */}
            {tip && (
              <g style={{ pointerEvents: 'none' }}>
                <line x1={tip.x} y1={0} x2={tip.x} y2={H} strokeWidth="0.75" strokeDasharray="2 2" style={{ stroke: 'var(--border-strong)' }} />
                <circle cx={tip.x} cy={tip.y} r="3.2" strokeWidth="1.5" style={{ fill: color, stroke: 'var(--bg-elev)' }} />
                <rect x={tip.bx} y={tip.by} width="104" height="34" rx="4" style={{ fill: 'var(--bg-elev)', stroke: 'var(--border-strong)' }} />
                <text x={tip.bx + 8} y={tip.by + 13} fontSize="10" fontFamily='"JetBrains Mono", monospace' style={{ fill: 'var(--fg-subtle)' }}>
                  {tip.lbl}
                </text>
                <text x={tip.bx + 8} y={tip.by + 27} fontSize="13" fontFamily='"JetBrains Mono", monospace' style={{ fill: 'var(--fg)' }}>
                  {tip.val}
                </text>
              </g>
            )}

            {/* capa transparente que captura el cursor en toda el área */}
            <rect
              x="0"
              y="0"
              width={W}
              height={H}
              fill="transparent"
              style={{ cursor: 'crosshair' }}
              onMouseMove={onMove}
              onMouseLeave={() => setHi(null)}
            />
          </svg>
          <div className="mt-2 flex items-center justify-between mono text-[10px] text-subtle uppercase tracking-wider">
            <span>← histórico</span>
            <span>{data.length} datos reales</span>
            <span>{kpi.asof}</span>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-token grid grid-cols-3 gap-6 text-[11px]">
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Fuente</div>
            <div className="mt-0.5">{kpi.source}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Última actualización</div>
            <div className="mt-0.5 mono">{kpi.asof}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Conexión</div>
            <div className="mt-0.5 text-muted">BDR · vista v_indicadores_actuales</div>
          </div>
        </div>
      </div>
    </div>
  );
}
