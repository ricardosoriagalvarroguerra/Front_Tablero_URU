import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { MercadosData, Bono } from '../../types';

interface BonosPanelProps {
  data: MercadosData;
}

const MONEDA_LABEL: Record<Bono['moneda'], string> = {
  USD: 'dólares',
  UYU: 'pesos',
  UI: 'unidades indexadas',
};

function BonoRow({ b }: { b: Bono }) {
  return (
    <div className="grid grid-cols-12 items-center py-1.5 text-[12px]">
      <div className="col-span-5">
        <div className="mono text-[10px]">{b.name}</div>
        <div className="text-[10px] text-muted/80 leading-tight">
          {MONEDA_LABEL[b.moneda]}
          {b.tipo === 'sslb' ? ' · SSLB' : ''}
          {b.vencimiento ? ` · ${b.vencimiento}` : ''}
        </div>
      </div>
      <div className="col-span-3 mono text-right">{b.price != null ? b.price.toFixed(2).replace('.', ',') : 's/d'}</div>
      <div className="col-span-2 mono text-right">{b.yield != null ? `${b.yield.toFixed(2).replace('.', ',')}%` : '—'}</div>
      <div className="col-span-2 mono text-right">
        {b.chg != null ? (
          <span className={b.chg < 0 ? 'text-neg' : 'text-pos'}>
            {b.chg > 0 ? '+' : ''}
            {b.chg.toFixed(2).replace('.', ',')}
          </span>
        ) : (
          <span className="text-subtle">—</span>
        )}
      </div>
    </div>
  );
}

export function BonosPanel({ data }: BonosPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="B ·" title="Bonos soberanos · USD / pesos / UI" right={<span>TIR de colocación · MEF/UGD</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* bonos */}
        <div className="px-4 py-2 border-b border-token">
          <div className="grid grid-cols-12 eyebrow pb-1.5">
            <div className="col-span-5">Bono global</div>
            <div className="col-span-3 text-right">Precio</div>
            <div className="col-span-2 text-right">TIR</div>
            <div className="col-span-2 text-right">Δ</div>
          </div>
          {data.bonos.map((b) => (
            <BonoRow key={b.id} b={b} />
          ))}
        </div>

        {/* SSLB */}
        {data.sslb && (
          <div className="px-4 py-2.5">
            <div className="eyebrow mb-1">
              Bono Indexado a Indicadores de Sostenibilidad (SSLB)
            </div>
            <p className="text-[12px] text-muted mt-1.5 leading-snug line-clamp-2 cursor-help" title={data.sslb.nota}>{data.sslb.nota}</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <div className="rounded-[10px] p-3 border border-token flex items-center justify-between">
                <span className="eyebrow">Cupón / step</span>
                <span className="mono text-[12px]">{data.sslb.cupon}</span>
              </div>
              <div className="rounded-[10px] p-3 border border-token">
                <div className="eyebrow mb-0.5">KPI 1 · emisiones GEI</div>
                <div className="text-[11px]">{data.sslb.kpi1}</div>
              </div>
              <div className="rounded-[10px] p-3 border border-token">
                <div className="eyebrow mb-0.5">KPI 2 · bosque nativo</div>
                <div className="text-[11px]">{data.sslb.kpi2}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
