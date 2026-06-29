-- AUTO-GENERADO por db/generate-seed.mjs — no editar a mano.
-- Datos de demostración (snapshot Uruguay ~28 jun 2026) que reflejan el tablero.
BEGIN;
SET search_path = public;

-- ── zonas (mapa departamental) ──────────────────────────────────
INSERT INTO zonas (codigo, nombre) VALUES
  ('montevideo', 'Montevideo'),
  ('metropolitana', 'Metropolitana'),
  ('litoral', 'Litoral'),
  ('centro', 'Centro'),
  ('norte', 'Norte'),
  ('este', 'Este');

-- ── departamentos (19) ──────────────────────────────────────────
INSERT INTO departamentos (codigo, nombre, zona_codigo) VALUES
  ('montevideo', 'Montevideo', 'montevideo'),
  ('canelones', 'Canelones', 'metropolitana'),
  ('maldonado', 'Maldonado', 'este'),
  ('colonia', 'Colonia', 'litoral'),
  ('sanjose', 'San José', 'metropolitana'),
  ('paysandu', 'Paysandú', 'litoral'),
  ('salto', 'Salto', 'litoral'),
  ('soriano', 'Soriano', 'litoral'),
  ('rionegro', 'Río Negro', 'litoral'),
  ('tacuarembo', 'Tacuarembó', 'norte'),
  ('rivera', 'Rivera', 'norte'),
  ('cerrolargo', 'Cerro Largo', 'norte'),
  ('durazno', 'Durazno', 'centro'),
  ('florida', 'Florida', 'centro'),
  ('rocha', 'Rocha', 'este'),
  ('lavalleja', 'Lavalleja', 'este'),
  ('artigas', 'Artigas', 'litoral'),
  ('treintaytres', 'Treinta y Tres', 'este'),
  ('flores', 'Flores', 'centro');

-- ── fuentes ─────────────────────────────────────────────────────
INSERT INTO fuentes (codigo, nombre, categoria, url) VALUES
  ('ine', 'INE · IPC/PIB/empleo', 'oficial', 'https://www.ine.gub.uy/'),
  ('bcu', 'BCU · PIB/TC/TPM/reservas', 'oficial', 'https://www.bcu.gub.uy/'),
  ('mef', 'MEF · fiscal/deuda', 'oficial', 'https://www.gub.uy/ministerio-economia-finanzas/'),
  ('inac', 'INAC · carne', 'oficial', 'https://www.inac.uy/'),
  ('uruguayxxi', 'Uruguay XXI · comercio', 'oficial', 'https://www.uruguayxxi.gub.uy/'),
  ('dgi', 'DGI · recaudación', 'oficial', 'https://www.gub.uy/direccion-general-impositiva/'),
  ('adme', 'ADME/UTE · energía', 'oficial', 'https://adme.com.uy/'),
  ('rafap', 'República AFAP · UBI', 'mercado', 'https://www.rafap.com.uy/'),
  ('rating', 'Calificadoras', 'mercado', 'https://deuda.mef.gub.uy/'),
  ('news', 'Agregador de prensa', 'agregador', NULL);

-- ── medios ──────────────────────────────────────────────────────
INSERT INTO medios (nombre, tipo, pais) VALUES
  ('Ámbito', 'nacional', 'UY'),
  ('El Cronista', 'internacional', 'UY'),
  ('Búsqueda', 'nacional', 'UY'),
  ('INE', 'nacional', 'UY'),
  ('Infobae', 'internacional', 'AR'),
  ('En Perspectiva', 'nacional', 'UY'),
  ('S&P Global', 'agencia', 'US');

-- ── categorias_noticia ──────────────────────────────────────────
INSERT INTO categorias_noticia (codigo, nombre) VALUES
  ('politico', 'Político'),
  ('economico', 'Económico'),
  ('internacional', 'Internacional'),
  ('sectorial', 'Sectorial');

-- ── categorias_evento ───────────────────────────────────────────
INSERT INTO categorias_evento (codigo, nombre) VALUES
  ('parlamento', 'Parlamento'),
  ('mercosur', 'Mercosur'),
  ('ine', 'INE'),
  ('uruguay_xxi', 'Uruguay XXI'),
  ('inac', 'INAC'),
  ('bcu', 'BCU'),
  ('feriado', 'Feriado');

-- ── agencias_calificadoras ──────────────────────────────────────
INSERT INTO agencias_calificadoras (codigo, nombre) VALUES
  ('sp', 'S&P'),
  ('moodys', 'Moody''s'),
  ('fitch', 'Fitch'),
  ('dbrs', 'DBRS');

-- ── bonos_soberanos ─────────────────────────────────────────────
INSERT INTO bonos_soberanos (codigo, nombre, moneda, tipo, vencimiento, orden) VALUES
  ('usd2037', 'Global USD 2037', 'USD', 'global', '2037', 0),
  ('uyu2035', 'Global UYU 2035', 'UYU', 'global', '2035', 1),
  ('sslb2034', 'SSLB 2034', 'USD', 'sslb', '2034', 2),
  ('ui2034', 'Nota UI 2034', 'UI', 'local', '2034', 3);

-- ── indices_riesgo ──────────────────────────────────────────────
INSERT INTO indices_riesgo (codigo, nombre, unidad) VALUES
  ('UBI', 'Uruguay Bond Index · riesgo país (República AFAP)', 'pb');

-- ── productos_agro ──────────────────────────────────────────────
INSERT INTO productos_agro (codigo, nombre, orden, precio, precio_unidad, var_precio, export_usd, participacion, destino_top, polaridad, asof, fuente, nota) VALUES
  ('carne', 'Carne bovina', 0, 5.71, 'USD/kg', 2.5, 1054, 20, 'China / EE.UU.', 'up', 'ene-may', 'Uruguay XXI · INAC', 'Novillo en récord (~+30% i/a); faena de abril −45% i/a (mínimo desde 2013). 1er producto de exportación.'),
  ('celulosa', 'Celulosa', 1, 530, 'USD/ton', -7, 931, 17, 'China / UE', 'up', 'ene-may', 'Uruguay XXI · ref. BHKP', 'UPM (Fray Bentos + UPM2) y Montes del Plata. 2º producto. UPM pidió ampliar Fray Bentos de 1,3 a 1,5 M t/año. Precio: referencia BHKP.'),
  ('soja', 'Soja', 2, 10.5, 'USD/bushel', 45, 180, NULL, 'China (~70%)', 'up', 'may 2026', 'Uruguay XXI', 'Mayo +45% i/a. Cosecha 2025/26 ~1,95 M t, la mitad de la zafra récord previa.'),
  ('lacteos', 'Lácteos', 3, 4100, 'USD/ton', 29, 346, 6, 'Brasil / Argelia', 'up', 'ene-may', 'Uruguay XXI · ref. leche en polvo', '3er producto. Mayo +29% i/a. Conaprole; precio de la leche al productor ~16,04 $/L. Precio: referencia leche en polvo entera.'),
  ('trigo', 'Trigo', 4, NULL, 'USD/ton', 9, 155, 5, 'Brasil', 'up', '1T 2026', 'Uruguay XXI', 'Acumulado 1T +9% i/a.'),
  ('madera', 'Madera', 5, NULL, 'USD/ton', 17, 129, 4, 'China', 'up', '1T 2026', 'Uruguay XXI', 'Acumulado 1T +17% i/a.'),
  ('arroz', 'Arroz', 6, NULL, 'USD/ton', -19, 91, 3, 'Brasil / Perú', 'up', '1T 2026', 'Uruguay XXI', 'Acumulado 1T −19% i/a por menor zafra.');

