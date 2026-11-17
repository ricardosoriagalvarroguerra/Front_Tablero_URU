-- AUTO-GENERADO por db/generate-seed.mjs — no editar a mano.
-- Datos del tablero (snapshot Uruguay 17 nov 2026), idénticos a src/data/mockData.ts.
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
  ('ine', 'INE · IPC/empleo/pobreza', 'oficial', 'https://www.ine.gub.uy/'),
  ('bcu', 'BCU · TPM/PIB/TC/reservas', 'oficial', 'https://www.bcu.gub.uy/'),
  ('mef', 'MEF · fiscal/deuda', 'oficial', 'https://www.gub.uy/ministerio-economia-finanzas/'),
  ('inac', 'INAC · carne/faena', 'oficial', 'https://www.inac.uy/'),
  ('uruguayxxi', 'Uruguay XXI · comercio', 'oficial', 'https://www.uruguayxxi.gub.uy/'),
  ('dgi', 'DGI · recaudación', 'oficial', 'https://www.gub.uy/direccion-general-impositiva/'),
  ('adme', 'ADME/UTE · energía', 'oficial', 'https://adme.com.uy/'),
  ('jpm', 'JP Morgan · EMBI', 'mercado', 'https://www.jpmorgan.com/'),
  ('rating', 'Calificadoras', 'mercado', 'https://deuda.mef.gub.uy/'),
  ('news', 'Agregador de prensa', 'agregador', NULL);

-- ── medios ──────────────────────────────────────────────────────
INSERT INTO medios (nombre, tipo, pais) VALUES
  ('Infobae', 'internacional', 'AR'),
  ('Investing.com', 'internacional', 'US'),
  ('Shale24', 'internacional', 'AR'),
  ('El Observador', 'nacional', 'UY'),
  ('la diaria', 'nacional', 'UY'),
  ('Prensa Latina', 'agencia', 'CU'),
  ('El Telégrafo', 'nacional', 'UY'),
  ('Montevideo Portal', 'nacional', 'UY'),
  ('Ámbito', 'nacional', 'UY'),
  ('EFE', 'agencia', 'ES'),
  ('Bloomberg Línea', 'internacional', 'US'),
  ('FMI', 'internacional', 'US');

-- ── categorias_noticia ──────────────────────────────────────────
INSERT INTO categorias_noticia (codigo, nombre) VALUES
  ('economico', 'Económico'),
  ('internacional', 'Internacional'),
  ('sectorial', 'Sectorial'),
  ('politico', 'Político'),
  ('social', 'Social');

-- ── categorias_evento ───────────────────────────────────────────
INSERT INTO categorias_evento (codigo, nombre) VALUES
  ('bcu', 'BCU'),
  ('miem', 'MIEM'),
  ('ine', 'INE'),
  ('mef', 'MEF'),
  ('mercosur', 'Mercosur'),
  ('uruguay_xxi', 'Uruguay XXI'),
  ('fed', 'Fed');

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
  ('ui2034', 'Nota Global UI 2034', 'UI', 'global', '2034', 3);

-- ── indices_riesgo ──────────────────────────────────────────────
INSERT INTO indices_riesgo (codigo, nombre, unidad) VALUES
  ('EMBI', 'EMBI · riesgo país (JP Morgan)', 'pb'),
  ('UBI', 'Uruguay Bond Index · riesgo país (República AFAP)', 'pb');

-- ── productos_agro ──────────────────────────────────────────────
INSERT INTO productos_agro (codigo, nombre, orden, precio, precio_unidad, var_precio, export_usd, participacion, destino_top, polaridad, asof, fuente, nota) VALUES
  ('carne', 'Carne bovina', 0, 6.01, 'USD/kg', 7.9, 2220, 19.4, 'EE.UU. / China / UE', 'up', 'ene-oct', 'Uruguay XXI · INAC · ACG', '1er producto (US$2.220 M ene-oct, +2%). Novillo récord ≥ US$6/kg; precio de exportación US$6.240/t (oct). Faena −14% i/a por menor oferta. EE.UU. fue el 1er comprador de carne en octubre; China usó sólo ~31% de su cuota (324 mil t al 12%).'),
  ('celulosa', 'Celulosa', 1, 620, 'USD/ton', 3.3, 1998, 17.5, 'UE / China / EE.UU.', 'up', 'ene-oct', 'Uruguay XXI · Suzano (lista China, prensa)', '2º producto (US$1.998 M ene-oct, +2%) y 1º de octubre (US$229 M, +37%; 40% a la UE). Precio: ref. de prensa ~US$610–630/t en China tras la suba de Suzano (+US$20/t, 11-nov); no comparable con el índice Fastmarkets de junio (US$668).'),
  ('soja', 'Soja', 2, 12.27, 'USD/bushel', 10.5, 834, 7.3, 'China', 'up', 'ene-oct', 'Uruguay XXI · CBOT (USDA AMS)', 'La gran víctima de la sequía: US$834 M ene-oct (−37%; volumen −42%) y sin envíos a China en octubre. CBOT nov-26 US$12,27 (12-nov), +10,5% desde junio. Intención 2026/27: ~1,26–1,3 M ha; USDA proyecta 3,1 Mt.'),
  ('lacteos', 'Lácteos', 3, 3971, 'USD/ton', 7.2, 772, 6.8, 'Brasil / Argelia', 'up', 'ene-oct', 'Uruguay XXI · GDT', '4º producto (US$772 M ene-oct); octubre +21% i/a. Leche en polvo entera GDT evento 415 (3-nov): US$3.971/t, tercera suba consecutiva (+10% desde el 8-oct).'),
  ('concentrado', 'Concentrado de bebidas', 4, NULL, 'USD/ton', NULL, 711, 6.2, 's/d', 'none', 'ene-oct', 'Uruguay XXI', '5º producto (US$711 M ene-oct); octubre US$78 M (+23% i/a). Industrial (zona franca), no agro.'),
  ('ganado', 'Ganado en pie', 5, NULL, 'USD/cab', NULL, 368, 3.2, 'Turquía / región', 'up', '2026', 'Uruguay XXI', 'US$368 M (+24% i/a): compite con la faena local por la oferta de ganado.'),
  ('arroz', 'Arroz', 6, 514, 'USD/ton', 11.5, 350, 3.1, 'Brasil / Perú', 'up', 'abr-sep', 'Uruguay XXI · Blasina', 'Exportación US$350 M (−21% por menor zafra). Precio de exportación US$514/t en sep (+35% i/a, +11,5% vs jul). Precio provisorio 2025/26 US$9,10/bolsa, el definitivo sería mayor.'),
  ('trigo', 'Trigo', 7, 5.84, 'USD/bushel', 1.9, NULL, NULL, 'Brasil', 'up', 'nov 2026', 'DIEA · CBOT', 'Arrancó la cosecha de invierno: 268.540 ha de trigo (zafra total de invierno 825.712 ha con cebada, colza y carinata). CBOT dic-26 US$5,84 (12-nov).');

-- ── agro_destinos ───────────────────────────────────────────────
INSERT INTO agro_destinos (orden, pais, valor) VALUES
  (0, 'China', 20),
  (1, 'Brasil', 15),
  (2, 'Unión Europea', 14),
  (3, 'Otros', 51);

-- ── terminos (keywords) ─────────────────────────────────────────
INSERT INTO terminos (termino) VALUES
  ('BCU'),
  ('TPM'),
  ('Inflación'),
  ('COPOM'),
  ('Orsi'),
  ('España'),
  ('Mercosur-UE'),
  ('Inversión'),
  ('S&P'),
  ('Calificación'),
  ('Grado inversor'),
  ('Déficit'),
  ('ANCAP'),
  ('Offshore'),
  ('Eni'),
  ('Petróleo'),
  ('Moody''s'),
  ('Baa1'),
  ('Crecimiento'),
  ('Deuda'),
  ('Desdolarización'),
  ('Bonos'),
  ('MEF'),
  ('IPC'),
  ('INE'),
  ('Exportaciones'),
  ('Uruguay XXI'),
  ('Celulosa'),
  ('UE'),
  ('Carne'),
  ('Novillo'),
  ('INAC'),
  ('China'),
  ('Energía'),
  ('Renovables'),
  ('UTE'),
  ('Hidráulica'),
  ('Combustibles'),
  ('MIEM'),
  ('URSEA'),
  ('Déficit fiscal'),
  ('FSS'),
  ('Regla fiscal'),
  ('Encuestas'),
  ('Factum'),
  ('Aprobación'),
  ('DGI'),
  ('Recaudación'),
  ('IVA'),
  ('Consumo'),
  ('Desempleo'),
  ('ECH'),
  ('Informalidad'),
  ('Solaria'),
  ('Data centers'),
  ('Solar'),
  ('Suba de tasas'),
  ('Pobreza'),
  ('Infancia'),
  ('Ingresos'),
  ('FMI'),
  ('Artículo IV'),
  ('PIB'),
  ('Fiscal'),
  ('Rendición de Cuentas'),
  ('Senado'),
  ('Frente Amplio');

