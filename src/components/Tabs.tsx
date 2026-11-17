import type { ReactNode } from 'react';

export interface TabDef {
  id: string;
  label: string;
  badge?: ReactNode;
  /** Código corto del módulo (p. ej. «AG»). */
  code?: string;
}

interface TabsProps {
  tabs: TabDef[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <nav
      className="sticky top-[88px] z-20 backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderBottom: '1px solid var(--border)' }}
      aria-label="Módulos del tablero"
    >
      <div className="flex items-center gap-1 px-3 sm:px-5 h-11 overflow-x-auto scrollbar-thin" role="tablist">
        {tabs.map((t, i) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => onChange(t.id)}
              title={`${t.label} [${i + 1}]`}
              className={`relative h-8 px-3 rounded-[7px] whitespace-nowrap flex items-center gap-2 text-[12.5px] transition-colors ${
                on ? 'font-medium' : 'text-muted hover:text-[color:var(--fg)]'
              }`}
              style={on ? { background: 'var(--bg-elev)', boxShadow: 'inset 0 0 0 1px var(--border-strong)' } : undefined}
            >
              {t.code && (
                <span className="mono text-[9px] tracking-wider" style={{ color: on ? 'var(--accent)' : 'var(--fg-subtle)' }}>
                  {t.code}
                </span>
              )}
              {t.label}
              {t.badge}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