-- ── agro_destinos ───────────────────────────────────────────────
INSERT INTO agro_destinos (orden, pais, valor) VALUES
  (0, 'EE.UU. (NAFTA)', 30),
  (1, 'China', 28),
  (2, 'Unión Europea', 17),
  (3, 'Otros', 25);

-- ── terminos (keywords) ─────────────────────────────────────────
INSERT INTO terminos (termino) VALUES
  ('Orsi'),
  ('Empleo'),
  ('Salario real'),
  ('Encuestas'),
  ('Oddone'),
  ('Interpelación'),
  ('Economía'),
  ('Senado'),
  ('Rendición de Cuentas'),
  ('OPP'),
  ('Arim'),
  ('Fiscal'),
  ('PIB'),
  ('BCU'),
  ('Actividad'),
  ('Agro'),
  ('Carne'),
  ('China'),
  ('Aranceles'),
  ('INAC'),
  ('UPM'),
  ('Celulosa'),
  ('Fray Bentos'),
  ('Ambiente'),
  ('Frente Amplio'),
  ('Exportaciones'),
  ('Consejo Fiscal'),
  ('Déficit'),
  ('Crecimiento'),
  ('Turismo'),
  ('Argentina'),
  ('Mintur'),
  ('Punta del Este'),
  ('IPC'),
  ('Inflación'),
  ('INE'),
  ('Energía'),
  ('Renovables'),
  ('ADME'),
  ('UTE'),
  ('Uruguay XXI'),
  ('TPM'),
  ('Copom'),
  ('MEF'),
  ('Rating'),
  ('S&P'),
  ('Grado inversor'),
  ('BBB+');

-- ── indicadores (KPIs macro) ────────────────────────────────────
INSERT INTO indicadores (codigo, nombre, unidad, categoria, sentido, decimales, definicion, asof, periodicidad, fuente_id, extra_label, extra_valor, extra_tono) VALUES
  ('ipc_interanual', 'IPC INTERANUAL', '%', 'precios', 'pos', 2, 'Variación del IPC en los últimos 12 meses (INE). Mayo 2026: 3,77%, dentro del rango meta del BCU (3%–6%) y por debajo del centro (4,5%). Montevideo 3,95%, Interior 3,6%. Acumulado del año 2,95%.', 'may 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), 'RANGO META', '3–6%', 'pos'),
  ('ubi', 'RIESGO PAÍS (UBI)', 'pb', 'mercados', 'pos', 0, 'Uruguay Bond Index (República AFAP): spread soberano sobre los bonos del Tesoro de EE.UU. 53 pb al 18-may-2026, cerca del mínimo histórico de 50 pb (10-abr). El riesgo país más bajo de América Latina (Argentina ~538 pb). EMBI de JP Morgan ~56 pb; IRU de BEVSA ~64 pb.', '18 may', 'diaria', (SELECT id FROM fuentes WHERE codigo = 'rafap'), 'REGIÓN', 'el más bajo', 'pos'),
  ('pib', 'PIB · ACTIVIDAD', '% i/a', 'actividad', 'pos', 1, 'PIB, variación interanual del 1T 2026 (+0,9%; +0,8% desestacionalizado vs 4T 2025). Leve reaceleración tras cerrar 2025 con +1,8% anual. Impulsaron servicios financieros (+3,1%), transporte/TIC (+2,2%) y comercio (+1,4%); restaron agro (−3,7%) y construcción (−3,4%).', '1T 2026', 'trimestral', (SELECT id FROM fuentes WHERE codigo = 'bcu'), '2025', '+1,8%', 'neutral'),
  ('ipc_mensual', 'IPC MENSUAL', '%', 'precios', 'neutral', 2, 'Variación mensual del IPC (INE). Mayo 2026: 0,70%. Mayores incidencias: Transporte (combustibles: gasoil +14%, nafta +7%), Alimentos y Vivienda (tributos domiciliarios, supergás). La inflación subyacente/núcleo que vigila el BCU se aceleró a ~3,5% i/a.', 'may 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('tpm', 'TPM · BCU', '%', 'monetario', 'neutral', 2, 'Tasa de Política Monetaria. El COPOM la mantuvo en 5,75% el 26-may-2026 (2ª vez consecutiva), buscando converger la inflación a la meta de 4,5%, tras siete recortes consecutivos desde jul-2025. Pausa por incertidumbre global y presión del petróleo.', '26 may', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), NULL, NULL, NULL),
  ('expectativas_inflacion', 'EXPECT. INFL. 24M', '%', 'precios', 'pos', 1, 'Expectativas de inflación a 24 meses de la encuesta del BCU (mediana de analistas y mercado): 4,5%, en el centro del rango meta. A 12 meses bajaron de 4,9% a 4,7% en junio. Empresarios ~5%.', 'jun 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), NULL, NULL, NULL),
  ('tipo_cambio', 'DÓLAR (UYU/USD)', NULL, 'monetario', 'neutral', 2, 'Tipo de cambio interbancario peso/dólar (BCU). Cerró en ~$40,22 el 26-jun-2026 (rebote de +2,1% en el día desde $39,39), estable frente a los ~$40,17 del 16-jun. El peso flota libremente y es de libre convertibilidad: no hay cepo ni brecha cambiaria. Los analistas del BCU proyectan ~$41,6 para fin de 2026.', '26 jun', 'diaria', (SELECT id FROM fuentes WHERE codigo = 'bcu'), NULL, NULL, NULL),
  ('desempleo', 'DESEMPLEO', '%', 'social', 'pos', 1, 'Tasa de desempleo (INE, Encuesta Continua de Hogares). Abril 2026: 7,5%, baja desde 7,8% de marzo. Empleo 59,5%; actividad 64,2%. Desempleo juvenil (14-24) 23,3%.', 'abr 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('salario_real', 'SALARIO REAL', '% i/a', 'social', 'pos', 2, 'Salario real (Índice Medio de Salarios deflactado por IPC), variación interanual. Abril 2026: +1,96% (IMS nominal +5,12%). El poder adquisitivo alcanzó en ene-2026 su nivel más alto desde 1975.', 'abr 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('novillo', 'NOVILLO GORDO', 'USD/kg', 'agro', 'pos', 2, 'Precio del novillo gordo (USD/kg carcasa, 4ª balanza), referencia del complejo cárnico. ~US$5,71/kg, el más caro de la región y cerca de récords históricos; precio medio de exportación ~US$6.078/ton. Faena de abril −45% i/a (mínimo desde 2013).', 'may 2026', 'semanal', (SELECT id FROM fuentes WHERE codigo = 'inac'), 'PRECIO', 'récord', 'pos'),
  ('resultado_fiscal', 'RESULT. FISCAL', '% PIB', 'fiscal', 'neg', 1, 'Resultado del Sector Público Global (déficit), año móvil 12 meses a marzo 2026: −4,7% del PIB, estable vs febrero y vs el cierre 2025 (~−4,4%). En línea con la meta del Presupuesto, pero señalado como principal riesgo para el rating soberano.', '12m mar 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'mef'), 'GC-BPS', '−3,7%', 'neg'),
  ('deuda', 'DEUDA BRUTA', '% PIB', 'fiscal', 'neg', 1, 'Deuda bruta del Sector Público Global: 74,9% del PIB (US$64.129 M) al cierre de 2025, +8,6 pp vs 2024. El salto se explica por el déficit fiscal y la apreciación del peso (encarece la deuda en moneda nacional). Deuda neta 54,6% del PIB; 59% de la bruta en moneda nacional.', 'cierre 2025', 'anual', (SELECT id FROM fuentes WHERE codigo = 'mef'), 'NETA', '54,6%', 'neutral'),
  ('reservas', 'RESERVAS BCU', 'M USD', 'monetario', 'neutral', 0, 'Activos de reserva del BCU: US$18.463 M en mayo 2026 (pico reciente US$19.948 M en feb). Las reservas equivalen a ~24% del PIB; reservas netas ~US$10.300 M.', 'may 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), '% PIB', '~24%', 'neutral');

-- ── indicador_observaciones (series reales + valor vigente) ─────
INSERT INTO indicador_observaciones (indicador_id, fecha, valor, variacion, variacion_etiqueta) VALUES
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2025-11-30', 4.7, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2025-12-31', 4.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-01-31', 4.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-02-28', 4.2, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-03-31', 3.9, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-04-30', 3.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-05-31', 3.16, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-06-30', 3.77, 0.61, '+0,6 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'ubi'), '2026-02-28', 62, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ubi'), '2026-03-31', 58, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ubi'), '2026-04-30', 50, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ubi'), '2026-05-31', 55, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ubi'), '2026-06-30', 53, 3, '+3 pb'),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-02-28', 3.6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-03-31', 2.3, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-04-30', 1.2, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-05-31', 0.1, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-06-30', 0.9, 0.8, '+0,8 pp i/a'),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-01-31', 0.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-02-28', 0.6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-03-31', 0.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-04-30', 0.8, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-05-31', 0.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-06-30', 0.7, 0, '0,70% m/m'),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-01-31', 6.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-02-28', 6.25, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-03-31', 6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-04-30', 5.75, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-05-31', 5.75, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-06-30', 5.75, 0, 'sin cambios'),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-02-28', 4.8, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-03-31', 4.7, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-04-30', 4.6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-05-31', 4.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-06-30', 4.5, 0, 'ancladas'),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-01-31', 39.48, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-02-28', 39.95, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-03-31', 40.67, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-04-30', 40.17, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-05-31', 39.39, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-06-30', 40.22, 0.1, '+0,1%'),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-03-31', 7.9, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-04-30', 7.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-05-31', 7.8, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-06-30', 7.5, -0.3, '−0,3 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-02-28', 0.8, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-03-31', 1.2, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-04-30', 1.5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-05-31', 1.8, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-06-30', 1.96, 1.96, '+2,0% i/a'),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-01-31', 4.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-02-28', 4.7, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-03-31', 5, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-04-30', 5.3, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-05-31', 5.6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-06-30', 5.71, 30, '+30% i/a'),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-02-28', -3.6, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-03-31', -4.1, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-04-30', -4.4, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-05-31', -4.7, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-06-30', -4.7, -0.3, '−0,3 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-03-31', 64, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-04-30', 66.3, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-05-31', 70, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-06-30', 74.9, 8.6, '+8,6 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-03-31', 19948, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-04-30', 19451, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-05-31', 18581, NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-06-30', 18463, -118, '−118 M');

