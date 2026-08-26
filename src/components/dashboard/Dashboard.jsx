import React, { useState, useMemo } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import Sidebar from "../common/Sidebar";
import BackgroundSlideshow from "../common/BackgroundSlideshow";
import {
  nav,
  expeditions,
  publications,
  aiSections,
} from "../../data/mockData";

const trendingTopics = [
  ["snow", "Ice Shelf Stability", "124 papers"],
  ["users", "Ozone Depletion", "96 papers"],
  ["globe", "Climate Change", "356 papers"],
  ["database", "Ocean Warming", "112 papers"],
  ["chart", "Polar Biodiversity", "78 papers"],
];

const quickActions = [
  ["user", "Ask AI Assistant", "Get answers from polar knowledge", "RAG-based Assistant"],
  ["file", "Summarize Paper", "Get key insights in seconds", "AI Summarization"],
  ["spark", "Generate Content", "Blogs, news, posts & more", "Outreach & Media"],
  ["globe", "Explore Polar Map", "Discover research & projects", "Scientific Datasets"],
  ["chart", "View Analytics", "Explore research insights", "AI Semantic Search"],
];

export default function Home({ username, onLogout, onNavigate }) {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const matches = useMemo(
    () =>
      [...expeditions, ...publications].filter((x) =>
        x.join(" ").toLowerCase().includes(query.toLowerCase()),
      ).length,
    [query],
  );

  const choose = (name) => {
    setActive(name);
    setOpen(false);
    if (
      [
        "Polar Research Repository",
        "Expedition Reports",
        "Scientific Datasets",
        "Publications",
        "Photos / Videos",
        "Outreach & Media",
        "Citizen Science",
        ...aiSections,
      ].includes(name)
    ) {
      onNavigate(name);
      return;
    }
    if (name !== "Home")
      setNotice(`${name} selected — module ready to explore.`);
  };

  return (
    <div className="dashboard">
      <Sidebar activeSection={active} onNavigate={choose} onLogout={onLogout} isOpen={open} onClose={() => setOpen(false)} />
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
              placeholder="Search across repository..."
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
        <section className="dash-hero">
          <BackgroundSlideshow className="dash-hero-slideshow" />
          <div>
            <p>Welcome to</p>
            <h1>
              AI-Powered <span>Polar Knowledge,</span>
              <br />
              Outreach & <span>Digital Twin</span> Platform
            </h1>
            <p className="hero-sub">
              Uniting polar research, real-time insights and intelligent
              monitoring
              <br />
              to advance science, operations and collaboration in the world's
              <br />
              final frontier.
            </p>
            <div className="hero-search">
              <Icon name="search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research, reports, datasets, publications..."
              />
              <button
                onClick={() =>
                  setNotice(
                    query
                      ? `${matches} related result${matches === 1 ? "" : "s"} found.`
                      : "Search the PolarNexus repository.",
                  )
                }
              >
                &nbsp; AI Semantic Search
              </button>
            </div>
          </div>
        </section>
        <section className="overview">
          <div className="section-title">
            <h2>Overview</h2>
            <button>
              <Icon name="calendar" size={16} />
              This Month⌄
            </button>
          </div>
          <div className="metrics">
            {[
              ["file", "1,248", "Research Papers", "12%"],
              ["flag", "86", "Expedition Reports", "8%"],
              ["database", "542", "Scientific Datasets", "18%"],
              ["image", "3,287", "Photos / Videos", "15%"],
              ["users", "1,032", "Citizen Scientists", "10%"],
            ].map(([i, v, l, g]) => (
              <article key={l}>
                <div className={`metric-icon ${i}`}>
                  <Icon name={i} />
                </div>
                <div>
                  <b>{v}</b>
                  <span>{l}</span>
                  <small>↑ {g} from last month</small>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="dashboard-discovery">
          <h2>🔥 Trending Research Topics <small>(AI Generated)</small></h2>
          <div className="trending-topics">
            {trendingTopics.map(([icon, title, count]) => (
              <button key={title} onClick={() => setNotice(`${title} selected.`)}>
                <span className="topic-icon"><Icon name={icon} size={21} /></span>
                <span><b>{title}</b><small>{count}</small></span>
              </button>
            ))}
          </div>
          <h2 className="quick-actions-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map(([icon, title, description, destination]) => (
              <button key={title} onClick={() => choose(destination)}>
                <span className="quick-icon"><Icon name={icon} size={23} /></span>
                <span><b>{title}</b><small>{description}</small></span>
              </button>
            ))}
          </div>
        </section>
        <section className="platform-services" aria-labelledby="services-title">
          <div className="platform-heading">
            <p>PolarNexus platform</p>
            <h2 id="services-title">Services built for every polar mission</h2>
            <span>
              From first discovery to field operations, bring knowledge, data
              and people into one connected workspace.
            </span>
          </div>
          <div className="service-grid">
            {[
              [
                "book",
                "Research repository",
                "Find reports, publications, media and institutional knowledge in one place.",
              ],
              [
                "spark",
                "AI research tools",
                "Search, summarize and understand complex polar research faster.",
              ],
              [
                "chart",
                "Photos & Videos",
                "PolarNexus hosts an archive of expedition and research photographs and videos.",
              ],
              [
                "users",
                "Outreach & citizen science",
                "Turn research into useful stories and meaningful public participation.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <div>
                  <Icon name={icon} size={24} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <button onClick={() => choose(title)}>
                  Explore <Icon name="arrow" size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>
        <footer className="dashboard-footer">
          <div>
            <Brand compact />
            <p>Connecting knowledge. Advancing polar futures.</p>
          </div>
          <div className="footer-links">
            <a href="#services-title">Services</a>
            <button onClick={() => choose("AI Semantic Search")}>
              AI Search
            </button>
            <button onClick={() => choose("Outreach")}>Outreach</button>
            <a href="mailto:hello@polarnexus.org">Contact</a>
          </div>
          <small>
            © 2026 PolarNexus. Built for polar research and discovery.
          </small>
        </footer>
      </div>
    </div>
  );
}
