import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { Donut } from '../primitives/Donut';
import { deltaTone, trendTone } from '../../tone';
import type { AgroData, ProductoAgro } from '../../types';

interface AgroPanelProps {
  data: AgroData;
}

const DONUT_COLORS = ['var(--fg)', 'var(--fg-muted)', 'var(--fg-subtle)', 'var(--border-strong)', 'var(--border-strong)'];
/** Color categórico estable; «Otros» siempre en gris. */
const colorOf = (pais: string, i: number) => (pais === 'Otros' ? 'var(--bg-sunk)' : DONUT_COLORS[i % DONUT_COLORS.length]);

const precioFmt = (v: number | null) =>
  v == null ? 's/d' : v >= 100 ? v.toLocaleString('es-UY', { maximumFractionDigits: 0 }) : v.toFixed(2).replace('.', ',');
const usdM = (v: number | null) => (v == null ? 's/d' : v.toLocaleString('es-UY', { maximumFractionDigits: 0 }));

function ProductoCard({ p }: { p: ProductoAgro }) {
  return (
    <div className="rounded-[10px] p-4 flex flex-col border border-token" title={p.nota}>
      <div className="flex items-start justify-between gap-2">
        <div className="eyebrow">{p.nombre}</div>
        {p.varPrecio != null && (
          <Delta
            value={p.varPrecio}
            label={`${p.varPrecio > 0 ? '+' : ''}${p.varPrecio.toFixed(1).replace('.', ',')}%`}
            sentiment={p.polaridad === 'none' ? 'neutral' : deltaTone(p.polaridad, p.varPrecio)}
          />
        )}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="mono text-[20px] font-medium leading-none" style={{ letterSpacing: '-0.02em' }}>
          {p.precio == null ? '—' : precioFmt(p.precio)}
        </span>
        <span className="text-[11px] text-subtle">{p.precioUnidad}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11.5px] text-subtle">
          {p.exportUsd != null ? `US$${usdM(p.exportUsd)} M` : 's/d'}
          {p.participacion != null ? ` · ${p.participacion.toFixed(0)}%` : ''}
        </span>
        <Sparkline data={p.spark} sentiment={trendTone(p.polaridad, p.spark)} width={64} height={18} />
      </div>

    </div>
  );
}

export function AgroPanel({ data }: AgroPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle
        id="AG ·"
        title="Complejo agroexportador · el motor de divisas"
        right={<span>USD · {data.asof}</span>}
      />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* hero: carne (novillo + faena + destinos) */}
        <div className="px-5 py-5 border-b border-token grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="eyebrow">Novillo gordo · referencia carne</div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="mono text-[30px]">
                {data.novilloPrecio != null ? `US$${data.novilloPrecio.toFixed(2).replace('.', ',')}` : 's/d'}
              </span>
              <span className="mono text-[10px] text-subtle">/kg</span>
              {data.novilloVar != null && (
                <Delta
                  value={data.novilloVar}
                  label={`${data.novilloVar > 0 ? '+' : ''}${data.novilloVar.toFixed(1).replace('.', ',')}%`}
                  sentiment={deltaTone('up', data.novilloVar)}
                />
              )}
            </div>
            <div className="text-[12px] text-subtle mt-1.5" title={data.faenaPeriodo}>
              Faena {data.faena != null ? `${data.faena.toLocaleString('es-UY')} mil cabezas por semana` : 's/d'}
            </div>
            <div className="mt-5">
              <div className="eyebrow">6 principales rubros agro · ene-oct</div>
              <div className="mono text-[18px]">
                {data.exportTotalAgro != null ? `US$${(data.exportTotalAgro / 1000).toFixed(1).replace('.', ',')} mil M` : 's/d'}
                {data.participacionAgro != null && (
                  <span className="text-subtle text-[11px]"> · {data.participacionAgro.toFixed(0)}% del total</span>
                )}
              </div>
            </div>
          </div>

          {/* destinos donut */}
          {data.destinos.length > 0 && (
            <div>
              <div className="eyebrow mb-1.5">Destinos de exportación · 1S-2026</div>
              <div className="flex items-center gap-3">
                <Donut size={76} data={data.destinos.map((d, i) => ({ v: d.valor, color: colorOf(d.pais, i) }))} />
                <div className="flex-1 space-y-1 text-[11px]">
                  {data.destinos.map((d, i) => (
                    <div key={d.pais} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-sm" style={{ background: colorOf(d.pais, i) }} />
                        {d.pais}
                      </span>
                      <span className="mono">{d.valor}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* grilla de productos */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {data.productos.map((p) => (
            <ProductoCard key={p.id} p={p} />
          ))}
        </div>

      </div>
    </Panel>
  );
}