-- ── bono_cotizaciones (cierre vigente) ──────────────────────────
INSERT INTO bono_cotizaciones (bono_id, fecha, precio, rendimiento, variacion) VALUES
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'usd2037'), '2026-06-28', NULL, 4.73, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'uyu2035'), '2026-06-28', NULL, 8, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'sslb2034'), '2026-06-28', NULL, 5.75, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'ui2034'), '2026-06-28', NULL, 2.59, NULL);

-- ── indice_riesgo_observaciones (UBI) ───────────────────────────
INSERT INTO indice_riesgo_observaciones (indice_id, fecha, valor, variacion) VALUES
  ((SELECT id FROM indices_riesgo WHERE codigo = 'UBI'), '2026-06-24', 62, NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'UBI'), '2026-06-25', 58, NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'UBI'), '2026-06-26', 50, NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'UBI'), '2026-06-27', 55, NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'UBI'), '2026-06-28', 53, 3);

-- ── calificaciones ──────────────────────────────────────────────
INSERT INTO calificaciones (agencia_id, calificacion, perspectiva, fecha) VALUES
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'S&P'), 'BBB+', 'estable', '2025-11-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'Moody''s'), 'Baa1', 'estable', '2026-01-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'Fitch'), 'BBB', 'estable', '2025-09-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'DBRS'), 'BBB', 'estable', '2025-11-01');

-- ── ipc_rubros ──────────────────────────────────────────────────
INSERT INTO ipc_rubros (orden, label, valor, asof) VALUES
  (0, 'Gasoil', 14, 'may 2026'),
  (1, 'Supergás', 7, 'may 2026'),
  (2, 'Nafta', 7, 'may 2026'),
  (3, 'Tributos domiciliarios', 2.2, 'may 2026'),
  (4, 'Transporte c/chofer', 1.6, 'may 2026');

-- ── pib_sectores ────────────────────────────────────────────────
INSERT INTO pib_sectores (orden, label, valor, asof) VALUES
  (0, 'Servicios financieros', 3.1, '1T 2026'),
  (1, 'Transporte y TIC', 2.2, '1T 2026'),
  (2, 'Comercio, alojamiento y comidas', 1.4, '1T 2026'),
  (3, 'Industria manufacturera', 1.3, '1T 2026'),
  (4, 'Construcción', -3.4, '1T 2026'),
  (5, 'Agro, pesca y minería', -3.7, '1T 2026');

-- ── actividad_departamental ─────────────────────────────────────
INSERT INTO actividad_departamental (departamento_codigo, valor, valor_alt, asof) VALUES
  ('montevideo', 100, 47, '2025'),
  ('canelones', 28, 9.5, '2025'),
  ('maldonado', 14, 5.8, '2025'),
  ('colonia', 10, 3.8, '2025'),
  ('sanjose', 9, 3.2, '2025'),
  ('paysandu', 7.5, 2.6, '2025'),
  ('salto', 7.5, 2.6, '2025'),
  ('soriano', 7, 2.5, '2025'),
  ('rionegro', 6.5, 2.4, '2025'),
  ('tacuarembo', 6.5, 2.3, '2025'),
  ('rivera', 5.5, 2.1, '2025'),
  ('cerrolargo', 5, 1.9, '2025'),
  ('durazno', 4.5, 1.7, '2025'),
  ('florida', 4.5, 1.7, '2025'),
  ('rocha', 4.5, 1.7, '2025'),
  ('lavalleja', 4, 1.5, '2025'),
  ('artigas', 4, 1.5, '2025'),
  ('treintaytres', 3.5, 1.3, '2025'),
  ('flores', 2.5, 0.9, '2025');

-- ── energia_matriz ──────────────────────────────────────────────
INSERT INTO energia_matriz (codigo, nombre, orden, pct) VALUES
  ('hidraulica', 'Hidráulica', 0, 46),
  ('eolica', 'Eólica', 1, 34),
  ('biomasa', 'Biomasa', 2, 14),
  ('solar', 'Solar fotovoltaica', 3, 4),
  ('termica', 'Térmica (fósil)', 4, 2);

