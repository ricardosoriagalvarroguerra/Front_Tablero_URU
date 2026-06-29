import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeContext } from './theme';
import { Header, formatNow } from './components/Header';
import { Tabs } from './components/Tabs';
import type { TabDef } from './components/Tabs';
import { KpiCard } from './components/modules/KpiCard';
import { FeaturedKpiCard } from './components/modules/FeaturedKpiCard';
import { KpiGroup } from './components/modules/KpiGroup';
import { FEATURED, GROUPS } from './kpiLayout';
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
import { KpiModal } from './components/overlays/KpiModal';
import { NewsModal } from './components/overlays/NewsModal';
import { useDashboardData } from './useDashboardData';
import { api } from './api';
import type { Kpi, Noticia, Theme } from './types';

type TabId = 'panorama' | 'agro' | 'mercados' | 'actividad' | 'energia' | 'externo' | 'fiscal';

export default function App() {
  const { indicadores, agro, mercados, actividad, energia, externo, fiscal, noticias, eventos, fuentes, source, reload } =
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

  const tabs: TabDef[] = [
    { id: 'panorama', label: 'Panorama' },
    {
      id: 'agro',
      label: 'Agro',
      badge:
        agro.participacionAgro != null ? (
          <span className="mono text-[9px] text-accent">{agro.participacionAgro.toFixed(0)}%</span>
        ) : undefined,
    },
    {
      id: 'mercados',
      label: 'Mercados',
      badge: <span className="mono text-[9px] text-muted">{mercados.ubi.value} pb</span>,
    },
    { id: 'actividad', label: 'Actividad' },
    { id: 'energia', label: 'Energía' },
    { id: 'externo', label: 'Externo' },
    { id: 'fiscal', label: 'Fiscal' },
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
        />

        {/* KPI strip — siempre visible (command bar) */}
        <section className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1">
          <div className="flex items-center justify-between mb-2 gap-3">
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-subtle whitespace-nowrap">
              A · Indicadores macro
            </div>
            <div className="mono text-[10px] text-subtle hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="kbd">/</span> buscar
              </span>
              <span className="flex items-center gap-1">
                <span className="kbd">D</span> modo
              </span>
              <span className="flex items-center gap-1">
                <span className="kbd">R</span> refrescar
              </span>
            </div>
          </div>
          {searching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
              {kpiFiltered.map((k) => (
                <KpiCard key={k.id} k={k} onClick={setOpenKpi} />
              ))}
              {kpiFiltered.length === 0 && (
                <div className="col-span-full surface rounded-[5px] p-6 text-center mono text-[11px] text-muted uppercase tracking-wider">
                  Sin coincidencias para «{query}»
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {featuredKpis.map((k) => (
                  <FeaturedKpiCard key={k.id} k={k} onClick={setOpenKpi} />
                ))}
              </div>
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 content-start">
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
        <div className="flex-1 px-3 sm:px-4 pt-3">
          {tab === 'panorama' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 lg:col-span-5 min-h-[360px]">
                <AgroResumen data={agro} onVerDetalle={() => setTab('agro')} />
              </div>
              <div className="col-span-12 lg:col-span-7 min-h-[360px]">
                <NewsPanel noticias={noticias} onSelect={openNoticia} leidas={leidas} />
              </div>
              <div className="col-span-12">
                <CalendarioPanel eventos={eventos} />
              </div>
            </section>
          )}

          {tab === 'agro' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 min-h-[520px]">
                <AgroPanel data={agro} />
              </div>
            </section>
          )}

          {tab === 'mercados' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 min-h-[520px]">
                <MercadosPanel data={mercados} />
              </div>
              <div className="col-span-12 lg:col-span-6 min-h-[520px]">
                <BonosPanel data={mercados} />
              </div>
            </section>
          )}

          {tab === 'actividad' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 min-h-[520px]">
                <ActividadPanel data={actividad} />
              </div>
              <div className="col-span-12 lg:col-span-6 min-h-[520px]">
                <DepartamentosPanel departamentos={actividad.departamentos} asof="Peso económico · est. PIB departamental (OPP)" />
              </div>
            </section>
          )}

          {tab === 'energia' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 min-h-[520px]">
                <EnergiaPanel data={energia} />
              </div>
            </section>
          )}

          {tab === 'externo' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 min-h-[460px]">
                <ExternoPanel data={externo} />
              </div>
              <div className="col-span-12 lg:col-span-6 min-h-[460px]">
                <CommoditiesPanel data={externo.commodities} />
              </div>
            </section>
          )}

          {tab === 'fiscal' && (
            <section className="grid gap-2 grid-cols-12">
              <div className="col-span-12 lg:col-span-6 min-h-[460px]">
                <FiscalPanel data={fiscal} />
              </div>
              <div className="col-span-12 lg:col-span-6 min-h-[460px]">
                <MonetarioPanel data={fiscal} />
              </div>
            </section>
          )}
        </div>

        {/* Footer F — siempre visible */}
        <HealthFooter fuentes={fuentes} now={formatNow(now).time} source={source} />

        {/* overlays */}
        <KpiModal kpi={openKpi} onClose={() => setOpenKpi(null)} />
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
