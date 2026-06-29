# BDR · Tablero Inteligente URU (PostgreSQL)

Base de datos relacional que respalda los módulos del tablero. Diseñada para que
el backend reemplace los datos mock de `src/data/mockData.ts` por consultas reales
sin tocar el frontend.

- **Motor:** PostgreSQL 18 · **Base:** `uruguay` · **Esquema:** `public`

## Cómo crear / recrear

```bash
# 1) estructura (idempotente: reinicia el schema public)
psql -d uruguay -v ON_ERROR_STOP=1 -f db/schema.sql

# 2) datos (snapshot ~17-jun-2026, generado desde mockData.ts)
node db/generate-seed.mjs            # regenera db/seed.sql
psql -d uruguay -v ON_ERROR_STOP=1 -f db/seed.sql
```

> `generate-seed.mjs` importa los **mismos** datos que usa el frontend, así la BDR
> y el tablero quedan idénticos. En producción se reemplaza por la ingesta real.

## Modelo por módulo

| Módulo | Tablas |
|--------|--------|
| **A** Indicadores | `indicadores` + `indicador_observaciones` (+ `fuentes`) |
| **AG** Agro | `productos_agro` + `agro_destinos` (+ `series[agro]`, `metricas[agro]`) |
| **C** Mercados | `indices_riesgo` (UBI) + `indice_riesgo_observaciones`, `bonos_soberanos` + `bono_cotizaciones`, `calificaciones`, `metricas[mercados]` (grado inversor, SSLB) |
| **AC** Actividad | `metricas[actividad]`, `series[actividad]`, `ipc_rubros`, `actividad_departamental` (+ `departamentos`, `zonas`) |
| **EN** Energía | `energia_matriz`, `energia_combustibles`, `metricas[energia]` |
| **EX** Externo | `commodities`, `comercio_destinos`, `metricas[externo]` |
| **F$** Fiscal | `metricas[fiscal]`, `series[fiscal]` |
| **D** Noticias | `noticias`, `medios`, `categorias_noticia`, `terminos`, `noticia_terminos`, `noticia_vinculos` |
| **E** Calendario | `eventos`, `categorias_evento` |
| **F** Health-check | `fuentes`, `fuente_estado` |

## Diseño incorporado

- **Almacenes genéricos** `metricas(modulo, clave, …)` y `series(modulo, clave,
  idx, valor)` para los escalares y sparklines de los módulos sin tabla dedicada
  (evita fragmentar el esquema en decenas de tablas de una sola fila).
- **Series de tiempo** normalizadas con `UNIQUE(entidad, fecha)`; el valor vigente
  es la última fila (vistas con `LATERAL` / `DISTINCT ON`).
- **Búsqueda global** con `tsvector` generado + GIN, y `pg_trgm` / `unaccent`.
- **Enums** para dominios fijos; **toda FK indexada**; triggers `actualizado_en`.

## Vistas (estado actual, listas para el API)

| Vista | Sirve a |
|-------|---------|
| `v_indicadores_actuales` | tira de KPIs (valor, delta, extra, spark 12m) |
| `v_productos_agro` | grilla de productos del complejo agro (con spark) |
| `v_bonos_actuales` | tabla de bonos soberanos |
| `v_calificaciones_actuales` | ratings vigentes |
| `v_actividad_departamental` | mapa departamental de actividad |
| `v_noticias_feed` | feed (con flag *breaking* < 6 h) |
| `v_fuentes_estado_actual` | footer de fuentes |

## Archivos

- [`schema.sql`](schema.sql) — DDL completo (tipos, tablas, índices, triggers, vistas).
- [`generate-seed.mjs`](generate-seed.mjs) — genera el seed desde `src/data/mockData.ts`.
- [`seed.sql`](seed.sql) — datos (auto-generado).
