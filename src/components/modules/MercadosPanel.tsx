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
      <SectionTitle id="C ·" title="Mercados · crédito soberano" right={<span className="text-pos">grado inversor</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* UBI — riesgo país */}
        <div className="px-4 py-3 border-b border-token">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">UBI · riesgo país (República AFAP)</div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="mono text-[26px]">{data.ubi.value.toLocaleString('es-UY')}</span>
                <span className="mono text-[10px] text-subtle">pb</span>
                <Delta
                  value={data.ubi.chg}
                  label={`${data.ubi.chg > 0 ? '+' : ''}${data.ubi.chg}`}
                  sentiment={deltaTone('down', data.ubi.chg)}
                />
              </div>
              <div className="mono text-[9.5px] text-subtle mt-1">spread soberano · el más bajo de la región</div>
              <div className="mt-1.5 inline-block mono text-[9px] uppercase tracking-wider px-1.5 py-[2px] rounded-[4px] bg-accent-soft text-accent">
                último dato verificado 18-may · fuente no accesible en este corte
              </div>
            </div>
            <Sparkline data={data.ubi.series} sentiment={trendTone('down', data.ubi.series)} width={140} height={40} />
          </div>
        </div>

        {/* grado inversor */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Estatus grado inversor</div>
            <div className="mono text-[14px] text-pos">{data.gradoInversor.agencias} agencias</div>
          </div>
          <div className="text-[11px] text-muted mt-1 leading-snug">{data.gradoInversor.nota}</div>
        </div>

        {/* ratings */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="eyebrow">Calificación soberana vigente</span>
            <span className="mono text-[9px] text-subtle">● = escalones sobre grado inversor</span>
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
                    className={`mono text-[9px] uppercase tracking-wider ${
                      r.outlook === 'Negativo' ? 'text-neg' : r.outlook === 'Positivo' ? 'text-pos' : 'text-muted'
                    }`}
                  >
                    {r.outlook}
                  </span>
                  <span className="mono text-[9px] text-subtle w-16 text-right">{r.actualizado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