-- ── indicadores (KPIs macro) ────────────────────────────────────
INSERT INTO indicadores (codigo, nombre, unidad, categoria, sentido, decimales, definicion, asof, periodicidad, fuente_id, extra_label, extra_valor, extra_tono) VALUES
  ('ipc_interanual', 'Inflación interanual', '%', 'precios', 'neg', 2, 'Variación del IPC en los últimos 12 meses (INE). Octubre 2026: 4,87% (0,59% en el mes), cuarto mes consecutivo por encima del centro de la meta del BCU (4,5%) aunque dentro del rango 3%–6%. Acumulado del año 4,82%. Empujaron vestimenta (+2,97% por cambio de temporada), gasoil y hortalizas; en septiembre, alimentos (+1,73%; tomate +49%).', 'oct 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), 'vs centro de la meta', '+0,37 pp', 'neg'),
  ('pib', 'PIB', '% i/a', 'actividad', 'neg', 1, 'PIB, variación interanual del 2T 2026: −0,5% (−0,8% desestacionalizado vs 1T). Primera caída interanual desde 2023, explicada por la sequía: el agro se desplomó −22,2% (incidencia −1,7 pp). Crecieron construcción (+4,2%), comercio (+2,8%), servicios financieros (+2,3%) e industria (+1,9%); el consumo privado subió +2,6%. El IMAE de agosto cayó −1,1% m/m. El 3T se publica el 15-dic.', '2T 2026', 'trimestral', (SELECT id FROM fuentes WHERE codigo = 'bcu'), 'trimestral', '−0,8%', 'neg'),
  ('tpm', 'Tasa de política', '%', 'monetario', 'neutral', 2, 'Tasa de Política Monetaria. El COPOM la subió 25 pb a 6,00% el 8-oct-2026 (unánime, primera suba desde abr-2025, sorprendió al consenso) como medida preventiva ante dos meses de inflación sobre el centro de la meta, y la mantuvo el 16-nov con «riesgos equilibrados»: ve la inflación transitoriamente sobre 4,5% por petróleo y alimentos, y descarta presiones generalizadas. Minuta: 24-nov.', '16 nov', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), '1ª suba desde 2025', '', 'neutral'),
  ('ipc_mensual', 'Inflación mensual', '%', 'precios', 'neg', 2, 'Variación mensual del IPC (INE). Octubre 2026: 0,59%, tras 0,54% en septiembre: dos meses seguidos por encima de 0,5%. Julio había sido casi nulo (0,07%) por la baja de combustibles. La subyacente (sin frutas, verduras ni combustibles) fue 4,47% en septiembre. El IPC de noviembre se publica el 3-dic.', 'oct 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('expectativas_inflacion', 'Expectativas 24m', '%', 'precios', 'neutral', 2, 'Expectativas de inflación a 24 meses (horizonte de política) según el comunicado del COPOM del 16-nov: analistas 4,57%, operadores financieros 4,6%, empresas ~5%. Siguen cerca del centro de la meta pese al repunte del IPC; a 12 meses los analistas esperan 4,6% (oct). Para el cierre de 2026 la encuesta de noviembre apunta a ~5,1%.', 'nov 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), 'ancladas cerca de 4,5%', '', 'pos'),
  ('tipo_cambio', 'Dólar', NULL, 'monetario', 'neutral', 2, 'Tipo de cambio interbancario peso/dólar (BCU): $40,61 al 13-nov-2026, máximo desde junio; acumula más de 100 ruedas por encima de $40 y se mueve en una franja estrecha ($40,0–40,7). El BCU cumplió cinco años sin intervenir en el mercado cambiario. La encuesta de noviembre espera ~$40,50 al cierre de 2026.', '13 nov', 'diaria', (SELECT id FROM fuentes WHERE codigo = 'bcu'), NULL, NULL, NULL),
  ('reservas', 'Reservas', 'M USD', 'monetario', 'neutral', 0, 'Activos de reserva del BCU, fin de mes: US$18.216 M en octubre 2026, tras recuperarse a US$18.552 M en septiembre desde el mínimo de agosto (US$17.486 M). Récord: US$19.948 M (feb-2026). *jun = dato del 25-jun. Confianza media: serie tomada de Trading Economics, pendiente de cotejo con la planilla del BCU.', 'oct 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'bcu'), 'vs récord', '−US$1.732 M', 'neutral'),
  ('desempleo', 'Desempleo', '%', 'social', 'pos', 1, 'Tasa de desempleo (INE, ECH). Septiembre 2026: 7,1% (Montevideo e Interior iguales), estable frente a 7,2% de agosto. Empleo 59,6%, actividad 64,1%. Mujeres 8,6%, hombres 5,8%; jóvenes (14-24) 21,6%. La informalidad bajó a 21,0% (−1,3 pp i/a). El dato de octubre sale el 30-nov.', 'sep 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('salario_real', 'Salario real', '% i/a', 'social', 'pos', 2, 'Salario real (IMS deflactado por IPC), variación interanual. Septiembre 2026: +1,25% (nominal +5,98%); en el mes −0,43% y +0,99% acumulado en el año. La ganancia de poder de compra se desaceleró desde +2,05% en febrero a medida que subió la inflación. El sector público cayó −0,50% real en septiembre.', 'sep 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'ine'), NULL, NULL, NULL),
  ('pobreza', 'Pobreza', '%', 'social', 'pos', 1, 'Incidencia de la pobreza en personas (INE, método 2017). 1S 2026: 14,8%, frente a 17,7% un año antes: unas 95.000 personas salieron de la pobreza y es el mínimo de la serie. Hogares 11,6%; indigencia 1,2%. Pobreza en menores de 6 años 24,9% (vs 32,4%, cifra difundida por Presidencia en base al INE).', '1S 2026', 'semestral', (SELECT id FROM fuentes WHERE codigo = 'ine'), 'mínimo de la serie', '', 'pos'),
  ('novillo', 'Novillo', 'USD/kg', 'agro', 'pos', 2, 'Precio del novillo gordo (USD/kg carcasa, grilla ACG). El 30-oct superó por primera vez en la historia los US$6/kg; a inicios de noviembre US$6,01 (especial 6,05), con negocios en US$5,95–6,00 al 16-nov. El Novillo Tipo (INAC) marcó US$2.212/cabeza en octubre, máximo histórico, y el precio medio de exportación US$6.240/t. Pesos de carcasa récord (314 kg).', 'sem 44-45', 'semanal', (SELECT id FROM fuentes WHERE codigo = 'inac'), 'récord histórico', '', 'pos'),
  ('exportaciones', 'Exportaciones', 'M USD', 'externo', 'neutral', 0, 'Exportaciones de bienes (solicitudes, incluye zonas francas). Octubre 2026: US$1.089 M (+1% i/a); acumulado ene-oct US$11.430 M (+1%). Por primera vez la UE fue el primer destino del mes (16%). La celulosa lideró octubre (US$229 M, +37%); la soja acumula −37% por la sequía. *ago estimado por diferencia de acumulados.', 'oct 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'uruguayxxi'), 'ene-oct', 'US$11.430 M', 'neutral'),
  ('resultado_fiscal', 'Resultado fiscal', '% PIB', 'fiscal', 'neg', 1, 'Resultado del Sector Público Global sin ingresos del FSS II (año móvil): −4,7% del PIB a septiembre 2026 ($170.015 M), igual que en agosto y peor que el −4,3% de mitad de año: la caída de los ingresos (DGI −2,9% real en sep) y un gasto estable. Con FSS II: −4,3%. Gobierno Central-BPS −4,1% (meta Rendición de Cuentas 2026: −4,1%).', '12m sep 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'mef'), 'GC-BPS', '−4,1%', 'neg'),
  ('deuda', 'Deuda bruta', '% PIB', 'fiscal', 'neutral', 1, 'Deuda bruta del Sector Público Global: 73,2% del PIB (US$63.861 M) a marzo 2026; neta 54,0%; 59% en moneda nacional. La del Gobierno Central (UGD) subió a 62,5% bruta / 58,2% neta a septiembre. En 2026 el 92% de los bonos emitidos (US$4.403 M de US$4.802 M) se colocó en moneda nacional: desdolarización récord.', 'mar 2026', 'anual', (SELECT id FROM fuentes WHERE codigo = 'mef'), 'neta', '54,0%', 'neutral'),
  ('embi', 'Riesgo país', 'pb', 'mercados', 'neutral', 0, 'Riesgo país según el EMBI de JP Morgan (spread soberano sobre bonos del Tesoro de EE.UU.): 84 pb al cierre de octubre 2026 (83 pb el 2-nov), desde 58 pb en junio. Sigue siendo el más bajo de América Latina: Chile 104, Paraguay 122, Perú 127, Brasil 194, Argentina 787. La suba acompaña el aumento del riesgo regional que mencionó el BCU. El UBI de República AFAP no tiene datos publicados de 2026.', 'oct 2026', 'mensual', (SELECT id FROM fuentes WHERE codigo = 'jpm'), 'el más bajo de la región', '', 'pos');

-- ── indicador_observaciones (series reales + valor vigente) ─────
INSERT INTO indicador_observaciones (indicador_id, fecha, valor, periodo, variacion, variacion_etiqueta) VALUES
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-05-31', 3.16, 'abr', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-06-30', 3.77, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-07-31', 4.25, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-08-31', 4.27, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-09-30', 4.55, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-10-31', 4.68, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_interanual'), '2026-11-30', 4.87, 'oct', 0.19, '+0,19 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-06-30', 3.6, '1T25', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-07-31', 2.3, '2T25', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-08-31', 1.2, '3T25', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-09-30', 0.1, '4T25', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-10-31', 0.9, '1T26', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pib'), '2026-11-30', -0.5, '2T26', -1.4, '−1,4 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-06-30', 5.75, 'mar', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-07-31', 5.75, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-08-31', 5.75, '1-jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-09-30', 5.75, '18-ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-10-31', 6, '8-oct', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tpm'), '2026-11-30', 6, '16-nov', 0, 'mantuvo'),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-07-31', 0.7, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-08-31', 0.07, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-09-30', 0.24, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-10-31', 0.54, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'ipc_mensual'), '2026-11-30', 0.59, 'oct', 0.05, '+0,05 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-08-31', 4.5, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-09-30', 4.51, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-10-31', 4.54, 'oct', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'expectativas_inflacion'), '2026-11-30', 4.57, 'nov', 0.03, '+0,03 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-06-30', 40.22, '26-jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-07-31', 40.27, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-08-31', 40.24, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-09-30', 40.19, 'oct', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-10-31', 40.31, '5-nov', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'tipo_cambio'), '2026-11-30', 40.61, '13-nov', 1, '+1,0% m/m'),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-05-31', 18463, 'abr', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-06-30', 18243, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-07-31', 18474, 'jun*', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-08-31', 17699, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-09-30', 17486, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-10-31', 18552, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'reservas'), '2026-11-30', 18216, 'oct', -336, '−336 M'),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-06-30', 7.5, 'abr', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-07-31', 7.6, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-08-31', 7, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-09-30', 7, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-10-31', 7.2, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'desempleo'), '2026-11-30', 7.1, 'sep', -0.1, '−0,1 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-07-31', 2.05, 'feb', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-08-31', 1.9, 'abr', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-09-30', 1.29, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-10-31', 0.88, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'salario_real'), '2026-11-30', 1.25, 'sep', 0.37, '+0,37 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'pobreza'), '2026-10-31', 17.7, '1S25', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'pobreza'), '2026-11-30', 14.8, '1S26', -2.9, '−2,9 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-06-30', 5.57, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-07-31', 5.58, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-08-31', 6, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-09-30', 5.78, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-10-31', 6, 'oct', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'novillo'), '2026-11-30', 6.01, 'nov', 0.2, '+0,2%'),
  ((SELECT id FROM indicadores WHERE codigo = 'exportaciones'), '2026-08-31', 1219, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'exportaciones'), '2026-09-30', 1155, 'ago*', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'exportaciones'), '2026-10-31', 1398, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'exportaciones'), '2026-11-30', 1089, 'oct', 1, '+1% i/a'),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-05-31', -4.7, 'mar', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-06-30', -4.6, 'abr', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-07-31', -4.3, 'may', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-08-31', -4.3, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-09-30', -4.4, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-10-31', -4.7, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'resultado_fiscal'), '2026-11-30', -4.7, 'sep', -0.4, '−0,4 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-09-30', 66.3, '2024', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-10-31', 74.9, '2025', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'deuda'), '2026-11-30', 73.2, 'mar-26', -1.7, '−1,7 pp'),
  ((SELECT id FROM indicadores WHERE codigo = 'embi'), '2026-07-31', 58, 'jun', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'embi'), '2026-08-31', 68, 'jul', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'embi'), '2026-09-30', 65, 'ago', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'embi'), '2026-10-31', 78, 'sep', NULL, NULL),
  ((SELECT id FROM indicadores WHERE codigo = 'embi'), '2026-11-30', 84, 'oct', 6, '+6 pb');

