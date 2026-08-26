import React, { useState } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import Sidebar from "../common/Sidebar";
import AiSemanticSearchSection from "./AiSemanticSearchSection";
import RagAssistantSection from "./RagAssistantSection";
import AiSummarizationSection from "./AiSummarizationSection";
import { nav, resourceConfigs, aiSections } from "../../data/mockData";

export default function AiToolPage({
  section,
  username,
  onHome,
  onLogout,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const select = (name) => {
    setOpen(false);
    if (name === "Home") onHome();
    else if (resourceConfigs[name] || aiSections.includes(name)) onNavigate(name);
    else setNotice(`${name} selected — feature ready to explore.`);
  };

  return (
    <div className="dashboard ai-tool-page">
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
