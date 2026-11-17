import { Panel } from '../primitives/Panel';
import type { AnalisisData } from '../../types';

interface TesisPanelProps {
  data: AnalisisData;
  onVerAnalisis?: () => void;
}

/** Tesis del mes: la lectura de conjunto, en titular + bajada + puntos clave. */
export function TesisPanel({ data, onVerAnalisis }: TesisPanelProps) {
  const { tesis } = data;
  return (
    <Panel className="h-full flex flex-col relative">
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--info))' }}
        aria-hidden
      />
      <div className="px-5 pt-5 pb-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="mono text-[9.5px] uppercase tracking-[0.18em] text-accent">Tesis · lectura de conjunto</span>
          <span className="mono text-[9.5px] text-subtle">· {data.asof}</span>
        </div>
        <h2 className="max-w-[920px] text-[19px] sm:text-[23px] leading-[1.25] font-semibold tracking-[-0.015em] text-balance">{tesis.titulo}</h2>
        <p className="max-w-[920px] text-[13px] text-muted leading-relaxed">{tesis.bajada}</p>
        <ol className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3 mt-1">
          {tesis.puntos.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-[12px] leading-snug">
              <span className="mono text-[10px] text-accent shrink-0 mt-[2px]">{String(i + 1).padStart(2, '0')}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
        {onVerAnalisis && (
          <button onClick={onVerAnalisis} className="self-start mt-auto text-[11.5px] text-accent hover:underline underline-offset-4">
            Ver escenarios, proyecciones y riesgos →
          </button>
        )}
      </div>
    </Panel>
  );
}
