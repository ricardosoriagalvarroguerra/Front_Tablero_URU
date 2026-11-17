import { useEffect } from 'react';
import { frescura } from '../../frescura';
import type { Alerta } from '../../alertas';
import type { AnalisisData, Evento, Kpi } from '../../types';

interface NotaEjecutivaProps {
  abierta: boolean;
  onClose: () => void;
  titulo: string;
  corte: string;
  base: Date;
  analisis: AnalisisData;
  kpis: Kpi[];
  alertas: Alerta[];
  eventos: Evento[];
}

const NIVEL = { alta: 'Alta', media: 'Media', info: 'Info' } as const;
const ESTADO = { pos: 'Sólido', neutral: 'Atención', neg: 'Frágil' } as const;
const corta = (d: Date) => d.toLocaleDateString('es-UY', { day: '2-digit', month: 'short', timeZone: 'UTC' }).replace('.', '');

/**
 * Nota ejecutiva de una página: tesis, KPIs, semáforo, alertas y agenda. Se
 * imprime (o exporta a PDF) desde el navegador; el CSS de impresión oculta el
 * resto del tablero (ver index.css · .nota-abierta).
 */
export function NotaEjecutiva({ abierta, onClose, titulo, corte, base, analisis, kpis, alertas, eventos }: NotaEjecutivaProps) {
  useEffect(() => {
    document.documentElement.classList.toggle('nota-abierta', abierta);
    return () => document.documentElement.classList.remove('nota-abierta');
  }, [abierta]);

  if (!abierta) return null;
  const fecha = (d: number) => new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + d));

  return (
    <div className="nota fixed inset-0 z-50 overflow-y-auto" style={{ background: 'var(--bg)' }} role="dialog" aria-modal="true" aria-label="Nota ejecutiva">
      <div className="no-print sticky top-0 z-10 flex items-center justify-end gap-2 px-6 h-14" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <button onClick={() => window.print()} className="text-[12.5px] px-3 h-8 rounded-[7px]" style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
          Imprimir / PDF
        </button>
        <button onClick={onClose} className="text-[12.5px] px-3 h-8 rounded-[7px] text-muted" style={{ background: 'var(--bg-sunk)' }}>
          Cerrar <span className="kbd ml-1">esc</span>
        </button>
      </div>

      <article className="nota-hoja mx-auto max-w-[820px] px-8 py-10 flex flex-col gap-8">
        <header>
          <div className="text-[11.5px] text-subtle">{titulo} · nota ejecutiva · datos al {corte}</div>
          <h1 className="mt-2 text-[26px] leading-tight font-semibold tracking-[-0.02em]">{analisis.tesis.titulo}</h1>
          <p className="mt-3 text-[13.5px] text-muted leading-relaxed">{analisis.tesis.bajada}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {analisis.tesis.puntos.map((p) => (
              <li key={p} className="text-[13px] leading-snug flex gap-2">
                <span className="text-accent">—</span>
                {p}
              </li>
            ))}
          </ul>
        </header>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">Indicadores</h2>
          <table className="w-full text-[12.5px]">
            <tbody>
              {kpis.map((k) => {
                const f = frescura(k.fecha, k.periodicidad);
                return (
                  <tr key={k.id} className="border-b border-token">
                    <td className="py-1.5">{k.label}</td>
                    <td className="py-1.5 text-right mono">
                      {k.fmt(k.value)}
                      {k.unit ? <span className="text-subtle"> {k.unit}</span> : null}
                    </td>
                    <td className="py-1.5 text-right mono text-muted w-28">{k.deltaLabel}</td>
                    <td className="py-1.5 text-right text-subtle w-28">
                      {k.asof}
                      {f && f.estado !== 'al_dia' ? ' *' : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-1 text-[11px] text-subtle">* dato con rezago respecto de su periodicidad.</div>
        </section>

        <div className="grid sm:grid-cols-2 gap-8">
          <section>
            <h2 className="text-[13px] font-semibold mb-2">Semáforo</h2>
            <ul className="flex flex-col gap-1.5 text-[12.5px]">
              {analisis.semaforo.map((s) => (
                <li key={s.id} className="flex justify-between gap-3">
                  <span>{s.dimension}</span>
                  <span className="text-muted">
                    {ESTADO[s.estado]} · {s.score}/5 · {s.tendencia}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-[13px] font-semibold mb-2">Alertas</h2>
            <ul className="flex flex-col gap-1.5 text-[12.5px]">
              {alertas.length === 0 && <li className="text-muted">Sin alertas activas.</li>}
              {alertas.map((a) => (
                <li key={a.id}>
                  <span className="text-muted">{NIVEL[a.nivel]} · </span>
                  {a.titulo}
                  <div className="text-[11.5px] text-subtle">{a.detalle}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">Agenda · próximos 30 días</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[12.5px]">
            {[...eventos].sort((a, b) => a.d - b.d).map((e, i) => (
              <li key={i} className="flex gap-3">
                <span className="mono text-subtle w-14 shrink-0">{corta(fecha(e.d))}</span>
                <span>
                  {e.title} <span className="text-subtle">· {e.tag}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-[11px] text-subtle border-t border-token pt-3">
          Fuentes oficiales (INE, BCU, MEF, Uruguay XXI, INAC, DGI) y prensa que las cita; ver docs/SOURCES.md. Semáforo y
          tesis son lectura analítica del tablero, no datos de fuente.
        </footer>
      </article>
    </div>
  );
}
