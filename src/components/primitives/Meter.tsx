interface MeterProps {
  /** Valor a marcar. */
  value: number | null;
  min: number;
  max: number;
  /** Banda objetivo [desde, hasta] sombreada. */
  band?: [number, number];
  /** Línea de referencia (p. ej. centro de la meta). */
  mark?: number;
  fmt?: (v: number) => string;
  tone?: 'pos' | 'neg' | 'accent' | 'info';
}

/** Regla horizontal con banda objetivo y marcador (inflación vs meta, etc.). */
export function Meter({ value, min, max, band, mark, fmt = (v) => v.toFixed(1).replace('.', ','), tone = 'accent' }: MeterProps) {
  const pct = (v: number) => `${Math.max(0, Math.min(1, (v - min) / (max - min))) * 100}%`;
  const color = `var(--${tone})`;
  return (
    <div>
      <div className="relative h-2.5 rounded-full" style={{ background: 'var(--bg-sunk)', border: '1px solid var(--border)' }}>
        {band && (
          <div
            className="absolute top-0 bottom-0 rounded-full"
            style={{ left: pct(band[0]), width: `calc(${pct(band[1])} - ${pct(band[0])})`, background: 'var(--pos-soft)', boxShadow: 'inset 0 0 0 1px var(--pos)' }}
          />
        )}
        {mark != null && (
          <div className="absolute -top-1 -bottom-1 w-px" style={{ left: pct(mark), background: 'var(--fg-subtle)' }} />
        )}
        {value != null && (
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(value), background: color, boxShadow: '0 0 0 3px var(--bg-elev)' }}
          />
        )}
      </div>
      <div className="mt-1.5 flex justify-between mono text-[9px] text-subtle">
        <span>{fmt(min)}</span>
        {band && <span className="text-pos">meta {fmt(band[0])}–{fmt(band[1])}</span>}
        <span>{fmt(max)}</span>
      </div>
    </div>
  );
}
