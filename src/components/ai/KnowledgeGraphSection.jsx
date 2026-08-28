import React, { useMemo, useState } from "react";
import Icon from "../common/Icon";
import BackgroundSlideshow from "../common/BackgroundSlideshow";

const typeTabs = ["All Entities", "Topics", "Publications", "Researchers", "Stations", "Datasets", "Expeditions"];

const nodes = [
  { id: "antarctic", name: "Antarctic Research", type: "Topics", icon: "spark", tone: "topic", x: 50, y: 50, description: "Comprehensive research domain covering multi-disciplinary studies in Antarctica and the Southern Ocean.", connected: { "Research Topics": 12, Researchers: 85, Publications: 243, Datasets: 56, Stations: 5, Expeditions: 8 } },
  { id: "glaciology", name: "Glaciology", type: "Topics", icon: "snow", tone: "topic", x: 28, y: 27 },
  { id: "sea-ice", name: "Sea Ice", type: "Topics", icon: "snow", tone: "topic", x: 41, y: 35 },
  { id: "atmosphere", name: "Atmospheric Science", type: "Topics", icon: "spark", tone: "topic", x: 27, y: 62 },
  { id: "southern-ocean", name: "Southern Ocean Change", type: "Topics", icon: "globe", tone: "topic", x: 65, y: 39 },
  { id: "ice-mat", name: "Ice Mat Station", type: "Stations", icon: "flag", tone: "station", x: 52, y: 24 },
  { id: "bharati", name: "Bharati Station", type: "Stations", icon: "flag", tone: "station", x: 39, y: 63 },
  { id: "dakshin", name: "Dakshin Gangotri", type: "Stations", icon: "flag", tone: "station", x: 70, y: 63 },
  { id: "ice-mass", name: "Ice Mass Loss\nEvidence (2023)", type: "Publications", icon: "book", tone: "publication", x: 63, y: 18 },
  { id: "climate-var", name: "Southern Climate\nVariability (2021)", type: "Publications", icon: "book", tone: "publication", x: 82, y: 48 },
  { id: "ocean-circ", name: "Ocean Circulation\nAntarctica (2024)", type: "Publications", icon: "book", tone: "publication", x: 16, y: 79 },
  { id: "sea-dataset", name: "Sea Ice Dataset", type: "Datasets", icon: "database", tone: "dataset", x: 12, y: 63 },
  { id: "atm-dataset", name: "Atmospheric Dataset", type: "Datasets", icon: "database", tone: "dataset", x: 25, y: 82 },
  { id: "southern-data", name: "Southern Ocean\nData", type: "Datasets", icon: "database", tone: "dataset", x: 45, y: 87 },
  { id: "ananya", name: "Dr. Ananya Sen", type: "Researchers", icon: "user", tone: "researcher", x: 41, y: 11 },
  { id: "singh", name: "Dr. P. Singh", type: "Researchers", icon: "user", tone: "researcher", x: 15, y: 31 },
  { id: "sharma", name: "Dr. R. Sharma", type: "Researchers", icon: "user", tone: "researcher", x: 76, y: 25 },
  { id: "expedition", name: "42nd Indian\nScientific Expedition", type: "Expeditions", icon: "flag", tone: "expedition", x: 57, y: 90 },
];

const edges = [
  ["antarctic", "glaciology"], ["antarctic", "sea-ice"], ["antarctic", "atmosphere"], ["antarctic", "southern-ocean"], ["antarctic", "ice-mat"], ["antarctic", "bharati"], ["antarctic", "dakshin"], ["antarctic", "ice-mass"], ["antarctic", "climate-var"], ["antarctic", "ocean-circ"], ["antarctic", "sea-dataset"], ["antarctic", "atm-dataset"], ["antarctic", "southern-data"], ["antarctic", "ananya"], ["antarctic", "singh"], ["antarctic", "sharma"], ["antarctic", "expedition"],
  ["glaciology", "sea-ice"], ["sea-ice", "ice-mass"], ["atmosphere", "atm-dataset"], ["southern-ocean", "climate-var"], ["bharati", "atm-dataset"], ["dakshin", "climate-var"], ["sea-dataset", "ocean-circ"], ["ananya", "glaciology"], ["singh", "atmosphere"], ["sharma", "southern-ocean"], ["expedition", "bharati"],
];

