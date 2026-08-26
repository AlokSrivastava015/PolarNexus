import React, { useState } from "react";
import Icon from "../common/Icon";
import BackgroundSlideshow from "../common/BackgroundSlideshow";

export default function AiSummarizationSection({ setNotice }) {
  const [urlInput, setUrlInput] = useState("https://example.com/research-report");
  const [summaryLength, setSummaryLength] = useState("Medium");
  const [summaryType, setSummaryType] = useState("General");
  const [focusArea, setFocusArea] = useState("All Topics");
  const [language, setLanguage] = useState("English");
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const docs = [
    {
      name: "Impact of Sea Ice Loss on Adelie Penguin Colonies in East Antarctica",
      type: "PDF",
      pages: 12,
      date: "12 May 2024 10:30 AM",
      status: "Summarized",
      size: "1.2 MB",
      icon: "pdf",
      color: "#ef4444",
    },
    {
      name: "Bharati Station Annual Technical Report 2023",
      type: "PDF",
      pages: 48,
      date: "08 May 2024 02:15 PM",
      status: "Summarized",
      size: "4.8 MB",
      icon: "pdf",
      color: "#ef4444",
    },
    {
      name: "Atmospheric Aerosol Variability over Antarctica",
      type: "DOCX",
      pages: 26,
      date: "07 May 2024 11:05 AM",
      status: "Summarized",
      size: "2.6 MB",
      icon: "file",
      color: "#2563eb",
    },
    {
      name: "Antarctic Meteorological Observations Dataset (2015–2024)",
      type: "XLSX",
      pages: "-",
      date: "05 May 2024 04:20 PM",
      status: "Summarized",
      size: "14.2 MB",
      icon: "database",
      color: "#10b981",
    },
    {
      name: "Ice Core Analysis from Dome Fuji, Antarctica",
      type: "PDF",
      pages: 18,
      date: "03 May 2024 09:40 AM",
      status: "Processing",
      size: "3.1 MB",
      icon: "pdf",
      color: "#ef4444",
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setNotice("Generating AI summary using advanced language model...");
    setTimeout(() => {
      setIsGenerating(false);
      setNotice("Summary generated successfully!");
    }, 1000);
  };

  const selectedDoc = docs[selectedDocIndex];

  return (
    <div className="summarization-page-view">
      <section className="summary-hero">
        <BackgroundSlideshow className="summary-hero-slideshow" />
        <div className="summary-hero-head">
          <h1>
            AI Summarization <span className="blue-sparkle">✦</span>
          </h1>
          <p>
            Generate concise and accurate summaries of research documents,
            reports, datasets and publications using advanced AI.
          </p>
        </div>

        <div className="upload-and-url-cards">
          <div className="upload-dropzone-card">
            <div className="upload-cloud-orb">
              <Icon name="upload" size={24} />
            </div>
            <div className="upload-labels">
              <b>Drag & drop your file here</b>
              <small>Supports PDF, DOCX, TXT, XLSX</small>
            </div>
            <button className="browse-files-btn" onClick={handleGenerate}>
              Browse Files
            </button>
          </div>

          <div className="url-summarize-card">
            <div className="url-label">
              <Icon name="globe" size={18} />
              <span>Or summarize from URL</span>
            </div>
            <div className="url-input-wrap">
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/research-report"
              />
              <button className="url-submit-btn" onClick={handleGenerate}>
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="summary-controls-bar">
        <label>
          <Icon name="file" size={15} /> Summary Length
          <select value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)}>
            <option>Medium</option>
            <option>Short</option>
            <option>Detailed</option>
          </select>
        </label>

        <label>
          <Icon name="list" size={15} /> Summary Type
          <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)}>
            <option>General</option>
            <option>Technical</option>
            <option>Executive</option>
          </select>
        </label>

        <label>
          <Icon name="spark" size={15} /> Focus Area
          <select value={focusArea} onChange={(e) => setFocusArea(e.target.value)}>
            <option>All Topics</option>
            <option>Climate Impact</option>
            <option>Biodiversity</option>
          </select>
        </label>

        <label>
          <Icon name="globe" size={15} /> Language
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </label>

        <button className="generate-summary-btn" onClick={handleGenerate}>
          <Icon name="spark" size={16} /> {isGenerating ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      <section className="summary-main-layout">
        <div className="summary-left-col">
          <div className="table-card recent-docs-card">
            <div className="card-header">
              <h3>Recent Documents</h3>
            </div>
            <table className="docs-data-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Type</th>
                  <th>Pages</th>
                  <th>Uploaded On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, idx) => (
                  <tr
                    key={doc.name}
                    className={selectedDocIndex === idx ? "selected-row" : ""}
                    onClick={() => setSelectedDocIndex(idx)}
                  >
                    <td className="doc-name-cell">
                      <div className="doc-file-badge" style={{ color: doc.color }}>
                        <Icon name={doc.icon === "database" ? "database" : "file"} size={18} />
                      </div>
                      <span className="doc-title-text">{doc.name}</span>
                    </td>
                    <td><span className="type-tag">{doc.type}</span></td>
                    <td>{doc.pages}</td>
                    <td className="date-cell">{doc.date}</td>
                    <td>
                      {doc.status === "Summarized" ? (
                        <span className="status-pill summarized">Summarized</span>
                      ) : (
                        <span className="status-pill processing">Processing 🔄</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="table-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDocIndex(idx);
                          setNotice(`Viewing ${doc.name}`);
                        }}
                      >
                        <Icon name="eye" size={16} />
                      </button>
                      <button className="table-action-btn" onClick={(e) => e.stopPropagation()}>
                        <Icon name="more" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer-link">
              <button onClick={() => setNotice("Opening complete document library.")}>
                View all documents →
              </button>
            </div>
          </div>

          <div className="disclaimer-info-bar">
            <Icon name="info" size={18} />
            <span>
              AI summaries may not capture all details. Please review the original document for complete information.
            </span>
          </div>
        </div>

        <aside className="summary-sidebar">
          <div className="sidebar-card summary-preview-card">
            <div className="card-header">
              <h3>Summary Preview</h3>
              <button
                className="view-full-link"
                onClick={() => setNotice("Opening full summary document.")}
              >
                View Full Summary
              </button>
            </div>

            <div className="selected-doc-header-box">
              <div className="doc-badge-lg" style={{ color: selectedDoc.color }}>
                <Icon name={selectedDoc.icon === "database" ? "database" : "file"} size={22} />
              </div>
              <div className="doc-header-info">
                <h4>{selectedDoc.name}</h4>
                <small>
                  {selectedDoc.pages} Pages • {selectedDoc.type} • {selectedDoc.size}
                </small>
              </div>
            </div>

            <div className="summary-content-section">
              <h4>AI Summary</h4>
              <p className="summary-paragraph">
                This study investigates the relationship between declining sea
                ice extent and the breeding success of Adélie penguin colonies
                in East Antarctica. Using multi-year satellite observations and
                field data, the research reveals a significant correlation
                between reduced sea ice duration and lower chick survival rates...{" "}
                <button className="show-more-btn" onClick={() => setNotice("Showing full summary text.")}>
                  Show more
                </button>
              </p>

              <h4>Key Points</h4>
              <div className="key-points-list">
                <div className="kp-item">
                  <span className="check-bullet">✔</span>
                  <span>Sea ice extent decreased by 18% over the last two decades.</span>
                </div>
                <div className="kp-item">
                  <span className="check-bullet">✔</span>
                  <span>Shorter sea ice duration impacts foraging efficiency.</span>
                </div>
                <div className="kp-item">
                  <span className="check-bullet">✔</span>
                  <span>Chick mortality increased in years with reduced sea ice.</span>
                </div>
                <div className="kp-item">
                  <span className="check-bullet">✔</span>
                  <span>Regional differences observed across study colonies.</span>
                </div>
                <div className="kp-item">
                  <span className="check-bullet">✔</span>
                  <span>Long-term monitoring is critical for conservation planning.</span>
                </div>
              </div>

              <h4>Summary Insights</h4>
              <div className="insights-3col-row">
                <div className="insight-stat-box">
                  <Icon name="file" size={16} />
                  <b>325</b>
                  <small>Words</small>
                </div>
                <div className="insight-stat-box">
                  <Icon name="clock" size={16} />
                  <b>2 min</b>
                  <small>Read Time</small>
                </div>
                <div className="insight-stat-box">
                  <Icon name="spark" size={16} />
                  <b>87%</b>
                  <small>Key Info Captured</small>
                </div>
              </div>

              <h4>Download Summary</h4>
              <div className="download-buttons-row">
                <button onClick={() => setNotice("Summary copied to clipboard!")}>
                  <Icon name="copy" size={14} /> Copy Text
                </button>
                <button onClick={() => setNotice("Downloading PDF summary...")}>
                  <Icon name="download" size={14} /> Download PDF
                </button>
                <button onClick={() => setNotice("Downloading DOCX summary...")}>
                  <Icon name="download" size={14} /> Download DOCX
                </button>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
