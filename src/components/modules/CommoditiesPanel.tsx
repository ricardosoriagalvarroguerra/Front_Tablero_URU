import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { deltaTone } from '../../tone';
import type { Commodity } from '../../types';

interface CommoditiesPanelProps {
  data: Commodity[];
}

const fmtPrecio = (v: number) =>
  v >= 1000 ? v.toLocaleString('es-UY', { maximumFractionDigits: 0 }) : v.toFixed(2).replace('.', ',');

export function CommoditiesPanel({ data }: CommoditiesPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="X ·" title="Commodities · exportación" right={<span>Trading Economics</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-12 px-3 pt-2 pb-1.5 mono text-[9px] uppercase tracking-wider text-subtle">
          <div className="col-span-5">Commodity</div>
          <div className="col-span-4 text-right">Precio</div>
          <div className="col-span-3 text-right">Δ mes</div>
        </div>
        {data.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-12 items-center px-3 py-2 border-t border-token row-hover"
          >
            <div className="col-span-5">
              <div className="text-[12px]">{c.label}</div>
              <div className="mono text-[9px] text-subtle">{c.unit}</div>
            </div>
            <div className="col-span-4 text-right mono text-[13px]">{fmtPrecio(c.value)}</div>
            <div className="col-span-3 text-right">
              {c.chgMensual != null ? (
                <Delta
                  value={c.polarity === 'up' ? c.chgMensual : -Math.abs(c.chgMensual)}
                  label={`${c.chgMensual > 0 ? '+' : ''}${c.chgMensual.toFixed(1).replace('.', ',')}%`}
                  sentiment={c.polarity === 'none' ? 'neutral' : deltaTone(c.polarity, c.chgMensual)}
                />
              ) : (
                <span className="mono text-[11px] text-subtle">s/d</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-token mono text-[9px] text-subtle leading-snug">
        Precios internacionales que mueven las exportaciones de Uruguay: la carne (novillo), la celulosa, la
        soja y los lácteos son los principales generadores de divisas del país.
      </div>
    </Panel>
  );
}