-- ── bono_cotizaciones (cierre vigente) ──────────────────────────
INSERT INTO bono_cotizaciones (bono_id, fecha, precio, rendimiento, variacion) VALUES
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'usd2037'), '2026-11-17', NULL, 5.36, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'uyu2035'), '2026-11-17', 101.58, 7.75, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'sslb2034'), '2026-11-17', NULL, NULL, NULL),
  ((SELECT id FROM bonos_soberanos WHERE codigo = 'ui2034'), '2026-11-17', NULL, 2.74, NULL);

-- ── indice_riesgo_observaciones (EMBI) ──────────────────────────
INSERT INTO indice_riesgo_observaciones (indice_id, fecha, valor, periodo, variacion) VALUES
  ((SELECT id FROM indices_riesgo WHERE codigo = 'EMBI'), '2026-06-30', 58, 'jun', NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'EMBI'), '2026-07-31', 68, 'jul', NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'EMBI'), '2026-08-31', 65, 'ago', NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'EMBI'), '2026-09-30', 78, 'sep', NULL),
  ((SELECT id FROM indices_riesgo WHERE codigo = 'EMBI'), '2026-10-31', 84, 'oct', 6);

-- ── calificaciones ──────────────────────────────────────────────
INSERT INTO calificaciones (agencia_id, calificacion, perspectiva, fecha) VALUES
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'S&P'), 'BBB+', 'estable', '2026-11-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'Moody''s'), 'Baa1', 'estable', '2026-11-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'Fitch'), 'BBB', 'estable', '2026-09-01'),
  ((SELECT id FROM agencias_calificadoras WHERE nombre = 'DBRS'), 'BBB', 'estable', '2025-11-01');

-- ── ipc_rubros ──────────────────────────────────────────────────
INSERT INTO ipc_rubros (orden, label, valor, asof) VALUES
  (0, 'Tomates (sep)', 48.86, 'sep-oct 2026'),
  (1, 'Cebollas (sep)', 25.45, 'sep-oct 2026'),
  (2, 'Vestimenta (oct)', 2.97, 'sep-oct 2026'),
  (3, 'Alimentos y bebidas (sep)', 1.73, 'sep-oct 2026');

-- ── pib_sectores ────────────────────────────────────────────────
INSERT INTO pib_sectores (orden, label, valor, asof) VALUES
  (0, 'Construcción', 4.2, '2T 2026'),
  (1, 'Comercio, alojamiento y comidas', 2.8, '2T 2026'),
  (2, 'Servicios financieros', 2.3, '2T 2026'),
  (3, 'Industria manufacturera', 1.9, '2T 2026'),
  (4, 'Electricidad, gas y agua', 1, '2T 2026'),
  (5, 'Transporte y TIC', -0.2, '2T 2026'),
  (6, 'Agro, pesca y minería', -22.2, '2T 2026');

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
  ('hidraulica', 'Hidráulica', 0, 51.2),
  ('eolica', 'Eólica', 1, 32.4),
  ('biomasa', 'Biomasa', 2, 12.3),
  ('solar', 'Solar fotovoltaica', 3, 2.7),
  ('termica', 'Térmica (fósil)', 4, 1.3);

-- ── energia_combustibles ────────────────────────────────────────
INSERT INTO energia_combustibles (orden, producto, precio, unidad) VALUES
  (0, 'Nafta Súper 95', 90.45, '$/L'),
  (1, 'Nafta Premium 97', 93.01, '$/L'),
  (2, 'Gasoil 50S', 62.79, '$/L'),
  (3, 'Gasoil 10S', 72.05, '$/L'),
  (4, 'Supergás', 93.56, '$/kg');

-- ── commodities ─────────────────────────────────────────────────
INSERT INTO commodities (codigo, nombre, unidad, valor, var_mensual, var_anual, polaridad, fuente, asof, nota) VALUES
  ('novillo', 'Novillo gordo (carcasa)', 'USD/kg', 6.01, 0.2, NULL, 'up', 'ACG · INAC', 'nov 2026', 'Superó US$6/kg por primera vez (30-oct).'),
  ('carne_export', 'Carne (precio medio export)', 'USD/ton', 6240, NULL, 25, 'up', 'INAC', 'oct 2026', '2º mayor registro; la última semana marcó récord de US$6.650/t.'),
  ('celulosa', 'Celulosa (China, ref. prensa)', 'USD/ton', 620, 3.3, NULL, 'up', 'Suzano · prensa', '11 nov', 'Suzano subió US$20/t en China; rango ~US$610–630.'),
  ('soja', 'Soja (CBOT nov-26)', 'USD/bushel', 12.27, NULL, NULL, 'up', 'USDA AMS · CBOT', '12 nov', '+10,5% desde junio (US$11,10).'),
  ('trigo', 'Trigo (CBOT dic-26)', 'USD/bushel', 5.84, NULL, NULL, 'up', 'USDA AMS · CBOT', '12 nov', 'Arranca la cosecha local (268 mil ha).'),
  ('leche', 'Leche en polvo entera (GDT)', 'USD/ton', 3971, 10.2, NULL, 'up', 'GlobalDairyTrade', 'GDT 415 · 3-nov', 'Tercera suba seguida (desde US$3.605 el 8-oct).'),
  ('arroz', 'Arroz (precio export)', 'USD/ton', 514, NULL, 35, 'up', 'Blasina · Uruguay XXI', 'sep 2026', 'Repunte desde el piso de US$383 (abr).');

-- ── comercio_destinos ───────────────────────────────────────────
INSERT INTO comercio_destinos (orden, pais, valor) VALUES
  (0, 'Unión Europea', 16),
  (1, 'Brasil', 16),
  (2, 'China', 15),
  (3, 'EE.UU.', 14),
  (4, 'Argentina', 5),
  (5, 'Otros', 34);

