import React, { useState } from "react";
import Icon from "../common/Icon";
import BackgroundSlideshow from "../common/BackgroundSlideshow";
import { generateAiContent } from "../../services/api";

const templates = [
  ["file", "Research Article Summary", "Summarize papers, reports, datasets"],
  ["edit", "Blog Post", "Generate engaging blog articles"],
  ["megaphone", "News Article", "Generate factual news articles"],
  ["users", "LinkedIn Post", "Create LinkedIn-ready content"],
];

export default function ContentStudioSection({ setNotice }) {
  const [contentType, setContentType] = useState("Blog Post");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true); setError("");
    try {
      const response = await generateAiContent({ content_type: contentType, topic: topic.trim(), tone, language, instructions: context.trim() || null });
      setGenerated(response.content || "");
      setNotice("AI content generated successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to generate content.");
    } finally { setLoading(false); }
  };

  const copy = async () => {
    if (!generated) return;
    await navigator.clipboard?.writeText(generated);
    setNotice("Generated content copied.");
  };

  return <section className="content-studio-section">
    <section className="studio-hero"><BackgroundSlideshow className="studio-hero-slideshow"/><div><h1>Content Generation <span>✦</span></h1><p>Create research communication and outreach content using the connected AI service.</p></div></section>
    <section className="studio-grid"><div><article className="studio-form"><h2>Create New Content</h2>
      <label>Content Type<select value={contentType} onChange={(e) => setContentType(e.target.value)}>{templates.map(([, name]) => <option key={name}>{name}</option>)}</select></label>
      <label>Topic / Title<input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a research topic" /></label>
      <label>Key Points / Context <small>(Optional)</small><textarea value={context} onChange={(e) => setContext(e.target.value)} maxLength="4000" /><i>{context.length} / 4000</i></label>
      <div className="studio-options"><label>Tone<select value={tone} onChange={(e) => setTone(e.target.value)}><option>Academic</option><option>Friendly</option><option>Professional</option></select></label><label>Language<select value={language} onChange={(e) => setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Spanish</option></select></label><button type="button" disabled={loading || !topic.trim()} onClick={generate}>✦ &nbsp; {loading ? "Generating…" : "Generate Content"}</button></div>
      {error && <p className="login-error" role="alert">{error}</p>}
    </article><article className="popular-topics"><h2>Content Templates</h2>{templates.map(([icon, name, text]) => <button type="button" onClick={() => setContentType(name)} key={name}><Icon name={icon} size={15}/><span><b>{name}</b><small>{text}</small></span></button>)}</article></div>
    <div><article className="generated-preview"><header><h2>AI Generated Preview</h2><button type="button" disabled={!generated} onClick={copy}><Icon name="copy" size={15}/>Copy</button></header>{loading && <p>Generating content…</p>}{generated && <div className="rag-live-answer" style={{whiteSpace:"pre-wrap", maxHeight:"520px", overflowY:"auto"}}>{generated}</div>}{!generated && !loading && <p>Enter a topic and generate AI content to see the real response here.</p>}</article></div></section>
  </section>;
}
