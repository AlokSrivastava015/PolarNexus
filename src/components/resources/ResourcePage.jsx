import React, { useState, useMemo } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import Sidebar from "../common/Sidebar";
import BackgroundSlideshow from "../common/BackgroundSlideshow";
import {
  nav,
  resourceConfigs,
  recordTitles,
  aiSections,
} from "../../data/mockData";

export default function ResourcePage({
  section,
  username,
  onHome,
  onLogout,
  onNavigate,
}) {
  const config = resourceConfigs[section];
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState(config.tabs[0]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [detailRecord, setDetailRecord] = useState(null);
  const [detailTab, setDetailTab] = useState("Overview");
  const isResearchPapers = section === "Polar Research Repository";
  const isCompactFilterPage = [
    "Polar Research Repository",
    "Expedition Reports",
    "Scientific Datasets",
    "Publications",
    "Photos / Videos",
  ].includes(section);

  const records = useMemo(
    () =>
      recordTitles[section].map((title, index) => ({
        title,
        index,
        type:
          section === "Photos / Videos"
            ? index % 3 === 2
              ? "Video"
              : "Photo"
            : section === "Outreach & Media"
              ? ["Campaign", "Event", "Video", "Blog", "Social Post", "Press Release"][index % 6]
              : section === "Citizen Science"
                ? ["Active Project", "My Observation", "Pending Validation", "Explorer Project"][index % 4]
            : section === "Scientific Datasets"
              ? "Dataset"
              : section === "Publications"
                ? "Journal Article"
                : section === "Expedition Reports"
                  ? "Expedition Report"
                  : ["Expedition Report", "Dataset", "Publication", "Media"][
                      index % 4
                    ],
        date: `${String(12 - (index % 10)).padStart(2, "0")} May 2024`,
        size:
          section === "Scientific Datasets"
            ? `${(0.8 + index * 0.2).toFixed(1)} GB`
            : section === "Photos / Videos"
              ? `${(4 + index * 1.3).toFixed(1)} MB`
              : `${(1.2 + index * 0.4).toFixed(1)} MB`,
      })),
    [section],
  );

  const tabRecords = records.filter((record) => {
    if (section === "Outreach & Media") {
      const groups = { "All Content": records.map((item) => item.type), Campaigns: ["Campaign"], Events: ["Event"], "Media Library": ["Video", "Blog"], "Social Media": ["Social Post"], "News & Announcements": ["Press Release"] };
      return groups[tab]?.includes(record.type);
    }
    if (section === "Citizen Science") {
      const groups = { "Ongoing Projects": ["Active Project"], "My Observations": ["My Observation"], "Pending Validations": ["Pending Validation"], "Project Explorer": ["Explorer Project"] };
      return groups[tab]?.includes(record.type);
    }
    return true;
  });

  const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = tabRecords.filter((record) => {
    const searchableText = [record.title, record.type, record.date, record.size]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });

  const sortedRecords = [...filtered].sort((first, second) =>
    sortOrder === "latest" ? first.index - second.index : second.index - first.index,
  );

  const select = (name) => {
    if (name === "Home") onHome();
    else if (resourceConfigs[name] || aiSections.includes(name)) onNavigate(name);
    else setNotice(`${name} selected — feature ready to explore.`);
    setOpen(false);
  };
  const toggleRecord = (title) => setSelectedRecords((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  const openDetail = (record) => { setDetailRecord(record); setDetailTab("Overview"); };

  return (
    <div className={`dashboard resource-page ${isCompactFilterPage ? 'compact-filter-page' : ''} ${section === 'Outreach & Media' ? 'outreach-page' : section === 'Citizen Science' ? 'citizen-page' : ''}`}>
      <Sidebar activeSection={section} onNavigate={select} onLogout={onLogout} isOpen={open} onClose={() => setOpen(false)} />
      <div className="dash-main">
        <header className="topbar">
          <div className="navbar-brand"><Brand compact /></div>
          <button className="menu-button" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="top-search">
            <Icon name="search" size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${config.noun}...`}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="user-area">
            <Icon name="user" size={20} />
            <span>Welcome, {username}</span>
          </div>
        </header>
        {notice && (
          <div className="notice">
            {notice}
            <button onClick={() => setNotice("")}>×</button>
          </div>
        )}
        <section className="resource-hero">
          <BackgroundSlideshow className="resource-hero-background" />
          <div>
            <h1>{section}</h1>
            <p>{config.subtitle}</p>
            <div className="resource-search">
              <Icon name="search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${config.noun}...`}
              />
              <button
                onClick={() =>
                  setNotice(`${filtered.length} matching ${config.noun} found.`)
                }
              >
                ✦ &nbsp; AI Semantic Search
              </button>
            </div>
            <div className="resource-stats">
              {config.stats.map(([icon, value, label]) => (
                <article key={label}>
                  <div>
                    <Icon name={icon} size={25} />
                  </div>
                  <span>
                    <b>{value}</b>
                    <small>{label}</small>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="resource-layout">
          <div className="resource-results">
            <div className="resource-tabs">
              {config.tabs.map((label) => (
                <button
                  className={tab === label ? "active" : ""}
                  onClick={() => setTab(label)}
                  key={label}
                >
                  {label}
                </button>
              ))}
              <div className="resource-tab-actions">
                <button onClick={() => setNotice(`Collection created with ${selectedRecords.length || sortedRecords.length} resource${(selectedRecords.length || sortedRecords.length) === 1 ? '' : 's'}.`)}>Create Collection</button>
                <button onClick={() => setNotice(`${selectedRecords.length || sortedRecords.length} resource${(selectedRecords.length || sortedRecords.length) === 1 ? '' : 's'} prepared for download.`)}>Download Selected</button>
              </div>
            </div>
            <div className="result-toolbar">
              <span>
                Showing {sortedRecords.length ? 1 : 0}–{sortedRecords.length} of{" "}
                {config.count} {config.noun}
              </span>
              <div className="result-controls">
                <label className="sort-control">
                  Sort by:
                  <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </label>
                {isCompactFilterPage && <button className="filters-trigger" onClick={() => setShowFilters((value) => !value)}><Icon name="filter" size={14} /> Filters</button>}
              </div>
            </div>
            <div className="resource-results-list">
            {sortedRecords.map((record) => (
              <article
                className={`resource-row ${section === "Photos / Videos" || section === "Outreach & Media" || section === "Citizen Science" ? "media-row" : ""}`}
                key={record.title}
              >
                <label className="record-select" title={`Select ${record.title}`}><input type="checkbox" checked={selectedRecords.includes(record.title)} onChange={() => toggleRecord(record.title)} /></label>
                <div className="resource-thumb visual-thumb" style={{ backgroundPosition: `${(record.index * 17) % 100}% ${(record.index * 23) % 100}%` }}>
                  <Icon
                    name={section === "Photos / Videos" || section === "Outreach & Media" || section === "Citizen Science" ? "image" : config.icon}
                    size={28}
                  />
                  <em>{record.type}</em>
                </div>
                <div className="resource-info">
                  <h3><button onClick={() => openDetail(record)}>{record.title}</button></h3>
                  <p>
                    {section === "Photos / Videos"
                      ? "Captured during polar field operations and scientific documentation."
                      : section === "Outreach & Media"
                        ? "Polar outreach content designed to inform, inspire and engage a global audience."
                        : section === "Citizen Science"
                          ? "Community-powered polar observation supporting real-world scientific discovery."
                      : `Comprehensive ${record.type.toLowerCase()} covering polar research, observations and findings.`}
                  </p>
                  <small>
                    {record.type} <i /> Open Access
                  </small>
                </div>
                <div className="resource-meta">
                  <span>{record.date}</span>
                  <b>{record.size}</b>
                </div>
                <button
                  className="row-action"
                  onClick={() => setNotice(`${record.title} download started.`)}
                >
                  <Icon name="download" size={19} />
                </button>
              </article>
            ))}
            </div>
          </div>
          <aside className={`filter-panel ${isCompactFilterPage ? 'repository-filter-panel' : ''} ${showFilters ? 'filter-open' : ''}`}>
            <div className="filter-title">
              <h2>Filters</h2>
              <button
                onClick={() => {
                  setQuery("");
                  setTab(config.tabs[0]);
                  setShowFilters(false);
                }}
              >
                Clear All
              </button>
            </div>
            {isResearchPapers ? <>
              <details open><summary>Resource Type</summary><label><input type="checkbox" defaultChecked /> Research Papers</label><label><input type="checkbox" /> Expedition Reports</label><label><input type="checkbox" /> Datasets</label><label><input type="checkbox" /> Publications</label></details>
              <details><summary>Research Area</summary><label><input type="checkbox" /> Antarctica</label><label><input type="checkbox" /> Southern Ocean</label><label><input type="checkbox" /> Arctic</label></details>
              <details><summary>Year Range</summary><label><input type="checkbox" /> 2024</label><label><input type="checkbox" /> 2023</label><label><input type="checkbox" /> Earlier</label></details>
              <details><summary>Tags / Keywords</summary><input placeholder="Search tags or keywords..." /></details>
            </> : <>
              <label>Resource Type<select><option>All Types</option><option>{section}</option></select></label>
              <label>Research Area<select><option>All Research Areas</option><option>Antarctica</option><option>Southern Ocean</option></select></label>
              <label>Year Range<select><option>All Years</option><option>2024</option><option>2023</option></select></label>
              <label>Tags / Keywords<input placeholder="Search tags or keywords..." /></label>
            </>}
            <button
              className="apply-filter"
              onClick={() => setNotice("Filters applied to the resource list.")}
            >
              ⌕ &nbsp; Apply Filters
            </button>
          </aside>
        </section>
      </div>
      {detailRecord && <div className="resource-detail-layer" role="dialog" aria-modal="true" aria-label={`${detailRecord.title} details`}>
        <div className="detail-sheet"><button className="detail-close" onClick={() => setDetailRecord(null)} aria-label="Close details">×</button><button className="detail-back" onClick={() => setDetailRecord(null)}>← Back to {section}</button>
          <div className="detail-header"><div><h1>{detailRecord.title} <em>{detailRecord.type}</em></h1><dl><div><dt>Authors</dt><dd>PolarNexus Research Team</dd></div><div><dt>Published</dt><dd>{detailRecord.date}</dd></div><div><dt>Keywords</dt><dd>{section}, Antarctica, Climate Research, Polar Science</dd></div></dl><div className="detail-primary-actions"><button onClick={() => setNotice(`${detailRecord.title} download started.`)}><Icon name="download" size={18}/> View / Download</button><button onClick={() => setNotice(`${detailRecord.title} added to your library.`)}>Add to Library</button></div></div><div className="detail-image visual-thumb"><Icon name="image" size={38}/></div></div>
          <div className="detail-body"><main><div className="detail-tabs">{["Overview","Details","Citations","Related Papers","Media"].map(item => <button className={detailTab === item ? 'active' : ''} onClick={() => setDetailTab(item)} key={item}>{item}</button>)}</div>{detailTab === 'Overview' ? <><article className="detail-card"><h2>Abstract</h2><p>This {detailRecord.type.toLowerCase()} presents polar research evidence from field observations, satellite records and long-term scientific monitoring. It highlights meaningful environmental change and supports future research decisions across the Antarctic region.</p><button onClick={() => setNotice('Full abstract opened.')}>Show More</button></article><article className="detail-card"><h2>Key Findings <small>(AI Extracted)</small></h2><ul><li>Observed polar conditions show significant change across the study period.</li><li>Antarctic ecosystems and field operations benefit from continued monitoring.</li><li>Long-term evidence supports informed climate and conservation planning.</li></ul></article></> : <article className="detail-card"><h2>{detailTab}</h2><p>Related information for <b>{detailRecord.title}</b> is available in this record. Use the AI actions to generate additional research outputs.</p></article>}</main><aside className="detail-ai-actions"><h2>AI Actions</h2>{[["spark","Summarize"],["message","Chat with Paper"],["file","Generate Blog"],["megaphone","Generate News"],["users","Generate LinkedIn Post"],["globe","Translate"]].map(([icon,label]) => <button onClick={() => setNotice(`${label} generated for ${detailRecord.title}.`)} key={label}><Icon name={icon} size={20}/><span>{label}</span><Icon name="arrow" size={17}/></button>)}</aside></div>
        </div></div>}
    </div>
  );
}
