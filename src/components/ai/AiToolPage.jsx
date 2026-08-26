import React, { useState } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import AiSemanticSearchSection from "./AiSemanticSearchSection";
import RagAssistantSection from "./RagAssistantSection";
import AiSummarizationSection from "./AiSummarizationSection";
import { nav, resourceConfigs, aiSections } from "../../data/mockData";

export default function AiToolPage({
  section,
  username,
  onDashboard,
  onLogout,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const select = (name) => {
    setOpen(false);
    if (name === "Dashboard") onDashboard();
    else if (resourceConfigs[name] || aiSections.includes(name)) onNavigate(name);
    else setNotice(`${name} selected — feature ready to explore.`);
  };

  return (
    <div className="dashboard ai-tool-page">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <Brand compact />
          <button className="close-nav" onClick={() => setOpen(false)}>
            <Icon name="x" />
          </button>
        </div>
        <nav>
          {nav.map(([icon, name], index) => (
            <button
              key={name}
              onClick={() => select(name)}
              className={`${name === section ? "selected" : ""} ${index === 6 ? "nav-break" : ""}`}
            >
              <Icon name={icon} size={19} />
              <span>{name}</span>
            </button>
          ))}
        </nav>
        <div className="ai-card">
          <div>
            <Icon name="snow" size={27} />
          </div>
          <p>
            <b>Polar AI Assistant</b>
            <span>Your AI research companion for polar insights.</span>
          </p>
          <button className="ai-card-btn" onClick={() => select("RAG-based Assistant")}>
            Ask Assistant <Icon name="arrow" size={14} />
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="top-search">
            <Icon name="search" size={20} />
            <input
              placeholder={
                section === "AI Summarization"
                  ? "Search documents to summarize..."
                  : section === "RAG-based Assistant"
                    ? "Search or ask anything about polar research..."
                    : "Search across repository..."
              }
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="user-area">
            <div className="user-profile-badge">
              <div className="avatar-circle">
                <Icon name="user" size={18} />
              </div>
              <div className="user-meta">
                <b>Dr. Ananya Sen</b>
                <small>Researcher ⌄</small>
              </div>
            </div>
            <button onClick={onLogout}>
              <Icon name="logout" size={18} />
              Logout
            </button>
          </div>
        </header>

        {notice && (
          <div className="notice">
            {notice}
            <button onClick={() => setNotice("")}>×</button>
          </div>
        )}

        {section === "AI Semantic Search" && (
          <AiSemanticSearchSection setNotice={setNotice} />
        )}
        {section === "RAG-based Assistant" && (
          <RagAssistantSection setNotice={setNotice} />
        )}
        {section === "AI Summarization" && (
          <AiSummarizationSection setNotice={setNotice} />
        )}
      </div>
    </div>
  );
}
