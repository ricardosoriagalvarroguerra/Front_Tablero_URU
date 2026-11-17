import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeContext } from './theme';
import { Header, formatNow } from './components/Header';
import { Tabs } from './components/Tabs';
import type { TabDef } from './components/Tabs';
import { KpiCard } from './components/modules/KpiCard';
import { FeaturedKpiCard } from './components/modules/FeaturedKpiCard';
import { KpiGroup } from './components/modules/KpiGroup';
import { FEATURED, FEATURED_BAND, GROUPS } from './kpiLayout';
import { AgroResumen } from './components/modules/AgroResumen';
import { AgroPanel } from './components/modules/AgroPanel';
import { MercadosPanel } from './components/modules/MercadosPanel';
import { BonosPanel } from './components/modules/BonosPanel';
import { ActividadPanel } from './components/modules/ActividadPanel';
import { DepartamentosPanel } from './components/modules/DepartamentosPanel';
import { EnergiaPanel } from './components/modules/EnergiaPanel';
import { ExternoPanel } from './components/modules/ExternoPanel';
import { CommoditiesPanel } from './components/modules/CommoditiesPanel';
import { FiscalPanel } from './components/modules/FiscalPanel';
import { MonetarioPanel } from './components/modules/MonetarioPanel';
import { NewsPanel } from './components/modules/NewsPanel';
import { CalendarioPanel } from './components/modules/CalendarioPanel';
import { HealthFooter } from './components/modules/HealthFooter';
import { HistoricoPanel } from './components/modules/HistoricoPanel';
import { KpiModal } from './components/overlays/KpiModal';
import { NewsModal } from './components/overlays/NewsModal';
import { useDashboardData } from './useDashboardData';
import { TesisPanel } from './components/analisis/TesisPanel';
import { SemaforoPanel } from './components/analisis/SemaforoPanel';
import { DerivadosPanel } from './components/analisis/DerivadosPanel';
import { ProyeccionesPanel } from './components/analisis/ProyeccionesPanel';
import { EscenariosPanel } from './components/analisis/EscenariosPanel';
import { RiesgosPanel } from './components/analisis/RiesgosPanel';
import { Insight } from './components/primitives/Insight';
import { derivados } from './analytics';
import { SNAPSHOT } from './data/mockData';
import { api } from './api';
import type { Kpi, Noticia, Theme } from './types';

type TabId = 'panorama' | 'analisis' | 'historico' | 'agro' | 'mercados' | 'actividad' | 'energia' | 'externo' | 'fiscal';
const TAB_ORDER: TabId[] = ['panorama', 'analisis', 'historico', 'agro', 'mercados', 'actividad', 'energia', 'externo', 'fiscal'];

