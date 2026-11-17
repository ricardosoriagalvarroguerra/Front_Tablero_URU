import { useMemo, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { line as d3line } from 'd3-shape';
import { useTheme } from '../../theme';
import type { RegionData } from '../../types';

interface RegionPanelProps {
  data: RegionData;
  /** País propio (resaltado) y país «hermano» de comparación. */
  pais?: string;
  hermano?: string;
}

const c1 = (v: number) => v.toFixed(1).replace('.', ',');
const FONT = '"JetBrains Mono", ui-monospace, monospace';

function mediana(vals: number[]): number | null {
  if (!vals.length) return null;
  const s = [...vals].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/**
 * Comparador regional (FMI WEO): ranking del año elegido + trayectoria del país
 * frente a la mediana regional y al país hermano. Agnóstico del país.
 */
export function RegionPanel({ data, pais = 'URY', hermano = 'BOL' }: RegionPanelProps) {
  const theme = useTheme();
  const [indId, setIndId] = useState(data.indicadores[0]?.id ?? '');
  const ind = data.indicadores.find((i) => i.id === indId) ?? data.indicadores[0];
  const serie = data.datos[ind?.id ?? ''] ?? {};
  const anios = useMemo(() => {
    const set = new Set<number>();
    Object.values(serie).forEach((s) => s.forEach((p) => set.add(p.anio)));
    return [...set].sort((a, b) => a - b);
  }, [serie]);
  const ultimoReal = Math.max(...anios.filter((a) => Object.values(serie).some((s) => s.some((p) => p.anio === a && !p.proyeccion))));
  const [anioSel, setAnioSel] = useState<number | null>(null);
  const anio = anioSel ?? (Number.isFinite(ultimoReal) ? ultimoReal : anios[anios.length - 1]);
  const nombre = (iso: string) => data.paises.find((p) => p.iso === iso)?.nombre ?? iso;

  if (!ind || !anios.length) {
    return (
      <div className="card p-10 text-center">
        <div className="text-[14px]">Comparador regional sin datos todavía</div>
        <p className="text-[12.5px] text-muted mt-2 max-w-[520px] mx-auto">
          Las series del FMI (World Economic Outlook) se cargan con la ingesta automática del backend
          (<span className="mono">npm run ingest</span> o el cron de Railway). En cuanto corra, esta pestaña compara a
          Uruguay con Argentina, Bolivia, Brasil, Chile, Colombia, Ecuador, Paraguay y Perú desde 2015.
        </p>
      </div>
    );
  }

  // ranking del año
  const fila = Object.entries(serie)
    .map(([iso, s]) => ({ iso, p: s.find((x) => x.anio === anio) }))
    .filter((x): x is { iso: string; p: { anio: number; valor: number; proyeccion: boolean } } => !!x.p)
    .sort((a, b) => (ind.polaridad === 'up' ? b.p.valor - a.p.valor : a.p.valor - b.p.valor));
  const maxAbs = Math.max(...fila.map((f) => Math.abs(f.p.valor)), 0.0001);
  const hayNeg = fila.some((f) => f.p.valor < 0);
  const puesto = fila.findIndex((f) => f.iso === pais) + 1;
  const med = mediana(fila.map((f) => f.p.valor));

  // trayectoria: país, hermano y mediana regional
  const W = 640;
  const H = 220;
  const P = { l: 36, r: 14, t: 14, b: 24 };
  const valor = (iso: string, a: number) => serie[iso]?.find((p) => p.anio === a)?.valor;
  const medianas = anios.map((a) => mediana(Object.keys(serie).map((iso) => valor(iso, a)).filter((v): v is number => v != null)));
  const todos = [
    ...anios.map((a) => valor(pais, a)),
    ...anios.map((a) => valor(hermano, a)),
    ...medianas,
  ].filter((v): v is number => v != null);
  const x = scaleLinear().domain([anios[0], anios[anios.length - 1]]).range([P.l, W - P.r]);
  const lo = Math.min(...todos);
  const hi = Math.max(...todos);
  const y = scaleLinear().domain([lo - (hi - lo) * 0.1, hi + (hi - lo) * 0.1 || 1]).range([H - P.b, P.t]).nice(4);
  const path = (vals: (number | null | undefined)[]) =>
    d3line<[number, number | null | undefined]>()
      .defined((d) => d[1] != null)
      .x((d) => x(d[0]))
      .y((d) => y(d[1] as number))(anios.map((a, i) => [a, vals[i]])) ?? '';
  const primerProy = anios.find((a) => serie[pais]?.find((p) => p.anio === a)?.proyeccion);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-1">
        {data.indicadores.map((i) => (
          <button
            key={i.id}
            onClick={() => setIndId(i.id)}
            className={`text-[12.5px] px-3 h-8 rounded-[7px] ${i.id === ind.id ? '' : 'text-muted hover:text-[color:var(--fg)]'}`}
            style={i.id === ind.id ? { background: 'var(--bg-sunk)' } : undefined}
          >
            {i.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-subtle">{data.vintage ?? 'FMI WEO'}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ranking */}
        <div className="card">
          <div className="px-5 h-12 flex items-center justify-between border-b border-token">
            <span className="text-[13px] font-medium">
              Ranking {anio}
              {fila[0]?.p.proyeccion ? <span className="text-subtle font-normal"> · proyección</span> : null}
            </span>
            <select
              value={anio}
              onChange={(e) => setAnioSel(Number(e.target.value))}
              className="bg-transparent text-[12px] text-muted outline-none"
              aria-label="Año"
            >
              {anios.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div className="px-5 py-4 flex flex-col gap-2">
            {fila.map((f, i) => {
              const propio = f.iso === pais;
              const herm = f.iso === hermano;
              const w = (Math.abs(f.p.valor) / maxAbs) * (hayNeg ? 50 : 100);
              return (
                <div key={f.iso} className="grid grid-cols-[18px_84px_1fr_52px] items-center gap-3">
                  <span className="mono text-[11px] text-subtle">{i + 1}</span>
                  <span className={`text-[12.5px] truncate ${propio ? 'font-medium' : herm ? '' : 'text-muted'}`}>{nombre(f.iso)}</span>
                  <span className="relative h-1.5 rounded-full" style={{ background: 'var(--bg-sunk)' }}>
                    {hayNeg && <span className="absolute left-1/2 -top-1 -bottom-1 w-px" style={{ background: 'var(--border-strong)' }} />}
                    <span
                      className="absolute top-0 bottom-0 rounded-full"
                      style={{
                        width: `${w}%`,
                        left: !hayNeg ? 0 : f.p.valor >= 0 ? '50%' : `${50 - w}%`,
                        background: propio ? 'var(--accent)' : herm ? 'var(--fg-muted)' : 'var(--fg-subtle)',
                        opacity: propio || herm ? 1 : 0.6,
                      }}
                    />
                  </span>
                  <span className={`mono text-[12px] text-right ${propio ? '' : 'text-muted'}`}>{c1(f.p.valor)}</span>
                </div>
              );
            })}
          </div>
          <div className="px-5 pb-4 text-[12px] text-muted">
            {nombre(pais)} {puesto ? `ocupa el puesto ${puesto} de ${fila.length}` : 'sin dato'}
            {med != null && <> · mediana regional {c1(med)} {ind.unidad}</>}
          </div>
        </div>

        {/* trayectoria */}
        <div className="card">
          <div className="px-5 h-12 flex items-center justify-between border-b border-token">
            <span className="text-[13px] font-medium">{nombre(pais)} vs la región</span>
            <span className="flex items-center gap-3 text-[11px] text-subtle">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5" style={{ background: 'var(--accent)' }} />{nombre(pais)}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5" style={{ background: 'var(--fg-muted)' }} />{nombre(hermano)}</span>
              <span className="flex items-center gap-1"><span className="w-3 border-t border-dashed" style={{ borderColor: 'var(--fg-subtle)' }} />mediana</span>
            </span>
          </div>
          <div className="px-5 py-4">
            <svg key={theme} viewBox={`0 0 ${W} ${H}`} className="w-full block" style={{ overflow: 'visible' }}>
              {primerProy && (
                <rect x={x(primerProy) - 0.5 * (x(anios[1]) - x(anios[0]))} y={P.t} width={W - P.r - x(primerProy) + 0.5 * (x(anios[1]) - x(anios[0]))} height={H - P.t - P.b} style={{ fill: 'var(--bg-sunk)' }} />
              )}
              {y.ticks(4).map((t) => (
                <g key={t}>
                  <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} style={{ stroke: 'var(--border)' }} strokeDasharray={t === 0 ? undefined : '2 4'} />
                  <text x={P.l - 6} y={y(t) + 3} textAnchor="end" fontSize="9.5" fontFamily={FONT} style={{ fill: 'var(--fg-subtle)' }}>{c1(t)}</text>
                </g>
              ))}
              {anios.map((a, i) => (i % 2 === 0 || i === anios.length - 1) && (
                <text key={a} x={x(a)} y={H - 6} textAnchor="middle" fontSize="9.5" fontFamily={FONT} style={{ fill: 'var(--fg-subtle)' }}>{`'${String(a).slice(2)}`}</text>
              ))}
              {primerProy && (
                <text x={W - P.r - 4} y={P.t + 11} textAnchor="end" fontSize="9" fontFamily={FONT} style={{ fill: 'var(--fg-subtle)' }}>proyección</text>
              )}
              <path d={path(medianas)} strokeWidth="1.25" strokeDasharray="4 3" style={{ fill: 'none', stroke: 'var(--fg-subtle)' }} />
              <path d={path(anios.map((a) => valor(hermano, a)))} strokeWidth="1.5" style={{ fill: 'none', stroke: 'var(--fg-muted)' }} />
              <path d={path(anios.map((a) => valor(pais, a)))} strokeWidth="2" style={{ fill: 'none', stroke: 'var(--accent)' }} />
              <line x1={x(anio)} x2={x(anio)} y1={P.t} y2={H - P.b} strokeDasharray="2 2" style={{ stroke: 'var(--border-strong)' }} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
