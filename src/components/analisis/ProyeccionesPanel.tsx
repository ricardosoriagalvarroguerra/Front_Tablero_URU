import { Panel } from '../primitives/Panel';
import { SectionTitle } from '../primitives/SectionTitle';
import type { Proyeccion } from '../../types';

interface ProyeccionesPanelProps {
  rows: Proyeccion[];
}

const f = (v: number | null, d = 1) => (v == null ? '—' : v.toFixed(d).replace('.', ','));

const COLS: { key: keyof Proyeccion; label: string; d?: number; sign?: boolean }[] = [
  { key: 'pib2026', label: 'PIB 26' },
  { key: 'pib2027', label: 'PIB 27' },
  { key: 'ipc2026', label: 'IPC 26' },
  { key: 'ipc2027', label: 'IPC 27' },
  { key: 'tc2026', label: 'TC dic-26', d: 1 },
  { key: 'fiscal2026', label: 'Déficit 26' },
];

/** Tabla de proyecciones por fuente (consenso vs oficial vs organismos). */
export function ProyeccionesPanel({ rows }: ProyeccionesPanelProps) {
  // rango por columna para resaltar dispersión
  const rng = (k: keyof Proyeccion) => {
    const v = rows.map((r) => r[k]).filter((x): x is number => typeof x === 'number');
    return v.length ? [Math.min(...v), Math.max(...v)] : null;
  };
  return (
    <Panel className="h-full flex flex-col">
      <SectionTitle id="Z3" title="Proyecciones 2026–2027" sub="PIB e IPC en % · TC en $/US$ · déficit en % del PIB según la cobertura de cada fuente (SPG, GC-BPS o gobierno general)" />
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-token">
              <th className="text-left font-normal eyebrow px-4 py-2">Fuente</th>
              {COLS.map((c) => (
                <th key={c.key} className="text-right font-normal eyebrow px-3 py-2 whitespace-nowrap">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.fuente} className="border-b border-token last:border-b-0 row-hover">
                <td className="px-4 py-2.5">
                  <div className="font-medium">{r.fuente}</div>
                  <div className="mono text-[9.5px] text-subtle">{r.fecha}</div>
                </td>
                {COLS.map((c) => {
                  const v = r[c.key] as number | null;
                  const neg = c.key === 'fiscal2026' && v != null && v < 0;
                  return (
                    <td key={c.key} className={`px-3 py-2.5 text-right mono tabular-nums ${neg ? 'text-neg' : ''}`}>
                      {f(v, c.d)}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr style={{ background: 'var(--bg-sunk)' }}>
              <td className="px-4 py-2 eyebrow">Rango</td>
              {COLS.map((c) => {
                const r = rng(c.key);
                return (
                  <td key={c.key} className="px-3 py-2 text-right mono text-[10.5px] text-muted whitespace-nowrap">
                    {r ? (r[0] === r[1] ? f(r[0], c.d) : `${f(r[0], c.d)} a ${f(r[1], c.d)}`) : '—'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
