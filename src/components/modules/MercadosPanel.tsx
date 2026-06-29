import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { deltaTone, trendTone } from '../../tone';
import type { MercadosData } from '../../types';

interface MercadosPanelProps {
  data: MercadosData;
}

export function MercadosPanel({ data }: MercadosPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="C ·" title="Mercados · crédito soberano" right={<span className="text-pos">grado inversor</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* UBI — riesgo país */}
        <div className="px-3 py-3 border-b border-token">
          <div className="flex items-center justify-between">
            <div>
              <div className="mono text-[9px] uppercase tracking-wider text-subtle">UBI · riesgo país (República AFAP)</div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="mono text-[26px]">{data.ubi.value.toLocaleString('es-UY')}</span>
                <span className="mono text-[10px] text-subtle">pb</span>
                <Delta
                  value={-data.ubi.chg}
                  label={`${data.ubi.chg > 0 ? '+' : ''}${data.ubi.chg}`}
                  sentiment={deltaTone('down', data.ubi.chg)}
                />
              </div>
              <div className="mono text-[9px] text-subtle mt-0.5">spread soberano · uno de los más bajos de la región</div>
            </div>
            <Sparkline data={data.ubi.series} sentiment={trendTone('down', data.ubi.series)} width={140} height={40} />
          </div>
        </div>

        {/* grado inversor */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Estatus grado inversor</div>
            <div className="mono text-[14px] text-pos">{data.gradoInversor.agencias} agencias</div>
          </div>
          <div className="mono text-[9px] text-subtle mt-1 leading-snug">{data.gradoInversor.nota}</div>
        </div>

        {/* ratings */}
        <div className="px-3 py-2">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle mb-1.5">Calificación soberana vigente</div>
          <div className="space-y-1">
            {data.ratings.map((r) => (
              <div key={r.agencia} className="flex items-center justify-between text-[11px]">
                <span className="text-muted">{r.agencia}</span>
                <div className="flex items-center gap-2">
                  <span className="mono text-pos">{r.rating}</span>
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
