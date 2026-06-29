import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { Sparkline } from '../primitives/Sparkline';
import { trendTone } from '../../tone';
import type { FiscalData } from '../../types';

interface FiscalPanelProps {
  data: FiscalData;
}

const pctPib = (v: number | null) => (v == null ? 's/d' : `${v >= 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`);
const pctAbs = (v: number | null) => (v == null ? 's/d' : `${v.toFixed(1).replace('.', ',')}%`);

export function FiscalPanel({ data }: FiscalPanelProps) {
  const { resultadoGlobal, resultadoPrimario, reglaFiscal, deuda, recaudacion } = data;
  const deficit = (resultadoGlobal.pctPib ?? 0) < 0;
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="F$ ·" title="Fiscal · regla fiscal" right={<span>MEF</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Resultado global */}
        <div className="px-3 py-3 border-b border-token">
          <div className="flex items-center justify-between">
            <div>
              <div className="mono text-[9px] uppercase tracking-wider text-subtle">Resultado global Sector Público</div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className={`mono text-[24px] ${deficit ? 'text-neg' : 'text-pos'}`}>{pctPib(resultadoGlobal.pctPib)}</span>
                <span className="mono text-[10px] text-subtle">% PIB · {resultadoGlobal.periodo}</span>
              </div>
              <div className="mono text-[9px] text-subtle mt-0.5">móvil 12 meses · {resultadoGlobal.source}</div>
            </div>
            <Sparkline data={resultadoGlobal.series} sentiment={trendTone('up', resultadoGlobal.series)} width={120} height={36} />
          </div>
        </div>

        {/* Primario + Deuda */}
        <div className="px-3 py-2.5 border-b border-token grid grid-cols-2 gap-3">
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Result. primario</div>
            <div className={`mono text-[20px] ${(resultadoPrimario.pctPib ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
              {pctPib(resultadoPrimario.pctPib)}
            </div>
            <div className="mono text-[9px] text-subtle">% PIB · {resultadoPrimario.periodo}</div>
          </div>
          <div>
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Deuda bruta</div>
            <div className="mono text-[20px]">{pctAbs(deuda.brutaPct)}</div>
            <div className="mono text-[9px] text-subtle">% PIB · {deuda.asof}</div>
            {deuda.monedaLocalPct != null && (
              <div className="mono text-[9px] text-muted">{deuda.monedaLocalPct.toFixed(0)}% en moneda local</div>
            )}
          </div>
        </div>

        {/* Regla fiscal — 3 pilares */}
        <div className="px-3 py-2.5 border-b border-token">
          <div className="flex items-center justify-between mb-1.5">
            <div className="mono text-[9px] uppercase tracking-wider text-subtle">Regla fiscal · 3 pilares</div>
            {reglaFiscal.cumple != null && (
              <span className={`mono text-[9px] uppercase tracking-wider ${reglaFiscal.cumple ? 'text-pos' : 'text-neg'}`}>
                {reglaFiscal.cumple ? '✓ cumple' : '⚠ desvío'}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="mono text-[8px] uppercase tracking-wider text-subtle">Result. estructural</div>
              <div className="mono text-[13px]">{pctPib(reglaFiscal.resultadoEstructural)}</div>
            </div>
            <div>
              <div className="mono text-[8px] uppercase tracking-wider text-subtle">Tope gasto real</div>
              <div className="mono text-[13px]">{pctAbs(reglaFiscal.topeGastoReal)}</div>
            </div>
            <div>
              <div className="mono text-[8px] uppercase tracking-wider text-subtle">Tope deuda neta</div>
              <div className="mono text-[13px]">{reglaFiscal.deudaNetaTope != null ? `US$${(reglaFiscal.deudaNetaTope / 1000).toFixed(1).replace('.', ',')}k` : 's/d'}</div>
            </div>
          </div>
          <div className="mono text-[9px] text-subtle mt-1.5 leading-snug">{reglaFiscal.nota}</div>
        </div>

        {/* Recaudación */}
        <div className="px-3 py-2.5">
          <div className="mono text-[9px] uppercase tracking-wider text-subtle">Recaudación DGI</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className={`mono text-[18px] ${(recaudacion.varRealInteranual ?? 0) >= 0 ? 'text-pos' : 'text-neg'}`}>
              {pctPib(recaudacion.varRealInteranual)}
            </span>
            <span className="mono text-[10px] text-subtle">real i/a · {recaudacion.periodo}</span>
          </div>
          <div className="mono text-[9px] text-subtle mt-0.5 leading-snug">{recaudacion.source}</div>
        </div>
      </div>
    </Panel>
  );
}
