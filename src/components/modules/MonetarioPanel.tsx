import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { SeriesChart } from '../primitives/SeriesChart';
import { Stat } from '../primitives/Stat';
import { Meter } from '../primitives/Meter';
import { META } from '../../analytics';
import type { FiscalData, Kpi } from '../../types';

interface MonetarioPanelProps {
  data: FiscalData;
  /** KPI de inflación interanual (serie con períodos) para el gráfico vs meta. */
  ipc?: Kpi;
  /** KPI de la TPM (decisiones del COPOM). */
  tpm?: Kpi;
}

const pct = (v: number | null, dec = 2) => (v == null ? 's/d' : `${v.toFixed(dec).replace('.', ',')}%`);
const c1 = (v: number) => v.toFixed(1).replace('.', ',');

export function MonetarioPanel({ data, ipc, tpm }: MonetarioPanelProps) {
  const { reservas, tasaPolitica, expectativas, baseMonetaria } = data;
  const real = tasaPolitica.valor != null && expectativas.inflacion12m != null ? tasaPolitica.valor - expectativas.inflacion12m : null;

  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="$$" title="Monetario · BCU" sub="Metas de inflación: rango 3–6%, centro 4,5%, horizonte 24 meses" right={<span>BCU · INE</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Inflación vs meta */}
        {ipc && (
          <div className="px-4 pt-3 pb-2 border-b border-token">
            <div className="flex items-baseline justify-between gap-2">
              <div className="eyebrow">Inflación i/a vs rango meta</div>
              <div className="mono text-[10px] text-subtle">{ipc.source}</div>
            </div>
            <SeriesChart
              data={ipc.spark}
              labels={ipc.periodos}
              band={[META.piso, META.techo]}
              refs={[{ value: META.centro, label: `centro ${c1(META.centro)}%`, color: 'var(--fg-muted)' }]}
              color="var(--accent)"
              fmt={(v) => c1(v)}
              height={170}
              showValues
            />
          </div>
        )}

        {/* TPM, tasa real, expectativas */}
        <div className="px-4 py-3 border-b border-token grid grid-cols-3 gap-3">
          <Stat label="TPM" value={pct(tasaPolitica.valor)} sub={tasaPolitica.asof} size="md" />
          <Stat
            label="Tasa real ex-ante"
            value={real == null ? 's/d' : `${real > 0 ? '+' : ''}${real.toFixed(1).replace('.', ',')}`}
            unit="pp"
            tone={real != null && real >= 1 ? 'pos' : 'accent'}
            sub="TPM − expect. 12m"
            size="md"
          />
          <Stat label="Expect. 24m" value={pct(expectativas.inflacion24m)} sub={`12m ${pct(expectativas.inflacion12m, 1)} · ${expectativas.asof}`} size="md" />
        </div>

        {/* Trayectoria del COPOM */}
        {tpm && tpm.periodos && (
          <div className="px-4 py-3 border-b border-token">
            <div className="eyebrow mb-2">Trayectoria del COPOM · decisiones</div>
            <div className="flex items-end gap-1.5">
              {tpm.spark.map((v, i) => {
                const prev = i > 0 ? tpm.spark[i - 1] : v;
                const up = v > prev;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <span className={`mono text-[10.5px] ${up ? 'text-neg' : ''}`}>{v.toFixed(2).replace('.', ',')}</span>
                    <div
                      className="w-full rounded-[4px]"
                      style={{ height: 10 + (v - 5.5) * 60, background: up ? 'var(--neg)' : i === tpm.spark.length - 1 ? 'var(--accent)' : 'var(--border-strong)' }}
                    />
                    <span className="mono text-[9px] text-subtle truncate w-full text-center">{tpm.periodos?.[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Expectativas en la regla meta */}
        <div className="px-4 py-3 border-b border-token">
          <div className="eyebrow mb-2">Anclaje · expectativa 24m en la regla meta</div>
          <Meter value={expectativas.inflacion24m} min={2} max={7} band={[META.piso, META.techo]} mark={META.centro} />
        </div>

        {/* Reservas + Base monetaria */}
        <div className="px-4 py-3 grid grid-cols-2 gap-3">
          <Stat
            label="Activos de reserva"
            value={reservas.valorUsd != null ? reservas.valorUsd.toLocaleString('es-UY') : 's/d'}
            unit="M USD"
            sub={`${reservas.asof} · ${reservas.source}`}
          />
          <Stat
            label="Base monetaria"
            value={baseMonetaria?.valorMM != null ? baseMonetaria.valorMM.toLocaleString('es-UY') : 's/d'}
            unit="M $"
            sub={`${baseMonetaria?.asof ?? 's/d'} · ${baseMonetaria?.source ?? ''}`}
          />
        </div>
      </div>
    </Panel>
  );
}
