import { Fragment } from 'react';
import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { deltaTone, trendTone } from '../../tone';
import type { AgroData, ProductoAgro } from '../../types';

interface AgroResumenProps {
  data: AgroData;
  onVerDetalle: () => void;
}

const precioFmt = (v: number | null) =>
  v == null ? 's/d' : v >= 100 ? v.toLocaleString('es-UY', { maximumFractionDigits: 0 }) : v.toFixed(2).replace('.', ',');

export function AgroResumen({ data, onVerDetalle }: AgroResumenProps) {
  // Productos cabecera del complejo (los de mayor peso exportador).
  const principales = data.productos
    .filter((p) => ['carne', 'celulosa', 'soja', 'lacteos'].includes(p.id))
    .slice(0, 4);

  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle
        id="AG ·"
        title="Agroexportador · resumen"
        right={
          <Fragment>
            <span className="text-accent">●</span>
            <span>
              {data.participacionAgro != null ? `${data.participacionAgro.toFixed(0)}% export.` : 's/d'}
            </span>
          </Fragment>
        }
      />
      <div className="p-3 flex flex-col gap-2 flex-1 min-h-0">
        {principales.map((p: ProductoAgro) => (
          <div key={p.id} className="flex items-center gap-2 px-1.5 py-1.5 rounded-[3px] row-hover">
            <span className="mono text-[10px] uppercase tracking-wider text-muted w-24 shrink-0 truncate">
              {p.nombre}
            </span>
            <span className="mono text-[14px] tabular-nums shrink-0 w-24 text-right">
              {precioFmt(p.precio)}
              <span className="text-subtle text-[8px]"> {p.precioUnidad.replace('USD/', '$/')}</span>
            </span>
            <span className="w-16 flex justify-end shrink-0">
              {p.varPrecio != null ? (
                <Delta
                  value={p.polaridad === 'up' ? p.varPrecio : -Math.abs(p.varPrecio)}
                  label={`${p.varPrecio > 0 ? '+' : ''}${p.varPrecio.toFixed(1).replace('.', ',')}%`}
                  sentiment={p.polaridad === 'none' ? 'neutral' : deltaTone(p.polaridad, p.varPrecio)}
                />
              ) : (
                <span className="mono text-[10px] text-subtle">—</span>
              )}
            </span>
            <span className="flex-1 flex justify-end shrink-0">
              <Sparkline data={p.spark} sentiment={trendTone(p.polaridad, p.spark)} width={70} height={18} />
            </span>
          </div>
        ))}

        <div className="border-t border-token pt-2 mt-1 grid grid-cols-2 gap-2">
          <div className="surface-sunk rounded-[4px] p-2">
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Export. agro 12m</div>
            <div className="mono text-[18px]">
              {data.exportTotalAgro != null ? `US$${(data.exportTotalAgro / 1000).toFixed(1).replace('.', ',')} mil M` : 's/d'}
            </div>
          </div>
          <div className="surface-sunk rounded-[4px] p-2">
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Novillo gordo</div>
            <div className="mono text-[18px]">
              {data.novilloPrecio != null ? `US$${data.novilloPrecio.toFixed(2).replace('.', ',')}/kg` : 's/d'}
            </div>
          </div>
        </div>

        <button
          onClick={onVerDetalle}
          className="mono text-[10px] uppercase tracking-wider h-8 surface-sunk rounded-[4px] hover:ring-accent text-muted shrink-0 mt-auto"
        >
          Ver complejo agroexportador →
        </button>
      </div>
    </Panel>
  );
}
