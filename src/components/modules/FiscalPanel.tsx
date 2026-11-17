import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { SeriesChart } from '../primitives/SeriesChart';
import { Stat } from '../primitives/Stat';
import type { FiscalData } from '../../types';

interface FiscalPanelProps {
  data: FiscalData;
}

const pctPib = (v: number | null) => (v == null ? 's/d' : `${v >= 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`);
const pctAbs = (v: number | null) => (v == null ? 's/d' : `${v.toFixed(1).replace('.', ',')}%`);

export function FiscalPanel({ data }: FiscalPanelProps) {
  const { resultadoGlobal, resultadoPrimario, reglaFiscal, deuda, recaudacion } = data;
  const deficit = (resultadoGlobal.pctPib ?? 0) < 0;
  const intereses =
    resultadoGlobal.pctPib != null && resultadoPrimario.pctPib != null ? resultadoPrimario.pctPib - resultadoGlobal.pctPib : null;
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="F$" title="Fiscal · regla fiscal" sub="Resultado del Sector Público Global, deuda, recaudación y pilares de la regla" right={<span>MEF · DGI</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Resultado global */}
        <div className="px-4 pt-3 pb-2 border-b border-token">
          <div className="flex items-start justify-between gap-3">
            <Stat
              label="Resultado global SPG (12m)"
              value={pctPib(resultadoGlobal.pctPib)}
              unit="% PIB"
              tone={deficit ? 'neg' : 'pos'}
              size="lg"
              sub={`${resultadoGlobal.periodo} · ${resultadoGlobal.source}`}
            />
            {intereses != null && (
              <div className="text-right shrink-0">
                <div className="eyebrow">Intereses implícitos</div>
                <div className="mono text-[16px] mt-1">{intereses.toFixed(1).replace('.', ',')}<span className="text-subtle text-[10px]"> % PIB</span></div>
              </div>
            )}
          </div>
          <div className="mt-2">
            <SeriesChart
              data={resultadoGlobal.series}
              labels={resultadoGlobal.periodos}
              kind="bars"
              fmt={(v) => v.toFixed(1).replace('.', ',')}
              refs={[{ value: -4.0, label: 'meta estructural −4,0%', color: 'var(--accent)' }]}
              height={150}
              showValues
            />
          </div>
        </div>

        {/* Primario + Deuda + Recaudación */}
        <div className="px-4 py-3 border-b border-token grid grid-cols-3 gap-3">
          <Stat label="Result. primario" value={pctPib(resultadoPrimario.pctPib)} unit="% PIB" tone={(resultadoPrimario.pctPib ?? 0) >= 0 ? 'pos' : 'neg'} sub={resultadoPrimario.periodo} size="sm" />
          <Stat
            label="Deuda bruta / neta"
            value={`${pctAbs(deuda.brutaPct)}`}
            unit="% PIB"
            sub={`neta ${pctAbs(deuda.netaPct)} · ${deuda.monedaLocalPct != null ? `${deuda.monedaLocalPct.toFixed(0)}% en pesos` : ''} · ${deuda.asof}`}
            size="sm"
          />
          <Stat label="Recaudación DGI" value={pctPib(recaudacion.varRealInteranual)} unit="real i/a" tone={(recaudacion.varRealInteranual ?? 0) >= 0 ? 'pos' : 'neg'} sub={recaudacion.periodo} size="sm" />
        </div>

        {/* Regla fiscal — 3 pilares */}
        <div className="px-4 py-3" title={reglaFiscal.nota}>
          <div className="flex items-center justify-between mb-2">
            <div className="eyebrow">Regla fiscal · 3 pilares (evaluación 2025)</div>
            {reglaFiscal.cumple != null && (
              <span className={`text-[11px] px-1.5 py-[2px] rounded-[4px] ${reglaFiscal.cumple ? 'text-pos' : 'text-neg'}`}>
                {reglaFiscal.cumple ? '✓ cumple' : '⚠ 2 de 3'}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: 'Result. estructural', v: pctPib(reglaFiscal.resultadoEstructural), ok: true },
              { l: 'Gasto real', v: pctAbs(reglaFiscal.topeGastoReal), ok: false },
              { l: 'Tope endeudamiento', v: reglaFiscal.deudaNetaTope != null ? `US$${(reglaFiscal.deudaNetaTope / 1000).toFixed(2).replace('.', ',')} mil M` : 's/d', ok: true },
            ].map((p) => (
              <div key={p.l} className="rounded-[10px] p-3 border border-token">
                <div className="eyebrow">{p.l}</div>
                <div className="mono text-[13px] mt-0.5">{p.v}</div>
                <div className={`mono text-[9px] mt-0.5 ${p.ok ? 'text-pos' : 'text-neg'}`}>{p.ok ? '✓ cumplido' : '✕ excedido'}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Panel>
  );
}