-- ── metricas (escalares por módulo) ─────────────────────────────
INSERT INTO metricas (modulo, clave, valor, valor_texto, unidad, asof, fuente, nota) VALUES
  ('agro', 'export_total', 6542, NULL, 'USD M', 'ene-oct 2026', 'Uruguay XXI · INAC · ACG', NULL),
  ('agro', 'participacion', 57, NULL, '%', NULL, NULL, NULL),
  ('agro', 'novillo_precio', 6.01, NULL, 'USD/kg', NULL, NULL, NULL),
  ('agro', 'novillo_var', NULL, NULL, '% i/a', NULL, NULL, NULL),
  ('agro', 'faena', 47.2, NULL, 'mil cab.', NULL, NULL, NULL),
  ('agro', 'faena_periodo', NULL, 'sem 8-14 nov: 47.213 cab (−15% i/a); acum. 2026 −14,3% i/a', NULL, NULL, NULL, NULL),
  ('agro', 'resumen', NULL, 'Precios récord contra volumen en caída. Las exportaciones de bienes suman US$11.430 M en ene-oct (+1% i/a): la sequía bajó la soja −37% y la faena −14%, pero la carne (novillo ≥ US$6/kg, exportación US$6.240/t), la celulosa (+37% en octubre) y los lácteos (+21%) sostuvieron el valor. Cambia el mapa de destinos: China perdió peso (no compró soja en octubre y usa ~31% de su cuota cárnica) y la UE (16%) y EE.UU. (14%) ganaron terreno; en octubre la UE fue, por primera vez, el primer destino.', NULL, 'ene-oct 2026', 'Uruguay XXI · INAC · ACG', NULL),
  ('mercados', 'grado_agencias', 4, NULL, NULL, NULL, NULL, NULL),
  ('mercados', 'riesgo_indice', NULL, 'EMBI · JP Morgan', NULL, 'oct 2026', NULL, NULL),
  ('mercados', 'riesgo_regional', NULL, '[{"pais":"Uruguay","pb":84},{"pais":"Chile","pb":104},{"pais":"Paraguay","pb":122},{"pais":"Perú","pb":127},{"pais":"Brasil","pb":194},{"pais":"Argentina","pb":787}]', NULL, NULL, NULL, NULL),
  ('mercados', 'grado_nota', NULL, 'Grado inversor ratificado en noviembre: S&P reafirmó BBB+ estable (11-nov; proyecta un déficit del gobierno general de ~3,7% del PIB en 2026, bajando a 3% en 2029) y Moody''s mantuvo Baa1 estable (10-nov; PIB 1,6% en 2026 y 1,9% en 2027; riesgos: crecimiento bajo el potencial, deterioro fiscal y deuda sobre el tope). Fitch ratificó BBB estable (11-sep; proyecta PIB 1% y deuda del gobierno general de 68% del PIB en 2026) y DBRS mantiene BBB (última confirmación nov-2025). Rendimientos: colocación primaria del 28-jul (Global UYU 2035 a 7,75%, USD 2037 a 5,356%, spread 75 pb); UI 2034: corte de feb.', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_nota', NULL, 'Bono Indexado a Indicadores de Sostenibilidad: el primer bono soberano del mundo con cupón atado a metas ambientales (2022). ~US$2.200 M, vto. 2034. 4º Reporte Anual (jun-2026, datos 2024): KPI-1 a −48% (a 2 pp de la meta −50% a 2025 → riesgo de step-up); KPI-2 (bosque nativo) en cumplimiento. El dato 2025 del KPI-1, que define el ajuste, se publicaría en el reporte de 2027; el step-up se activa si la reducción queda bajo 50% (step-down sobre 52%).', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_cupon', NULL, '5,75% · ±15 pb por meta (desde oct-2027)', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_kpi1', NULL, 'Reducir la intensidad de emisiones de GEI por unidad de PIB (−48% a 2024; meta −50% a 2025).', NULL, NULL, NULL, NULL),
  ('mercados', 'sslb_kpi2', NULL, 'Mantener/aumentar el área de bosque nativo vs la línea de base 2012 (en cumplimiento).', NULL, NULL, NULL, NULL),
  ('actividad', 'pib_var_interanual', -0.5, NULL, '% i/a', '2T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'pib_anual2025', 1.8, NULL, '%', '2T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'pib_trimestral', -0.8, NULL, '%', '2T 2026', 'BCU · Cuentas Nacionales', NULL),
  ('actividad', 'industria_var_interanual', 7.7, NULL, '% i/a', 'sep 2026', 'INE · IVFIM (+1,8% sin refinería)', NULL),
  ('actividad', 'industria_var_mensual', NULL, NULL, '%', 'sep 2026', 'INE · IVFIM (+1,8% sin refinería)', NULL),
  ('actividad', 'social_desempleo', 7.1, NULL, '%', 'sep 2026', 'INE · ECH / IMS / pobreza', NULL),
  ('actividad', 'social_empleo', 59.6, NULL, '%', 'sep 2026', 'INE · ECH / IMS / pobreza', NULL),
  ('actividad', 'social_salario_real', 1.25, NULL, '% i/a', 'sep 2026', 'INE · ECH / IMS / pobreza', NULL),
  ('actividad', 'social_pobreza', 14.8, NULL, '%', '1S 2026', 'INE · ECH / IMS / pobreza', NULL),
  ('actividad', 'social_desempleo_periodo', NULL, 'sep 2026', NULL, NULL, NULL, NULL),
  ('actividad', 'social_pobreza_periodo', NULL, '1S 2026', NULL, NULL, NULL, NULL),
  ('actividad', 'social_salario_real_periodo', NULL, 'sep 2026', NULL, NULL, NULL, NULL),
  ('energia', 'renovable_pct', 98.7, NULL, '%', '1S 2026 · oct 2026', 'ADME · UTE · MIEM/URSEA', NULL),
  ('energia', 'demanda_max', 2507, NULL, 'MW', '1S 2026 · oct 2026', 'ADME · UTE · MIEM/URSEA', NULL),
  ('energia', 'potencia_instalada', 5299, NULL, 'MW', '1S 2026 · oct 2026', 'ADME · UTE · MIEM/URSEA', NULL),
  ('energia', 'exportacion_destino', NULL, 'Argentina / Brasil', NULL, NULL, NULL, NULL),
  ('energia', 'exportacion_gwh', 1022, NULL, 'GWh', '1S 2026 · oct 2026', 'ADME · UTE · MIEM/URSEA', 'En 2025 Uruguay exportó 1.022 GWh e importó 633 GWh (MIEM). En 2026 la exportación fue irregular por la sequía: récord del año en mayo (130 GWh), pero en junio se importaron 124 GWh de Brasil con el precio spot más alto desde 2014. UTE reportó en el 1S una ganancia de US$193 M con exportaciones −18% i/a. Récord invernal de demanda: 2.362 MW (jul-2026); el máximo histórico sigue siendo 2.507 MW (mar-2025).'),
  ('energia', 'hidrogeno_proyecto', NULL, 'HIF Global · Paysandú', NULL, NULL, NULL, NULL),
  ('energia', 'hidrogeno_inversion', 5385, NULL, 'USD M', NULL, NULL, 'Proyecto de e-combustibles a partir de hidrógeno verde. Solicitud de Autorización Ambiental Previa presentada en mar-2026; en sep-2026 se anunció su relocalización a un predio de ANCAP (~48 ha, cerca de ALUR) tras los reclamos de Argentina. Inversión estimada US$5.385 M. Además, Solaria firmó (oct) un memorando por US$5.700 M para 500 MW de centros de datos con 350 MW solares.'),
  ('energia', 'hidrogeno_estado', NULL, 'en evaluación ambiental · relocalización', NULL, NULL, NULL, NULL),
  ('energia', 'resumen', NULL, 'La matriz se mantuvo ~99% renovable pese a la sequía: en el 1S 2026 la generación fue 51% hidráulica, 32% eólica, 12% biomasa y 3% solar, con sólo 1,3% fósil. Tras el mínimo eólico e hídrico de junio, las represas se recuperaron: octubre cerró 99,7% renovable (hidráulica 58,9%) y el 28-oct se llegó a 100% instantáneo. Los combustibles de noviembre quedaron congelados pese a que la paridad de importación indicaba subas.', NULL, '1S 2026 · oct 2026', 'ADME · UTE · MIEM/URSEA', NULL),
  ('externo', 'balanza_export', 1140, NULL, 'USD M', 'sep 2026 · base BCU (aprox.)', 'BCU · Comercio Ext. de Bienes · ene-sep −US$1.260 M', NULL),
  ('externo', 'balanza_import', 1180, NULL, 'USD M', 'sep 2026 · base BCU (aprox.)', 'BCU · Comercio Ext. de Bienes · ene-sep −US$1.260 M', NULL),
  ('externo', 'balanza_saldo', -35, NULL, 'USD M', 'sep 2026 · base BCU (aprox.)', 'BCU · Comercio Ext. de Bienes · ene-sep −US$1.260 M', NULL),
  ('externo', 'balanza_periodo', NULL, 'sep 2026 · base BCU (aprox.)', NULL, NULL, NULL, NULL),
  ('externo', 'turismo_ingresos', 348, NULL, 'USD M', '2T 2026', 'Mintur', 'Receptivo 2T 2026: US$348 M (+12% i/a) con 629 mil visitantes (−8%): menos turistas pero que gastan más (US$554 por persona). El saldo del trimestre fue ~−US$24 M (estimado) porque los uruguayos viajan más (emisivo 1S US$777 M). La rebaja de 9 puntos de IVA a turistas se prorrogó hasta el 30-abr-2027; las reservas para la temporada 2026-27 vienen en niveles récord.'),
  ('externo', 'turismo_visitantes', 629, NULL, 'mil', '2T 2026', 'Mintur', NULL),
  ('externo', 'turismo_saldo', -24, NULL, 'USD M', '2T 2026', 'Mintur', NULL),
  ('externo', 'ied_valor', NULL, NULL, 'USD M', '2025', 'BCU vía UCU (Indicadores de Coyuntura)', NULL),
  ('externo', 'ied_pctpib', 0.5, NULL, '% PIB', '2025', 'BCU vía UCU (Indicadores de Coyuntura)', NULL),
  ('externo', 'deuda_bruta_pct', 73.2, NULL, '% PIB', 'mar 2026', 'BCU · MEF/UGD', NULL),
  ('externo', 'deuda_total_usd', 63861, NULL, 'USD M', 'mar 2026', 'BCU · MEF/UGD', NULL),
  ('externo', 'cc_pct', -0.8, NULL, '% PIB', '12m a jun 2026', 'BCU · Balanza de Pagos (−US$689 M)', NULL),
  ('externo', 'cc_periodo', NULL, '12m a jun 2026', NULL, NULL, NULL, NULL),
  ('externo', 'tcr_brecha', -9.9, NULL, '%', '2025 · jul 2026', 'BCU · UCU', 'El BCU estimó un atraso cambiario de −9,9% respecto de los fundamentos al cierre de 2025. En 2026 el tipo de cambio real mejoró algo (ITCR +2,3% i/a en junio), pero el TCR extrarregional sigue ~25% por debajo de su promedio del siglo (UCU).'),
  ('externo', 'ipf_frontera', 25, NULL, '%', '2025 · jul 2026', 'BCU · UCU', 'Comprar en Salto costaba 25% más que en Concordia en julio 2026 (UCU), tras el mínimo de 15% en mayo: la brecha con Argentina volvió a ampliarse.'),
  ('fiscal', 'result_global_pct', -4.7, NULL, '% PIB', '12m sep 2026 · sin FSS II', 'MEF', NULL),
  ('fiscal', 'result_global_periodo', NULL, '12m sep 2026 · sin FSS II', NULL, NULL, NULL, NULL),
  ('fiscal', 'result_primario_pct', -1.8, NULL, '% PIB', 'est. 12m sep · GC-BPS', 'MEF (estimación del tablero)', NULL),
  ('fiscal', 'result_primario_periodo', NULL, 'est. 12m sep · GC-BPS', NULL, NULL, NULL, NULL),
  ('fiscal', 'regla_estructural', -3.9, NULL, '% PIB', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_gasto', 5.7, NULL, '%', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_deuda_tope', 3450, NULL, 'USD M', NULL, 'MEF · Consejo Fiscal Autónomo', NULL),
  ('fiscal', 'regla_cumple', 0, NULL, NULL, NULL, 'MEF · Consejo Fiscal Autónomo', 'Evaluación 2025: 2 de 3 pilares cumplidos (estructural −3,9% y endeudamiento neto bajo el tope de US$3.450 M; el gasto real creció 5,7% y superó el tope). Para 2026 la nueva regla (Ley 20.446) fija un resultado estructural de −4,0% del PIB y un ancla de deuda neta de 65% (el MEF proyecta 63,5% en 2029). El Consejo Fiscal Autónomo (jul-2026) advirtió que, si se materializan los riesgos, el estructural podría desviarse ~0,5% del PIB de la meta.'),
  ('fiscal', 'deuda_bruta_pct', 73.2, NULL, '% PIB', 'mar 2026', 'BCU · MEF/UGD', NULL),
  ('fiscal', 'deuda_neta_pct', 54, NULL, '% PIB', 'mar 2026', 'BCU · MEF/UGD', NULL),
  ('fiscal', 'deuda_moneda_local_pct', 59, NULL, '%', 'mar 2026', 'BCU · MEF/UGD', NULL),
  ('fiscal', 'recaudacion_var_real', -2.9, NULL, '% real i/a', 'sep 2026', 'DGI · bruta $62.881 M (+1,7% nominal, −2,9% real): IVA −5,2%, IRAE −3,0%, IRPF +1,7%. Acum. ene-sep +1,2% real; 12m +0,2%', NULL),
  ('fiscal', 'recaudacion_periodo', NULL, 'sep 2026', NULL, NULL, NULL, NULL),
  ('fiscal', 'tasa_valor', 6, NULL, '%', 'COPOM 16-nov-2026', 'BCU', NULL),
  ('fiscal', 'tasa_nombre', NULL, 'Tasa de Política Monetaria (TPM)', NULL, NULL, NULL, NULL),
  ('fiscal', 'reservas_valor', 18216, NULL, 'M USD', 'oct 2026', 'BCU (vía Trading Economics)', NULL),
  ('fiscal', 'expect_12m', 4.6, NULL, '%', 'oct–nov 2026', 'BCU · encuesta de expectativas (analistas)', NULL),
  ('fiscal', 'expect_24m', 4.57, NULL, '%', 'oct–nov 2026', 'BCU · encuesta de expectativas (analistas)', NULL),
  ('fiscal', 'base_monetaria', 113072, NULL, 'M $', 'may 2026', 'BCU · Emisión (sin actualizar)', NULL);

-- ── series (sparklines por módulo) ──────────────────────────────
INSERT INTO series (modulo, clave, idx, valor, periodo) VALUES
  ('actividad', 'pib', 0, 3.6, '1T25'),
  ('actividad', 'pib', 1, 2.3, '2T25'),
  ('actividad', 'pib', 2, 1.2, '3T25'),
  ('actividad', 'pib', 3, 0.1, '4T25'),
  ('actividad', 'pib', 4, 0.9, '1T26'),
  ('actividad', 'pib', 5, -0.5, '2T26'),
  ('fiscal', 'result_global', 0, -4.7, 'mar'),
  ('fiscal', 'result_global', 1, -4.6, 'abr'),
  ('fiscal', 'result_global', 2, -4.3, 'may'),
  ('fiscal', 'result_global', 3, -4.3, 'jun'),
  ('fiscal', 'result_global', 4, -4.4, 'jul'),
  ('fiscal', 'result_global', 5, -4.7, 'ago'),
  ('fiscal', 'result_global', 6, -4.7, 'sep'),
  ('agro', 'carne', 0, 5.57, NULL),
  ('agro', 'carne', 1, 5.58, NULL),
  ('agro', 'carne', 2, 6, NULL),
  ('agro', 'carne', 3, 5.78, NULL),
  ('agro', 'carne', 4, 6, NULL),
  ('agro', 'carne', 5, 6.01, NULL),
  ('agro', 'celulosa', 0, 600, NULL),
  ('agro', 'celulosa', 1, 620, NULL),
  ('agro', 'soja', 0, 11.1, NULL),
  ('agro', 'soja', 1, 12.27, NULL),
  ('agro', 'lacteos', 0, 3706, NULL),
  ('agro', 'lacteos', 1, 3605, NULL),
  ('agro', 'lacteos', 2, 3760, NULL),
  ('agro', 'lacteos', 3, 3971, NULL),
  ('agro', 'concentrado', 0, 711, NULL),
  ('agro', 'ganado', 0, 368, NULL),
  ('agro', 'arroz', 0, 383, NULL),
  ('agro', 'arroz', 1, 461, NULL),
  ('agro', 'arroz', 2, 514, NULL),
  ('agro', 'trigo', 0, 5.73, NULL),
  ('agro', 'trigo', 1, 5.84, NULL);

-- ── fuente_estado (health-check vigente) ────────────────────────
INSERT INTO fuente_estado (fuente_id, estado, latencia_ms, ultima_actualizacion, verificado_en) VALUES
  ((SELECT id FROM fuentes WHERE codigo = 'ine'), 'ok', 180, '5 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'bcu'), 'live', 150, '16 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'mef'), 'ok', 320, '30 oct', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'inac'), 'live', 90, '14 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'uruguayxxi'), 'ok', 240, '4 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'dgi'), 'ok', 300, '24 oct', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'adme'), 'ok', 60, '3 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'jpm'), 'ok', 380, '2 nov', '2026-11-17T12:00:00.000Z'),
  ((SELECT id FROM fuentes WHERE codigo = 'rating'), 'ok', 410, '11 nov', '2026-11-17T12:00:00.000Z');

