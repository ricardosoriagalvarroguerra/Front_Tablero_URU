import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import { estadoColor, estadoSoft, type Derivado } from '../../analytics';

interface DerivadosPanelProps {
  items: Derivado[];
}

const fmt = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}`;

/** Indicadores derivados: relaciones entre datos con fórmula y lectura por reglas. */
export function DerivadosPanel({ items }: DerivadosPanelProps) {
  return (
    <Panel className="h-full flex flex-col">
      <SectionTitle id="Z2" title="Indicadores derivados" sub="Calculados en vivo a partir de los datos de fuente · fórmula a la vista" right={<span>motor analítico</span>} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px flex-1" style={{ background: 'var(--border)' }}>
        {items.map((d) => (
          <div key={d.id} className="p-4 flex flex-col gap-1.5" style={{ background: 'var(--bg-elev)' }}>
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow">{d.label}</span>
              <span className="w-2 h-2 rounded-full" style={{ background: estadoColor(d.estado) }} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="mono text-[26px] font-medium leading-none tracking-[-0.02em]" style={{ color: estadoColor(d.estado) }}>
                {d.value == null ? 's/d' : d.id === 'miseria' ? d.value.toFixed(1).replace('.', ',') : fmt(d.value)}
              </span>
              <span className="mono text-[10px] text-subtle">{d.unit}</span>
            </div>
            <div className="mono text-[9.5px] text-subtle rounded-[4px] px-1.5 py-1 self-start" style={{ background: estadoSoft(d.estado) }}>
              {d.formula}
            </div>
            <p className="text-[11.5px] text-muted leading-snug">{d.lectura}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
