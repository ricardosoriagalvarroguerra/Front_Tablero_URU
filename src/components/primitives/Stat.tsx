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

const SIZE = { sm: 'text-[17px]', md: 'text-[22px]', lg: 'text-[30px]' };
const TONE = { pos: 'text-pos', neg: 'text-neg', accent: 'text-accent', info: 'text-info', neutral: '' };

export function Stat({ label, value, unit, sub, tone = 'neutral', size = 'md', className = '' }: StatProps) {
  return (
    <div className={className} title={typeof sub === 'string' ? sub : undefined}>
      <div className="eyebrow">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={`mono ${SIZE[size]} leading-none tracking-[-0.02em] ${TONE[tone]}`}>{value}</span>
        {unit && <span className="text-[11px] text-subtle">{unit}</span>}
      </div>
      {typeof sub === 'string' && sub.length <= 30 && <div className="text-[11px] text-subtle mt-1">{sub}</div>}
    </div>
  );
}