-- ── energia_combustibles ────────────────────────────────────────
INSERT INTO energia_combustibles (orden, producto, precio, unidad) VALUES
  (0, 'Gasoil (var. may m/m)', 14, '% m/m'),
  (1, 'Nafta súper (var. may m/m)', 7, '% m/m'),
  (2, 'Supergás (var. may m/m)', 7, '% m/m');

-- ── commodities ─────────────────────────────────────────────────
INSERT INTO commodities (codigo, nombre, unidad, valor, var_mensual, var_anual, polaridad, fuente, asof, nota) VALUES
  ('novillo', 'Novillo gordo (carcasa)', 'USD/kg', 5.71, 2.5, 30, 'up', 'INAC', 'may 2026', 'Récord; el más caro de la región.'),
  ('carne_export', 'Carne (precio medio export)', 'USD/ton', 6078, NULL, NULL, 'up', 'INAC', 'may 2026', 'Promedio móvil 30 días, nivel histórico.'),
  ('celulosa', 'Celulosa (BHKP, ref.)', 'USD/ton', 530, NULL, NULL, 'up', 'ref. internacional', 'jun 2026', 'Indicativo; 2º producto exportador.'),
  ('soja', 'Soja (CBOT, ref.)', 'USD/bushel', 10.5, NULL, NULL, 'up', 'Trading Economics · CBOT', 'jun 2026', NULL),
  ('trigo', 'Trigo (CBOT, ref.)', 'USD/bushel', 5.6, NULL, NULL, 'up', 'Trading Economics · CBOT', 'jun 2026', NULL),
  ('leche', 'Leche en polvo entera (ref.)', 'USD/ton', 4100, NULL, NULL, 'up', 'ref. internacional', 'jun 2026', 'Lácteos: 3er producto exportador.');

-- ── comercio_destinos ───────────────────────────────────────────
INSERT INTO comercio_destinos (orden, pais, valor) VALUES
  (0, 'China', 26),
  (1, 'Unión Europea', 16),
  (2, 'Brasil', 14),
  (3, 'EE.UU.', 8),
  (4, 'Otros', 36);

