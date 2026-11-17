import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { SeriesChart } from '../primitives/SeriesChart';
import { BarList } from '../primitives/BarList';
import { Stat } from '../primitives/Stat';
import type { ActividadData } from '../../types';

interface ActividadPanelProps {
  data: ActividadData;
}

const pp = (v: number | null) => (v == null ? 's/d' : `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`);
const pctAbs = (v: number | null) => (v == null ? 's/d' : `${v.toFixed(1).replace('.', ',')}%`);
const tone = (v: number | null) => (v == null ? 'neutral' : v >= 0 ? 'pos' : 'neg') as 'pos' | 'neg' | 'neutral';

export function ActividadPanel({ data }: ActividadPanelProps) {
  const { pib, industria, pibSectores, ipcRubros, social } = data;
  return (
    <Panel className="flex flex-col h-full">
      <SectionTitle id="AC" title="Actividad, precios y empleo" sub="PIB trimestral, sectores, rubros del IPC y mercado laboral" right={<span>BCU · INE</span>} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* PIB */}
        <div className="px-4 pt-3 pb-2 border-b border-token">
          <div className="grid grid-cols-3 gap-3">
            <Stat label={`PIB i/a · ${pib.asof}`} value={pp(pib.varInteranual)} tone={tone(pib.varInteranual)} size="lg" />
            <Stat label="Desest. t/t" value={pp(pib.trimestral)} tone={tone(pib.trimestral)} />
            <Stat label="PIB 2025" value={pp(pib.anual2025)} tone={tone(pib.anual2025)} />
          </div>
          <div className="mt-2">
            <SeriesChart data={pib.series} labels={pib.periodos} kind="bars" fmt={(v) => v.toFixed(1).replace('.', ',')} height={140} showValues />
          </div>
        </div>

        {/* PIB por sector */}
        <div className="px-4 py-3 border-b border-token">
          <div className="eyebrow mb-2.5">PIB por sector · {pib.asof} (var. i/a)</div>
          <BarList items={pibSectores} />
        </div>

        {/* Industria + rubros IPC */}
        <div className="px-4 py-3 border-b border-token grid sm:grid-cols-[150px_1fr] gap-4">
          <Stat label="Industria (IVFIM) i/a" value={pp(industria.varInteranual)} tone={tone(industria.varInteranual)} sub={`${industria.asof} · ${industria.source}`} />
          <div>
            <div className="eyebrow mb-2.5">IPC · rubros que más subieron (m/m)</div>
            <BarList items={ipcRubros} mode="share" polarity="down" color="var(--fg-subtle)" />
          </div>
        </div>

        {/* Social */}
        <div className="px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Desempleo" value={pctAbs(social.desempleo)} sub={social.desempleoPeriodo} size="sm" />
          <Stat label="Empleo" value={pctAbs(social.empleo)} sub={social.desempleoPeriodo} size="sm" />
          <Stat label="Salario real" value={pp(social.salarioReal)} tone={tone(social.salarioReal)} sub={social.salarioRealPeriodo} size="sm" />
          <Stat label="Pobreza" value={pctAbs(social.pobreza)} sub={social.pobrezaPeriodo} size="sm" />
        </div>
        <div className="px-4 pb-3 mono text-[9.5px] text-subtle">{social.source}</div>
      </div>
    </Panel>
  );
}
