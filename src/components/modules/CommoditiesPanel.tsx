import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { deltaTone } from '../../tone';
import type { Commodity } from '../../types';

interface CommoditiesPanelProps {
  data: Commodity[];
}

const fmtPrecio = (v: number) =>
  v >= 100 ? v.toLocaleString('es-UY', { maximumFractionDigits: 0 }) : v.toFixed(2).replace('.', ',');

function Chg({ v, pol }: { v: number | null; pol: Commodity['polarity'] }) {
  if (v == null) return <span className="mono text-[11px] text-subtle">—</span>;
  return (
    <Delta
      value={v}
      label={`${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`}
      sentiment={pol === 'none' ? 'neutral' : deltaTone(pol, v)}
    />
  );
}

export function CommoditiesPanel({ data }: CommoditiesPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="X" title="Precios de exportación" sub="Referencias internacionales y locales que mueven las divisas del país" right={<span>INAC · CBOT · GDT</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-12 px-4 pt-2.5 pb-1.5 eyebrow">
          <div className="col-span-5">Producto</div>
          <div className="col-span-3 text-right">Precio</div>
          <div className="col-span-2 text-right">Δ mes</div>
          <div className="col-span-2 text-right">Δ i/a</div>
        </div>
        {data.map((c) => (
          <div key={c.id} className="grid grid-cols-12 items-center px-4 py-2.5 border-t border-token row-hover" title={c.nota}>
            <div className="col-span-5 min-w-0">
              <div className="text-[12px] truncate">{c.label}</div>
              <div className="mono text-[9px] text-subtle truncate">
                {c.unit} · {c.asof} · {c.source}
              </div>
            </div>
            <div className="col-span-3 text-right mono text-[13.5px]">{fmtPrecio(c.value)}</div>
            <div className="col-span-2 text-right">
              <Chg v={c.chgMensual} pol={c.polarity} />
            </div>
            <div className="col-span-2 text-right">
              <Chg v={c.chgAnual} pol={c.polarity} />
            </div>
            {c.nota && <div className="col-span-12 text-[11px] text-muted mt-1 leading-snug">{c.nota}</div>}
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-token text-[11px] text-muted leading-snug">
        La carne (novillo), la celulosa, la soja y los lácteos son los principales generadores de divisas. Pasá el
        cursor por cada fila para ver la nota completa.
      </div>
    </Panel>
  );
}