-- ── metricas (escalares por módulo) ─────────────────────────────
INSERT INTO metricas (modulo, clave, valor, valor_texto, unidad, asof, fuente, nota) VALUES
  ('agro', 'export_total', 10300, NULL, 'USD M', 'ene-may 2026', 'Uruguay XXI · INAC', NULL),
  ('agro', 'participacion', 76, NULL, '%', NULL, NULL, NULL),
  ('agro', 'novillo_precio', 5.71, NULL, 'USD/kg', NULL, NULL, NULL),
  ('agro', 'novillo_var', 30, NULL, '% i/a', NULL, NULL, NULL),
  ('agro', 'faena', NULL, NULL, 'mil cab.', NULL, NULL, NULL),
  ('agro', 'faena_periodo', NULL, 'faena abr −45% i/a (mínimo desde 2013)', NULL, NULL, NULL, NULL),
  ('agro', 'resumen', NULL, 'El complejo agroexportador es el motor de divisas de Uruguay. En ene-may 2026 las exportaciones de bienes sumaron US$5.271 M (+3% i/a); en mayo US$1.142 M (−3%). La carne bovina lidera el acumulado (US$1.054 M) con el novillo en récord (~US$5,71/kg) pese a una faena de abril −45% i/a. La celulosa es 2ª (US$931 M); la soja fue lo más dinámico (+45% i/a, ~70% a China). China es el principal destino (~27% en mayo), seguido de la UE y Brasil.', NULL, 'ene-may 2026', 'Uruguay XXI · INAC', NULL),
  ('mercados', 'grado_agencias', 4, NULL, NULL, NULL, NULL, NULL),
  ('mercados', 'grado_nota', NULL, 'Grado inversor por las 4 calificadoras con perspectiva estable: S&P BBB+ (nov-2025), Moody’s Baa1 (ene-2026), Fitch BBB (sep-2025), DBRS BBB (nov-2025). Calificadoras no solicitadas (JCR, HR Ratings) lo ubican un escalón más alto (A−). Es el nivel crediticio más alto de la historia del país.', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_nota', NULL, 'Bono Indexado a Indicadores de Sostenibilidad: el primer bono soberano del mundo con cupón atado a metas ambientales (2022). ~US$2.200 M, vto. 2034.', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_cupon', NULL, '5,75% · step ±30 pb (efectivo may-2027)', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_kpi1', NULL, 'Reducir la intensidad de emisiones de gases de efecto invernadero por unidad de PIB.', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_kpi2', NULL, 'Mantener/aumentar el área de bosque nativo respecto de la línea de base 2012.', NULL, NULL, NULL, NULL),
  ('actividad', 'pib_var_interanual', 0.9, NULL, '% i/a', '1T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'pib_anual2025', 1.8, NULL, '%', '1T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'pib_trimestral', 0.8, NULL, '%', '1T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'industria_var_interanual', 4, NULL, '% i/a', 'abr 2026', 'INE · IVFIM', NULL),
  ('actividad', 'industria_var_mensual', NULL, NULL, '%', 'abr 2026', 'INE · IVFIM', NULL),
  ('actividad', 'social_desempleo', 7.5, NULL, '%', 'abr 2026', 'INE · ECH / pobreza', NULL),
  ('actividad', 'social_empleo', 59.5, NULL, '%', 'abr 2026', 'INE · ECH / pobreza', NULL),
  ('actividad', 'social_salario_real', 1.96, NULL, '% i/a', 'abr 2026', 'INE · ECH / pobreza', NULL),
  ('actividad', 'social_pobreza', 17.7, NULL, '%', '1S 2025', 'INE · ECH / pobreza', NULL),
  ('actividad', 'social_desempleo_periodo', NULL, 'abr 2026', NULL, NULL, NULL, NULL),
  ('actividad', 'social_pobreza_periodo', NULL, '1S 2025', NULL, NULL, NULL, NULL),
  ('actividad', 'social_salario_real_periodo', NULL, 'abr 2026', NULL, NULL, NULL, NULL),
  ('energia', 'renovable_pct', 98, NULL, '%', '2025', 'MIEM · ADME / UTE', NULL),
  ('energia', 'demanda_max', NULL, NULL, 'MW', '2025', 'MIEM · ADME / UTE', NULL),
  ('energia', 'potencia_instalada', 5000, NULL, 'MW', '2025', 'MIEM · ADME / UTE', NULL),
  ('energia', 'exportacion_destino', NULL, 'Argentina / Brasil', NULL, NULL, NULL, NULL),
  ('energia', 'exportacion_gwh', 1043, NULL, 'GWh', '2025', 'MIEM · ADME / UTE', 'Uruguay exportó ~8% de la generación de 2025 (13.040 GWh totales) como excedentes a la región. En enero de 2026 la matriz arrancó con 96,7% renovable.'),
  ('energia', 'hidrogeno_proyecto', NULL, 'HIF Global · Tambores', NULL, NULL, NULL, NULL),
  ('energia', 'hidrogeno_inversion', 4000, NULL, 'USD M', NULL, NULL, 'Proyecto de e-combustibles a partir de hidrógeno verde (Paysandú/Tacuarembó). Uruguay impulsa la "Ruta del Hidrógeno Verde" como nueva frontera exportadora aprovechando su matriz renovable.'),
  ('energia', 'hidrogeno_estado', NULL, 'en desarrollo', NULL, NULL, NULL, NULL),
  ('energia', 'resumen', NULL, 'Uruguay cerró 2025 con el 98% de su generación eléctrica de origen renovable (hidráulica 46%, eólica 34%, biomasa 14%, solar 4%), uno de los mayores porcentajes del mundo, con sólo 2% de respaldo térmico fósil.', NULL, '2025', 'MIEM · ADME / UTE', NULL),
  ('externo', 'balanza_export', 1142, NULL, 'USD M', 'may 2026', 'Uruguay XXI', NULL),
  ('externo', 'balanza_import', NULL, NULL, 'USD M', 'may 2026', 'Uruguay XXI', NULL),
  ('externo', 'balanza_saldo', NULL, NULL, 'USD M', 'may 2026', 'Uruguay XXI', NULL),
  ('externo', 'balanza_periodo', NULL, 'may 2026', NULL, NULL, NULL, NULL),
  ('externo', 'turismo_ingresos', 843, NULL, 'USD M', '1T 2026', 'Mintur', 'Ingresos receptivos US$843 M en el 1T 2026 (gasto/persona +9,5%) pese a −13,6% de visitantes; argentinos −17,6% (66% del total). Refleja la sensibilidad a la competitividad con Argentina: cuando Argentina está barata, caen los turistas argentinos y los uruguayos cruzan a gastar (emisivo +15,8%).'),
  ('externo', 'turismo_visitantes', 1182, NULL, 'mil', '1T 2026', 'Mintur', NULL),
  ('externo', 'turismo_saldo', 438, NULL, 'USD M', '1T 2026', 'Mintur', NULL),
  ('externo', 'ied_valor', 687, NULL, 'USD M', '2025', 'BCU · Uruguay XXI', NULL),
  ('externo', 'ied_pctpib', 0.8, NULL, '% PIB', '2025', 'BCU · Uruguay XXI', NULL),
  ('externo', 'deuda_bruta_pct', 74.9, NULL, '% PIB', 'cierre 2025', 'MEF · UGD', NULL),
  ('externo', 'deuda_total_usd', 64129, NULL, 'USD M', 'cierre 2025', 'MEF · UGD', NULL),
  ('externo', 'cc_pct', -1, NULL, '% PIB', 'año móvil a jun 2025', 'BCU · Balanza de Pagos', NULL),
  ('externo', 'cc_periodo', NULL, 'año móvil a jun 2025', NULL, NULL, NULL, NULL),
  ('externo', 'tcr_brecha', -9.9, NULL, '%', '2025 · mar 2026', 'BCU · UCU', 'El BCU estimó una desalineación del tipo de cambio real de −9,9% respecto de sus fundamentos al cierre de 2025: el peso está sobrevaluado en términos reales («atraso cambiario»), preocupación del agro y la industria. El BCU proyecta corregir ~la mitad en 24 meses; el peso ya se depreció en el arranque de 2026.'),
  ('externo', 'ipf_frontera', 15.1, NULL, '%', '2025 · mar 2026', 'BCU · UCU', 'Índice de Precios Fronterizos (UCU · Obs. Económico Salto): comprar en Salto cuesta ~15,1% más que en Concordia (mar-2026), la menor brecha en ~10 años, tras encarecerse Argentina. Sensible al descuento de IMESI a los combustibles en la frontera.'),
  ('fiscal', 'result_global_pct', -4.7, NULL, '% PIB', '12m mar 2026', 'MEF', NULL),
  ('fiscal', 'result_global_periodo', NULL, '12m mar 2026', NULL, NULL, NULL, NULL),
  ('fiscal', 'result_primario_pct', -1.4, NULL, '% PIB', '12m mar 2026 · GC-BPS', 'MEF', NULL),
  ('fiscal', 'result_primario_periodo', NULL, '12m mar 2026 · GC-BPS', NULL, NULL, NULL, NULL),
  ('fiscal', 'regla_estructural', -3.9, NULL, '% PIB', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_gasto', 5.7, NULL, '%', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_deuda_tope', 3450, NULL, 'USD M', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_cumple', 0, NULL, NULL, NULL, 'MEF · Consejo Fiscal Autónomo', '2 de 3 pilares cumplidos en 2025: resultado fiscal estructural (−3,9% PIB) y tope de endeudamiento neto (US$3.079 M, bajo el límite de US$3.450 M) SÍ; tope de crecimiento del gasto real NO (el gasto creció 5,7% vs ~2,5% potencial). El Consejo Fiscal Autónomo alertó al MEF.'),
  ('fiscal', 'deuda_bruta_pct', 74.9, NULL, '% PIB', 'cierre 2025', 'MEF · UGD', NULL),
  ('fiscal', 'deuda_neta_pct', 54.6, NULL, '% PIB', 'cierre 2025', 'MEF · UGD', NULL),
  ('fiscal', 'deuda_moneda_local_pct', 59, NULL, '%', 'cierre 2025', 'MEF · UGD', NULL),
  ('fiscal', 'recaudacion_var_real', 9.9, NULL, '% real i/a', 'abr 2026', 'DGI · mayor suba mensual en más de un año (IVA e IRAE); acum. ene-abr +2,2% real', NULL),
  ('fiscal', 'recaudacion_periodo', NULL, 'abr 2026', NULL, NULL, NULL, NULL),
  ('fiscal', 'tasa_valor', 5.75, NULL, '%', 'COPOM 26-may-2026', 'BCU', NULL),
  ('fiscal', 'tasa_nombre', NULL, 'Tasa de Política Monetaria (TPM)', NULL, NULL, NULL, NULL),
  ('fiscal', 'reservas_valor', 18463, NULL, 'M USD', 'may 2026', 'BCU', NULL),
  ('fiscal', 'expect_12m', 4.7, NULL, '%', 'jun 2026', 'BCU · encuesta de expectativas', NULL),
  ('fiscal', 'expect_24m', 4.5, NULL, '%', 'jun 2026', 'BCU · encuesta de expectativas', NULL);

-- ── series (sparklines por módulo) ──────────────────────────────
INSERT INTO series (modulo, clave, idx, valor) VALUES
  ('actividad', 'pib', 0, 3.6),
  ('actividad', 'pib', 1, 2.3),
  ('actividad', 'pib', 2, 1.2),
  ('actividad', 'pib', 3, 0.1),
  ('actividad', 'pib', 4, 0.9),
  ('fiscal', 'result_global', 0, -3.6),
  ('fiscal', 'result_global', 1, -4.1),
  ('fiscal', 'result_global', 2, -4.4),
  ('fiscal', 'result_global', 3, -4.7),
  ('fiscal', 'result_global', 4, -4.7),
  ('agro', 'carne', 0, 4.4),
  ('agro', 'carne', 1, 4.7),
  ('agro', 'carne', 2, 5),
  ('agro', 'carne', 3, 5.3),
  ('agro', 'carne', 4, 5.6),
  ('agro', 'carne', 5, 5.71),
  ('agro', 'celulosa', 0, 205),
  ('agro', 'celulosa', 1, 198),
  ('agro', 'celulosa', 2, 191),
  ('agro', 'celulosa', 3, 191),
  ('agro', 'soja', 0, 120),
  ('agro', 'soja', 1, 140),
  ('agro', 'soja', 2, 160),
  ('agro', 'soja', 3, 180),
  ('agro', 'lacteos', 0, 70),
  ('agro', 'lacteos', 1, 78),
  ('agro', 'lacteos', 2, 85),
  ('agro', 'lacteos', 3, 85),
  ('agro', 'trigo', 0, 120),
  ('agro', 'trigo', 1, 135),
  ('agro', 'trigo', 2, 145),
  ('agro', 'trigo', 3, 155),
  ('agro', 'madera', 0, 95),
  ('agro', 'madera', 1, 110),
  ('agro', 'madera', 2, 120),
  ('agro', 'madera', 3, 129),
  ('agro', 'arroz', 0, 115),
  ('agro', 'arroz', 1, 105),
  ('agro', 'arroz', 2, 98),
  ('agro', 'arroz', 3, 91);

-- ── fuente_estado (health-check vigente) ────────────────────────
INSERT INTO fuente_estado (fuente_id, estado, latencia_ms, ultima_actualizacion, verificado_en) VALUES
  ((SELECT id FROM fuentes WHERE codigo = 'ine'), 'ok', 180, '3 jun', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'bcu'), 'ok', 150, '26 jun', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'mef'), 'ok', 320, 'mar 2026', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'inac'), 'live', 90, 'jun 2026', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'uruguayxxi'), 'ok', 240, 'may 2026', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'dgi'), 'ok', 300, 'abr 2026', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'adme'), 'live', 60, 'jun 2026', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'rafap'), 'lag', 520, '18 may', '2026-06-28T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'rating'), 'cold', NULL, 'ene 2026', '2026-06-28T12:00:00.000Z');

