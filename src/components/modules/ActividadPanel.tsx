import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Delta } from '../primitives/Delta';
import { Sparkline } from '../primitives/Sparkline';
import { deltaTone, trendTone } from '../../tone';
import type { ActividadData } from '../../types';

interface ActividadPanelProps {
  data: ActividadData;
}

const pp = (v: number | null) => (v == null ? 's/d' : `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`);
const pctAbs = (v: number | null) => (v == null ? 's/d' : `${v.toFixed(1).replace('.', ',')}%`);

export function ActividadPanel({ data }: ActividadPanelProps) {
  const { pib, industria, pibSectores, ipcRubros, social } = data;
  const maxSec = Math.max(1, ...pibSectores.map((s) => Math.abs(s.value)));
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="AC ·" title="Actividad & precios" right={<span>INE · BCU</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* PIB */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="flex items-center justify-between">
            <div>
              <div className="mono text-[9px] uppercase tracking-wider text-subtle">PIB · actividad</div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="mono text-[22px]">{pp(pib.varInteranual)}</span>
                <span className="mono text-[10px] text-subtle">i/a</span>
                {pib.trimestral != null && (
                  <Delta
                    value={pib.trimestral}
                    label={`${pp(pib.trimestral)} t/t`}
                    sentiment={deltaTone('up', pib.trimestral)}
                  />
                )}
              </div>
              <div className="mono text-[9px] text-subtle mt-0.5">{pib.source} · {pib.asof}</div>
            </div>
            <Sparkline data={pib.series} sentiment={trendTone('up', pib.series)} width={120} height={36} />
          </div>
        </div>

        {/* PIB 2025 / Industria / Salario real */}
        <div className="px-3 py-2.5 border-b border-token grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">PIB 2025</div>
            <div className={`mono text-[15px] ${(pib.anual2025 ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>{pp(pib.anual2025)}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Industria i/a</div>
            <div className={`mono text-[15px] ${(industria.varInteranual ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
              {pp(industria.varInteranual)}
            </div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Salario real</div>
            <div className={`mono text-[15px] ${(social.salarioReal ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
              {pp(social.salarioReal)}
            </div>
          </div>
        </div>

        {/* PIB por sector (var i/a) */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle mb-1.5">PIB por sector · {pib.asof} (i/a)</div>
          <div className="space-y-1">
            {pibSectores.map((s) => {
              const neg = s.value < 0;
              return (
                <div key={s.label} className="flex items-center gap-2 text-[11px]">
                  <span className="text-muted truncate w-[150px] shrink-0">{s.label}</span>
                  <span className="flex-1 h-[6px] rounded-sm overflow-hidden" style={{ background: 'var(--bg-sunk)' }}>
                    <span
                      className="block h-full rounded-sm"
                      style={{
                        width: `${(Math.abs(s.value) / maxSec) * 100}%`,
                        background: neg ? 'var(--neg)' : 'var(--pos)',
                        opacity: 0.55,
                      }}
                    />
                  </span>
                  <span className={`mono shrink-0 w-12 text-right ${neg ? 'text-neg' : 'text-pos'}`}>{pp(s.value)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* IPC por rubros */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle mb-1.5">IPC mayo · mayores aumentos (m/m)</div>
          <div className="space-y-1">
            {ipcRubros.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[11px]">
                <span className="text-muted truncate pr-2">{r.label}</span>
                <span className="mono">{r.value.toFixed(1).replace('.', ',')}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="px-3 py-2.5 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Desempleo</div>
            <div className="mono text-[15px]">{pctAbs(social.desempleo)}</div>
            <div className="mono text-[8px] text-subtle">{social.desempleoPeriodo}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Empleo</div>
            <div className="mono text-[15px]">{pctAbs(social.empleo)}</div>
            <div className="mono text-[8px] text-subtle">{social.desempleoPeriodo}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Pobreza</div>
            <div className="mono text-[15px]">{pctAbs(social.pobreza)}</div>
            <div className="mono text-[8px] text-subtle">{social.pobrezaPeriodo}</div>
          </div>
        </div>
        <div className="px-3 pb-2.5 mono text-[9px] text-subtle">{social.source}</div>
      </div>
    </Panel>
  );
}
