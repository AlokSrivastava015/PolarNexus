import React, { useState } from "react";
import Icon from "../common/Icon";

export default function RagAssistantSection({ setNotice }) {
  const [prompt, setPrompt] = useState(
    "What are the major findings of the 41st Indian Scientific Expedition to Antarctica (2023–24)?"
  );
  const [followUp, setFollowUp] = useState("");
  const [liked, setLiked] = useState(null);

  const sources = [
    { id: 1, title: "41st Indian Scientific Expedition Final Report (2023-24)", type: "PDF", size: "8.4 MB", color: "#ef4444" },
    { id: 2, title: "Cryospheric Observations from Schirmacher Oasis", type: "PDF", size: "4.2 MB", color: "#ef4444" },
    { id: 3, title: "Atmospheric Monitoring Summary 2023-24", type: "XLSX", size: "2.1 MB", color: "#10b981" },
    { id: 4, title: "Marine Science Observations Report 2023-24", type: "PDF", size: "6.7 MB", color: "#ef4444" },
    { id: 5, title: "Geological Studies in Vestfold Hills", type: "PDF", size: "5.1 MB", color: "#ef4444" },
  ];

  const historyItems = [
    { title: "Major findings of 41st Expedition", time: "10:32 AM", active: true },
    { title: "Ice core analysis methodology", time: "Yesterday" },
    { title: "Sea ice trends in East Antarctica", time: "2 days ago" },
    { title: "Bharati Station energy systems", time: "3 days ago" },
    { title: "Penguin population studies", time: "5 days ago" },
  ];

  return (
    <div className="rag-page-view">
      <section className="rag-hero">
        <div className="rag-hero-content">
          <h1>
            RAG Research Assistant <span className="blue-sparkle">✦</span>
          </h1>
          <p>
            Ask questions about polar research documents, datasets, expedition
            reports and publications. Get context-aware answers with references.
          </p>

          <div className="rag-prompt-box">
            <div className="input-avatar">
              <Icon name="user" size={18} />
            </div>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question about polar research..."
            />
            <button
              className="send-prompt-btn"
              onClick={() => setNotice("Retrieving relevant polar documents & generating response...")}
            >
              <Icon name="send" size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="rag-main-layout">
        <div className="rag-left-col">
          <article className="rag-answer-card">
            <div className="answer-card-header">
              <h2>
                <span className="sparkle-icon">✦</span> Assistant Answer
              </h2>
              <div className="confidence-meta">
                <span>Answer generated from 6 sources</span>
                <span className="confidence-badge">
                  <span className="dot" /> High Confidence
                </span>
              </div>
            </div>

            <div className="answer-body-content">
              <p className="lead-paragraph">
                The 41st Indian Scientific Expedition to Antarctica (2023–24)
                achieved significant progress across multiple scientific domains. The key findings are:
              </p>

              <div className="numbered-points-list">
                <div className="point-row">
                  <div className="num-badge">1</div>
                  <div className="point-content">
                    <h3>Glaciology & Cryosphere</h3>
                    <p>
                      Extensive glaciological studies were carried out in the
                      Schirmacher Oasis and Larsemann Hills. Ice core analysis
                      indicates increasing snow accumulation variability and
                      changes in isotopic composition, suggesting regional climate shifts.
                    </p>
                  </div>
                </div>

                <div className="point-row">
                  <div className="num-badge">2</div>
                  <div className="point-content">
                    <h3>Atmospheric Science</h3>
                    <p>
                      Continuous monitoring showed high variability in
                      atmospheric aerosols and greenhouse gases. An unusual increase
                      in Black Carbon events was observed during the austral summer.
                    </p>
                  </div>
                </div>

                <div className="point-row">
                  <div className="num-badge">3</div>
                  <div className="point-content">
                    <h3>Oceanography</h3>
                    <p>
                      CTD and seawater sampling revealed changes in temperature,
                      salinity and dissolved oxygen levels. Phytoplankton bloom
                      patterns indicate a shift in marine productivity.
                    </p>
                  </div>
                </div>

                <div className="point-row">
                  <div className="num-badge">4</div>
                  <div className="point-content">
                    <h3>Geology</h3>
                    <p>
                      Rock and mineral samples from the Vestfold Hills provide
                      new insights into the ancient geological history of East Antarctica.
                    </p>
                  </div>
                </div>

                <div className="point-row">
                  <div className="num-badge">5</div>
                  <div className="point-content">
                    <h3>Biological Studies</h3>
                    <p>
                      Research on microbial diversity in extreme environments
                      identified several novel strains with potential biotechnological applications.
                    </p>
                  </div>
                </div>
              </div>

              <p className="summary-conclusion">
                These findings contribute to understanding climate change
                impacts, ecosystem variability and long-term environmental monitoring in Antarctica.
              </p>

              <div className="feedback-row">
                <span>Was this answer helpful?</span>
                <button
                  className={`like-btn ${liked === true ? "active" : ""}`}
                  onClick={() => setLiked(true)}
                >
                  <Icon name="thumbsUp" size={16} />
                </button>
                <button
                  className={`like-btn ${liked === false ? "active" : ""}`}
                  onClick={() => setLiked(false)}
                >
                  <Icon name="thumbsDown" size={16} />
                </button>
              </div>

              <p className="disclaimer-text">
                AI-generated answer based on available documents. Please verify critical information from original sources.
              </p>
            </div>
          </article>

          <div className="follow-up-chat-box">
            <div className="chat-input-wrapper">
              <input
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Ask a follow-up question..."
              />
              <button className="attachment-btn" title="Attach file">
                <Icon name="paperclip" size={18} />
              </button>
              <button
                className="send-followup-btn"
                onClick={() => {
                  if (followUp) {
                    setNotice("Follow-up submitted.");
                    setFollowUp("");
                  }
                }}
              >
                <Icon name="send" size={18} />
              </button>
            </div>
            <small>
              Assistant uses RAG (Retrieval-Augmented Generation) to provide accurate answers with references.
            </small>
          </div>
        </div>

        <aside className="rag-sidebar">
          <div className="sidebar-card top-sources-card">
            <div className="card-header">
              <h3>Top Sources</h3>
            </div>
            <div className="sources-list">
              {sources.map((src) => (
                <div key={src.id} className="source-item-row">
                  <div className="source-icon-badge" style={{ color: src.color }}>
                    <Icon name={src.type === "XLSX" ? "database" : "file"} size={18} />
                  </div>
                  <div className="source-meta">
                    <b className="source-title">{src.title}</b>
                    <small>{src.type} • {src.size}</small>
                  </div>
                  <span className="source-num-badge">{src.id}</span>
                </div>
              ))}
            </div>
            <button className="view-all-link" onClick={() => setNotice("Showing all 6 references.")}>
              View all 6 sources →
            </button>
          </div>

          <div className="sidebar-card chat-history-card">
            <div className="card-header">
              <h3>Chat History</h3>
              <button className="clear-link" onClick={() => setNotice("Chat history cleared.")}>
                Clear All
              </button>
            </div>
            <div className="history-list">
              {historyItems.map((h, i) => (
                <div key={i} className={`history-item-row ${h.active ? "active" : ""}`}>
                  <Icon name="message" size={16} />
                  <span className="h-title">{h.title}</span>
                  <small className="h-time">{h.time}</small>
                </div>
              ))}
            </div>
            <button className="view-all-link" onClick={() => setNotice("Opening chat history archive.")}>
              View all history →
            </button>
          </div>

          <div className="sidebar-card sources-used-card">
            <div className="card-header">
              <h3>Sources Used in This Answer</h3>
            </div>
            <div className="sources-breakdown-list">
              <div className="breakdown-row">
                <span>📄 Documents</span>
                <b>5</b>
              </div>
              <div className="breakdown-row">
                <span>🗄 Datasets</span>
                <b>1</b>
              </div>
              <div className="breakdown-row">
                <span>🚩 Reports</span>
                <b>0</b>
              </div>
              <div className="breakdown-row">
                <span>📚 Publications</span>
                <b>0</b>
              </div>
            </div>
            <button className="view-all-link" onClick={() => setNotice("Opening source detail breakdown.")}>
              View source details →
            </button>
          </div>

          <div className="sidebar-card quick-actions-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="actions-2x2-grid">
              <button onClick={() => setNotice("Answer summary generated.")}>
                <Icon name="file" size={15} /> Summarize Answer
              </button>
              <button onClick={() => setNotice("Answer exported as PDF.")}>
                <Icon name="download" size={15} /> Export Answer
              </button>
              <button onClick={() => setNotice("Saved to your research collection.")}>
                <Icon name="bookmark" size={15} /> Save to Collection
              </button>
              <button onClick={() => setNotice("Ready to type follow-up question.")}>
                <Icon name="message" size={15} /> Follow-up Question
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
