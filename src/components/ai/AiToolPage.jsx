import React, { useState } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import Sidebar from "../common/Sidebar";
import AiSemanticSearchSection from "./AiSemanticSearchSection";
import RagAssistantSection from "./RagAssistantSection";
import AiSummarizationSection from "./AiSummarizationSection";
import ContentStudioSection from "./ContentStudioSection";
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
  const [searchQuery, setSearchQuery] = useState(
    section === "AI Semantic Search"
      ? "How does sea ice thickness variation affect penguin breeding in Antarctica?"
      : section === "RAG-based Assistant"
        ? "What are the major findings of the 41st Indian Scientific Expedition to Antarctica (2023–24)?"
        : "",
  );

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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                section === "AI Summarization"
                  ? "Search documents to summarize..."
                  : section === "Content Studio"
                    ? "Search templates, topics or generate content..."
                  : section === "RAG-based Assistant"
                    ? "Search or ask anything about polar research..."
                    : "Search across repository..."
              }
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

        {section === "AI Semantic Search" && (
          <AiSemanticSearchSection query={searchQuery} setQuery={setSearchQuery} setNotice={setNotice} />
        )}
        {section === "RAG-based Assistant" && (
          <RagAssistantSection prompt={searchQuery} setPrompt={setSearchQuery} setNotice={setNotice} />
        )}
        {section === "AI Summarization" && (
          <AiSummarizationSection setNotice={setNotice} />
        )}
        {section === "Content Studio" && <ContentStudioSection setNotice={setNotice} />}
      </div>
    </div>
  );
}
