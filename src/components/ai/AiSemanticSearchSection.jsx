import React, { useState } from "react";
import Icon from "../common/Icon";

export default function AiSemanticSearchSection({ setNotice }) {
  const [query, setQuery] = useState(
    "How does sea ice thickness variation affect penguin breeding in Antarctica?"
  );
  const [activeTab, setActiveTab] = useState("All Results (156)");
  const [viewMode, setViewMode] = useState("list");
  const [bookmarked, setBookmarked] = useState(new Set());

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setNotice("Saved to collection.");
  };

  const results = [
    {
      id: 1,
      type: "Research Report",
      typeBg: "#eaf3ff",
      typeColor: "#1d65db",
      title: "Sea Ice Thickness Variability and Its Impact on Emperor Penguin Breeding",
      desc: "This study analyzes multi-year sea ice thickness data and its correlation with the breeding success of emperor penguins in Terre Adélie...",
      tags: ["Sea Ice", "Penguin Ecology", "Terre Adélie", "+2"],
      score: 96,
      scoreColor: "#1a6bf2",
      date: "12 May 2024",
      size: "8.4 MB",
      badgeIcon: "file",
    },
    {
      id: 2,
      type: "Dataset",
      typeBg: "#e6f8f6",
      typeColor: "#0d9488",
      title: "Antarctic Sea Ice Thickness (2010–2024)",
      desc: "Satellite-derived sea ice thickness dataset from ICESat-2 and CryoSat-2 mission covering the Antarctic region.",
      tags: ["Sea Ice", "Satellite Data", "ICESat-2", "CryoSat-2"],
      score: 92,
      scoreColor: "#0d9488",
      date: "08 Apr 2024",
      size: "2.1 GB",
      badgeIcon: "database",
    },
    {
      id: 3,
      type: "Publication",
      typeBg: "#f1ebff",
      typeColor: "#7c3aed",
      title: "Influence of Sea Ice Dynamics on Antarctic Marine Ecosystems",
      desc: "Explores how seasonal and interannual sea ice variations influence marine productivity and species distribution in Antarctica.",
      tags: ["Marine Biology", "Sea Ice", "Ecosystems", "+2"],
      score: 89,
      scoreColor: "#7c3aed",
      date: "15 Mar 2023",
      source: "Journal of Polar Science",
      badgeIcon: "book",
    },
    {
      id: 4,
      type: "Video",
      typeBg: "#e0f2fe",
      typeColor: "#0284c7",
      title: "Penguin Breeding Behavior in Changing Sea Ice Conditions",
      desc: "Documentary footage showing emperor penguin colonies and their response to changing sea ice environments.",
      tags: ["Penguins", "Behavior", "Documentary"],
      score: 87,
      scoreColor: "#0284c7",
      date: "22 Jan 2023",
      size: "12:34 min",
      badgeIcon: "image",
    },
  ];

  return (
    <div className="semantic-page-view">
      <section className="semantic-hero">
        <div className="hero-head-title">
          <h1>
            AI Semantic Search <span className="blue-sparkle">✦</span>
          </h1>
          <p>
            Search polar research using natural language. Our AI understands
            context, meaning and relationships to find the most relevant results.
          </p>
        </div>

        <div className="semantic-search-box">
          <div className="prompt-input-wrapper">
            <span className="spark-badge-icon">✦</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask or search polar research in natural language..."
            />
            <button
              className="semantic-search-btn"
              onClick={() => setNotice("AI Search updated with 156 relevant results.")}
            >
              <Icon name="spark" size={16} /> Search with AI
            </button>
          </div>
        </div>

        <div className="semantic-stat-cards">
          <div className="stat-card-item">
            <div className="stat-icon-wrapper blue">
              <Icon name="file" size={20} />
            </div>
            <div className="stat-content">
              <b>12,840+</b>
              <span>Sources Indexed</span>
            </div>
          </div>
          <div className="stat-card-item">
            <div className="stat-icon-wrapper teal">
              <Icon name="users" size={20} />
            </div>
            <div className="stat-content">
              <b>98.7%</b>
              <span>Semantic Accuracy</span>
            </div>
          </div>
          <div className="stat-card-item">
            <div className="stat-icon-wrapper purple">
              <Icon name="clock" size={20} />
            </div>
            <div className="stat-content">
              <b>0.82s</b>
              <span>Avg. Response Time</span>
            </div>
          </div>
          <div className="stat-card-item">
            <div className="stat-icon-wrapper lightblue">
              <Icon name="spark" size={20} />
            </div>
            <div className="stat-content">
              <b>24</b>
              <span>AI Models Used</span>
            </div>
          </div>
        </div>
      </section>

      <section className="semantic-main-layout">
        <div className="semantic-left-col">
          <div className="semantic-tabs-bar">
            {["All Results (156)", "Reports (42)", "Datasets (38)", "Publications (56)", "Media (20)"].map(
              (tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="results-toolbar-row">
            <span>Showing 1–10 of 156 results (Ranked by relevance)</span>
            <div className="toolbar-right">
              <div className="sort-dropdown">
                <span>Sort by: <b>Relevance</b> ⌄</span>
              </div>
              <div className="view-mode-toggle">
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <Icon name="list" size={16} />
                </button>
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Icon name="grid" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className={`results-list ${viewMode}`}>
            {results.map((item) => (
              <article key={item.id} className="result-card-item">
                <div className="result-icon-badge" style={{ background: item.typeBg, color: item.typeColor }}>
                  <Icon name={item.badgeIcon} size={22} />
                </div>
                <div className="result-main-info">
                  <span className="type-pill" style={{ background: item.typeBg, color: item.typeColor }}>
                    {item.type}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="result-tags">
                    {item.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="result-score-meta">
                  <div className="score-block">
                    <small>Relevance Score</small>
                    <b>{item.score}%</b>
                    <div className="score-progress">
                      <div
                        className="score-bar"
                        style={{ width: `${item.score}%`, background: item.scoreColor }}
                      />
                    </div>
                  </div>
                  <div className="meta-info">
                    {item.source ? <span>{item.source}</span> : null}
                    <span>📅 {item.date}</span>
                    {item.size ? <span>💾 {item.size}</span> : null}
                  </div>
                  <div className="action-icons">
                    <button
                      className={`action-btn ${bookmarked.has(item.id) ? "bookmarked" : ""}`}
                      onClick={() => toggleBookmark(item.id)}
                      title="Bookmark"
                    >
                      <Icon name="bookmark" size={16} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => setNotice(`Downloading ${item.title}...`)}
                      title="Download"
                    >
                      <Icon name="download" size={16} />
                    </button>
                    <button className="action-btn" title="Options">
                      <Icon name="more" size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="related-searches-box">
            <h4>Try these related searches</h4>
            <div className="related-pills-row">
              <button onClick={() => setQuery("Sea ice thickness trends in East Antarctica")}>
                Sea ice thickness trends in East Antarctica
              </button>
              <button onClick={() => setQuery("Climate change impact on penguin habitats")}>
                Climate change impact on penguin habitats
              </button>
              <button onClick={() => setQuery("Antarctic sea ice and marine productivity")}>
                Antarctic sea ice and marine productivity
              </button>
              <button onClick={() => setQuery("Emperor penguin colony monitoring studies")}>
                Emperor penguin colony monitoring studies
              </button>
              <button className="arrow-next">
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>

        <aside className="semantic-sidebar">
          <div className="sidebar-card search-insights-card">
            <div className="card-header">
              <h3>Search Insights</h3>
              <Icon name="info" size={18} />
            </div>
            <p className="subtext">Your query was interpreted as:</p>
            <div className="query-interpretation-box">
              “Impact of sea ice thickness variation on penguin breeding in Antarctica”
            </div>

            <h4>Top Concepts Identified</h4>
            <div className="concepts-pills">
              <span>Sea Ice Thickness</span>
              <span>Penguin Breeding</span>
              <span>Antarctica</span>
              <span>Climate Impact</span>
              <span>Habitat Change</span>
            </div>

            <h4>Related Topics</h4>
            <div className="related-topics-list">
              {[
                ["Sea Ice Variability", "92%"],
                ["Penguin Ecology", "90%"],
                ["Climate Change Impact", "84%"],
                ["Antarctic Ecosystems", "78%"],
                ["Ice Thickness Trends", "71%"],
              ].map(([name, pct]) => (
                <div key={name} className="topic-item">
                  <span>{name}</span>
                  <b>{pct}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card refine-search-card">
            <div className="card-header">
              <h3>Refine Search</h3>
              <button className="clear-link" onClick={() => setNotice("Filters cleared.")}>
                Clear All
              </button>
            </div>

            <label>
              Content Type
              <select>
                <option>All Types</option>
                <option>Research Report</option>
                <option>Dataset</option>
                <option>Publication</option>
                <option>Video</option>
              </select>
            </label>

            <label>
              Date Range
              <select>
                <option>All Years</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </label>

            <label>
              Research Area
              <select>
                <option>All Research Areas</option>
                <option>East Antarctica</option>
                <option>Southern Ocean</option>
                <option>Terre Adélie</option>
              </select>
            </label>

            <label>
              Author / Institution
              <input placeholder="Search author or institution..." />
            </label>

            <button
              className="apply-filters-btn"
              onClick={() => setNotice("Search filters applied successfully.")}
            >
              <Icon name="filter" size={16} /> Apply Filters
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