-- ── noticias ────────────────────────────────────────────────────
INSERT INTO noticias (codigo, publicado_en, medio_id, categoria_id, titular, resumen, cuerpo, breaking, url) VALUES
  ('n01', '2026-11-16T22:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'Uruguay mantiene en 6% su Tasa de Política Monetaria', 'El COPOM mantuvo la TPM en 6% por unanimidad tras la suba de octubre, en línea con lo esperado por el mercado.', 'El Banco Central del Uruguay mantuvo la Tasa de Política Monetaria en 6% por unanimidad, después de la suba de 25 pb de octubre. La inflación a 12 meses llegó a 4,87% en octubre y la subyacente a 4,6%. El BCU señaló que el petróleo moderó las presiones de octubre, pero que persisten riesgos por energía y alimentos, y que en la región subieron el riesgo soberano y la volatilidad cambiaria. Las expectativas a 24 meses se ubican en 4,57% (analistas), 4,6% (operadores) y 5% (empresas).', true, 'https://www.infobae.com/america/agencias/2026/11/16/uruguay-mantiene-en-6-su-tasa-de-politica-monetaria/'),
  ('n02', '2026-11-16T16:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Internacional'), 'Orsi reivindica en Madrid a Uruguay como base de operaciones para Europa en el Mercosur', 'En el Nueva Economía Fórum el presidente presentó la inversión de Solaria y se reunió con Pedro Sánchez para tratar el acuerdo Mercosur-UE.', 'Yamandú Orsi presentó en Madrid a Uruguay como plataforma para las empresas europeas en el Mercosur. Destacó que España concentra cerca del 20% del stock de inversión extranjera directa en el país (unos US$7.500 M) y que entre mayo y septiembre Uruguay exportó US$860 M a la Unión Europea, 12% más que un año antes. Se reunió con Pedro Sánchez, con el acuerdo Mercosur-UE como tema central.', false, 'https://www.infobae.com/america/agencias/2026/11/16/orsi-reivindica-en-madrid-a-uruguay-como-base-de-operaciones-para-europa-en-el-mercosur/'),
  ('n03', '2026-11-11T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Investing.com'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'S&P reafirma la calificación BBB+ de Uruguay con perspectiva estable', 'S&P ratificó la nota soberana en moneda extranjera y local; espera un déficit del gobierno general de ~3,7% del PIB en 2026.', 'S&P Global Ratings reafirmó la calificación soberana de Uruguay en BBB+ con perspectiva estable, tanto en moneda extranjera como local. La agencia espera un déficit del gobierno general cercano a 3,7% del PIB en 2026, que bajaría gradualmente hacia 3% en 2029, y destacó la solidez institucional y el acceso al financiamiento en moneda local.', false, 'https://mx.investing.com/news/world-news/sp-reafirma-calificacion-bbb-de-uruguay-con-perspectiva-estable-3845242'),
  ('n04', '2026-11-11T11:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Shale24'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Eni y APA perforarán el primer pozo offshore de Uruguay en más de una década', 'Eni, socio de YPF, operará junto a APA el primer pozo exploratorio en aguas uruguayas desde 2016, con el equipo Noble BlackHawk.', 'Eni y APA perforarán el primer pozo exploratorio offshore de Uruguay desde 2016, con el equipo Noble BlackHawk y unos 50 días de contrato. Sería el cuarto pozo offshore del país, después de Lobo, Gaviotín y Raya X-1. Eni financia la mayor parte. En paralelo, Chevron obtuvo un año adicional en el bloque OFF-1 y QatarEnergy y Chevron se sumaron a Shell en OFF-2/OFF-7.', false, 'https://www.shale24.com/en/oil-and-gas/eni-and-apa-to-drill-uruguays-first-offshore-well-in-more-than-decade-test-for-ypfs-neighboring-block-n2026'),
  ('n05', '2026-11-10T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'Moody''s mantiene a Uruguay en Baa1 con perspectiva estable', 'Moody''s proyecta un crecimiento de 1,6% en 2026 y 1,9% en 2027; advierte por el crecimiento bajo el potencial y el deterioro fiscal.', 'Moody''s ratificó la calificación Baa1 de Uruguay con perspectiva estable. Proyecta un crecimiento de 1,6% en 2026 y 1,9% en 2027, y señaló como riesgos a la baja un crecimiento por debajo del potencial, un deterioro fiscal y una deuda por encima del tope oficial. Destacó la desdolarización de la deuda y la inversión de Solaria en centros de datos.', false, 'https://www.infobae.com/america/agencias/2026/11/10/moodys-otorga-una-nota-de-perspectiva-estable-a-la-economia-de-uruguay/'),
  ('n06', '2026-11-09T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'El Observador'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'Uruguay afianza la desdolarización de su deuda: el 92% de la emisión de bonos del año se colocó en moneda nacional', 'Entre enero y octubre se emitieron US$4.802 M en bonos, de los cuales US$4.403 M fueron en pesos y UI.', 'Entre enero y octubre de 2026 el gobierno emitió US$4.802 M en bonos: US$3.107 M en plaza local y US$1.697 M en el exterior; el 92% en moneda nacional. La emisión externa fue en julio: reapertura del Global en pesos 2035 (TIR 7,75%) y del Global en dólares 2037 (5,356%, spread de 75 pb). La deuda bruta del Gobierno Central se ubicó en 62,5% del PIB a septiembre.', false, 'https://www.elobservador.com.uy/uruguay-afianza-la-desdolarizacion-su-deuda-el-92-la-emision-bonos-el-ano-se-coloco-moneda-nacional-n6063002'),
  ('n07', '2026-11-06T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La inflación interanual en Uruguay sube al 4,87% en octubre', 'El IPC subió 0,59% en el mes: cuarto mes por encima del centro de la meta (4,5%), aunque dentro del rango 3%–6%.', 'El INE informó que el IPC subió 0,59% en octubre y 4,87% en los últimos 12 meses, frente a 4,68% en septiembre. En el año acumula 4,82%. Influyeron vestimenta (+2,97% por cambio de temporada), gasoil y hortalizas. El Informe de Política Monetaria del BCU proyecta 4,9% al cierre de 2026 y 4,1% en 2027.', false, 'https://www.infobae.com/america/agencias/2026/11/06/la-inflacion-interanual-en-uruguay-sube-al-487-en-octubre/'),
  ('n08', '2026-11-04T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'la diaria'), (SELECT id FROM categorias_noticia WHERE nombre = 'Internacional'), 'Exportaciones en octubre crecieron 1% interanual y la Unión Europea fue el principal destino', 'Según Uruguay XXI, octubre sumó US$1.089 M (+1%) y ene-oct US$11.430 M (+1%); la celulosa lideró con +37%.', 'Las exportaciones de octubre fueron US$1.089 M (+1% i/a) y las de enero-octubre US$11.430 M (+1%). La celulosa fue el principal producto, con US$229 M (21% del total, +37%); la carne bovina exportó US$210 M (−4%) y los lácteos US$118 M (+21%). La Unión Europea fue el primer destino con US$179 M, por primera vez. China no compró soja en octubre (US$87 M un año antes).', false, 'https://ladiaria.com.uy/economia/articulo/2026/11/exportaciones-en-octubre-crecieron-1-interanual-y-la-union-europea-fue-el-principal-destino/'),
  ('n09', '2026-11-03T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'El Observador'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Noviembre comenzó con nuevos récords para la ganadería', 'El novillo superó por primera vez los US$6/kg carcasa y el precio de exportación de octubre fue US$6.240/t (+25% i/a).', 'El novillo gordo promedió US$6,01/kg carcasa en la semana 44 (ACG), por primera vez por encima de US$6. El precio medio de exportación de octubre fue US$6.240/t (+25% i/a, dato preliminar del INAC). La faena de la semana del 25 al 31 de octubre fue de 47.510 vacunos, pero el acumulado de 2026 está 14,3% por debajo de 2025. China compra menos; EE.UU. y la UE compensan en parte.', false, 'https://www.elobservador.com.uy/agro/noviembre-comenzo-nuevos-records-la-ganaderia-n6063017'),
  ('n10', '2026-11-03T11:20:00.000Z', (SELECT id FROM medios WHERE nombre = 'Prensa Latina'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Uruguay mantiene el paso en el uso de fuentes renovables de energía', 'En octubre el 99,7% de la generación fue renovable, con las represas como principal fuente tras la sequía del otoño.', 'En octubre la generación eléctrica fue 99,7% renovable: hidráulica 765 GWh (58,9%), eólica 358 GWh (27,6%) y sólo 4 GWh de origen fósil. Septiembre había cerrado con 99,2% renovable y la mayor demanda de su historia para ese mes (+11% i/a, por el frío). El 28-oct se alcanzó 100% de generación renovable instantánea.', false, 'https://www.prensa-latina.cu/2026/11/03/uruguay-mantiene-el-paso-en-uso-de-fuentes-renovables-de-energia/'),
  ('n11', '2026-10-30T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'la diaria'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'El gobierno mantiene el precio de los combustibles en noviembre', 'La nafta Súper sigue en $90,45, el gasoil 50S en $62,79 y el supergás en $93,56/kg, pese a que la paridad de importación indicaba subas.', 'El MIEM anunció que los precios de los combustibles de noviembre quedan iguales a los de octubre: nafta Súper 95 $90,45/L, Premium 97 $93,01/L, gasoil 50S $62,79/L y supergás $93,56/kg. El Precio de Paridad de Importación de URSEA indicaba subas. El gobierno continúa la estrategia de amortiguación aplicada desde abril por la suba del petróleo.', false, 'https://ladiaria.com.uy/politica/articulo/2026/10/el-gobierno-mantiene-el-precio-de-los-combustibles-en-noviembre/'),
  ('n12', '2026-10-30T10:40:00.000Z', (SELECT id FROM medios WHERE nombre = 'El Telégrafo'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La caída de los ingresos y la estabilidad del gasto mantuvieron el déficit fiscal en 4,7% del PBI', 'En los 12 meses a septiembre el Sector Público Global tuvo un déficit de 4,7% del PIB sin FSS II (4,3% con él).', 'El déficit del Sector Público Global se ubicó en 4,7% del PIB en el año móvil a septiembre, sin contar los ingresos del Fideicomiso de la Seguridad Social (4,3% con ellos). El Gobierno Central-BPS registró −4,1% sin FSS II. La caída de los ingresos y un gasto estable explican que el déficit no baje; la meta del MEF para el GC-BPS en 2026 es −4,1%.', false, 'https://www.eltelegrafo.com/2026/10/la-caida-de-los-ingresos-y-la-estabilidad-del-gasto-mantuvieron-el-deficit-fiscal-en-47-del-pbi/'),
  ('n13', '2026-10-28T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Montevideo Portal'), (SELECT id FROM categorias_noticia WHERE nombre = 'Político'), 'Encuesta Factum: la aprobación de Orsi es de 26% y la desaprobación de 52%', 'La aprobación se mantiene y la desaprobación baja de 55% a 52%; Factum habla de estabilización tras meses de caída.', 'La medición del quinto bimestre de Factum ubicó la aprobación del presidente Yamandú Orsi en 26% y la desaprobación en 52% (desde 55%); el 22% ni aprueba ni desaprueba. En el primer bimestre la aprobación era 37% y la desaprobación 41%. Cifra, con campo entre el 30-sep y el 12-oct, dio 24% de aprobación y 57% de desaprobación.', false, 'https://www.montevideo.com.uy/Noticias/Encuesta-Factum-aprobacion-de-Orsi-es-de-26-y-desaprobacion-de-52--uc980247'),
  ('n14', '2026-10-24T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Ámbito'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'La recaudación cayó un 2,9% en setiembre, arrastrada por el retroceso del IVA', 'La recaudación bruta de la DGI cayó 2,9% real por menor IVA (−5,2%) e IRAE (−3,0%); el acumulado del año sigue +1,2% real.', 'La DGI recaudó $62.881 M brutos en septiembre: +1,7% nominal y −2,9% real interanual. El IVA cayó 5,2% real y el IRAE 3,0%, mientras el IRPF subió 1,7%. En enero-septiembre la recaudación suma $548.575 M, +1,2% real; en 12 meses, +0,2%. La debilidad del consumo gravado presiona sobre la meta fiscal.', false, 'https://www.ambito.com/uruguay/la-recaudacion-cayo-un-29-setiembre-arrastrada-el-retroceso-del-iva-n6337381'),
  ('n15', '2026-10-24T11:20:00.000Z', (SELECT id FROM medios WHERE nombre = 'EFE'), (SELECT id FROM categorias_noticia WHERE nombre = 'Social'), 'Uruguay mantiene el desempleo en el 7,1% en septiembre y la informalidad bajó en un año', 'El desempleo fue 7,1% (agosto 7,2%); empleo 59,6% y actividad 64,1%. La informalidad cayó a 21%.', 'Según la ECH del INE, el desempleo fue 7,1% en septiembre, similar al de agosto (7,2%) y al de septiembre de 2025. La tasa de empleo fue 59,6% y la de actividad 64,1%. El desempleo de las mujeres fue 8,6% y el de los hombres 5,8%; entre jóvenes de 14 a 24 años, 21,6%. La informalidad bajó a 21% (−1,3 pp i/a).', false, 'https://noticiassin.com/economia/2026/10/24/uruguay-mantiene-el-desempleo-en-el-71-en-septiembre-y-la-informalidad-bajo-en-un-ano-2152950'),
  ('n16', '2026-10-15T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Sectorial'), 'Uruguay anunció una inversión de US$5.700 millones para instalar centros de datos', 'Solaria firmó un memorando para un parque de centros de datos de 500 MW con 350 MW solares: la mayor inversión de la historia del país, según el gobierno.', 'La española Solaria firmó un memorando de entendimiento con el gobierno para instalar un parque de centros de datos de 500 MW con 350 MW de generación solar, entre Canelones, San José y Florida, bajo régimen de zona franca. La inversión prevista es de US$5.700 M. La ministra de Industria, Fernanda Cardona, habló de 1.500 empleos permanentes.', false, 'https://www.infobae.com/america/america-latina/2026/10/15/uruguay-anuncio-una-inversion-de-usd-5700-millones-para-instalar-centros-de-datos-cinco-claves-del-proyecto/'),
  ('n17', '2026-10-08T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'Bloomberg Línea'), (SELECT id FROM categorias_noticia WHERE nombre = 'Económico'), 'Uruguay sube su tasa de interés al 6% tras dos meses de inflación sobre el objetivo', 'El COPOM subió 25 pb por unanimidad, la primera suba desde abril de 2025, en una decisión que sorprendió al consenso.', 'El Banco Central del Uruguay subió la Tasa de Política Monetaria de 5,75% a 6% el 8 de octubre, por unanimidad, cortando una pausa de cuatro reuniones. Fue una suba preventiva: la inflación llevaba dos meses sobre el centro de la meta, presionada por bienes importados, frutas, verduras y combustibles, y el BCU buscó evitar que se trasladara a las expectativas.', false, 'https://www.bloomberglinea.com/latinoamerica/uruguay/uruguay-sube-su-tasa-de-interes-al-6-tras-dos-meses-de-inflacion-sobre-el-objetivo/'),
  ('n18', '2026-10-08T10:20:00.000Z', (SELECT id FROM medios WHERE nombre = 'Infobae'), (SELECT id FROM categorias_noticia WHERE nombre = 'Social'), 'La pobreza cayó casi 3 puntos en Uruguay: 95.000 personas salieron de esa condición en 2026', 'El INE ubicó la pobreza en 14,8% de las personas en el primer semestre, frente a 17,7% un año antes: mínimo de la serie.', 'La pobreza alcanzó al 14,8% de las personas en el primer semestre de 2026 (17,7% un año antes) y al 11,6% de los hogares; la indigencia bajó a 1,2%. Unas 95.000 personas salieron de la pobreza. Según Presidencia, en base al INE, la pobreza en menores de 6 años bajó de 32,4% a 24,9%.', false, 'https://www.infobae.com/america/america-latina/2026/10/08/la-pobreza-cayo-casi-3-puntos-en-uruguay-95000-personas-salieron-de-esa-condicion-durante-el-2026/'),
  ('n19', '2026-09-24T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'FMI'), (SELECT id FROM categorias_noticia WHERE nombre = 'Internacional'), 'FMI concluye la misión del Artículo IV 2026: crecimiento de 1,3% este año y 2,4% en 2027', 'El staff del FMI recortó su proyección de crecimiento 2026 (desde 1,8%) y prevé un déficit del GC-BPS de 4,1% del PIB.', 'La misión del FMI, encabezada por Raphael Espinoza (14 al 24 de septiembre), proyectó un crecimiento de 1,3% en 2026 —desde 1,8% en abril— y 2,4% en 2027, con inflación de 4,5%. Estimó un déficit del Gobierno Central-BPS de 4,1% del PIB en 2026 sin ingresos extraordinarios de pensiones, similar a 2025.', false, 'https://www.imf.org/es/news/articles/2026/09/24/cs-092426-uruguay-staff-concluding-statement-2026-aiv-mission'),
  ('n20', '2026-09-22T12:00:00.000Z', (SELECT id FROM medios WHERE nombre = 'la diaria'), (SELECT id FROM categorias_noticia WHERE nombre = 'Político'), 'La Cámara de Senadores dio sanción definitiva a la Rendición de Cuentas con los votos del FA', 'El Senado aprobó sin cambios la primera Rendición de Cuentas de Orsi, sin impacto fiscal y con reasignaciones hacia infancia y seguridad.', 'El Senado dio sanción definitiva el 22 de septiembre a la Rendición de Cuentas, sin modificaciones respecto a lo votado por Diputados (50 a 49 en agosto) y sólo con votos del Frente Amplio. El proyecto, de 312 artículos, no tiene impacto fiscal: reasigna recursos hacia infancia, educación, seguridad y situación de calle desde el 1-ene-2027. El MEF proyecta un déficit GC-BPS de 4,1% en 2026 que baja a 2,5% en 2030.', false, 'https://ladiaria.com.uy/politica/articulo/2026/9/la-camara-de-senadores-dio-sancion-definitiva-a-la-rendicion-de-cuentas-con-los-votos-del-fa/');

-- ── noticia_terminos (M:N) ──────────────────────────────────────
INSERT INTO noticia_terminos (noticia_id, termino_id) VALUES
  ((SELECT id FROM noticias WHERE codigo = 'n01'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n01'), (SELECT id FROM terminos WHERE termino = 'TPM')),
  ((SELECT id FROM noticias WHERE codigo = 'n01'), (SELECT id FROM terminos WHERE termino = 'Inflación')),
  ((SELECT id FROM noticias WHERE codigo = 'n01'), (SELECT id FROM terminos WHERE termino = 'COPOM')),
  ((SELECT id FROM noticias WHERE codigo = 'n02'), (SELECT id FROM terminos WHERE termino = 'Orsi')),
  ((SELECT id FROM noticias WHERE codigo = 'n02'), (SELECT id FROM terminos WHERE termino = 'España')),
  ((SELECT id FROM noticias WHERE codigo = 'n02'), (SELECT id FROM terminos WHERE termino = 'Mercosur-UE')),
  ((SELECT id FROM noticias WHERE codigo = 'n02'), (SELECT id FROM terminos WHERE termino = 'Inversión')),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), (SELECT id FROM terminos WHERE termino = 'S&P')),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), (SELECT id FROM terminos WHERE termino = 'Calificación')),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), (SELECT id FROM terminos WHERE termino = 'Grado inversor')),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), (SELECT id FROM terminos WHERE termino = 'Déficit')),
  ((SELECT id FROM noticias WHERE codigo = 'n04'), (SELECT id FROM terminos WHERE termino = 'ANCAP')),
  ((SELECT id FROM noticias WHERE codigo = 'n04'), (SELECT id FROM terminos WHERE termino = 'Offshore')),
  ((SELECT id FROM noticias WHERE codigo = 'n04'), (SELECT id FROM terminos WHERE termino = 'Eni')),
  ((SELECT id FROM noticias WHERE codigo = 'n04'), (SELECT id FROM terminos WHERE termino = 'Petróleo')),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), (SELECT id FROM terminos WHERE termino = 'Moody''s')),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), (SELECT id FROM terminos WHERE termino = 'Baa1')),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), (SELECT id FROM terminos WHERE termino = 'Crecimiento')),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), (SELECT id FROM terminos WHERE termino = 'Deuda')),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), (SELECT id FROM terminos WHERE termino = 'Deuda')),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), (SELECT id FROM terminos WHERE termino = 'Desdolarización')),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), (SELECT id FROM terminos WHERE termino = 'Bonos')),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), (SELECT id FROM terminos WHERE termino = 'MEF')),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), (SELECT id FROM terminos WHERE termino = 'IPC')),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), (SELECT id FROM terminos WHERE termino = 'Inflación')),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), (SELECT id FROM terminos WHERE termino = 'INE')),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), (SELECT id FROM terminos WHERE termino = 'Exportaciones')),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), (SELECT id FROM terminos WHERE termino = 'Uruguay XXI')),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), (SELECT id FROM terminos WHERE termino = 'Celulosa')),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), (SELECT id FROM terminos WHERE termino = 'UE')),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), (SELECT id FROM terminos WHERE termino = 'Carne')),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), (SELECT id FROM terminos WHERE termino = 'Novillo')),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), (SELECT id FROM terminos WHERE termino = 'INAC')),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), (SELECT id FROM terminos WHERE termino = 'China')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Energía')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Renovables')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'UTE')),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), (SELECT id FROM terminos WHERE termino = 'Hidráulica')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'Combustibles')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'ANCAP')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'MIEM')),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), (SELECT id FROM terminos WHERE termino = 'URSEA')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'Déficit fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'MEF')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'FSS')),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), (SELECT id FROM terminos WHERE termino = 'Regla fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Orsi')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Encuestas')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Factum')),
  ((SELECT id FROM noticias WHERE codigo = 'n13'), (SELECT id FROM terminos WHERE termino = 'Aprobación')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'DGI')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Recaudación')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'IVA')),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), (SELECT id FROM terminos WHERE termino = 'Consumo')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Desempleo')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'ECH')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'INE')),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), (SELECT id FROM terminos WHERE termino = 'Informalidad')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Solaria')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Data centers')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Inversión')),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), (SELECT id FROM terminos WHERE termino = 'Solar')),
  ((SELECT id FROM noticias WHERE codigo = 'n17'), (SELECT id FROM terminos WHERE termino = 'BCU')),
  ((SELECT id FROM noticias WHERE codigo = 'n17'), (SELECT id FROM terminos WHERE termino = 'TPM')),
  ((SELECT id FROM noticias WHERE codigo = 'n17'), (SELECT id FROM terminos WHERE termino = 'Suba de tasas')),
  ((SELECT id FROM noticias WHERE codigo = 'n17'), (SELECT id FROM terminos WHERE termino = 'Inflación')),
  ((SELECT id FROM noticias WHERE codigo = 'n18'), (SELECT id FROM terminos WHERE termino = 'Pobreza')),
  ((SELECT id FROM noticias WHERE codigo = 'n18'), (SELECT id FROM terminos WHERE termino = 'INE')),
  ((SELECT id FROM noticias WHERE codigo = 'n18'), (SELECT id FROM terminos WHERE termino = 'Infancia')),
  ((SELECT id FROM noticias WHERE codigo = 'n18'), (SELECT id FROM terminos WHERE termino = 'Ingresos')),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), (SELECT id FROM terminos WHERE termino = 'FMI')),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), (SELECT id FROM terminos WHERE termino = 'Artículo IV')),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), (SELECT id FROM terminos WHERE termino = 'PIB')),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), (SELECT id FROM terminos WHERE termino = 'Fiscal')),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), (SELECT id FROM terminos WHERE termino = 'Rendición de Cuentas')),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), (SELECT id FROM terminos WHERE termino = 'Senado')),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), (SELECT id FROM terminos WHERE termino = 'Frente Amplio')),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), (SELECT id FROM terminos WHERE termino = 'Fiscal'));