export default function App() {
  const { indicadores, agro, mercados, actividad, energia, externo, fiscal, noticias, eventos, fuentes, analisis, source, reload } =
    useDashboardData();

  const [theme, setTheme] = useState<Theme>('dark');
  const [now, setNow] = useState<Date>(() => new Date());
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<TabId>('panorama');
  const [openKpi, setOpenKpi] = useState<Kpi | null>(null);
  const [openNews, setOpenNews] = useState<Noticia | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [leidas, setLeidas] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('uru_leidas') ?? '[]'));
    } catch {
      return new Set();
    }
  });
  const searchRef = useRef<HTMLInputElement>(null);

  function marcarLeida(id: string) {
    setLeidas((prev) => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem('uru_leidas', JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
    setOpenNews(null);
  }

  useEffect(() => {
    const el = document.documentElement;
    if (theme === 'dark') el.classList.add('dark');
    else el.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        if (e.key === 'Escape') (target as HTMLInputElement).blur();
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key.toLowerCase() === 'd') {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      } else if (e.key.toLowerCase() === 'r') {
        triggerRefresh();
      } else if (/^[1-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setTab(TAB_ORDER[Number(e.key) - 1]);
        window.scrollTo({ top: 0 });
      } else if (e.key === 'Escape') {
        setOpenKpi(null);
        setOpenNews(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function triggerRefresh() {
    setRefreshing(true);
    reload();
    setTimeout(() => setRefreshing(false), 700);
  }

  async function openNoticia(n: Noticia) {
    if (n.body != null) {
      setOpenNews(n);
      return;
    }
    try {
      setOpenNews(await api.noticia(n.id));
    } catch {
      setOpenNews(n);
    }
  }

  const kpiFiltered = useMemo(() => {
    if (!query.trim()) return indicadores;
    const q = query.toLowerCase();
    return indicadores.filter(
      (k) => k.label.toLowerCase().includes(q) || (k.source ?? '').toLowerCase().includes(q),
    );
  }, [query, indicadores]);

  const byId = useMemo(
    () => Object.fromEntries(indicadores.map((k) => [k.id, k])) as Record<string, Kpi>,
    [indicadores],
  );
  const featuredKpis = FEATURED.map((id) => byId[id]).filter(Boolean);
  const grouped = new Set([...FEATURED, ...GROUPS.flatMap((g) => g.ids)]);
  const leftover = indicadores.filter((k) => !grouped.has(k.id));
  const groups = leftover.length
    ? [...GROUPS, { title: 'Otros', ids: leftover.map((k) => k.id) }]
    : GROUPS;
  const searching = query.trim().length > 0;
  const derived = useMemo(() => derivados(indicadores, fiscal), [indicadores, fiscal]);
  const snapshotDate = useMemo(() => new Date(`${SNAPSHOT.iso}T12:00:00Z`), []);
  const lectura = (k: string) => analisis.lecturas[k];

  const tabs: TabDef[] = [
    { id: 'panorama', label: 'Panorama' },
    { id: 'analisis', label: 'Análisis' },
    { id: 'historico', label: 'Histórico' },
    { id: 'agro', label: 'Agro' },
    { id: 'mercados', label: 'Mercados' },
    { id: 'actividad', label: 'Actividad' },
    { id: 'energia', label: 'Energía' },
    { id: 'externo', label: 'Externo' },
    { id: 'fiscal', label: 'Fiscal y monetario' },
  ];

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen flex flex-col">
        <Header
          theme={theme}
          setTheme={setTheme}
          refreshing={refreshing}
          onRefresh={triggerRefresh}
          searchRef={searchRef}
          query={query}
          setQuery={setQuery}
          now={now}
          snapshot={SNAPSHOT.fecha}
          source={source}
        />

        {/* KPI strip — siempre visible */}
        <section className="px-4 sm:px-6 pt-6 pb-4">
          {searching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
              {kpiFiltered.map((k) => (
                <KpiCard key={k.id} k={k} onClick={setOpenKpi} />
              ))}
              {kpiFiltered.length === 0 && (
                <div className="col-span-full card p-6 text-center mono text-[11px] text-muted uppercase tracking-wider">
                  Sin coincidencias para «{query}»
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-3 grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                {featuredKpis.map((k) => (
                  <FeaturedKpiCard key={k.id} k={k} onClick={setOpenKpi} band={FEATURED_BAND[k.id]} />
                ))}
              </div>
              <div className="lg:col-span-7 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {groups.map((g) => (
                  <KpiGroup
                    key={g.title}
                    title={g.title}
                    items={g.ids.map((id) => byId[id]).filter(Boolean)}
                    onOpen={setOpenKpi}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Pestañas */}
        <Tabs tabs={tabs} active={tab} onChange={(id) => setTab(id as TabId)} />

        {/* Contenido de la pestaña activa */}
        <main key={tab} className="flex-1 px-4 sm:px-6 pt-6 pb-10">
          {tab === 'panorama' && (
            <section className="grid gap-4 grid-cols-12">
              <div className="col-span-12">
                <TesisPanel data={analisis} onVerAnalisis={() => setTab('analisis')} />
              </div>
              <div className="col-span-12">
                <SemaforoPanel items={analisis.semaforo} />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <AgroResumen data={agro} onVerDetalle={() => setTab('agro')} />
              </div>
              <div className="col-span-12 lg:col-span-7 h-[560px]">
                <NewsPanel noticias={noticias} onSelect={openNoticia} leidas={leidas} />
              </div>
              <div className="col-span-12">
                <CalendarioPanel eventos={eventos} base={snapshotDate} />
              </div>
            </section>
          )}

          {tab === 'analisis' && (
            <section className="grid gap-4 grid-cols-12">
              <div className="col-span-12">
                <DerivadosPanel items={derived} />
              </div>
              <div className="col-span-12 xl:col-span-7">
                <ProyeccionesPanel rows={analisis.proyecciones} />
              </div>
              <div className="col-span-12 xl:col-span-5">
                <RiesgosPanel items={analisis.riesgos} />
              </div>
              <div className="col-span-12">
                <EscenariosPanel items={analisis.escenarios} />
              </div>
            </section>
          )}

          {tab === 'historico' && (
            <section className="flex flex-col gap-4">
              <Insight>
                Series anuales desde 2015: cada cierre de año más el último dato disponible (marcado con *). La línea
                punteada es el promedio 2015–2025.
              </Insight>
              <HistoricoPanel kpis={indicadores} onOpen={setOpenKpi} />
            </section>
          )}

          {tab === 'agro' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('agro') && <div className="col-span-12"><Insight>{lectura('agro')}</Insight></div>}
              <div className="col-span-12">
                <AgroPanel data={agro} />
              </div>
            </section>
          )}

          {tab === 'mercados' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('mercados') && <div className="col-span-12"><Insight>{lectura('mercados')}</Insight></div>}
              <div className="col-span-12 lg:col-span-6">
                <MercadosPanel data={mercados} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <BonosPanel data={mercados} />
              </div>
            </section>
          )}

          {tab === 'actividad' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('actividad') && <div className="col-span-12"><Insight>{lectura('actividad')}</Insight></div>}
              <div className="col-span-12 lg:col-span-6">
                <ActividadPanel data={actividad} />
              </div>
              <div className="col-span-12 lg:col-span-6 min-h-[560px]">
                <DepartamentosPanel departamentos={actividad.departamentos} asof="Peso económico · est. PIB departamental (OPP)" />
              </div>
            </section>
          )}

          {tab === 'energia' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('energia') && <div className="col-span-12"><Insight>{lectura('energia')}</Insight></div>}
              <div className="col-span-12">
                <EnergiaPanel data={energia} />
              </div>
            </section>
          )}

          {tab === 'externo' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('externo') && <div className="col-span-12"><Insight>{lectura('externo')}</Insight></div>}
              <div className="col-span-12 lg:col-span-6">
                <ExternoPanel data={externo} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <CommoditiesPanel data={externo.commodities} />
              </div>
            </section>
          )}

          {tab === 'fiscal' && (
            <section className="grid gap-4 grid-cols-12">
              {lectura('fiscal') && <div className="col-span-12"><Insight>{lectura('fiscal')}</Insight></div>}
              <div className="col-span-12 lg:col-span-6">
                <FiscalPanel data={fiscal} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <MonetarioPanel data={fiscal} ipc={byId['ipc_interanual']} tpm={byId['tpm']} />
              </div>
            </section>
          )}
        </main>

        {/* Footer F — siempre visible */}
        <HealthFooter fuentes={fuentes} now={formatNow(now).time} source={source} snapshot={SNAPSHOT.fecha} />

        {/* overlays */}
        <KpiModal kpi={openKpi} onClose={() => setOpenKpi(null)} lectura={openKpi ? analisis.kpiLecturas[openKpi.id] : undefined} />
        <NewsModal
          noticia={openNews}
          onClose={() => setOpenNews(null)}
          onMarcarLeida={marcarLeida}
          leida={openNews ? leidas.has(openNews.id) : false}
        />
      </div>
    </ThemeContext.Provider>
  );
}
