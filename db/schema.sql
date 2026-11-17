-- ════════════════════════════════════════════════════════════════════════
-- Tablero Inteligente URU · Esquema relacional (PostgreSQL)
-- Base de datos: uruguay
--
-- Modela los módulos del tablero:
--   A   · Indicadores macro   → indicadores + indicador_observaciones
--   AG  · Agroexportador      → productos_agro + agro_destinos (+ metricas + series)
--   C   · Mercados            → indices_riesgo (EMBI/UBI), bonos_soberanos, calificaciones
--   AC  · Actividad & precios → metricas/series + ipc_rubros + actividad_departamental
--   EN  · Energía             → energia_matriz + energia_combustibles (+ metricas)
--   EX  · Externo & comercio  → commodities + comercio_destinos + metricas
--   F$  · Fiscal & monetario  → metricas + series
--   D   · Noticias            → noticias + terminos + vinculos (+ medios)
--   E   · Calendario          → eventos
--   F   · Health-check        → fuentes + fuente_estado
--
-- Convenciones:
--   · Nombres en español, snake_case. Catálogos vs. hechos/series de tiempo.
--   · `metricas(modulo, clave, …)` y `series(modulo, clave, idx, valor)` son
--     almacenes genéricos clave/valor para los escalares y sparklines de los
--     módulos sin tabla dedicada (evita un esquema sobre-fragmentado).
--   · Toda FK lleva índice. Series de tiempo: UNIQUE(entidad, fecha).
--   · Vistas v_* entregan el "estado actual" listo para el frontend.
--
-- Idempotente: reinicia el schema public (la base es dedicada a este tablero).
-- ════════════════════════════════════════════════════════════════════════

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public AUTHORIZATION CURRENT_USER;
SET search_path = public;

CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ────────────────────────────────────────────────────────────────────────
-- Tipos enumerados
-- ────────────────────────────────────────────────────────────────────────
CREATE TYPE sentido_indicador   AS ENUM ('pos', 'neg', 'neutral', 'accent');
CREATE TYPE categoria_indicador AS ENUM ('precios', 'monetario', 'actividad', 'fiscal', 'mercados', 'social', 'externo', 'agro');
CREATE TYPE periodicidad        AS ENUM ('diaria', 'semanal', 'mensual', 'trimestral', 'semestral', 'anual');
CREATE TYPE tipo_fuente         AS ENUM ('oficial', 'mercado', 'prensa', 'sectorial', 'agregador');
CREATE TYPE estado_fuente       AS ENUM ('ok', 'lag', 'live', 'cold', 'down');
CREATE TYPE tipo_medio          AS ENUM ('nacional', 'internacional', 'agencia');
CREATE TYPE perspectiva_rating  AS ENUM ('positiva', 'estable', 'negativa', 'en_revision', 'na');
CREATE TYPE tono_visual         AS ENUM ('accent', 'info', 'neg', 'neutral', 'pos');
CREATE TYPE tipo_entidad        AS ENUM ('indicador', 'bono', 'indice', 'producto', 'evento', 'otro');
CREATE TYPE moneda_bono         AS ENUM ('USD', 'UYU', 'UI');
CREATE TYPE tipo_bono           AS ENUM ('global', 'sslb', 'local');
CREATE TYPE polaridad_precio    AS ENUM ('up', 'down', 'none');
CREATE TYPE tono_extra          AS ENUM ('pos', 'neg', 'neutral');

-- ────────────────────────────────────────────────────────────────────────
-- Trigger genérico de actualizado_en
-- ────────────────────────────────────────────────────────────────────────
CREATE FUNCTION set_actualizado_en() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.actualizado_en := now();
  RETURN NEW;
END;
$$;

