import React, { useState } from "react";
import Icon from "../common/Icon";
import BackgroundSlideshow from "../common/BackgroundSlideshow";
import { apiFetch, downloadTextFile } from "../../services/api";

export default function RagAssistantSection({ prompt, setPrompt, setNotice }) {
  const [followUp, setFollowUp] = useState("");
  const [messages, setMessages] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async (question) => {
    const text = question.trim();
    if (!text || loading) return;
    setLoading(true); setError("");
    try {
      const response = await apiFetch("/ai/rag/query", { method: "POST", body: JSON.stringify({ question: text }) });
      const next = { id: `${Date.now()}`, question: text, answer: response.answer || "", sourceCount: response.matched_resources || 0 };
      setMessages((current) => [...current, next]);
      setSources(response.sources || []);
      setPrompt(""); setFollowUp(""); setNotice("Answer generated successfully.");
    } catch (requestError) { setError(requestError.message || "Unable to generate an answer."); }
    finally { setLoading(false); }
  };
  const latest = messages.at(-1);

  return <div className="rag-page-view">
    <section className="rag-hero"><BackgroundSlideshow className="rag-hero-slideshow"/><div className="rag-hero-content"><h1>RAG Research Assistant <span className="blue-sparkle">✦</span></h1><p>Ask questions about polar research documents, datasets, reports, and publications.</p><div className="rag-prompt-box"><div className="input-avatar"><Icon name="user" size={18}/></div><input value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(prompt)} placeholder="Ask a question about polar research..."/><button type="button" className="send-prompt-btn" disabled={loading || !prompt.trim()} onClick={() => ask(prompt)}>{loading ? "…" : <Icon name="send" size={18}/>}</button></div></div></section>
    <section className="rag-main-layout"><div className="rag-left-col"><article className="rag-answer-card"><div className="answer-card-header"><h2><span className="sparkle-icon">✦</span> Assistant Answer</h2><div className="confidence-meta"><span>{latest ? `Answer generated from ${latest.sourceCount} resource${latest.sourceCount === 1 ? "" : "s"}` : "No answer generated yet"}</span></div></div><div className="answer-body-content">{loading && <p>Retrieving resources and generating an answer…</p>}{error && <p className="login-error" role="alert">{error}</p>}{!loading && !error && !messages.length && <p>Ask a question above to receive a real AI response.</p>}{messages.map((message) => <div key={message.id} className="rag-live-answer" style={{whiteSpace:"pre-wrap", maxHeight:"520px", overflowY:"auto"}}><p><b>You:</b> {message.question}</p><p><b>Assistant:</b></p>{message.answer}</div>)}{latest && <div className="download-buttons-row"><button type="button" onClick={() => downloadTextFile(latest.answer, "polarnexus-rag-answer.txt")}><Icon name="download" size={14}/>Download Answer</button></div>}</div></article><div className="follow-up-chat-box"><div className="chat-input-wrapper"><input value={followUp} onChange={(e) => setFollowUp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(followUp)} placeholder="Ask a follow-up question..."/><button type="button" className="send-followup-btn" disabled={loading || !followUp.trim()} onClick={() => ask(followUp)}><Icon name="send" size={18}/></button></div></div></div>
    <aside className="rag-sidebar"><div className="sidebar-card top-sources-card"><div className="card-header"><h3>Sources Used</h3></div>{sources.length ? <div className="sources-list">{sources.map((source) => <div key={source.id} className="source-item-row"><div className="source-icon-badge"><Icon name="file" size={18}/></div><div className="source-meta"><b className="source-title">{source.title}</b><small>{source.resource_type || "Resource"}</small></div></div>)}</div> : <p>No database resources matched the latest question.</p>}</div><div className="sidebar-card chat-history-card"><div className="card-header"><h3>Chat History</h3><button type="button" className="clear-link" onClick={() => { setMessages([]); setSources([]); }}>Clear All</button></div>{messages.map((message) => <div className="history-item-row" key={message.id}><Icon name="message" size={16}/><span className="h-title">{message.question}</span></div>)}</div></aside></section>
  </div>;
}
