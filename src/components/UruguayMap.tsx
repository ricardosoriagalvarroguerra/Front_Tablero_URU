// Mapa de Uruguay — geometría real de los 19 departamentos, coloreados por su
// índice de actividad agro/económica. Geometría: geoBoundaries gbOpen URY ADM1
// (OpenStreetMap / Wambacher, ODbL 1.0), proyectada con Mercator en build-time
// por scripts/generate-uruguay-map.mjs → uruguayGeo.ts.

import { useMemo, useState } from 'react';
import { useTheme } from '../theme';
import { DEPARTAMENTOS, ZONAS, MAP_VIEWBOX } from '../data/uruguayGeo';
import type { DepartamentoActividad } from '../types';

interface UruguayMapProps {
  departamentos: DepartamentoActividad[];
  hovered: string | null; // código de departamento
  setHovered: (id: string | null) => void;
}

export function UruguayMap({ departamentos, hovered, setHovered }: UruguayMapProps) {
  const theme = useTheme();
  const [tip, setTip] = useState<{ x: number; y: number; depto: string; zona: string; val: number | null } | null>(null);

  const datByCode = useMemo(() => {
    const m: Record<string, DepartamentoActividad> = {};
    departamentos.forEach((d) => (m[d.codigo] = d));
    return m;
  }, [departamentos]);

  const zonaName = useMemo(() => Object.fromEntries(ZONAS.map((z) => [z.codigo, z.nombre])), []);

  // Escala secuencial ámbar por intensidad de actividad (mayor = más saturado).
  const vals = departamentos.map((d) => d.valor).filter((v): v is number => v != null);
  const min = vals.length ? Math.min(...vals) : 0;
  const max = vals.length ? Math.max(...vals) : 1;
  const range = max - min || 1;
  const opacityOf = (code: string): number => {
    const v = datByCode[code]?.valor;
    if (v == null) return 0.06;
    return 0.16 + ((v - min) / range) * 0.72; // 0.16 → 0.88
  };

  return (
    <svg
      key={theme}
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid meet"
    >
      {DEPARTAMENTOS.map((p) => {
        const isHot = hovered === p.id;
        return (
          <path
            key={p.id}
            d={p.d}
            strokeWidth={isHot ? 1.1 : 0.6}
            onMouseEnter={(e) => {
              setHovered(p.id);
              setTip({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
                depto: p.name,
                zona: zonaName[p.zona] ?? p.zona,
                val: datByCode[p.id]?.valor ?? null,
              });
            }}
            onMouseMove={(e) => setTip((t) => (t ? { ...t, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } : t))}
            onMouseLeave={() => {
              setHovered(null);
              setTip(null);
            }}
            style={{
              cursor: 'pointer',
              transition: 'fill 120ms, stroke 120ms',
              fill: 'var(--accent)',
              fillOpacity: isHot ? Math.min(1, opacityOf(p.id) + 0.12) : opacityOf(p.id),
              stroke: isHot ? 'var(--accent)' : 'var(--border-strong)',
              strokeLinejoin: 'round',
            }}
          />
        );
      })}

      {/* tooltip */}
      {tip && (
        <foreignObject
          x={Math.min(tip.x + 8, MAP_VIEWBOX.width - 158)}
          y={Math.max(tip.y - 8, 2)}
          width="158"
          height="52"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          <div
            className="mono"
            style={{
              background: 'var(--bg-elev)',
              border: '1px solid var(--border-strong)',
              borderRadius: 4,
              padding: '4px 6px',
              fontSize: 10,
              lineHeight: 1.35,
              color: 'var(--fg)',
              width: 'fit-content',
            }}
          >
            <div style={{ color: 'var(--fg)' }}>{tip.depto}</div>
            <div style={{ color: 'var(--fg-subtle)' }}>
              {tip.zona} · actividad {tip.val != null ? tip.val.toFixed(0) : 's/d'}
            </div>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}