-- ── noticia_vinculos ("vinculado a") ────────────────────────────
INSERT INTO noticia_vinculos (noticia_id, tipo, etiqueta) VALUES
  ((SELECT id FROM noticias WHERE codigo = 'n01'), 'otro', 'TPM · BCU'),
  ((SELECT id FROM noticias WHERE codigo = 'n01'), 'otro', 'IPC interanual'),
  ((SELECT id FROM noticias WHERE codigo = 'n01'), 'otro', 'Expect. infl. 24m'),
  ((SELECT id FROM noticias WHERE codigo = 'n02'), 'otro', 'Externo & comercio'),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), 'otro', 'Mercados · ratings'),
  ((SELECT id FROM noticias WHERE codigo = 'n03'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n04'), 'otro', 'Energía'),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), 'otro', 'Mercados · ratings'),
  ((SELECT id FROM noticias WHERE codigo = 'n05'), 'otro', 'Deuda bruta'),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), 'otro', 'Deuda bruta'),
  ((SELECT id FROM noticias WHERE codigo = 'n06'), 'otro', 'Mercados'),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), 'otro', 'IPC interanual'),
  ((SELECT id FROM noticias WHERE codigo = 'n07'), 'otro', 'IPC mensual'),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), 'otro', 'Exportaciones'),
  ((SELECT id FROM noticias WHERE codigo = 'n08'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), 'otro', 'Novillo gordo'),
  ((SELECT id FROM noticias WHERE codigo = 'n09'), 'otro', 'Agroexportador'),
  ((SELECT id FROM noticias WHERE codigo = 'n10'), 'otro', 'Energía'),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), 'otro', 'Energía'),
  ((SELECT id FROM noticias WHERE codigo = 'n11'), 'otro', 'IPC mensual'),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n12'), 'otro', 'Fiscal · regla fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n14'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n15'), 'otro', 'Desempleo'),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), 'otro', 'Energía'),
  ((SELECT id FROM noticias WHERE codigo = 'n16'), 'otro', 'Externo & comercio'),
  ((SELECT id FROM noticias WHERE codigo = 'n17'), 'otro', 'TPM · BCU'),
  ((SELECT id FROM noticias WHERE codigo = 'n18'), 'otro', 'Pobreza'),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), 'otro', 'PIB · actividad'),
  ((SELECT id FROM noticias WHERE codigo = 'n19'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), 'otro', 'Result. fiscal'),
  ((SELECT id FROM noticias WHERE codigo = 'n20'), 'otro', 'Fiscal · regla fiscal');