const stats = [["network", "2,487", "Entities", "12% this month"], ["spark", "6,892", "Relationships", "15% this month"], ["book", "156", "Research Topics", "8% this month"], ["users", "412", "Researchers", "10% this month"], ["database", "1,248", "Datasets", "14% this month"], ["file", "2,340", "Publications", "16% this month"]];

function friendlyType(type) {
  return type === "Topics" ? "Research Topic" : type.slice(0, -1);
}

export default function KnowledgeGraphSection({ setNotice }) {
  const [activeType, setActiveType] = useState("All Entities");
  const [selectedId, setSelectedId] = useState("antarctic");
  const [tool, setTool] = useState("select");
  const [zoom, setZoom] = useState(1);
  const [analytics, setAnalytics] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const selected = nodes.find((node) => node.id === selectedId) || nodes[0];
  const visibleNodes = useMemo(() => {
    if (activeType === "All Entities") return nodes;
    return nodes.filter((node) => node.id === "antarctic" || node.type === activeType);
  }, [activeType]);
  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = edges.filter(([a, b]) => visibleIds.has(a) && visibleIds.has(b));

  const selectTab = (tab) => {
    setActiveType(tab);
    setDetailsOpen(true);
    setNotice(`${tab} graph view selected.`);
  };

  const chooseTool = (nextTool) => {
    if (nextTool === "fit") {
      setZoom(1);
      setTool("select");
      setNotice("Graph fitted to view.");
      return;
    }
    if (nextTool === "reset") {
      setActiveType("All Entities");
      setSelectedId("antarctic");
      setZoom(1);
      setTool("select");
      setAnalytics(false);
      setDetailsOpen(true);
      setNotice("Knowledge graph reset.");
      return;
    }
    if (nextTool === "filter") {
      setFilterOpen((value) => !value);
      setTool("filter");
      setNotice(filterOpen ? "Graph filter panel closed." : "Graph filter panel opened.");
      return;
    }
    setTool(nextTool);
    setFilterOpen(false);
    setNotice(`${nextTool[0].toUpperCase()}${nextTool.slice(1)} mode enabled.`);
  };

  const selectNode = (node) => {
    if (tool === "pan") {
      setNotice("Pan mode is active — choose Select to inspect an entity.");
      return;
    }
    setSelectedId(node.id);
    setDetailsOpen(true);
    setNotice(`${node.name.replace("\n", " ")} selected.`);
  };

  return (
    <section className="knowledge-graph-section">
      <section className="kg-hero">
        <BackgroundSlideshow className="kg-hero-slideshow" />
        <h1>Knowledge Graph <span>✦</span></h1>
        <p>Explore connections between research topics, publications, datasets, researchers, stations and expeditions in the polar ecosystem.</p>
        <div className="kg-stats">{stats.map(([icon, value, label, growth]) => <article key={label}><Icon name={icon} /><span><small>{label}</small><b>{value}</b><em>↑ {growth}</em></span></article>)}</div>
      </section>

      <section className={`kg-workspace ${detailsOpen ? "details-visible" : "details-hidden"}`}>
        <article className="kg-graph-card">
          <header className="kg-card-header">
            <h2>Polar Knowledge Graph <Icon name="info" size={14} /></h2>
            <div className="kg-header-actions"><button className={analytics ? "active" : ""} onClick={() => { setAnalytics((value) => !value); setNotice(analytics ? "Graph analytics hidden." : "Graph analytics opened."); }}><Icon name="chart" size={14} /> Graph Analytics</button><button onClick={() => chooseTool("fit")} aria-label="Fit graph to view">⛶</button></div>
          </header>
          <nav className="kg-tabs" aria-label="Graph entity filters">{typeTabs.map((tab) => <button key={tab} className={activeType === tab ? "active" : ""} onClick={() => selectTab(tab)}><Icon name={tab === "All Entities" ? "network" : tab === "Topics" ? "spark" : tab === "Publications" ? "book" : tab === "Researchers" ? "users" : tab === "Stations" || tab === "Expeditions" ? "flag" : "database"} size={13} />{tab}</button>)}</nav>
          <div className={`kg-canvas tool-${tool}`}>
            <div className="kg-toolbar" aria-label="Graph tools">
              {[["pan", "target", "Pan"], ["select", "user", "Select"], ["filter", "filter", "Filter"], ["fit", "spark", "Fit View"], ["reset", "history", "Reset"]].map(([key, icon, label]) => <button key={key} className={tool === key ? "active" : ""} onClick={() => chooseTool(key)}><Icon name={icon} size={16} /><span>{label}</span></button>)}
            </div>
            <div className="kg-zoom-controls"><button onClick={() => setZoom((value) => Math.min(1.25, value + .08))}>+</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((value) => Math.max(.78, value - .08))}>−</button></div>
            <div className="kg-graph-stage" style={{ transform: `scale(${zoom})` }}>
              <svg className="kg-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{visibleEdges.map(([a, b], index) => { const from = nodes.find((node) => node.id === a); const to = nodes.find((node) => node.id === b); return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={index < 17 ? "strong" : "related"} />; })}</svg>
              {visibleNodes.map((node) => <button key={node.id} className={`kg-node ${node.tone} ${node.id === selectedId ? "selected" : ""} ${node.id === "antarctic" ? "central" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} onClick={() => selectNode(node)} title={`Select ${node.name.replace("\n", " ")}`}><Icon name={node.icon} size={node.id === "antarctic" ? 20 : 15} /><span>{node.name.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</span></button>)}
            </div>
            {analytics && <div className="kg-analytics-popover"><b>Graph analytics</b><span>Density <strong>0.74</strong></span><span>Avg. path <strong>2.8 hops</strong></span><span>Communities <strong>7 clusters</strong></span></div>}
            {filterOpen && <div className="kg-filter-popover"><b>Filter entities</b>{["Topics", "Publications", "Researchers", "Stations", "Datasets", "Expeditions"].map((type) => <button key={type} className={activeType === type ? "active" : ""} onClick={() => { selectTab(type); setFilterOpen(false); }}>{type}<span>{nodes.filter((node) => node.type === type).length}</span></button>)}<button className="clear" onClick={() => { selectTab("All Entities"); setFilterOpen(false); }}>Show all entities</button></div>}
            <div className="kg-legend"><span className="topic">● Research Topic</span><span className="researcher">● Researcher</span><span className="station">● Station</span><span className="publication">● Publication</span><span className="dataset">● Dataset</span><span className="expedition">● Expedition</span><i>━ Strong Relationship</i><i>┄ Related Connection</i></div>
          </div>
        </article>

        {detailsOpen ? <aside className="kg-details-card"><header><h2>Entity Details</h2><button onClick={() => { setDetailsOpen(false); setNotice("Entity details closed."); }} aria-label="Close entity details"><Icon name="x" size={17} /></button></header><div className={`kg-entity-icon ${selected.tone}`}><Icon name={selected.icon} size={25} /></div><h3>{selected.name.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h3><span className="kg-type-pill">{friendlyType(selected.type)}</span><p>{selected.description || `${selected.name.replace("\n", " ")} is a connected entity in the PolarNexus knowledge graph.`}</p><h4>Connected To</h4><div className="kg-connected-list">{Object.entries(selected.connected || { "Research Topics": 12, Researchers: 18, Publications: 24, Datasets: 9 }).map(([label, value]) => <button key={label} onClick={() => selectTab(label === "Research Topics" ? "Topics" : label)}><Icon name={label === "Researchers" ? "users" : label === "Datasets" ? "database" : label === "Publications" ? "book" : "flag"} size={14} /><span>{label}</span><b>{value}</b><Icon name="chevronRight" size={13} /></button>)}</div><h4>Top Related Entities</h4><div className="kg-related-list">{["Climate Change", "Glaciology", "Southern Ocean", "Sea Ice", "Maitri Station"].map((name, index) => <button key={name} onClick={() => { const match = nodes.find((node) => node.name.startsWith(name)); if (match) selectNode(match); else setNotice(`${name} connection selected.`); }}><Icon name="spark" size={13} /><span>{name}</span><em>{index < 3 ? "Strong" : "Moderate"}</em></button>)}</div><button className="kg-view-connections" onClick={() => setNotice(`Showing all connections for ${selected.name.replace("\n", " ")}.`)}>View All Connections <Icon name="arrow" size={15} /></button></aside> : <button className="kg-show-details" onClick={() => setDetailsOpen(true)}>Show Entity Details <Icon name="chevronLeft" size={14} /></button>}
      </section>
      <footer className="kg-footer"><span>♢ &nbsp; Knowledge graph is updated daily using latest research data and entity extraction models.</span><span>Last updated: 26 May 2024, 10:30 AM IST &nbsp; ↻</span></footer>
    </section>
  );
}
