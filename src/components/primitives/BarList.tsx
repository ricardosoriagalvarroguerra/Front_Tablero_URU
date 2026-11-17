interface BarListProps {
  items: { label: string; value: number; hint?: string }[];
  fmt?: (v: number) => string;
  /** 'diverging' centra el cero (variaciones ±); 'share' arranca en 0 (participaciones). */
  mode?: 'diverging' | 'share';
  /** Para variaciones: si subir es bueno ('up') o malo ('down', p. ej. precios). */
  polarity?: 'up' | 'down' | 'none';
  color?: string;
}

const fmtDef = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1).replace('.', ',')}%`;

/** Barras horizontales con etiqueta completa (sin truncar) y valor alineado. */
export function BarList({ items, fmt = fmtDef, mode = 'diverging', polarity = 'up', color }: BarListProps) {
  const max = Math.max(...items.map((i) => Math.abs(i.value)), 0.0001);
  return (
    <div className="flex flex-col gap-2">
      {items.map((it) => {
        const w = (Math.abs(it.value) / max) * (mode === 'diverging' ? 50 : 100);
        const good = polarity === 'none' ? null : polarity === 'up' ? it.value >= 0 : it.value <= 0;
        const c = color ?? (good == null ? 'var(--info)' : good ? 'var(--pos)' : 'var(--neg)');
        return (
          <div key={it.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 items-center">
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11.5px] truncate" title={it.label}>{it.label}</span>
                {it.hint && <span className="mono text-[9px] text-subtle shrink-0">{it.hint}</span>}
              </div>
              <div className="relative h-1.5 mt-1 rounded-full" style={{ background: 'var(--bg-sunk)' }}>
                {mode === 'diverging' && <div className="absolute left-1/2 -top-0.5 -bottom-0.5 w-px" style={{ background: 'var(--border-strong)' }} />}
                <div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    background: c,
                    width: `${w}%`,
                    left: mode === 'share' ? 0 : it.value >= 0 ? '50%' : `${50 - w}%`,
                  }}
                />
              </div>
            </div>
            <span className="mono text-[11.5px] tabular-nums w-[54px] text-right" style={{ color: mode === 'share' ? 'var(--fg)' : c }}>
              {fmt(it.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
