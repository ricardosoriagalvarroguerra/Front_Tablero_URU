import type { ReactNode } from 'react';

interface InsightProps {
  /** Encabezado corto («Lectura», «Por qué importa»…). */
  title?: string;
  children: ReactNode;
  tone?: 'accent' | 'info' | 'pos' | 'neg';
  className?: string;
}

const COLOR = {
  accent: ['var(--accent)', 'var(--accent-soft)'],
  info: ['var(--info)', 'var(--info-soft)'],
  pos: ['var(--pos)', 'var(--pos-soft)'],
  neg: ['var(--neg)', 'var(--neg-soft)'],
} as const;

/** Caja de lectura analítica: la interpretación del dato, no el dato. */
export function Insight({ title = 'Lectura', children, tone = 'accent', className = '' }: InsightProps) {
  const [fg, bg] = COLOR[tone];
  return (
    <div
      className={`rounded-[8px] px-3.5 py-2.5 ${className}`}
      style={{ background: bg, borderLeft: `2px solid ${fg}` }}
    >
      <div className="mono text-[9px] uppercase tracking-[0.16em] mb-1" style={{ color: fg }}>
        {title}
      </div>
      <div className="text-[12px] leading-relaxed" style={{ color: 'var(--fg)' }}>
        {children}
      </div>
    </div>
  );
}
