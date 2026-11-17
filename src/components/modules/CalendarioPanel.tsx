import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { Evento } from '../../types';

interface CalendarioPanelProps {
  eventos: Evento[];
  /** Fecha ancla (d = 0) de los eventos: el corte del snapshot. */
  base: Date;
}

const DIAS = 30;
const color = (t: Evento['tone']) =>
  t === 'accent' ? 'var(--accent)' : t === 'info' ? 'var(--info)' : t === 'neg' ? 'var(--neg)' : 'var(--fg-subtle)';
const corta = (d: Date) => d.toLocaleDateString('es-UY', { day: '2-digit', month: 'short', timeZone: 'UTC' }).replace('.', '');
const dow = (d: Date) => d.toLocaleDateString('es-UY', { weekday: 'short', timeZone: 'UTC' }).replace('.', '');

/** Agenda de 30 días: franja de densidad + lista agrupada por semana (sin solapes). */
export function CalendarioPanel({ eventos, base }: CalendarioPanelProps) {
  const fecha = (d: number) => new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + d));
  const orden = [...eventos].sort((a, b) => a.d - b.d);
  const semanas = [0, 1, 2, 3, 4].map((w) => orden.filter((e) => Math.floor(e.d / 7) === w)).filter((s) => s.length);
  const clave = orden.filter((e) => e.tone === 'accent').length;

  return (
    <Panel className="flex flex-col">
      <SectionTitle
        id="E"
        title="Agenda · próximos 30 días"
        sub="Publicaciones oficiales, decisiones de política y hitos que pueden mover los datos"
        right={<span className="hidden sm:inline">{corta(fecha(0))} → {corta(fecha(DIAS))} · {clave} hitos clave</span>}
      />
      {/* franja temporal */}
      <div className="px-4 pt-3 pb-1">
        <div className="relative h-6">
          <div className="absolute left-0 right-0 top-3 h-px" style={{ background: 'var(--border-strong)' }} />
          {[0, 7, 14, 21, 28].map((d) => (
            <span key={d} className="absolute top-[14px] mono text-[9px] text-subtle -translate-x-1/2" style={{ left: `${(d / DIAS) * 100}%` }}>
              {d === 0 ? 'hoy' : `+${d}d`}
            </span>
          ))}
          {orden.map((e, i) => (
            <span
              key={i}
              title={`${corta(fecha(e.d))} · ${e.title}`}
              className="absolute top-[7px] w-3 h-3 rounded-full -translate-x-1/2"
              style={{ left: `${(e.d / DIAS) * 100}%`, background: color(e.tone), boxShadow: '0 0 0 2px var(--bg-elev)' }}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-4 mt-2" style={{ background: 'var(--border)' }}>
        {semanas.map((s, w) => (
          <div key={w} className="p-3.5 flex flex-col gap-2.5" style={{ background: 'var(--bg-elev)' }}>
            <div className="eyebrow">
              Semana {corta(fecha(Math.floor(s[0].d / 7) * 7))}
            </div>
            {s.map((e, i) => {
              const f = fecha(e.d);
              return (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-10 shrink-0 text-center rounded-[6px] py-1" style={{ background: 'var(--bg-sunk)' }}>
                    <div className="mono text-[13px] leading-none">{f.getUTCDate()}</div>
                    <div className="mono text-[8.5px] uppercase text-subtle mt-0.5">{dow(f)}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="mono text-[9px] uppercase tracking-wider" style={{ color: color(e.tone) }}>
                      {e.tag}
                    </div>
                    <div className="text-[12px] leading-snug">{e.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Panel>
  );
}
