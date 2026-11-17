import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { deltaTone, trendTone } from '../../tone';
import type { MercadosData } from '../../types';

interface MercadosPanelProps {
  data: MercadosData;
}

// Escalones por encima del umbral de grado inversor (BBB− / Baa3).
const NOTCH: Record<string, number> = { 'AAA': 9, 'AA+': 8, 'AA': 7, 'AA-': 6, 'A+': 5, 'A': 4, 'A-': 3, 'BBB+': 2, 'BBB': 1, 'BBB-': 0, Aaa: 9, Aa1: 8, Aa2: 7, Aa3: 6, A1: 5, A2: 4, A3: 3, Baa1: 2, Baa2: 1, Baa3: 0 };

export function MercadosPanel({ data }: MercadosPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle title="Crédito soberano" right={<span>grado inversor</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Riesgo país */}
        <div className="px-5 py-4 border-b border-token">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="eyebrow">Riesgo país · {data.ubi.indice ?? 'UBI'}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="mono text-[30px] leading-none">{data.ubi.value.toLocaleString('es-UY')}</span>
                <span className="text-[11px] text-subtle">pb</span>
                <Delta
                  value={data.ubi.chg}
                  label={`${data.ubi.chg > 0 ? '+' : ''}${data.ubi.chg} pb`}
                  sentiment={deltaTone('down', data.ubi.chg)}
                />
              </div>
              {data.ubi.asof && <div className="text-[11px] text-subtle mt-1.5">{data.ubi.asof}</div>}
            </div>
            <Sparkline data={data.ubi.series} sentiment={trendTone('down', data.ubi.series)} width={140} height={40} />
          </div>
          {data.ubi.regional && data.ubi.regional.length > 0 && (
            <div className="mt-4">
              <div className="eyebrow mb-2">En la región</div>
              <div className="flex flex-col gap-1.5">
                {(() => {
                  const max = Math.max(...data.ubi.regional.map((r) => r.pb));
                  return data.ubi.regional.map((r) => (
                    <div key={r.pais} className="grid grid-cols-[72px_1fr_44px] items-center gap-3">
                      <span className={`text-[12px] ${r.pais === 'Uruguay' ? '' : 'text-muted'}`}>{r.pais}</span>
                      <span className="h-1 rounded-full" style={{ background: 'var(--bg-sunk)' }}>
                        <span
                          className="block h-1 rounded-full"
                          style={{ width: `${Math.max(2, (r.pb / max) * 100)}%`, background: r.pais === 'Uruguay' ? 'var(--accent)' : 'var(--fg-subtle)' }}
                        />
                      </span>
                      <span className="mono text-[12px] text-right">{r.pb}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>

        {/* grado inversor */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Estatus grado inversor</div>
            <div className="mono text-[14px] text-pos">{data.gradoInversor.agencias} agencias</div>
          </div>
          <p className="text-[12px] text-muted mt-1.5 leading-snug line-clamp-2 cursor-help" title={data.gradoInversor.nota}>{data.gradoInversor.nota}</p>
        </div>

        {/* ratings */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="eyebrow">Calificación soberana vigente</span>
            <span className="text-[11px] text-subtle">● = escalones sobre grado inversor</span>
          </div>
          <div className="space-y-2">
            {data.ratings.map((r) => (
              <div key={r.agencia} className="flex items-center justify-between text-[11px]">
                <span className="text-muted">{r.agencia}</span>
                <div className="flex items-center gap-2">
                  <span className="flex gap-[2px]" title={`${NOTCH[r.rating] ?? '?'} escalones sobre el umbral de grado inversor`}>
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="w-2.5 h-1.5 rounded-full" style={{ background: i < (NOTCH[r.rating] ?? 0) ? 'var(--pos)' : 'var(--border-strong)' }} />
                    ))}
                  </span>
                  <span className="mono text-pos w-10 text-right">{r.rating}</span>
                  <span
                    className={`text-[11px] ${
                      r.outlook === 'Negativo' ? 'text-neg' : r.outlook === 'Positivo' ? 'text-pos' : 'text-muted'
                    }`}
                  >
                    {r.outlook}
                  </span>
                  <span className="text-[11px] text-subtle w-16 text-right">{r.actualizado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