-- ── noticias ────────────────────────────────────────────────────
INSERT INTO noticias (codigo, publicado_en, medio_id, categoria_id, titular, resumen, cuerpo, breaking, url) VALUES
  ('n14', '2026-06-23T00:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Político'), 'Orsi salió a blindar la gestión económica ante el desgaste de su imagen en las encuestas', 'El presidente defendió los resultados económicos —desempleo en 7,5%, +26.000 empleos y el mayor poder de compra en 50 años— tras caer su aprobación a 20% (Opción Consultores).', 'El presidente Yamandú Orsi salió a defender la gestión económica de su gobierno ante el deterioro de su imagen en las encuestas. Destacó que el desempleo bajó de 8,2% a 7,5% en un año, que se crearon más de 26.000 puestos de trabajo (casi 20.000 mujeres incorporadas), que el ingreso real de los hogares creció 2,7% (máximo registrado por el INE) y que el salario real subió 2,3% en 2026, el mayor poder de compra en cinco décadas. La encuesta de Opción Consultores ubicó la aprobación en 20% (−3 pp vs el 1T) y la desaprobación en 48%.', false, 'https://www.ambito.com/uruguay/yamandu-orsi-salio-blindar-la-gestion-economica-el-desgaste-su-imagen-publica-las-encuestas-n6292030'),
  ('n15', '2026-06-22T00:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La oposición interpeló a Gabriel Oddone en el Senado por el rumbo de la economía', 'El ministro de Economía fue interpelado por el nacionalista Sergio Botana; Oddone defendió la gestión, ratificó que no habrá cambios impositivos en el período y reafirmó la apuesta por la inversión y la apertura.', 'El ministro de Economía Gabriel Oddone fue interpelado en el Senado por el senador Sergio Botana (Partido Nacional), que cuestionó el desempeño económico ("la actividad está casi un punto por debajo de diciembre de 2024") y señaló problemas de empleo y competitividad. Oddone defendió la gestión —inflación en mínimos de tres décadas, 26.000 empleos, salario real al alza— y confirmó que no habrá modificaciones impositivas en este período de gobierno, ratificando el foco en la estabilidad macroeconómica, la inversión y la integración internacional.', false, 'https://www.ambito.com/uruguay/la-oposicion-interpela-gabriel-oddone-un-debate-el-rumbo-la-economia-n6291336'),
  ('n16', '2026-06-17T00:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'El gobierno defiende una Rendición de Cuentas sin impacto fiscal y con prioridades definidas', 'El Ejecutivo confirmó que la Rendición de Cuentas, a presentar el 30-jun, no tendrá impacto fiscal: un aumento de US$31 M financiado con reasignaciones, con foco en infancia, seguridad, educación y situación de calle.', 'El gobierno de Yamandú Orsi defendió que su primera Rendición de Cuentas —a presentarse al Parlamento el 30 de junio— no tendrá impacto fiscal. El director de la OPP, Rodrigo Arim, aclaró que se trata de "un presupuesto que no tiene impacto fiscal", no de "gasto cero": habrá incrementos relevantes en las áreas prioritarias (infancia, seguridad, educación y atención a personas en situación de calle) financiados mediante reasignaciones de recursos. El aumento ronda los US$31 M, que sumados a los US$50 M ya previstos en el Presupuesto totalizan US$81 M. Sectores del Frente Amplio (MPP) presionan por mayores márgenes de gasto.', false, 'https://www.ambito.com/uruguay/el-gobierno-defiende-una-rendicion-cuentas-impacto-fiscal-y-prioridades-definidas-n6289764'),
  ('n1', '2026-06-16T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La economía creció 0,9% en el primer trimestre, a pesar de la caída del campo y la construcción', 'El BCU informó que el PIB creció 0,9% interanual en el 1T-2026 (+0,8% desestacionalizado), con recuperación de servicios pese al retroceso del agro.', 'El Banco Central del Uruguay informó que el Producto Interno Bruto creció 0,9% interanual en el primer trimestre de 2026 y 0,8% en términos desestacionalizados respecto al cuarto trimestre de 2025. Impulsaron servicios financieros (+3,1%), transporte e información y comunicaciones (+2,2%) y comercio (+1,4%), mientras que el sector agropecuario retrocedió 3,7% (por menor producción de soja y arroz) y la construcción cayó 3,4%.', false, 'https://www.ambito.com/uruguay/la-economia-crecio-09-el-primer-trimestre-pesar-la-caida-del-campo-y-la-construccion-n6288981'),
  ('n8', '2026-06-15T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Internacional'), 'Uruguay sacará ventaja en exportaciones de carne a China ante el arancel del 55% que frenará a Brasil y Australia', 'Analistas prevén que Uruguay podría ganar participación en el mercado chino de carne vacuna frente a competidores afectados por aranceles; el USDA proyecta +2% de exportaciones cárnicas en 2026.', 'Analistas del sector prevén que Uruguay podría ganar participación en el mercado chino de carne vacuna frente a competidores como Brasil y Australia, afectados por aranceles del 55%. El USDA proyecta un crecimiento de 2% de las exportaciones cárnicas uruguayas en 2026. China es el principal destino individual de la carne uruguaya.', false, 'https://www.ambito.com/uruguay/sacara-ventaja-exportaciones-carne-china-el-arancel-del-55-que-frenara-brasil-y-australia-n6281338'),
  ('n10', '2026-06-13T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'El Cronista'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Ministerio de Ambiente analiza el pedido de UPM para aumentar la producción en Fray Bentos', 'UPM solicitó elevar la producción de su planta de Fray Bentos de 1,3 a unos 1,5 millones de toneladas anuales; el Ministerio de Ambiente evalúa el impacto.', 'UPM solicitó al Ministerio de Ambiente autorización para elevar la producción de su planta de celulosa de Fray Bentos de 1,3 a aproximadamente 1,5 millones de toneladas anuales (+200.000 t). La celulosa fue el segundo producto de exportación de Uruguay en 2025. El Ministerio evalúa el impacto ambiental de la solicitud.', false, 'https://www.cronista.com/uruguay/politica-uy/ministerio-de-ambiente-analiza-el-pedido-de-upm-para-aumentar-la-produccion-en-fray-bentos/'),
  ('n6', '2026-06-12T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Político'), 'Los lineamientos de gasto cero en la Rendición de Cuentas generan tensiones en el Frente Amplio', 'La primera Rendición de Cuentas del gobierno de Orsi (antes del 30 de junio) enfrenta al MEF, que defiende el compromiso fiscal, con sectores del FA que presionan por más gasto.', 'La primera Rendición de Cuentas del gobierno de Yamandú Orsi, que debe presentarse al Parlamento antes del 30 de junio, enfrenta al ministro Gabriel Oddone y al MEF —que defienden el compromiso fiscal y las metas— con sectores del Frente Amplio que presionan por mayor gasto público. El gobierno habla de reasignación de recursos antes que de recortes de suma cero.', false, 'https://www.ambito.com/uruguay/los-lineamientos-gasto-cero-la-rendicion-cuentas-generan-tensiones-el-frente-amplio-n6282068'),
  ('n5', '2026-06-11T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'El INAC admitió el error de la exportación de carne contaminada a China y lo comparó con el caso del año pasado', 'China detectó residuos de antibiótico por encima del límite en carne de un frigorífico de Tacuarembó; el INAC reconoció el error y anunció trabajo con productores.', 'China detectó residuos de antibiótico por encima del límite permitido en un embarque de carne de un frigorífico de Tacuarembó. El presidente del Instituto Nacional de Carnes (INAC), Gastón Scayola, reconoció el error y anunció un trabajo con los productores sobre los plazos de tratamiento, recordando un caso similar del año anterior. China es el principal destino individual de la carne uruguaya.', false, 'https://www.ambito.com/uruguay/el-inac-admitio-el-error-la-exportacion-carne-contaminada-china-y-lo-comparo-el-ano-pasado-n6287922'),
  ('n9', '2026-06-11T11:50:00.000Z', (SELECT id FROM medios WHERE nombre = 'Búsqueda'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'Consejo Fiscal advierte que el estancamiento económico podría seguir en 2026 y alerta sobre riesgos fiscales', 'El Consejo Fiscal Autónomo advirtió que el bajo crecimiento podría persistir en 2026 y alertó sobre los riesgos fiscales de cara a la Rendición de Cuentas.', 'El Consejo Fiscal Autónomo advirtió que el bajo crecimiento de la economía uruguaya podría persistir en 2026 y alertó sobre los riesgos fiscales que enfrenta el gobierno de cara a la Rendición de Cuentas. El MEF recortó su proyección de PIB 2026 de 2,2% a 1,6%.', false, 'https://www.busqueda.com.uy/economia/consejo-advierte-que-el-estancamiento-economico-podria-seguir-2026-y-alerta-riesgos-fiscales-n5411020'),
  ('n11', '2026-06-09T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'El turismo creció en gasto pero no en volumen: la temporada 2026 dejó US$928 millones', 'En el verano ingresaron 1,18 millones de visitantes y el gasto alcanzó US$928 M (+2,8% interanual); el volumen cayó por menor llegada de argentinos, pero el gasto subió.', 'El Ministerio de Turismo informó que en la temporada de verano (dic-feb) ingresaron divisas por US$928 millones (+2,8% interanual) pese a una caída del volumen de visitantes (186.000 turistas menos), por menor llegada de argentinos. En el primer trimestre los ingresos receptivos fueron US$843 M con 1.181.795 visitantes (−13,6%), confirmando la sensibilidad cambiaria con Argentina.', false, 'https://www.ambito.com/uruguay/ingreso-us-843-millones-turismo-el-primer-trimestre-pesar-la-caida-visitantes-n6272856'),
  ('n2', '2026-06-06T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'INE'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'IPC de mayo 2026: variación mensual 0,70% e interanual 3,77%', 'La inflación de mayo fue 0,70% mensual y 3,77% en los últimos 12 meses, dentro del rango meta del BCU; mayores incidencias en transporte, alimentos y vivienda.', 'El Instituto Nacional de Estadística informó que el Índice de Precios del Consumo registró una variación mensual de 0,70% en mayo de 2026 y de 3,77% en los últimos doce meses, dentro del rango meta del Banco Central (3%-6%) y por debajo de su centro (4,5%). Las mayores incidencias provinieron de Transporte (gasoil +14%, nafta +7%), Alimentos y bebidas, y Vivienda (tributos domiciliarios y supergás).', false, 'https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/HTML/IPC/2026/PC%20Mayo%202026.html'),
  ('n12', '2026-06-05T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'La matriz energética arrancó el año con 96,7% de producción renovable', 'En enero de 2026 el 96,7% de la generación eléctrica fue renovable, liderada por hidráulica (43,6%) y eólica (33,7%), reafirmando el liderazgo de Uruguay en energías limpias.', 'En enero de 2026 el 96,7% de la generación eléctrica de Uruguay fue de origen renovable, liderada por la hidráulica (43,6%) y la eólica (33,7%). En el año completo 2025 la generación renovable alcanzó el 98%, uno de los mayores porcentajes del mundo. Uruguay exporta sus excedentes a Argentina y Brasil e impulsa proyectos de hidrógeno verde.', false, 'https://www.ambito.com/uruguay/la-matriz-energetica-el-arranco-el-ano-el-967-produccion-renovable-n6243523'),
  ('n4', '2026-06-02T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Las exportaciones uruguayas volvieron a caer en mayo: bajaron 3%', 'Las solicitudes de exportación sumaron US$1.142 M en mayo (−3% interanual); China lideró como destino y la soja y lácteos compensaron caídas en carne y celulosa.', 'Según datos de Uruguay XXI, las solicitudes de exportación de bienes sumaron US$1.142 millones en mayo de 2026, una caída de 3% interanual. China fue el principal destino, mientras la soja (+45%) y los lácteos (+29%) compensaron las caídas en carne bovina y celulosa. En el acumulado enero-mayo las ventas crecen 3% (US$5.271 M).', false, 'https://www.infobae.com/america/america-latina/2026/06/02/las-exportaciones-uruguayas-volvieron-a-caer-en-mayo-bajaron-3/'),
  ('n3', '2026-05-26T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'En Perspectiva'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La tasa de política monetaria se mantuvo en 5,75% anual, anunció el Copom', 'En su reunión del 26 de mayo el Copom mantuvo por segunda vez consecutiva la TPM en 5,75%, buscando llevar la inflación a la meta de 4,5% en un contexto de elevada incertidumbre global.', 'El Comité de Política Monetaria del Banco Central del Uruguay decidió mantener la Tasa de Política Monetaria en 5,75% anual por unanimidad, por segunda vez consecutiva, tras siete recortes iniciados en julio de 2025. El BCU justificó la pausa por la inestabilidad internacional (conflicto en Medio Oriente y su impacto energético) y presiones inflacionarias al alza, manteniendo la meta de 4,5%.', false, 'https://enperspectiva.uy/en-perspectiva-programa/la-tasa-de-politica-monetaria-se-mantuvo-en-575-anual-anuncio-el-copom-que-hay-detras-de-la-decision-que-se-puede-esperar-para-los-proximos-meses-exante/'),
  ('n7', '2026-05-18T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'El déficit fiscal se mantuvo estable en 4,7% del PIB cerrado a marzo, en línea con la meta del Presupuesto', 'El resultado del sector público para los 12 meses a marzo de 2026 quedó en 4,7% del PIB, alineado con la meta presupuestal pero señalado como principal riesgo para el rating soberano.', 'El resultado fiscal del Sector Público Global para el año móvil cerrado a marzo de 2026 se ubicó en 4,7% del PIB, estable respecto a febrero y en línea con la meta del Presupuesto. El resultado del Gobierno Central-BPS ajustado fue de −3,7% del PIB. Las calificadoras señalan la reducción del déficit como el principal riesgo para el grado inversor.', false, 'https://www.ambito.com/uruguay/el-deficit-fiscal-se-mantuvo-estable-47-del-pib-cerrado-marzo-linea-la-meta-del-presupuesto-n6272825'),
  ('n13', '2025-11-17T16:40:00.000Z', (SELECT id FROM medios WHERE nombre = 'S&P Global'), (SELECT id FROM categorias_noticia WHERE nombre = 'Internacional'), 'S&P ratificó la calificación de Uruguay en ''BBB+'' con perspectiva estable', 'S&P ratificó la nota de Uruguay en BBB+ con perspectiva estable, destacando la democracia estable y el mayor PIB per cápita regional, pero señalando la reducción del déficit fiscal como principal riesgo.', 'S&P Global Ratings ratificó la calificación soberana de Uruguay en BBB+/A-2 con perspectiva estable, destacando la estabilidad democrática y el mayor PIB per cápita de la región. La agencia señaló la necesidad de reducir el déficit fiscal como el principal riesgo. Uruguay mantiene grado inversor por las cuatro principales calificadoras.', false, 'https://www.spglobal.com/ratings/en/regulatory/article/-/view/type/HTML/id/3486826');

-- ── noticia_terminos (M:N) ──────────────────────────────────────
INSERT INTO noticia_terminos (noticia_id, termino_id) VALUES
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Orsi')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Empleo')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Salario real')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Encuestas')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Oddone')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Interpelación')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Economía')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Senado')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Rendición de Cuentas')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'OPP')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Arim')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), (SELECT id FROM terminos WHERE termino = 'PIB')),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), (SELECT id FROM terminos WHERE termino = 'Actividad')),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), (SELECT id FROM terminos WHERE termino = 'Agro')),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), (SELECT id FROM terminos WHERE termino = 'Carne')),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), (SELECT id FROM terminos WHERE termino = 'China')),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), (SELECT id FROM terminos WHERE termino = 'Aranceles')),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), (SELECT id FROM terminos WHERE termino = 'INAC')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'UPM')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Celulosa')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Fray Bentos')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Ambiente')),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), (SELECT id FROM terminos WHERE termino = 'Rendición de Cuentas')),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), (SELECT id FROM terminos WHERE termino = 'Oddone')),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), (SELECT id FROM terminos WHERE termino = 'Frente Amplio')),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), (SELECT id FROM terminos WHERE termino = 'Fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n5'), (SELECT id FROM terminos WHERE termino = 'INAC')),
  ((SELECT id FROM noticias WHERE codigo = 'n5'), (SELECT id FROM terminos WHERE termino = 'Carne')),
  ((SELECT id FROM noticias WHERE codigo = 'n5'), (SELECT id FROM terminos WHERE termino = 'China')),
  ((SELECT id FROM noticias WHERE codigo = 'n5'), (SELECT id FROM terminos WHERE termino = 'Exportaciones')),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), (SELECT id FROM terminos WHERE termino = 'Consejo Fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), (SELECT id FROM terminos WHERE termino = 'PIB')),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), (SELECT id FROM terminos WHERE termino = 'Déficit')),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), (SELECT id FROM terminos WHERE termino = 'Crecimiento')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'Turismo')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'Argentina')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'Mintur')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'Punta del Este')),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), (SELECT id FROM terminos WHERE termino = 'IPC')),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), (SELECT id FROM terminos WHERE termino = 'Inflación')),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), (SELECT id FROM terminos WHERE termino = 'INE')),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'Energía')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'Renovables')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'ADME')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'UTE')),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), (SELECT id FROM terminos WHERE termino = 'Exportaciones')),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), (SELECT id FROM terminos WHERE termino = 'Uruguay XXI')),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), (SELECT id FROM terminos WHERE termino = 'China')),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), (SELECT id FROM terminos WHERE termino = 'Agro')),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), (SELECT id FROM terminos WHERE termino = 'TPM')),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), (SELECT id FROM terminos WHERE termino = 'Copom')),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), (SELECT id FROM terminos WHERE termino = 'Inflación')),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), (SELECT id FROM terminos WHERE termino = 'Déficit')),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), (SELECT id FROM terminos WHERE termino = 'Fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), (SELECT id FROM terminos WHERE termino = 'MEF')),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), (SELECT id FROM terminos WHERE termino = 'Rating')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'S&P')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Rating')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Grado inversor')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'BBB+'));

