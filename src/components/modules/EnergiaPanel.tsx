import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Donut } from '../primitives/Donut';
import type { EnergiaData, FuenteGeneracion } from '../../types';

interface EnergiaPanelProps {
  data: EnergiaData;
}

// Paleta por fuente: renovables en ámbar/verde/info; térmica fósil en gris.
const FUENTE_COLOR: Record<string, string> = {
  hidraulica: 'var(--info)',
  eolica: 'var(--accent)',
  solar: 'var(--pos)',
  biomasa: 'var(--border-strong)',
  termica: 'var(--fg-subtle)',
};
const colorOf = (f: FuenteGeneracion) => FUENTE_COLOR[f.id] ?? 'var(--fg-muted)';

const num = (v: number | null) => (v == null ? 's/d' : v.toLocaleString('es-UY', { maximumFractionDigits: 0 }));

export function EnergiaPanel({ data }: EnergiaPanelProps) {
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="EN ·" title="Energía · matriz renovable" right={<span>ADME / UTE · {data.asof}</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* renovable hero + matriz donut */}
        <div className="px-4 py-3 border-b border-token grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="eyebrow">Generación renovable</div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="mono text-[34px] text-pos leading-none">
                {data.renovablePct != null ? `${data.renovablePct.toFixed(1).replace('.', ',')}%` : 's/d'}
              </span>
            </div>
            <div className="text-[11px] text-muted mt-1.5 leading-snug">{data.resumen}</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="surface-sunk rounded-[8px] p-2">
                <div className="eyebrow">Potencia instalada</div>
                <div className="mono text-[15px]">{num(data.potenciaInstalada)} <span className="text-subtle text-[9px]">MW</span></div>
              </div>
              <div className="surface-sunk rounded-[8px] p-2">
                <div className="eyebrow">Demanda máxima</div>
                <div className="mono text-[15px]">{num(data.demandaMax)} <span className="text-subtle text-[9px]">MW</span></div>
              </div>
            </div>
          </div>

          {/* matriz por fuente */}
          <div>
            <div className="eyebrow mb-1.5">Matriz de generación eléctrica</div>
            <div className="flex items-center gap-3">
              <Donut size={84} data={data.matriz.map((f) => ({ v: f.pct, color: colorOf(f) }))} />
              <div className="flex-1 space-y-1 text-[11px]">
                {data.matriz.map((f) => (
                  <div key={f.id} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-sm" style={{ background: colorOf(f) }} />
                      {f.nombre}
                    </span>
                    <span className="mono">{f.pct.toFixed(1).replace('.', ',')}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* exportación de energía */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div className="eyebrow">
              Exportación eléctrica → {data.exportacion.destino}
            </div>
            <div className="mono text-[14px] text-pos">
              {data.exportacion.valorGwh != null ? `${num(data.exportacion.valorGwh)} GWh` : 's/d'}
            </div>
          </div>
          <div className="text-[11px] text-muted mt-1 leading-snug">{data.exportacion.nota}</div>
        </div>

        {/* combustibles ANCAP */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="eyebrow mb-1.5">Combustibles · ANCAP</div>
          <div className="space-y-1">
            {data.combustibles.map((c) => (
              <div key={c.producto} className="flex items-center justify-between text-[11px]">
                <span className="text-muted">{c.producto}</span>
                <span className="mono">
                  {c.precio != null ? c.precio.toLocaleString('es-UY', { maximumFractionDigits: 2 }) : 's/d'}
                  <span className="text-subtle text-[9px]"> {c.unidad}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* hidrógeno verde */}
        <div className="px-4 py-2.5">
          <div className="eyebrow">Hidrógeno verde · {data.hidrogeno.proyecto}</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="mono text-[20px]">
              {data.hidrogeno.inversionUsd != null ? `US$${(data.hidrogeno.inversionUsd / 1000).toFixed(1).replace('.', ',')} mil M` : 's/d'}
            </span>
            <span className="mono text-[10px] text-accent uppercase tracking-wider">{data.hidrogeno.estado}</span>
          </div>
          <div className="mono text-[9px] text-subtle mt-0.5 leading-snug">{data.hidrogeno.nota}</div>
        </div>
      </div>
    </Panel>
  );
}
