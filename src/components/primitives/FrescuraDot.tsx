import { frescura } from '../../frescura';
import type { Kpi } from '../../types';

const COLOR = { al_dia: 'var(--pos)', rezago: 'var(--accent)', desactualizado: 'var(--neg)' } as const;
const TEXTO = { al_dia: 'al día', rezago: 'con rezago', desactualizado: 'desactualizado' } as const;

/** Punto de frescura del último dato (según su periodicidad); detalle en tooltip. */
export function FrescuraDot({ k, withText = false }: { k: Kpi; withText?: boolean }) {
  const f = frescura(k.fecha, k.periodicidad);
  if (!f) return null;
  const titulo = `Último dato: ${k.asof} · hace ${f.dias} día${f.dias === 1 ? '' : 's'} · ${TEXTO[f.estado]} (${k.periodicidad})`;
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0" title={titulo}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR[f.estado] }} />
      {withText && (
        <span className="text-[11px] text-subtle">
          hace {f.dias} d · {TEXTO[f.estado]}
        </span>
      )}
    </span>
  );
}