-- ── noticia_vinculos ("vinculado a") ────────────────────────────
INSERT INTO noticia_vinculos (noticia_id, tipo, etiqueta) VALUES
  ((SELECT id FROM noticias WHERE codigo = 'n14'), 'otro', 'Desempleo'),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), 'otro', 'Salario real'),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), 'otro', 'PIB · actividad'),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), 'otro', 'Fiscal · regla fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), 'otro', 'PIB · actividad'),
  ((SELECT id FROM noticias WHERE codigo = 'n1'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n8'), 'otro', 'Novillo gordo'),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n6'), 'otro', 'Fiscal · regla fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n5'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), 'otro', 'PIB · actividad'),
  ((SELECT id FROM noticias WHERE codigo = 'n9'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), 'otro', 'Externo & comercio'),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), 'otro', 'IPC interanual'),
  ((SELECT id FROM noticias WHERE codigo = 'n2'), 'otro', 'IPC mensual'),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), 'otro', 'Energía · matriz renovable'),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n4'), 'otro', 'Externo & comercio'),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), 'otro', 'TPM · BCU'),
  ((SELECT id FROM noticias WHERE codigo = 'n3'), 'otro', 'Expect. infl. 24m'),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n7'), 'otro', 'Deuda bruta'),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), 'otro', 'Riesgo país (UBI)'),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), 'otro', 'Mercados · crédito soberano');

