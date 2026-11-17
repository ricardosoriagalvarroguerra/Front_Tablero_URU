import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Donut } from '../primitives/Donut';
import type { ExternoData } from '../../types';

interface ExternoPanelProps {
  data: ExternoData;
}

const m = (v: number | null) =>
  v == null ? 's/d' : v.toLocaleString('es-UY', { maximumFractionDigits: 0 });

const DONUT_COLORS = ['var(--fg)', 'var(--fg-muted)', 'var(--fg-subtle)', 'var(--border-strong)', '#3a404c'];
/** Color categórico estable; «Otros» siempre en gris. */
const colorOf = (pais: string, i: number) => (pais === 'Otros' ? 'var(--bg-sunk)' : DONUT_COLORS[i % DONUT_COLORS.length]);

const pp = (v: number | null) => (v == null ? 's/d' : `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`);

export function ExternoPanel({ data }: ExternoPanelProps) {
  const { balanza, destinos, turismo, ied, deuda, cuentaCorriente, competitividad } = data;
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="EX ·" title="Externo & comercio" right={<span>USD</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Balanza comercial */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Balanza comercial de bienes</div>
            <div className="text-[11px] text-subtle">{balanza.periodo}</div>
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="eyebrow">Export.</div>
              <div className="mono text-[14px] text-pos">{m(balanza.exportaciones)}</div>
            </div>
            <div>
              <div className="eyebrow">Import.</div>
              <div className="mono text-[14px]">{m(balanza.importaciones)}</div>
            </div>
            <div>
              <div className="eyebrow">Saldo</div>
              <div className={`mono text-[14px] ${(balanza.saldo ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
                {(balanza.saldo ?? 0) >= 0 ? '+' : ''}
                {m(balanza.saldo)}
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-token pt-2">
            <span className="eyebrow">Cuenta corriente</span>
            <span className="mono text-[13px]">
              {pp(cuentaCorriente.pctPib)} <span className="text-subtle text-[9px]">% PIB · {cuentaCorriente.periodo}</span>
            </span>
          </div>

        </div>

        {/* Exportaciones por destino */}
        {destinos.length > 0 && (
          <div className="px-4 py-2.5 border-b border-token">
            <div className="eyebrow mb-1.5">Exportaciones por destino</div>
            <div className="flex items-center gap-3">
              <Donut size={72} data={destinos.map((c, i) => ({ v: c.valor, color: colorOf(c.pais, i) }))} />
              <div className="flex-1 space-y-1 text-[11px]">
                {destinos.map((c, i) => (
                  <div key={c.pais} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-sm" style={{ background: colorOf(c.pais, i) }} />
                      {c.pais}
                    </span>
                    <span className="mono">{c.valor}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Turismo */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="eyebrow mb-1">Turismo · receptivo</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[11px] text-subtle">Ingresos</div>
              <div className="mono text-[13px] text-pos">{turismo.ingresosUsd != null ? `US$${m(turismo.ingresosUsd)}` : 's/d'}</div>
            </div>
            <div>
              <div className="text-[11px] text-subtle">Visitantes</div>
              <div className="mono text-[13px]">{turismo.visitantes != null ? `${m(turismo.visitantes)} mil` : 's/d'}</div>
            </div>
            <div>
              <div className="text-[11px] text-subtle">Saldo</div>
              <div className={`mono text-[13px] ${(turismo.saldoUsd ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
                {turismo.saldoUsd != null ? `${turismo.saldoUsd >= 0 ? '+' : ''}${m(turismo.saldoUsd)}` : 's/d'}
              </div>
            </div>
          </div>
          <p className="text-[12px] text-muted mt-1.5 leading-snug line-clamp-2 cursor-help" title={turismo.nota}>{turismo.nota}</p>
        </div>

        {/* Competitividad: TCR (atraso cambiario) + brecha de frontera */}
        <div className="px-4 py-2.5 border-b border-token">
          <div className="eyebrow mb-1">Competitividad · tipo de cambio real y frontera</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-subtle">Brecha del TCR (atraso camb.)</div>
              <div className={`mono text-[18px] ${(competitividad.tcrBrecha ?? 0) < 0 ? 'text-neg' : 'text-pos'}`}>
                {pp(competitividad.tcrBrecha)}
              </div>
              <div className="text-[11px] text-subtle">vs fundamentos · BCU</div>
            </div>
            <div>
              <div className="text-[11px] text-subtle">Brecha precios Salto/Concordia</div>
              <div className="mono text-[18px]">
                {competitividad.ipfFrontera != null ? `${competitividad.ipfFrontera.toFixed(1).replace('.', ',')}%` : 's/d'}
              </div>
              <div className="text-[11px] text-subtle">IPF · UCU</div>
            </div>
          </div>
          <p className="text-[12px] text-muted mt-1.5 leading-snug line-clamp-2 cursor-help" title={competitividad.tcrNota}>{competitividad.tcrNota}</p>
        </div>

        {/* Deuda + IED */}
        <div className="px-4 py-2.5 grid grid-cols-2 gap-3">
          <div>
            <div className="eyebrow">Deuda bruta SPub</div>
            <div className="mono text-[20px]">{deuda.brutaPct != null ? `${deuda.brutaPct.toFixed(1).replace('.', ',')}%` : 's/d'}</div>
            <div className="text-[11px] text-subtle">% PIB · {deuda.asof}</div>
          </div>
          <div>
            <div className="eyebrow">Inversión extranjera (IED)</div>
            <div className="mono text-[20px]">
              {ied.valorUsd != null
                ? `US$${m(ied.valorUsd)} M`
                : ied.pctPib != null
                  ? `${ied.pctPib.toFixed(1).replace('.', ',')}%`
                  : 's/d'}
            </div>
            <div className="text-[11px] text-subtle" title={ied.source}>
              {ied.valorUsd == null && ied.pctPib != null ? 'del PIB · ' : ''}
              {ied.asof}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
