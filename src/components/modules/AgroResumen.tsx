import { Fragment } from 'react';
import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { BarList } from '../primitives/BarList';
import { deltaTone, trendTone } from '../../tone';
import type { AgroData, ProductoAgro } from '../../types';

interface AgroResumenProps {
  data: AgroData;
  onVerDetalle: () => void;
}

const precioFmt = (v: number | null) =>
  v == null ? 's/d' : v >= 100 ? v.toLocaleString('es-UY', { maximumFractionDigits: 0 }) : v.toFixed(2).replace('.', ',');

export function AgroResumen({ data, onVerDetalle }: AgroResumenProps) {
  const principales = data.productos.filter((p) => ['carne', 'celulosa', 'soja', 'lacteos'].includes(p.id));
  const ranking = data.productos
    .filter((p) => p.exportUsd != null)
    .sort((a, b) => (b.exportUsd ?? 0) - (a.exportUsd ?? 0))
    .slice(0, 6)
    .map((p) => ({ label: p.nombre, value: p.exportUsd ?? 0, hint: p.participacion != null ? `${p.participacion.toFixed(1).replace('.', ',')}%` : undefined }));

  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle
        id="AG"
        title="Agroexportador · resumen"
        sub="Precios de referencia (var. vs jun-26) y ranking de exportaciones"
        right={
          <Fragment>
            <span className="text-accent">●</span>
            <span>{data.asof}</span>
          </Fragment>
        }
      />
      <div className="px-2 py-2 flex flex-col">
        {principales.map((p: ProductoAgro) => (
          <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto_64px_72px] items-center gap-2 px-2 py-2 rounded-[6px] row-hover">
            <span className="text-[12px] truncate">{p.nombre}</span>
            <span className="mono text-[14px] tabular-nums text-right">
              {precioFmt(p.precio)}
              <span className="text-subtle text-[9px]"> {p.precioUnidad.replace('USD/', 'US$/')}</span>
            </span>
            <span className="flex justify-end">
              {p.varPrecio != null ? (
                <Delta
                  value={p.varPrecio}
                  label={`${p.varPrecio > 0 ? '+' : ''}${p.varPrecio.toFixed(1).replace('.', ',')}%`}
                  sentiment={p.polaridad === 'none' ? 'neutral' : deltaTone(p.polaridad, p.varPrecio)}
                />
              ) : (
                <span className="mono text-[10px] text-subtle">—</span>
              )}
            </span>
            <span className="flex justify-end">
              <Sparkline data={p.spark} sentiment={trendTone(p.polaridad, p.spark)} width={68} height={18} />
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-token">
        <div className="flex items-baseline justify-between mb-2.5">
          <span className="eyebrow">Exportaciones ene-oct · US$ M</span>
          <span className="mono text-[9.5px] text-subtle">% del total</span>
        </div>
        <BarList items={ranking} mode="share" color="var(--accent)" fmt={(v) => v.toLocaleString('es-UY')} />
      </div>
      <div className="px-4 pb-4 mt-auto grid grid-cols-2 gap-2">
        <div className="surface-sunk rounded-[8px] p-2.5">
          <div className="eyebrow">Novillo gordo</div>
          <div className="mono text-[17px] mt-1">
            {data.novilloPrecio != null ? `US$${data.novilloPrecio.toFixed(2).replace('.', ',')}` : 's/d'}
            <span className="text-subtle text-[10px]">/kg</span>
          </div>
        </div>
        <div className="surface-sunk rounded-[8px] p-2.5">
          <div className="eyebrow">Faena semanal</div>
          <div className="mono text-[17px] mt-1">
            {data.faena != null ? `${data.faena.toLocaleString('es-UY')} mil` : 's/d'}
            <span className="text-subtle text-[10px]"> cab.</span>
          </div>
        </div>
        <button onClick={onVerDetalle} className="col-span-2 text-[11.5px] h-8 surface-sunk rounded-[8px] hover:ring-accent text-muted">
          Ver complejo agroexportador →
        </button>
      </div>
    </Panel>
  );
}