-- ── eventos (calendario 30 días) ────────────────────────────────
INSERT INTO eventos (fecha, categoria_id, titulo, tono) VALUES
  ('2026-06-30', (SELECT id FROM categorias_evento WHERE nombre = 'Parlamento'), 'Rendición de Cuentas 2026 (plazo · 30-jun)', 'accent'),
  ('2026-07-01', (SELECT id FROM categorias_evento WHERE nombre = 'Mercosur'), 'Uruguay asume la presidencia pro tempore', 'info'),
  ('2026-07-03', (SELECT id FROM categorias_evento WHERE nombre = 'INE'), 'IPC junio · inflación', 'accent'),
  ('2026-07-03', (SELECT id FROM categorias_evento WHERE nombre = 'INE'), 'Mercado laboral ECH · mayo', 'info'),
  ('2026-07-06', (SELECT id FROM categorias_evento WHERE nombre = 'Uruguay XXI'), 'Comercio exterior · exportaciones junio', 'info'),
  ('2026-07-06', (SELECT id FROM categorias_evento WHERE nombre = 'INAC'), 'Indicadores del sector cárnico', 'info'),
  ('2026-07-08', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'Reunión del COPOM · decisión de TPM', 'accent'),
  ('2026-07-15', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'Encuesta de expectativas de inflación', 'info'),
  ('2026-07-18', (SELECT id FROM categorias_evento WHERE nombre = 'Feriado'), 'Jura de la Constitución de 1830', 'neutral');

COMMIT;
