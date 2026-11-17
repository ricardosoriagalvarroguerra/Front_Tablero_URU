import type { ReactNode } from 'react';

interface StatProps {
  label: string;
  value: ReactNode;
  unit?: string;
  sub?: ReactNode;
  tone?: 'pos' | 'neg' | 'accent' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE = { sm: 'text-[16px]', md: 'text-[22px]', lg: 'text-[30px]' };
const TONE = { pos: 'text-pos', neg: 'text-neg', accent: 'text-accent', info: 'text-info', neutral: '' };

/** Cifra con etiqueta, unidad y nota (bloque básico de los paneles). */
export function Stat({ label, value, unit, sub, tone = 'neutral', size = 'md', className = '' }: StatProps) {
  return (
    <div className={className}>
      <div className="eyebrow">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className={`mono ${SIZE[size]} font-medium leading-none tracking-[-0.02em] ${TONE[tone]}`}>{value}</span>
        {unit && <span className="mono text-[10px] text-subtle">{unit}</span>}
      </div>
      {sub && <div className="mono text-[10px] text-subtle mt-1 leading-snug">{sub}</div>}
    </div>
  );
}
