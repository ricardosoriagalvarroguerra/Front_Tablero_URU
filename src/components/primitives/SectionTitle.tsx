import type { ReactNode } from 'react';

interface SectionTitleProps {
  id: string;
  title: string;
  right?: ReactNode;
  /** Bajada opcional bajo el título (qué responde el panel). */
  sub?: string;
}

export function SectionTitle({ id, title, right, sub }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 min-h-[42px] py-2 border-b border-token">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="mono text-[9px] tracking-[0.08em] px-1.5 py-[1px] rounded-[4px] text-subtle shrink-0"
            style={{ border: '1px solid var(--border-strong)' }}
          >
            {id.replace(/\s*·\s*$/, '')}
          </span>
          <span className="text-[12.5px] font-semibold tracking-[-0.005em] truncate">{title}</span>
        </div>
        {sub && <div className="text-[11px] text-muted mt-0.5 truncate">{sub}</div>}
      </div>
      <div className="flex items-center gap-2 mono text-[10px] text-subtle shrink-0">{right}</div>
    </div>
  );
}