-- ── eventos (calendario 30 días) ────────────────────────────────
INSERT INTO eventos (fecha, categoria_id, titulo, tono) VALUES
  ('2026-11-24', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'Minuta del COPOM (decisión del 16-nov)', 'info'),
  ('2026-11-27', (SELECT id FROM categorias_evento WHERE nombre = 'MIEM'), 'Precios de combustibles de diciembre (estim.)', 'neutral'),
  ('2026-11-30', (SELECT id FROM categorias_evento WHERE nombre = 'INE'), 'Mercado laboral ECH · octubre y salario real', 'info'),
  ('2026-11-30', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'IMAE · actividad de septiembre (estim.)', 'info'),
  ('2026-11-30', (SELECT id FROM categorias_evento WHERE nombre = 'MEF'), 'Resultado fiscal a octubre (estim.)', 'accent'),
  ('2026-12-03', (SELECT id FROM categorias_evento WHERE nombre = 'INE'), 'IPC noviembre · inflación', 'accent'),
  ('2026-12-04', (SELECT id FROM categorias_evento WHERE nombre = 'Mercosur'), 'Cumbre en Montevideo y 1er Consejo del acuerdo con la UE', 'accent'),
  ('2026-12-04', (SELECT id FROM categorias_evento WHERE nombre = 'Uruguay XXI'), 'Exportaciones de noviembre (estim.)', 'info'),
  ('2026-12-09', (SELECT id FROM categorias_evento WHERE nombre = 'Fed'), 'Decisión del FOMC (EE.UU.)', 'neutral'),
  ('2026-12-14', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'Encuesta de expectativas · diciembre (estim.)', 'info'),
  ('2026-12-15', (SELECT id FROM categorias_evento WHERE nombre = 'BCU'), 'PIB 3T 2026 · Cuentas Nacionales', 'accent');

