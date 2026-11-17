import { useEffect, useState } from 'react';
import { Delta } from '../primitives/Delta';
import { SeriesChart } from '../primitives/SeriesChart';
import { Insight } from '../primitives/Insight';
import { polarityOf, deltaTone, trendTone } from '../../tone';
import { FEATURED_BAND } from '../../kpiLayout';
import { FrescuraDot } from '../primitives/FrescuraDot';
import type { Kpi } from '../../types';

interface KpiModalProps {
  kpi: Kpi | null;
  onClose: () => void;
  /** Lectura analítica del tablero para este indicador. */
  lectura?: string;
}

export function KpiModal({ kpi, onClose, lectura }: KpiModalProps) {
  const tieneHist = (kpi?.historico?.length ?? 0) >= 5;
  const [vista, setVista] = useState<'reciente' | 'historico'>('reciente');
  useEffect(() => {
    setVista((kpi?.historico?.length ?? 0) >= 5 ? 'historico' : 'reciente');
  }, [kpi]);
  useEffect(() => {
    if (!kpi) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [kpi]);

  if (!kpi) return null;

  const hist = vista === 'historico' && tieneHist;
  const data = hist ? kpi.historico!.map((h) => h.valor) : kpi.spark;
  const labels = hist ? kpi.historico!.map((h) => h.periodo) : kpi.periodos;
  const pol = polarityOf(kpi.id);
  const tone = trendTone(pol, data);
  const color = tone === 'pos' ? 'var(--pos)' : tone === 'neg' ? 'var(--neg)' : 'var(--fg-muted)';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
  const cambio = data.length > 1 ? data[data.length - 1] - data[0] : 0;
  const unit = kpi.unit ? ` ${kpi.unit}` : '';
  const neg = data.some((v) => v < 0);
  const stats = [
    { l: 'Mínimo', v: kpi.fmt(min) + unit },
    { l: 'Máximo', v: kpi.fmt(max) + unit },
    { l: 'Promedio', v: kpi.fmt(avg) + unit },
    {
      l: `Cambio${labels ? ` ${labels[0]} → ${labels[labels.length - 1]}` : ''}`,
      v: `${cambio > 0 ? '+' : ''}${kpi.fmt(cambio)}`,
      c: deltaTone(pol, cambio),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(3,4,7,0.6)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${kpi.label}: serie histórica`}
    >
      <div className="card w-full max-w-[880px] flex flex-col fade-up overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh' }}>
        <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 border-b border-token">
          <div className="min-w-0">
            <div className="eyebrow flex items-center gap-3">{kpi.label}<FrescuraDot k={kpi} withText /></div>
            <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
              <span className="mono text-[34px] leading-none font-medium" style={{ letterSpacing: '-0.03em' }}>
                {kpi.fmt(kpi.value)}
              </span>
              {kpi.unit && <span className="mono text-[12px] text-muted">{kpi.unit}</span>}
              <Delta value={kpi.delta} label={kpi.deltaLabel} sentiment={deltaTone(pol, kpi.delta)} />
              <span className="mono text-[10px] text-subtle">· {kpi.asof}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-[11.5px] text-muted hover:text-accent shrink-0 surface-sunk rounded-[7px] px-2.5 h-8">
            Cerrar <span className="kbd ml-1">esc</span>
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin">
          {tieneHist && (
            <div className="px-5 pt-4 flex items-center gap-1">
              {(['historico', 'reciente'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVista(v)}
                  className={`text-[12px] px-2.5 h-7 rounded-[6px] ${vista === v ? '' : 'text-muted'}`}
                  style={vista === v ? { background: 'var(--bg-sunk)' } : undefined}
                >
                  {v === 'historico' ? `${kpi.historico![0].periodo}–hoy` : 'Últimos datos'}
                </button>
              ))}
              {hist && kpi.historicoNota && <span className="ml-auto text-[11px] text-subtle">{kpi.historicoNota}</span>}
            </div>
          )}
          <div className="px-5 pt-4">
            <SeriesChart
              data={data}
              labels={labels}
              color={color}
              band={FEATURED_BAND[kpi.id]}
              kind={neg && kpi.id !== 'tipo_cambio' ? 'bars' : 'line'}
              fmt={(v) => kpi.fmt(v)}
              height={230}
              showValues={data.length <= 12}
            />
          </div>
          <div className="px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.l} className="rounded-[10px] px-3 py-2 border border-token">
                <div className="text-[11px] text-subtle truncate" title={s.l}>{s.l}</div>
                <div className={`mono text-[14px] mt-0.5 ${s.c === 'pos' ? 'text-pos' : s.c === 'neg' ? 'text-neg' : ''}`}>{s.v}</div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-3 text-[12.5px] leading-relaxed text-muted">{kpi.def}</div>
          {lectura && (
            <div className="px-5 pb-4">
              <Insight title="Lectura del tablero">{lectura}</Insight>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-token grid grid-cols-3 gap-6 text-[11.5px]">
          <div>
            <div className="eyebrow">Fuente</div>
            <div className="mt-0.5">{kpi.source}</div>
          </div>
          <div>
            <div className="eyebrow">Último dato</div>
            <div className="mt-0.5 mono">{kpi.asof}</div>
          </div>
          <div>
            <div className="eyebrow">Polaridad</div>
            <div className="mt-0.5 text-muted">{pol === 'up' ? 'subir es favorable' : pol === 'down' ? 'bajar es favorable' : 'neutral (instrumento/precio)'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
