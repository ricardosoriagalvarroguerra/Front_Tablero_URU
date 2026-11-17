import type { RefObject } from 'react';
import type { Kpi, Theme } from '../types';
import { polarityOf, deltaTone } from '../tone';

export interface ClockParts {
  date: string;
  time: string;
  tz: string;
}

export function formatNow(d: Date): ClockParts {
  const dd = d.toLocaleDateString('es-UY', { day: '2-digit', month: 'short', timeZone: 'America/Montevideo' });
  const hh = d.toLocaleTimeString('es-UY', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Montevideo',
  });
  return { date: dd.replace('.', '').toUpperCase(), time: hh, tz: 'UYT · UTC−3' };
}

interface HeaderProps {
  theme: Theme;
  setTheme: (t: Theme | ((prev: Theme) => Theme)) => void;
  refreshing: boolean;
  onRefresh: () => void;
  searchRef: RefObject<HTMLInputElement>;
  query: string;
  setQuery: (q: string) => void;
  now: Date;
  /** Fecha de corte de los datos (snapshot). */
  snapshot: string;
  /** Indicadores para la cinta de cotizaciones. */
  ticker: Kpi[];
  source: 'api' | 'mock' | 'loading';
}

/** Marca: sol estilizado (genérico) en ámbar. */
function Mark() {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg width="22" height="22" viewBox="-12 -12 24 24" aria-hidden>
      {rays.map((a, i) => (
        <line
          key={a}
          x1="0"
          y1={i % 2 ? -7.2 : -6.6}
          x2="0"
          y2={i % 2 ? -9.6 : -11}
          strokeWidth="1.3"
          strokeLinecap="round"
          transform={`rotate(${a})`}
          style={{ stroke: 'var(--accent)' }}
        />
      ))}
      <circle r="5" style={{ fill: 'var(--accent)' }} />
    </svg>
  );
}

function TickerItem({ k }: { k: Kpi }) {
  const tone = deltaTone(polarityOf(k.id), k.delta);
  const color = tone === 'pos' ? 'var(--pos)' : tone === 'neg' ? 'var(--neg)' : 'var(--fg-subtle)';
  const arrow = k.delta > 0 ? '▲' : k.delta < 0 ? '▼' : '◆';
  return (
    <span className="flex items-center gap-2 px-4 whitespace-nowrap" style={{ borderRight: '1px solid var(--border)' }}>
      <span className="mono text-[9.5px] uppercase tracking-[0.12em] text-subtle">{k.label}</span>
      <span className="mono text-[11.5px]">
        {k.fmt(k.value)}
        {k.unit && <span className="text-subtle text-[9.5px]"> {k.unit}</span>}
      </span>
      <span className="mono text-[10px]" style={{ color }}>
        <span className="text-[7px] align-middle">{arrow}</span> {k.deltaLabel}
      </span>
    </span>
  );
}

export function Header({
  theme,
  setTheme,
  refreshing,
  onRefresh,
  searchRef,
  query,
  setQuery,
  now,
  snapshot,
  ticker,
  source,
}: HeaderProps) {
  const t = formatNow(now);
  const origen = source === 'api' ? 'BDR en vivo' : source === 'mock' ? 'datos embebidos' : 'conectando…';
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--bg-elev) 88%, transparent)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-center h-14 px-3 sm:px-5 gap-3 sm:gap-5">
        {/* marca */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Mark />
          <div className="leading-tight">
            <div className="text-[13.5px] font-semibold tracking-[-0.01em] whitespace-nowrap">
              Tablero URU
              <span className="hidden sm:inline text-muted font-normal"> · inteligencia económica</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 mono text-[9.5px] text-subtle uppercase tracking-[0.12em]">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${source === 'api' ? 'pulse-dot' : ''}`}
                style={{ background: source === 'api' ? 'var(--pos)' : source === 'mock' ? 'var(--accent)' : 'var(--fg-subtle)' }}
              />
              {origen} · datos al {snapshot}
            </div>
          </div>
        </div>

        {/* búsqueda */}
        <div className="flex-1 flex items-center min-w-0 max-w-[560px] mx-auto">
          <label className="surface-sunk rounded-[8px] flex items-center gap-2 px-3 h-9 w-full focus-within:ring-accent">
            <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden style={{ color: 'var(--fg-subtle)' }}>
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar indicador, fuente…"
              aria-label="Buscar indicadores"
              className="flex-1 min-w-0 bg-transparent outline-none text-[12.5px] placeholder:text-subtle"
            />
            <span className="kbd hidden sm:inline">/</span>
          </label>
        </div>

        {/* acciones */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onRefresh}
            title="Refrescar [R]"
            aria-label="Refrescar"
            className={`h-9 w-9 md:w-auto md:px-3 surface-sunk rounded-[8px] flex items-center justify-center gap-1.5 text-[11.5px] hover:ring-accent ${
              refreshing ? 'text-accent' : 'text-muted'
            }`}
          >
            <span style={refreshing ? { display: 'inline-block', animation: 'spin 800ms linear' } : {}}>↻</span>
            <span className="hidden md:inline">Refrescar</span>
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Modo claro/oscuro [D]"
            aria-label="Cambiar modo claro u oscuro"
            className="h-9 w-9 md:w-auto md:px-3 surface-sunk rounded-[8px] flex items-center justify-center gap-1.5 text-[11.5px] text-muted hover:ring-accent"
          >
            <span>{theme === 'dark' ? '☾' : '☀'}</span>
            <span className="hidden md:inline">{theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
          </button>
          <div className="hidden lg:flex flex-col items-end leading-tight pl-2">
            <span className="mono text-[12px] tabular-nums">{t.time}</span>
            <span className="mono text-[9px] text-subtle uppercase tracking-[0.12em]">
              {t.date} · {t.tz}
            </span>
          </div>
        </div>
      </div>

      {/* cinta de cotizaciones */}
      {ticker.length > 0 && (
        <div className="ticker overflow-hidden h-8 flex items-center" style={{ borderTop: '1px solid var(--border)' }} aria-label="Cinta de indicadores">
          <div className="ticker-track">
            {[...ticker, ...ticker].map((k, i) => (
              <TickerItem key={`${k.id}-${i}`} k={k} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