-- ── analisis (capa analítica vigente) ───────────────────────────
INSERT INTO analisis (clave, asof, contenido) VALUES
  ('vigente', '17-nov-2026', '{"asof":"17-nov-2026","tesis":{"titulo":"La economía se frenó, la inflación subió y el fiscal no tiene margen","bajada":"Shock agrícola por la sequía (PIB 2T −0,5%), inflación sobre el centro de la meta (4,87%) y déficit de 4,7% del PIB; el ancla es institucional: grado inversor ratificado y expectativas cerca de 4,5%.","puntos":["El freno es agrícola y transitorio: sin el agro, la economía crece ~1,3%.","El BCU subió a 6% y las expectativas siguen ancladas en ~4,6%.","El déficit no baja porque caen los ingresos, no por más gasto.","La carne en récord y la UE compensan el repliegue de China.","Empleo firme y pobreza en mínimo; el salario real se desacelera.","Grado inversor ratificado: el riesgo es fiscal, no de liquidez."]},"semaforo":[{"id":"precios","dimension":"Precios","estado":"neutral","score":3,"tendencia":"empeora","ancla":"IPC 4,87% i/a (oct)","lectura":"Dentro del rango 3–6% pero cuatro meses sobre el centro; presión de combustibles, frescos y vestimenta. El IPOM ve un pico transitorio hasta el 1T-27."},{"id":"monetaria","dimension":"Credibilidad monetaria","estado":"pos","score":4,"tendencia":"estable","ancla":"TPM 6,00% · exp. 24m 4,57%","lectura":"La suba preventiva de octubre reforzó el ancla: expectativas de analistas y mercado cerca de 4,5%; las de empresas (~5%) son la señal a vigilar."},{"id":"actividad","dimension":"Actividad","estado":"neg","score":2,"tendencia":"empeora","ancla":"PIB 2T −0,5% i/a · IMAE ago −1,1% m/m","lectura":"Contracción concentrada en el agro (−22%); el resto de la economía crece poco. Riesgo de que el 3T también sea débil."},{"id":"empleo","dimension":"Empleo e ingresos","estado":"pos","score":4,"tendencia":"estable","ancla":"Desempleo 7,1% · pobreza 14,8%","lectura":"Desempleo estable e informalidad a la baja; pobreza en mínimo de la serie. El salario real se desacelera y es el eslabón más expuesto a la inflación."},{"id":"fiscal","dimension":"Fiscal","estado":"neg","score":2,"tendencia":"empeora","ancla":"SPG −4,7% PIB · DGI −2,9% real","lectura":"El déficit volvió a 4,7% por caída de ingresos. Con bajo crecimiento, la consolidación prevista (GC-BPS −2,5% en 2030) luce exigente."},{"id":"externo","dimension":"Sector externo","estado":"neutral","score":3,"tendencia":"estable","ancla":"Export. +1% ene-oct · CC −0,8% PIB","lectura":"Sin desequilibrio externo: la cuenta corriente es chica y el precio compensa el volumen. El atraso cambiario sigue restando competitividad."},{"id":"credito","dimension":"Crédito soberano","estado":"pos","score":5,"tendencia":"estable","ancla":"BBB+ / Baa1 ratificados (nov)","lectura":"Grado inversor con 4 agencias, emisiones con sobredemanda y 92% de los bonos del año en pesos: el principal activo del país."},{"id":"agro","dimension":"Agro","estado":"neutral","score":3,"tendencia":"mejora","ancla":"Novillo US$6,01 · soja −37%","lectura":"Precios récord en carne y repunte de lácteos/celulosa frente a volúmenes golpeados. La zafra de invierno y la soja 26/27 (~3,1 Mt) apuntan a recuperación."}],"proyecciones":[{"fuente":"MEF · Rendición de Cuentas","fecha":"jun 2026","pib2026":1.6,"pib2027":2.1,"ipc2026":null,"ipc2027":null,"tc2026":null,"fiscal2026":-4.7},{"fuente":"BCU · IPOM 3T","fecha":"oct 2026","pib2026":1,"pib2027":2.5,"ipc2026":4.9,"ipc2027":4.1,"tc2026":null,"fiscal2026":null},{"fuente":"BCU · encuesta de analistas","fecha":"nov 2026","pib2026":1,"pib2027":1.7,"ipc2026":5.1,"ipc2027":null,"tc2026":40.5,"fiscal2026":null},{"fuente":"FMI · Artículo IV","fecha":"sep 2026","pib2026":1.3,"pib2027":2.4,"ipc2026":4.5,"ipc2027":null,"tc2026":null,"fiscal2026":-4.1},{"fuente":"Moody''s","fecha":"nov 2026","pib2026":1.6,"pib2027":1.9,"ipc2026":null,"ipc2027":null,"tc2026":null,"fiscal2026":null},{"fuente":"S&P Global","fecha":"nov 2026","pib2026":null,"pib2027":null,"ipc2026":null,"ipc2027":null,"tc2026":null,"fiscal2026":-3.7},{"fuente":"CEPAL · Estudio Económico","fecha":"ago 2026","pib2026":1.5,"pib2027":null,"ipc2026":null,"ipc2027":null,"tc2026":null,"fiscal2026":null},{"fuente":"BBVA Research","fecha":"2026","pib2026":1.3,"pib2027":1.8,"ipc2026":null,"ipc2027":null,"tc2026":null,"fiscal2026":null}],"escenarios":[{"id":"base","nombre":"Recuperación gradual","probabilidad":55,"pib2027":1.9,"ipc2027":4.4,"narrativa":"Cosecha normal y consumo sostienen la recuperación; la inflación vuelve a la meta a mediados de 2027.","gatillos":["PIB 3T (15-dic) sin nueva caída t/t","IPC i/a cede hacia 4,5% en el 1T-27","Recaudación vuelve a terreno real positivo"]},{"id":"optimista","nombre":"Rebote con apertura","probabilidad":20,"pib2027":2.6,"ipc2027":4,"narrativa":"Zafra récord, pleno aprovechamiento del acuerdo con la UE e inversiones grandes cierran el déficit sin ajuste.","gatillos":["Reparto de las cuotas UE dentro del Mercosur","Novillo y celulosa sostienen máximos","Ejecución del proyecto Solaria/HIF"]},{"id":"riesgo","nombre":"Estanflación leve","probabilidad":25,"pib2027":0.8,"ipc2027":5.4,"narrativa":"Petróleo y dólar fuertes dejan la inflación en 5–5,5%, el BCU sube más y el déficit no baja.","gatillos":["IPC i/a supera 5,5%","Expectativas empresariales > 5,5%","Déficit SPG > 5% del PIB"]}],"riesgos":[{"titulo":"Desvío de la meta fiscal","detalle":"Con PIB ~1% y IVA en caída, el resultado estructural 2026 podría desviarse ~0,5% del PIB de la meta (−4,0%), como advirtió el CFA. Es el principal riesgo para el rating.","tipo":"riesgo","impacto":"alto","horizonte":"2026-27"},{"titulo":"Inflación importada (petróleo, dólar global)","detalle":"Los combustibles se congelaron en noviembre pese a que la paridad indicaba subas: hay un ajuste pendiente que puede trasladarse al IPC y a expectativas.","tipo":"riesgo","impacto":"medio","horizonte":"3-6 meses"},{"titulo":"Repliegue de China","detalle":"China no compró soja en octubre y usa ~31% de su cuota cárnica; una menor demanda china presiona precios y obliga a redirigir volúmenes.","tipo":"riesgo","impacto":"medio","horizonte":"2027"},{"titulo":"Volatilidad regional","detalle":"El BCU señaló suba del riesgo soberano y volatilidad cambiaria en la región; un abaratamiento de Argentina golpearía turismo y comercio de frontera en la temporada.","tipo":"riesgo","impacto":"medio","horizonte":"temporada 26-27"},{"titulo":"Atraso cambiario persistente","detalle":"Dólar estable (~$40,6) con inflación local sobre la de EE.UU.: la desalineación del TCR (−9,9% a 2025) sigue erosionando a exportadores no-commodity.","tipo":"riesgo","impacto":"bajo","horizonte":"estructural"},{"titulo":"Recuperación de la cosecha","detalle":"Soja 2026/27 con ~1,3 M ha y 3,1 Mt proyectadas (USDA) más la zafra de invierno: el agro pasaría de restar a sumar al PIB en 2027.","tipo":"oportunidad","impacto":"alto","horizonte":"2027"},{"titulo":"Acuerdo Mercosur-UE","detalle":"Rige en forma provisional desde el 1-may-2026 y la UE ya es el primer destino mensual; falta repartir las cuotas (carne, arroz, lácteos) dentro del Mercosur. El primer Consejo del Acuerdo se reúne en la cumbre de Montevideo (4-dic).","tipo":"oportunidad","impacto":"alto","horizonte":"2027"},{"titulo":"Ola de inversión verde y digital","detalle":"Solaria (US$5.700 M, 500 MW de data centers) y HIF (US$5.385 M) sostendrían inversión y empleo, apoyados en una matriz ~99% renovable.","tipo":"oportunidad","impacto":"medio","horizonte":"2027-29"},{"titulo":"Desdolarización de la deuda","detalle":"El 92% de los bonos de 2026 se colocó en moneda nacional: menor riesgo cambiario del stock y mayor potencia de la política monetaria.","tipo":"oportunidad","impacto":"medio","horizonte":"estructural"}],"lecturas":{"agro":"Precio récord, volumen en caída: el golpe es climático, no de demanda, y con una cosecha normal el agro vuelve a sumar en 2027.","mercados":"El crédito es el ancla del país: ratings ratificados, emisiones con sobredemanda y 92% de la deuda nueva en pesos.","actividad":"El agro restó 1,7 pp al PIB; el resto de la economía crece ~1,3%, por debajo de su potencial (1,9%).","energia":"Aun con sequía la matriz fue ~99% renovable; el costo se vio en junio, con importación y precio spot récord.","externo":"Sin restricción externa (cuenta corriente −0,8% del PIB); el cambio es de destinos: la UE gana y China se repliega.","fiscal":"El déficit se atascó en 4,7% por ingresos débiles; la suba de tasa fue preventiva y las expectativas siguen ancladas."},"kpiLecturas":{"ipc_interanual":"Pico transitorio esperado: el IPOM proyecta 4,9% al cierre de 2026 y 4,1% en 2027. Lo que importa es que no contamine expectativas.","pib":"Shock agrícola (sequía). Sin el agro, el PIB habría crecido; la recuperación depende de la cosecha 2026/27.","tpm":"Tasa real ex-ante ~1,4 pp: postura moderadamente contractiva. El mercado no descuenta nuevas subas inmediatas.","ipc_mensual":"Dos meses seguidos sobre 0,5% m/m; el congelamiento de combustibles en noviembre contiene el dato de corto plazo.","expectativas_inflacion":"El ancla aguanta: 24m en 4,57% pese al IPC en 4,87%. Las expectativas de empresas (~5%) son el eslabón débil.","tipo_cambio":"Estabilidad notable sin intervención: el peso se sostiene por flujos de inversión y deuda en pesos.","reservas":"Cobertura holgada; la variación mensual responde a movimientos del Tesoro y encajes más que a presión cambiaria.","desempleo":"Mercado laboral resistente al shock agrícola; la informalidad en baja es una mejora de calidad del empleo.","salario_real":"La desaceleración es mecánica: salarios nominales ~6% contra inflación que sube; riesgo para el consumo de 2027.","pobreza":"Mínimo histórico apoyado en el empleo y las transferencias; la Rendición focaliza recursos en primera infancia.","novillo":"Precio de escasez: falta ganado (faena −14%). Bueno para el productor, presión de costos para la industria frigorífica.","exportaciones":"Valor plano, volumen en caída: el precio hace el trabajo. Cambio de mix hacia celulosa y destinos UE/EE.UU.","resultado_fiscal":"Atascado en 4,7% por ingresos débiles. Con PIB de 1% la meta estructural de −4,0% está en riesgo.","deuda":"Nivel alto pero de mejor calidad: más en pesos y a mayor plazo. El ancla de deuda neta (65%) es el límite a vigilar.","embi":"Subió 26 pb desde junio con el riesgo regional, pero Uruguay sigue siendo el menor spread de la región."}}'::jsonb);

COMMIT;