-- ════════════════════════════════════════════════════════════════════════
-- ALMACENES GENÉRICOS (clave/valor por módulo)
-- ════════════════════════════════════════════════════════════════════════
CREATE TABLE metricas (
  modulo      text NOT NULL,
  clave       text NOT NULL,
  valor       numeric(20,4),
  valor_texto text,
  unidad      text,
  asof        text,
  fuente      text,
  nota        text,
  PRIMARY KEY (modulo, clave)
);
COMMENT ON TABLE metricas IS 'Escalares por módulo (agro, actividad, energia, externo, fiscal, mercados).';

CREATE TABLE series (
  modulo  text     NOT NULL,
  clave   text     NOT NULL,
  idx     smallint NOT NULL,
  valor   numeric(20,4) NOT NULL,
  periodo text,
  PRIMARY KEY (modulo, clave, idx)
);
COMMENT ON TABLE series IS 'Sparklines/series por módulo (PIB, resultado fiscal, precios de productos agro…).';

CREATE TABLE analisis (
  clave          text        PRIMARY KEY,        -- 'vigente' (documento actual)
  asof           text        NOT NULL,
  contenido      jsonb       NOT NULL,           -- tesis, semáforo, proyecciones, escenarios, riesgos, lecturas
  actualizado_en timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE analisis IS 'Capa analítica (Módulo Z): juicio fechado del tablero, separado del dato de fuente.';

-- ════════════════════════════════════════════════════════════════════════
-- CATÁLOGOS
-- ════════════════════════════════════════════════════════════════════════
CREATE TABLE zonas (
  codigo text PRIMARY KEY,          -- montevideo, metropolitana, litoral, centro, norte, este
  nombre text NOT NULL UNIQUE
);
COMMENT ON TABLE zonas IS 'Zonas económicas para agrupar los departamentos (mapa coroplético).';

CREATE TABLE departamentos (
  codigo      text PRIMARY KEY,     -- montevideo, canelones, …
  nombre      text NOT NULL UNIQUE,
  zona_codigo text REFERENCES zonas(codigo) ON DELETE SET NULL
);
COMMENT ON TABLE departamentos IS 'Los 19 departamentos de Uruguay (mapa de actividad económica).';

CREATE TABLE fuentes (
  id             smallserial PRIMARY KEY,
  codigo         text        NOT NULL UNIQUE,
  nombre         text        NOT NULL,
  categoria      tipo_fuente NOT NULL DEFAULT 'oficial',
  url            text,
  descripcion    text,
  creado_en      timestamptz NOT NULL DEFAULT now(),
  actualizado_en timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE medios (
  id     smallserial PRIMARY KEY,
  nombre text        NOT NULL UNIQUE,
  tipo   tipo_medio  NOT NULL DEFAULT 'nacional',
  pais   text        DEFAULT 'UY'
);

CREATE TABLE categorias_noticia (
  id     smallserial PRIMARY KEY,
  codigo text        NOT NULL UNIQUE,
  nombre text        NOT NULL UNIQUE
);

CREATE TABLE categorias_evento (
  id     smallserial PRIMARY KEY,
  codigo text        NOT NULL UNIQUE,
  nombre text        NOT NULL UNIQUE
);

CREATE TABLE agencias_calificadoras (
  id     smallserial PRIMARY KEY,
  codigo text        NOT NULL UNIQUE,
  nombre text        NOT NULL UNIQUE
);

CREATE TABLE bonos_soberanos (
  id          smallserial PRIMARY KEY,
  codigo      text        NOT NULL UNIQUE,     -- usd2037, uyu2035, sslb2034…
  nombre      text        NOT NULL,
  moneda      moneda_bono NOT NULL DEFAULT 'USD',
  tipo        tipo_bono   NOT NULL DEFAULT 'global',
  vencimiento text,
  orden       smallint    NOT NULL DEFAULT 0
);

CREATE TABLE indices_riesgo (
  id     smallserial PRIMARY KEY,
  codigo text        NOT NULL UNIQUE,     -- UBI, EMBI, IRU
  nombre text        NOT NULL,
  unidad text        NOT NULL DEFAULT 'pb'
);

CREATE TABLE productos_agro (
  id            smallserial      PRIMARY KEY,
  codigo        text             NOT NULL UNIQUE,  -- carne, celulosa, soja…
  nombre        text             NOT NULL,
  orden         smallint         NOT NULL DEFAULT 0,
  precio        numeric(16,3),
  precio_unidad text,
  var_precio    numeric(8,2),
  export_usd    numeric(14,2),                     -- USD millones
  participacion numeric(6,2),                      -- % de exportaciones
  destino_top   text,
  polaridad     polaridad_precio NOT NULL DEFAULT 'up',
  asof          text,
  fuente        text,
  nota          text
);
COMMENT ON TABLE productos_agro IS 'Productos del complejo agroexportador (módulo estrella).';

CREATE TABLE agro_destinos (
  id    smallserial  PRIMARY KEY,
  orden smallint     NOT NULL DEFAULT 0,
  pais  text         NOT NULL,
  valor numeric(6,2) NOT NULL                       -- % del total
);

CREATE TABLE indicadores (
  id             smallserial         PRIMARY KEY,
  codigo         text                NOT NULL UNIQUE,
  nombre         text                NOT NULL,
  unidad         text,
  categoria      categoria_indicador NOT NULL,
  sentido        sentido_indicador   NOT NULL DEFAULT 'neutral',
  decimales      smallint            NOT NULL DEFAULT 1,
  definicion     text,
  asof           text,
  periodicidad   periodicidad        NOT NULL DEFAULT 'mensual',
  fuente_id      smallint            REFERENCES fuentes(id) ON DELETE SET NULL,
  extra_label    text,
  extra_valor    text,
  extra_tono     tono_extra,
  creado_en      timestamptz         NOT NULL DEFAULT now(),
  actualizado_en timestamptz         NOT NULL DEFAULT now()
);
COMMENT ON TABLE indicadores IS 'Catálogo de KPIs macro de la tira A.';

CREATE TABLE ipc_rubros (
  id    smallserial PRIMARY KEY,
  orden smallint    NOT NULL DEFAULT 0,
  label text        NOT NULL,
  valor numeric(8,2) NOT NULL,
  asof  text
);

CREATE TABLE pib_sectores (
  id    smallserial PRIMARY KEY,
  orden smallint    NOT NULL DEFAULT 0,
  label text        NOT NULL,
  valor numeric(8,2) NOT NULL,        -- variación i/a del sector
  asof  text
);
COMMENT ON TABLE pib_sectores IS 'PIB por sector de actividad (var. i/a del último trimestre, BCU).';

CREATE TABLE actividad_departamental (
  departamento_codigo text REFERENCES departamentos(codigo) ON DELETE CASCADE,
  valor               numeric(10,2),   -- índice de actividad económica (base 100 = Montevideo)
  valor_alt           numeric(8,2),    -- dato secundario (% del PIB nacional, aprox.)
  asof                text,
  PRIMARY KEY (departamento_codigo)
);

CREATE TABLE energia_matriz (
  id     smallserial  PRIMARY KEY,
  codigo text         NOT NULL UNIQUE,  -- hidraulica, eolica, solar, biomasa, termica
  nombre text         NOT NULL,
  orden  smallint     NOT NULL DEFAULT 0,
  pct    numeric(6,2) NOT NULL          -- % de la generación eléctrica
);

CREATE TABLE energia_combustibles (
  id       smallserial PRIMARY KEY,
  orden    smallint    NOT NULL DEFAULT 0,
  producto text        NOT NULL,
  precio   numeric(12,2),
  unidad   text
);

CREATE TABLE commodities (
  id          smallserial   PRIMARY KEY,
  codigo      text          NOT NULL UNIQUE,
  nombre      text          NOT NULL,
  unidad      text          NOT NULL,
  valor       numeric(16,3) NOT NULL,
  var_mensual numeric(8,2),
  var_anual   numeric(8,2),
  polaridad   polaridad_precio NOT NULL DEFAULT 'up',
  fuente      text,
  asof        text,
  nota        text
);

CREATE TABLE comercio_destinos (
  id    smallserial  PRIMARY KEY,
  orden smallint     NOT NULL DEFAULT 0,
  pais  text         NOT NULL,
  valor numeric(6,2) NOT NULL          -- % de las exportaciones
);

CREATE TABLE terminos (
  id      serial PRIMARY KEY,
  termino text   NOT NULL UNIQUE
);

-- ════════════════════════════════════════════════════════════════════════
-- HECHOS / SERIES DE TIEMPO
-- ════════════════════════════════════════════════════════════════════════
CREATE TABLE indicador_observaciones (
  id                 bigserial    PRIMARY KEY,
  indicador_id       smallint     NOT NULL REFERENCES indicadores(id) ON DELETE CASCADE,
  fecha              date         NOT NULL,
  valor              numeric(20,4) NOT NULL,
  periodo            text,         -- etiqueta legible del período (p. ej. «oct», «2T26»)
  variacion          numeric(12,4),
  variacion_etiqueta text,
  creado_en          timestamptz  NOT NULL DEFAULT now(),
  UNIQUE (indicador_id, fecha)
);

CREATE TABLE bono_cotizaciones (
  id          bigserial    PRIMARY KEY,
  bono_id     smallint     NOT NULL REFERENCES bonos_soberanos(id) ON DELETE CASCADE,
  fecha       date         NOT NULL,
  precio      numeric(10,4),
  rendimiento numeric(8,3),
  variacion   numeric(8,3),
  UNIQUE (bono_id, fecha)
);

CREATE TABLE indice_riesgo_observaciones (
  id        bigserial   PRIMARY KEY,
  indice_id smallint    NOT NULL REFERENCES indices_riesgo(id) ON DELETE CASCADE,
  fecha     date        NOT NULL,
  valor     numeric(16,2) NOT NULL,
  periodo   text,
  variacion numeric(10,2),
  UNIQUE (indice_id, fecha)
);

CREATE TABLE calificaciones (
  id           bigserial          PRIMARY KEY,
  agencia_id   smallint           NOT NULL REFERENCES agencias_calificadoras(id) ON DELETE CASCADE,
  calificacion text               NOT NULL,
  perspectiva  perspectiva_rating NOT NULL DEFAULT 'estable',
  fecha        date               NOT NULL,
  nota         text,
  UNIQUE (agencia_id, fecha)
);

CREATE TABLE fuente_estado (
  id                   bigserial   PRIMARY KEY,
  fuente_id            smallint    NOT NULL REFERENCES fuentes(id) ON DELETE CASCADE,
  estado               estado_fuente NOT NULL,
  latencia_ms          integer     CHECK (latencia_ms IS NULL OR latencia_ms >= 0),
  ultima_actualizacion text,
  verificado_en        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE noticias (
  id             bigserial   PRIMARY KEY,
  codigo         text        UNIQUE,
  publicado_en   timestamptz NOT NULL,
  medio_id       smallint    REFERENCES medios(id) ON DELETE SET NULL,
  categoria_id   smallint    REFERENCES categorias_noticia(id) ON DELETE SET NULL,
  titular        text        NOT NULL,
  resumen        text,
  cuerpo         text,
  breaking       boolean     NOT NULL DEFAULT false,
  url            text,
  creado_en      timestamptz NOT NULL DEFAULT now(),
  actualizado_en timestamptz NOT NULL DEFAULT now(),
  busqueda       tsvector GENERATED ALWAYS AS (
    to_tsvector('spanish',
      coalesce(titular, '') || ' ' || coalesce(resumen, '') || ' ' || coalesce(cuerpo, ''))
  ) STORED
);

CREATE TABLE noticia_terminos (
  noticia_id bigint  NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
  termino_id integer NOT NULL REFERENCES terminos(id) ON DELETE CASCADE,
  PRIMARY KEY (noticia_id, termino_id)
);

CREATE TABLE noticia_vinculos (
  id         bigserial    PRIMARY KEY,
  noticia_id bigint       NOT NULL REFERENCES noticias(id) ON DELETE CASCADE,
  tipo       tipo_entidad NOT NULL DEFAULT 'otro',
  etiqueta   text         NOT NULL
);

CREATE TABLE eventos (
  id           bigserial   PRIMARY KEY,
  fecha        date        NOT NULL,
  categoria_id smallint    REFERENCES categorias_evento(id) ON DELETE SET NULL,
  titulo       text        NOT NULL,
  tono         tono_visual NOT NULL DEFAULT 'neutral',
  detalle      text,
  fuente_id    smallint    REFERENCES fuentes(id) ON DELETE SET NULL,
  creado_en    timestamptz NOT NULL DEFAULT now()
);

-- ════════════════════════════════════════════════════════════════════════
-- ÍNDICES
-- ════════════════════════════════════════════════════════════════════════
CREATE INDEX idx_departamentos_zona       ON departamentos (zona_codigo);
CREATE INDEX idx_indicadores_categoria    ON indicadores (categoria);
CREATE INDEX idx_indicadores_fuente       ON indicadores (fuente_id);
CREATE INDEX idx_indicadores_nombre_trgm  ON indicadores USING gin (nombre gin_trgm_ops);
CREATE INDEX idx_obs_indicador_fecha      ON indicador_observaciones (indicador_id, fecha DESC);
CREATE INDEX idx_bono_cotiz_fecha         ON bono_cotizaciones (bono_id, fecha DESC);
CREATE INDEX idx_indice_obs_fecha         ON indice_riesgo_observaciones (indice_id, fecha DESC);
CREATE INDEX idx_calificaciones_fecha     ON calificaciones (agencia_id, fecha DESC);
CREATE INDEX idx_fuente_estado_fecha      ON fuente_estado (fuente_id, verificado_en DESC);
CREATE INDEX idx_noticias_publicado       ON noticias (publicado_en DESC);
CREATE INDEX idx_noticias_categoria       ON noticias (categoria_id);
CREATE INDEX idx_noticias_medio           ON noticias (medio_id);
CREATE INDEX idx_noticias_busqueda        ON noticias USING gin (busqueda);
CREATE INDEX idx_noticia_terminos_termino ON noticia_terminos (termino_id);
CREATE INDEX idx_noticia_vinculos_noticia ON noticia_vinculos (noticia_id);
CREATE INDEX idx_eventos_fecha            ON eventos (fecha);

-- ════════════════════════════════════════════════════════════════════════
-- TRIGGERS
-- ════════════════════════════════════════════════════════════════════════
CREATE TRIGGER trg_fuentes_upd     BEFORE UPDATE ON fuentes     FOR EACH ROW EXECUTE FUNCTION set_actualizado_en();
CREATE TRIGGER trg_indicadores_upd BEFORE UPDATE ON indicadores FOR EACH ROW EXECUTE FUNCTION set_actualizado_en();
CREATE TRIGGER trg_noticias_upd    BEFORE UPDATE ON noticias    FOR EACH ROW EXECUTE FUNCTION set_actualizado_en();

-- ════════════════════════════════════════════════════════════════════════
-- VISTAS · "estado actual" listo para el frontend
-- ════════════════════════════════════════════════════════════════════════

-- A · indicadores con su último valor, delta y spark (12 últimas obs)
CREATE VIEW v_indicadores_actuales AS
SELECT
  i.id, i.codigo, i.nombre, i.unidad, i.categoria, i.sentido, i.decimales,
  i.definicion, i.asof, i.periodicidad,
  f.nombre AS fuente, f.codigo AS fuente_codigo,
  i.extra_label, i.extra_valor, i.extra_tono,
  o.fecha AS fecha_dato, o.valor, o.variacion, o.variacion_etiqueta,
  (SELECT array_agg(valor ORDER BY fecha)
     FROM (SELECT valor, fecha FROM indicador_observaciones
            WHERE indicador_id = i.id ORDER BY fecha DESC LIMIT 12) s) AS spark,
  (SELECT array_agg(periodo ORDER BY fecha)
     FROM (SELECT periodo, fecha FROM indicador_observaciones
            WHERE indicador_id = i.id ORDER BY fecha DESC LIMIT 12) s) AS periodos
FROM indicadores i
LEFT JOIN fuentes f ON f.id = i.fuente_id
LEFT JOIN LATERAL (
  SELECT * FROM indicador_observaciones
   WHERE indicador_id = i.id ORDER BY fecha DESC LIMIT 1
) o ON true;

-- AG · productos del complejo agroexportador con su spark
CREATE VIEW v_productos_agro AS
SELECT
  p.id, p.codigo, p.nombre, p.orden, p.precio, p.precio_unidad, p.var_precio,
  p.export_usd, p.participacion, p.destino_top, p.polaridad, p.asof, p.fuente, p.nota,
  (SELECT array_agg(valor ORDER BY idx)
     FROM series WHERE modulo = 'agro' AND clave = p.codigo) AS spark
FROM productos_agro p
ORDER BY p.orden;

-- C · última cotización por bono
CREATE VIEW v_bonos_actuales AS
SELECT DISTINCT ON (c.bono_id)
  b.codigo, b.nombre, b.moneda, b.tipo, b.vencimiento, b.orden,
  c.precio, c.rendimiento, c.variacion
FROM bono_cotizaciones c JOIN bonos_soberanos b ON b.id = c.bono_id
ORDER BY c.bono_id, c.fecha DESC;

-- C · calificación vigente por agencia
CREATE VIEW v_calificaciones_actuales AS
SELECT DISTINCT ON (c.agencia_id)
  a.codigo AS agencia_codigo, a.nombre AS agencia, c.calificacion, c.perspectiva, c.fecha, c.nota
FROM calificaciones c JOIN agencias_calificadoras a ON a.id = c.agencia_id
ORDER BY c.agencia_id, c.fecha DESC;

-- AC · actividad por departamento (para el mapa)
CREATE VIEW v_actividad_departamental AS
SELECT d.codigo, d.nombre, d.zona_codigo AS zona, a.valor, a.valor_alt, a.asof
FROM departamentos d
LEFT JOIN actividad_departamental a ON a.departamento_codigo = d.codigo
ORDER BY a.valor DESC NULLS LAST;

-- F · estado vigente por fuente
CREATE VIEW v_fuentes_estado_actual AS
SELECT DISTINCT ON (fe.fuente_id)
  f.codigo, f.nombre, fe.estado, fe.latencia_ms, fe.ultima_actualizacion, fe.verificado_en
FROM fuente_estado fe JOIN fuentes f ON f.id = fe.fuente_id
ORDER BY fe.fuente_id, fe.verificado_en DESC;

-- D · feed de noticias enriquecido (breaking = < 6h o marcado)
CREATE VIEW v_noticias_feed AS
SELECT
  n.id, n.codigo, n.publicado_en, m.nombre AS medio, m.tipo AS medio_tipo,
  cn.nombre AS categoria, n.titular, n.resumen, n.cuerpo, n.url,
  (n.breaking OR n.publicado_en > now() - interval '6 hours') AS breaking
FROM noticias n
LEFT JOIN medios m              ON m.id = n.medio_id
LEFT JOIN categorias_noticia cn ON cn.id = n.categoria_id
ORDER BY n.publicado_en DESC;

-- ════════════════════════════════════════════════════════════════════════
-- Fin del esquema
-- ════════════════════════════════════════════════════════════════════════
