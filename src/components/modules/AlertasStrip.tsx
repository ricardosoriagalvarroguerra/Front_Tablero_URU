import type { Alerta } from '../../alertas';

interface AlertasStripProps {
  alertas: Alerta[];
  onOpen?: (indicador: string) => void;
}

const COLOR = { alta: 'var(--neg)', media: 'var(--accent)', info: 'var(--fg-subtle)' } as const;

/** Tira de alertas: reglas explícitas que se activaron con los datos vigentes. */
export function AlertasStrip({ alertas, onOpen }: AlertasStripProps) {
  if (!alertas.length) {
    return <div className="text-[12.5px] text-muted">Sin alertas activas con los datos vigentes.</div>;
  }
  return (
    <div id="alertas" className="card overflow-hidden">
      <div className="px-5 h-11 flex items-center justify-between border-b border-token">
        <span className="text-[13px] font-medium">Alertas</span>
        <span className="text-[11px] text-subtle">{alertas.length} activas · reglas explícitas</span>
      </div>
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3">
        {alertas.map((a) => (
          <li key={a.id}>
            <button
              onClick={() => onOpen?.(a.indicador)}
              className="w-full text-left px-5 py-3 row-hover flex gap-3 items-start"
              title={a.detalle}
            >
              <span className="mt-[6px] w-2 h-2 rounded-full shrink-0" style={{ background: COLOR[a.nivel] }} />
              <span className="min-w-0">
                <span className="block text-[13px] leading-snug">{a.titulo}</span>
                <span className="block text-[11.5px] text-subtle leading-snug mt-0.5 truncate">{a.detalle}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
