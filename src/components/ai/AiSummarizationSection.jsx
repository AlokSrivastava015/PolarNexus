import React, { useRef, useState } from "react";
import Icon from "../common/Icon";
import BackgroundSlideshow from "../common/BackgroundSlideshow";
import { downloadTextFile, summarizeFile } from "../../services/api";

export default function AiSummarizationSection({ setNotice }) {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState("medium");
  const [summaryType, setSummaryType] = useState("general");
  const [focusArea, setFocusArea] = useState("all");
  const [language, setLanguage] = useState("English");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarize = async () => {
    if (!file || loading) return;
    setLoading(true); setError("");
    try {
      const response = await summarizeFile(file, { summaryLength, summaryType, focusArea, language });
      setSummary(response.summary || "");
      setNotice("Summary generated successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to summarize this file.");
    } finally { setLoading(false); }
  };

  const chooseFile = (nextFile) => {
    if (!nextFile) return;
    setFile(nextFile); setSummary(""); setError("");
  };

  return <div className="summarization-page-view">
    <section className="summary-hero"><BackgroundSlideshow className="summary-hero-slideshow"/><div className="summary-hero-head"><h1>AI Summarization <span className="blue-sparkle">✦</span></h1><p>Upload a PDF, DOCX, TXT, or XLSX document to generate a real AI summary.</p></div>
      <div className="upload-and-url-cards"><div className="upload-dropzone-card" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); chooseFile(e.dataTransfer.files[0]); }}><div className="upload-cloud-orb"><Icon name="upload" size={24}/></div><div className="upload-labels"><b>{file ? file.name : "Drag & drop your file here"}</b><small>{file ? `${Math.ceil(file.size / 1024)} KB selected` : "Supports PDF, DOCX, TXT, XLSX"}</small></div><input ref={fileInput} type="file" hidden accept=".pdf,.docx,.txt,.xlsx" onChange={(e) => chooseFile(e.target.files[0])}/><button type="button" className="browse-files-btn" onClick={() => fileInput.current?.click()} disabled={loading}>Browse Files</button></div></div>
    </section>
    <div className="summary-controls-bar"><label><Icon name="file" size={15}/>Summary Length<select value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)}><option value="short">Short</option><option value="medium">Medium</option><option value="detailed">Detailed</option></select></label><label><Icon name="list" size={15}/>Summary Type<select value={summaryType} onChange={(e) => setSummaryType(e.target.value)}><option value="general">General</option><option value="technical">Technical</option><option value="executive">Executive</option></select></label><label><Icon name="spark" size={15}/>Focus Area<input value={focusArea} onChange={(e) => setFocusArea(e.target.value)} placeholder="All"/></label><label><Icon name="globe" size={15}/>Language<select value={language} onChange={(e) => setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Spanish</option></select></label><button type="button" className="generate-summary-btn" disabled={!file || loading} onClick={summarize}><Icon name="spark" size={16}/>{loading ? "Generating…" : "Generate Summary"}</button></div>
    <section className="summary-main-layout"><div className="summary-left-col"><div className="disclaimer-info-bar"><Icon name="info" size={18}/><span>AI summaries may omit details. Review the original document for complete information.</span></div>{error && <p className="login-error" role="alert">{error}</p>}</div><aside className="summary-sidebar"><div className="sidebar-card summary-preview-card"><div className="card-header"><h3>Summary Preview</h3>{summary && <button type="button" onClick={() => downloadTextFile(summary, "polarnexus-summary.txt")}>Download TXT</button>}</div>{file && <div className="selected-doc-header-box"><div className="doc-badge-lg"><Icon name="file" size={22}/></div><div className="doc-header-info"><h4>{file.name}</h4><small>{Math.ceil(file.size / 1024)} KB</small></div></div>}{loading && <p>Generating summary…</p>}{summary && <div className="rag-live-answer" style={{whiteSpace:"pre-wrap", maxHeight:"550px", overflowY:"auto"}}>{summary}</div>}{!summary && !loading && <p>Select a document and choose Generate Summary to see the real response here.</p>}</div></aside></section>
  </div>;
}
