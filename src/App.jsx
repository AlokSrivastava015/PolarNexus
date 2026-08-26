import { useEffect, useMemo, useState } from "react";

const Icon = ({ name, size = 24 }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const x = {
    mountain: (
      <>
        <path d="m3 18 5-8 3 4 3-6 7 10" />
        <path d="M3 20h18" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.8 20c.7-4.1 3.1-6.2 7.2-6.2s6.5 2.1 7.2 6.2" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 8.3A2.4 2.4 0 0 0 7.1 21h9.8a2.4 2.4 0 0 0 2.1-3.7L14 9V3" />
        <path d="M8.1 15h7.8" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V4h16v16Z" />
        <path d="m7 16 3-4 3 2 4-6" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6" />
        <path d="M16 5a3 3 0 0 1 0 5.8" />
      </>
    ),
    snow: (
      <>
        <path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17" />
        <path d="M7.7 4.5 12 7l4.3-2.5M7.7 19.5 12 17l4.3 2.5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    shield: <path d="M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6Z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5c5-3 7 3 14 0v9c-7 3-9-3-14 0" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6Z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m21 15-4.5-4.5L7 20" />
      </>
    ),
    message: (
      <>
        <path d="M20 11.5a7 7 0 0 1-7 7H7l-4 3v-10a7 7 0 0 1 7-7h3a7 7 0 0 1 7 7Z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </>
    ),
    spark: (
      <path d="m12 2 1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4Z" />
    ),
    megaphone: (
      <>
        <path d="m4 14 13-5v10L4 14Z" />
        <path d="M17 11h2a2 2 0 0 1 0 4h-2M7 15l1 5h3l-1-4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    bookmark: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
    more: (
      <>
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4 20-7z" />
        <path d="M22 2 11 13" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
    list: (
      <>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="4" cy="6" r="1" />
        <circle cx="4" cy="12" r="1" />
        <circle cx="4" cy="18" r="1" />
      </>
    ),
    thumbsUp: (
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    ),
    thumbsDown: (
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
    ),
    paperclip: (
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    ),
    checkCircle: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </>
    ),
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    pdf: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" />
      </svg>
    ),
  };
  return <svg {...p}>{x[name]}</svg>;
};
const features = [
  ["book", "Knowledge", "Repository"],
  ["chart", "Digital Twin", "Monitoring"],
  ["users", "Outreach &", "Collaboration"],
  ["snow", "AI Insights &", "Predictions"],
];
const nav = [
  ["home", "Dashboard"],
  ["book", "Polar Research Repository"],
  ["flag", "Expedition Reports"],
  ["database", "Scientific Datasets"],
  ["file", "Publications"],
  ["image", "Photos / Videos"],
  ["search", "AI Semantic Search"],
  ["message", "RAG-based Assistant"],
  ["spark", "AI Summarization"],
  ["spark", "Content Generation"],
  ["megaphone", "Outreach & Media"],
  ["users", "Citizen Science"],
];
const expeditions = [
  ["Antarctic Summer Expedition 2024", "12 May 2024", "28 Files", "Antarctica"],
  ["Arctic Research Expedition 2024", "28 Apr 2024", "35 Files", "Arctic"],
  [
    "Bharati Station Maintenance Expedition",
    "10 Apr 2024",
    "18 Files",
    "Antarctica",
  ],
];
const aiSections = ["AI Semantic Search", "RAG-based Assistant", "AI Summarization"];
const publications = [
  [
    "Atmospheric Variability over East Antarctica During Summer 2023",
    "Journal of Polar Science",
    "May 2024",
  ],
  [
    "Sea Ice Dynamics and Climate Impact Assessment in the Southern Ocean",
    "Polar Research",
    "Apr 2024",
  ],
  [
    "Glacial Melt Patterns and Sea Level Projections for 2050",
    "Cryosphere Journal",
    "Apr 2024",
  ],
];
function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "dashboard-brand" : ""}`}>
      <div className="brand-mark">
        <Icon name="mountain" size={compact ? 29 : 36} />
      </div>
      <div>
        <div className="brand-name">
          <span>Polar</span>Nexus<sup>✦</sup>
        </div>
        <p>
          {compact
            ? "AI-Powered Polar Knowledge, Outreach & Digital Twin Platform"
            : "Connecting Knowledge. Advancing Polar Futures."}
        </p>
      </div>
    </div>
  );
}
function Preloader() {
  return (
    <div className="preloader">
      <div className="loader-orb">
        <Icon name="mountain" size={44} />
      </div>
      <div className="loader-word">
        <span>Polar</span>Nexus
      </div>
      <div className="loader-line">
        <i />
      </div>
      <p>Connecting knowledge. Advancing polar futures.</p>
    </div>
  );
}
function Login({ onLogin }) {
  const [role, setRole] = useState("Researcher"),
    [show, setShow] = useState(false),
    [username, setUsername] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (role === "Researcher") onLogin(username.trim() || "Researcher");
  };
  return (
    <main className="page">
      <section className="intro">
        <Brand />
        <div className="hero-copy">
          <p className="eyebrow">Welcome to</p>
          <h1>
            <em>AI-Powered</em>Polar Knowledge,
            <br />
            Outreach &<br />
            Digital Twin Platform
          </h1>
          <div className="blue-rule" />
          <p className="summary">
            Uniting polar research, real-time insights and intelligent
            monitoring to advance science, operations and collaboration in the
            world's final frontier.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(([i, a, b]) => (
            <article className="feature" key={a}>
              <div className="feature-icon">
                <Icon name={i} />
              </div>
              <p>
                {a}
                <br />
                {b}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="login-shell">
        <div className="role-switch">
          {["Researcher", "Scientist"].map((r) => (
            <button
              key={r}
              className={role === r ? "active" : ""}
              onClick={() => setRole(r)}
            >
              <Icon name={r === "Researcher" ? "user" : "flask"} size={18} />
              {r}
            </button>
          ))}
        </div>
        <div className="login-content">
          <div className="account-orb">
            <Icon name={role === "Researcher" ? "user" : "flask"} size={24} />
          </div>
          <h2>
            <span>{role}</span> Login
          </h2>
          <p className="login-description">
            Access research reports, publications, datasets, media and outreach
            resources.
          </p>
          <form onSubmit={submit}>
            <label>
              Username
              <div className="input-wrap">
                <Icon name="user" size={18} />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
            </label>
            <label>
              Password
              <div className="input-wrap">
                <Icon name="lock" size={18} />
                <input
                  required
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  <Icon name="eye" size={18} />
                </button>
              </div>
            </label>
            <button type="button" className="forgot">
              Forgot Password?
            </button>
            <button className="login-button" type="submit">
              Login <Icon name="arrow" size={20} />
              <span>✻</span>
            </button>
          </form>
          <div className="divider">or</div>
          <button
            className="google"
            type="button"
            onClick={() => role === "Researcher" && onLogin("Researcher")}
          >
            <b>G</b> Login with Google
          </button>
          <p className="secure">
            <Icon name="shield" size={16} /> Secure Access to Polar Intelligence
            Platform
          </p>
        </div>
      </section>
    </main>
  );
}
function Dashboard({ username, onLogout, onNavigate }) {
  const [active, setActive] = useState("Dashboard"),
    [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [notice, setNotice] = useState("");
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
    if (name !== "Dashboard")
      setNotice(`${name} selected — module ready to explore.`);
  };
  return (
    <div className="dashboard">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <Brand compact />
          <button className="close-nav" onClick={() => setOpen(false)}>
            <Icon name="x" />
          </button>
        </div>
        <nav>
          {nav.map(([i, name], n) => (
            <button
              key={name}
              className={`${active === name ? "selected" : ""} ${n === 6 ? "nav-break" : ""}`}
              onClick={() => choose(name)}
            >
              <Icon name={i} size={19} />
              <span>{name}</span>
            </button>
          ))}
        </nav>
        <div className="ai-card">
          <div>
            <Icon name="snow" size={27} />
          </div>
          <p>
            <b>PolarNexus AI</b>
            <span>Empowering research with intelligence & knowledge.</span>
          </p>
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across repository..."
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="user-area">
            <Icon name="user" size={20} />
            <span>Welcome, {username}</span>
            <button onClick={onLogout}>
              <Icon name="logout" size={20} />
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
        <section className="dash-hero">
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
                ✦ &nbsp; AI Semantic Search
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
        <section className="dash-grids">
          <article className="dash-card expeditions">
            <header>
              <h2>Recent Expeditions</h2>
              <button onClick={() => choose("Expedition Reports")}>
                View All
              </button>
            </header>
            {expeditions.map(([t, d, f, r], i) => (
              <button
                className="expedition-row"
                onClick={() => setNotice(`${t} opened.`)}
                key={t}
              >
                <div className={`thumb thumb-${i}`}>
                  <Icon name="mountain" size={23} />
                </div>
                <span>
                  <b>{t}</b>
                  <small>
                    {d}
                    <i /> {f}
                  </small>
                </span>
                <em>{r}</em>
                <Icon name="arrow" size={17} />
              </button>
            ))}
          </article>
          <article className="dash-card publications">
            <header>
              <h2>Latest Publications</h2>
              <button onClick={() => choose("Publications")}>View All</button>
            </header>
            {publications.map(([t, j, d]) => (
              <button
                className="publication-row"
                onClick={() => setNotice(`${t} opened.`)}
                key={t}
              >
                <Icon name="file" size={20} />
                <span>
                  <b>{t}</b>
                  <small>
                    {j}
                    <i /> {d}
                  </small>
                </span>
                <Icon name="download" size={19} />
              </button>
            ))}
          </article>
          <article className="dash-card actions">
            <header>
              <h2>Quick Actions</h2>
            </header>
            {[
              ["search", "AI Semantic Search"],
              ["message", "RAG-based Assistant"],
              ["spark", "AI Summarization"],
              ["spark", "Content Generation"],
              ["megaphone", "Outreach Portal"],
              ["users", "Citizen Science Hub"],
            ].map(([i, l]) => (
              <button onClick={() => choose(l)} key={l}>
                <Icon name={i} size={17} />
                <span>{l}</span>
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </article>
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
                "Digital twin intelligence",
                "Monitor station data, assets and operational signals in real time.",
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
        <section className="feature-banner">
          <div>
            <span>✦</span>
            <p>One connected polar ecosystem</p>
            <h2>Move from raw data to confident decisions.</h2>
            <p className="feature-copy">
              PolarNexus brings AI-assisted discovery, collaboration and
              Antarctic station awareness into a single secure platform.
            </p>
          </div>
          <button onClick={() => choose("Polar Research Repository")}>
            Explore the platform <Icon name="arrow" size={19} />
          </button>
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

const resourceConfigs = {
  "Polar Research Repository": {
    icon: "book",
    noun: "resources",
    count: "12,840+",
    subtitle:
      "Explore, discover and utilize polar research knowledge from expeditions, datasets, publications and media.",
    tabs: ["All Resources", "Reports", "Datasets", "Publications", "Media"],
    stats: [
      ["file", "12,840+", "Reports"],
      ["database", "8,420+", "Datasets"],
      ["book", "5,210+", "Publications"],
      ["image", "18,760+", "Media Files"],
    ],
  },
  "Expedition Reports": {
    icon: "flag",
    noun: "reports",
    count: "156",
    subtitle:
      "Explore detailed expedition reports from Indian Antarctic missions, field observations and station operations.",
    tabs: ["All Reports", "By Station", "By Expedition", "By Year", "By Topic"],
    stats: [
      ["file", "156", "Total Reports"],
      ["mountain", "12", "Stations"],
      ["snow", "28", "Expeditions"],
      ["calendar", "2024", "Latest Report"],
    ],
  },
  "Scientific Datasets": {
    icon: "database",
    noun: "datasets",
    count: "8,420+",
    subtitle:
      "Explore polar scientific datasets collected from expeditions, observations, instruments and monitoring systems.",
    tabs: [
      "All Datasets",
      "By Parameter",
      "By Location",
      "By Expedition",
      "By Year",
    ],
    stats: [
      ["database", "8,420+", "Total Datasets"],
      ["chart", "54,210+", "Parameters"],
      ["user", "126", "Locations"],
      ["download", "2.3 TB", "Total Data Size"],
    ],
  },
  Publications: {
    icon: "book",
    noun: "publications",
    count: "5,210+",
    subtitle:
      "Discover peer-reviewed research, articles, conference papers, technical reports and scientific publications on polar studies.",
    tabs: [
      "All Publications",
      "Journal Articles",
      "Conference Papers",
      "Technical Reports",
      "Books / Chapters",
    ],
    stats: [
      ["book", "5,210+", "Total Publications"],
      ["users", "3,458+", "Authors"],
      ["file", "286+", "Journals"],
      ["calendar", "2024", "Latest Publication"],
    ],
  },
  "Photos / Videos": {
    icon: "image",
    noun: "media items",
    count: "21,100",
    subtitle:
      "Explore visual stories from polar expeditions, research stations, field observations and scientific documentation.",
    tabs: [
      "All Media",
      "Photos",
      "Videos",
      "By Expedition",
      "By Location",
      "By Year",
    ],
    stats: [
      ["image", "18,760+", "Photos"],
      ["chart", "2,340+", "Videos"],
      ["user", "126+", "Locations"],
      ["calendar", "1985 – 2024", "Time Range"],
    ],
  },
  "Outreach & Media": {
    icon: "megaphone",
    noun: "outreach items",
    count: "28",
    subtitle:
      "Share polar knowledge with the world. Manage outreach content, campaigns, events and media to inspire diverse audiences.",
    tabs: [
      "All Content",
      "Campaigns",
      "Events",
      "Media Library",
      "Social Media",
      "News & Announcements",
    ],
    stats: [
      ["megaphone", "28", "Active Campaigns"],
      ["users", "52,430", "People Reached"],
      ["snow", "12,845", "Engagements"],
      ["image", "86", "Media Assets"],
      ["calendar", "14", "Events"],
    ],
  },
  "Citizen Science": {
    icon: "users",
    noun: "citizen science projects",
    count: "18",
    subtitle:
      "Engage the public in polar research. Enable participation in real-world observations and contribute to scientific discovery.",
    tabs: [
      "Ongoing Projects",
      "My Observations",
      "Pending Validations",
      "Project Explorer",
    ],
    stats: [
      ["users", "1,248", "Active Contributors"],
      ["file", "56,320", "Total Observations"],
      ["snow", "18", "Active Projects"],
      ["user", "24", "Regions Covered"],
      ["users", "320", "Top Contributors"],
    ],
  },
};
const recordTitles = {
  "Polar Research Repository": [
    "Indian Scientific Expedition to Antarctica 2023–24",
    "Antarctic Atmospheric Observation Dataset",
    "Sea Ice Dynamics and Climate Impact",
    "Maitri Station Aerial Survey Images",
    "Bharati Station Energy Systems",
    "Glacial Retreat Monitoring Archive",
    "Southern Ocean Biodiversity Assessment",
    "Polar Logistics and Supply Records",
    "Antarctic Meteorology Field Notes",
    "Ice Core Analysis Collection",
    "Aurora Observation Research Series",
    "Polar Geospatial Mapping Archive",
    "Citizen Science Ice Watch Reports",
    "Cryosphere Change Technical Review",
    "Marine Mammal Sighting Records",
    "Station Infrastructure Knowledge Base",
    "Polar Education Media Collection",
    "Climate Risk Assessment Reports",
    "Antarctic Treaty Research Papers",
    "Expedition Equipment Documentation",
  ],
  "Expedition Reports": [
    "41st Indian Scientific Expedition to Antarctica (2023–24)",
    "40th Indian Scientific Expedition to Antarctica (2022–23)",
    "39th Indian Scientific Expedition to Antarctica (2021–22)",
    "38th Indian Scientific Expedition to Antarctica (2020–21)",
    "37th Indian Scientific Expedition to Antarctica (2019–20)",
    "Arctic Research Expedition 2024",
    "Bharati Station Summer Operations 2024",
    "Maitri Winter Logistics Report",
    "Southern Ocean Transect Mission",
    "Larsemann Hills Field Survey",
    "Antarctic Ice Shelf Reconnaissance",
    "Polar Atmospheric Campaign Report",
    "Indian Ocean Gateway Expedition",
    "Glacier Mass Balance Mission",
    "Penguin Colony Observation Mission",
    "Antarctic Geology Field Campaign",
    "Sea Ice Navigation Assessment",
    "Renewable Energy Station Review",
    "High Latitude Weather Mission",
    "Polar Communications Field Report",
  ],
  "Scientific Datasets": [
    "Antarctic Surface Temperature Data (1985–2024)",
    "Wind Speed & Direction Dataset (1990–2024)",
    "Snow Accumulation & Depth Dataset",
    "Sea Ice Concentration Dataset (2000–2024)",
    "Atmospheric CO₂ Concentration Data",
    "Southern Ocean Salinity Profiles",
    "Maitri Solar Radiation Measurements",
    "Bharati Station Energy Telemetry",
    "Glacier Velocity Observation Series",
    "Antarctic Precipitation Archive",
    "Ozone Layer Monitoring Dataset",
    "Marine Ecosystem Sampling Data",
    "Ice Core Chemistry Records",
    "Permafrost Temperature Monitoring",
    "Polar Aerosol Optical Depth Data",
    "Satellite Iceberg Tracking Dataset",
    "Geomagnetic Field Variation Data",
    "Ocean Current Mooring Records",
    "Antarctic Soil Moisture Survey",
    "Aurora Activity Observation Data",
  ],
  Publications: [
    "Atmospheric Rivers and Snowfall Variability in East Antarctica",
    "Sea Ice Dynamics in the Indian Ocean Sector",
    "Performance Evaluation of Maitri Station Energy Systems",
    "Glacial Retreat and Mass Balance in Larsemann Hills",
    "Geomagnetic Variations Observed at Bharati Station",
    "Southern Ocean Carbon Exchange Under Climate Change",
    "Antarctic Ice Shelf Stability Assessment",
    "Polar Aerosols and Cloud Formation",
    "Marine Biodiversity of the Indian Antarctic Sector",
    "Seasonal Ozone Variability over Antarctica",
    "Satellite Mapping of Antarctic Crevasses",
    "Renewable Microgrids for Polar Stations",
    "Long-Term Snow Accumulation Trends",
    "Polar Logistics Optimization Using AI",
    "Cryosphere Feedbacks in Global Climate Models",
    "Antarctic Meteorite Recovery Programme",
    "Ocean Acidification in High Latitude Waters",
    "Remote Sensing of Glacier Lake Change",
    "Citizen Science for Polar Conservation",
    "Polar Governance and Research Collaboration",
  ],
  "Photos / Videos": [
    "Maitri Station — Winter View",
    "Emperor Penguins at Shore",
    "Iceberg Calving Timelapse",
    "Aurora Australis",
    "Bharati Station — Summer",
    "Field Team on Glacier Survey",
    "Icebreaker MV Vasiliy Golovnin",
    "Glacier Crevasses",
    "Indian Flag at Maitri Station",
    "Weddell Seal Observation",
    "Southern Ocean Sunrise",
    "Antarctic Weather Balloon Launch",
    "Snow Tractor Logistics Run",
    "Ice Core Drilling Fieldwork",
    "Adélie Penguin Colony",
    "Bharati Research Laboratory",
    "Sea Ice Traverse Aerial View",
    "Polar Night Star Trails",
    "Station Wind Turbine Maintenance",
    "Glacial Lake Expedition",
  ],
  "Outreach & Media": [
    "Save Our Sea Ice",
    "World Polar Day 2024",
    "Life at Bharati Station",
    "Climate Change and Polar Ecosystems",
    "Amazing Aurora Australis!",
    "New Study Reveals Ice Core Secrets",
    "Polar Science for Schools",
    "Meet the Antarctic Research Team",
    "Southern Ocean Awareness Week",
    "Stories from the Ice Shelf",
  ],
  "Citizen Science": [
    "Penguin Watch: Population Monitoring",
    "Sea Ice Watch",
    "Polar Weather Reporter",
    "Antarctic Coast Cleanup Tracker",
    "Adélie Penguin Colony Sighting",
    "Sea Ice Fracture Pattern Observed",
    "Temperature Reading −12.4 °C",
    "Unusual Ice Formation Noted",
    "Marine Wildlife Observation",
    "Glacier Change Photo Survey",
  ],
};

function ResourcePage({
  section,
  username,
  onDashboard,
  onLogout,
  onNavigate,
}) {
  const config = resourceConfigs[section];
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState(config.tabs[0]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const records = useMemo(
    () =>
      recordTitles[section].map((title, index) => ({
        title,
        index,
        type:
          section === "Photos / Videos"
            ? index % 3 === 2
              ? "Video"
              : "Photo"
            : section === "Outreach & Media"
              ? ["Campaign", "Event", "Video", "Blog", "Social Post", "Press Release"][index % 6]
              : section === "Citizen Science"
                ? ["Active Project", "My Observation", "Pending Validation", "Explorer Project"][index % 4]
            : section === "Scientific Datasets"
              ? "Dataset"
              : section === "Publications"
                ? "Journal Article"
                : section === "Expedition Reports"
                  ? "Expedition Report"
                  : ["Expedition Report", "Dataset", "Publication", "Media"][
                      index % 4
                    ],
        date: `${String(12 - (index % 10)).padStart(2, "0")} May 2024`,
        size:
          section === "Scientific Datasets"
            ? `${(0.8 + index * 0.2).toFixed(1)} GB`
            : section === "Photos / Videos"
              ? `${(4 + index * 1.3).toFixed(1)} MB`
              : `${(1.2 + index * 0.4).toFixed(1)} MB`,
      })),
    [section],
  );
  const tabRecords = records.filter((record) => {
    if (section === "Outreach & Media") {
      const groups = { "All Content": records.map((item) => item.type), Campaigns: ["Campaign"], Events: ["Event"], "Media Library": ["Video", "Blog"], "Social Media": ["Social Post"], "News & Announcements": ["Press Release"] };
      return groups[tab]?.includes(record.type);
    }
    if (section === "Citizen Science") {
      const groups = { "Ongoing Projects": ["Active Project"], "My Observations": ["My Observation"], "Pending Validations": ["Pending Validation"], "Project Explorer": ["Explorer Project"] };
      return groups[tab]?.includes(record.type);
    }
    return true;
  });
  const filtered = tabRecords.filter((record) =>
    record.title.toLowerCase().includes(query.toLowerCase()),
  );
  const select = (name) => {
    if (name === "Dashboard") onDashboard();
    else if (resourceConfigs[name] || aiSections.includes(name)) onNavigate(name);
    else setNotice(`${name} selected — feature ready to explore.`);
    setOpen(false);
  };
  return (
    <div className={`dashboard resource-page ${section === 'Outreach & Media' ? 'outreach-page' : section === 'Citizen Science' ? 'citizen-page' : ''}`}>
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${config.noun}...`}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="user-area">
            <Icon name="user" size={20} />
            <span>Welcome, {username}</span>
            <button onClick={onLogout}>
              <Icon name="logout" size={20} />
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
        <section className="resource-hero">
          <div>
            <h1>{section}</h1>
            <p>{config.subtitle}</p>
            <div className="resource-search">
              <Icon name="search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${config.noun}...`}
              />
              <button
                onClick={() =>
                  setNotice(`${filtered.length} matching ${config.noun} found.`)
                }
              >
                ✦ &nbsp; AI Semantic Search
              </button>
            </div>
            <div className="resource-stats">
              {config.stats.map(([icon, value, label]) => (
                <article key={label}>
                  <div>
                    <Icon name={icon} size={25} />
                  </div>
                  <span>
                    <b>{value}</b>
                    <small>{label}</small>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="resource-layout">
          <div className="resource-results">
            <div className="resource-tabs">
              {config.tabs.map((label) => (
                <button
                  className={tab === label ? "active" : ""}
                  onClick={() => setTab(label)}
                  key={label}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="result-toolbar">
              <span>
                Showing {filtered.length ? 1 : 0}–{filtered.length} of{" "}
                {config.count} {config.noun}
              </span>
              <button>Sort by: Latest⌄</button>
            </div>
            {filtered.map((record) => (
              <article
                className={`resource-row ${section === "Photos / Videos" || section === "Outreach & Media" || section === "Citizen Science" ? "media-row" : ""}`}
                key={record.title}
              >
                <div className="resource-thumb visual-thumb" style={{ backgroundPosition: `${(record.index * 17) % 100}% ${(record.index * 23) % 100}%` }}>
                  <Icon
                    name={section === "Photos / Videos" || section === "Outreach & Media" || section === "Citizen Science" ? "image" : config.icon}
                    size={28}
                  />
                  <em>{record.type}</em>
                </div>
                <div className="resource-info">
                  <h3>{record.title}</h3>
                  <p>
                    {section === "Photos / Videos"
                      ? "Captured during polar field operations and scientific documentation."
                      : section === "Outreach & Media"
                        ? "Polar outreach content designed to inform, inspire and engage a global audience."
                        : section === "Citizen Science"
                          ? "Community-powered polar observation supporting real-world scientific discovery."
                      : `Comprehensive ${record.type.toLowerCase()} covering polar research, observations and findings.`}
                  </p>
                  <small>
                    {record.type} <i /> Open Access
                  </small>
                </div>
                <div className="resource-meta">
                  <span>{record.date}</span>
                  <b>{record.size}</b>
                </div>
                <button
                  className="row-action"
                  onClick={() => setNotice(`${record.title} download started.`)}
                >
                  <Icon name="download" size={19} />
                </button>
              </article>
            ))}
          </div>
          <aside className="filter-panel">
            <div className="filter-title">
              <h2>Filters</h2>
              <button
                onClick={() => {
                  setQuery("");
                  setTab(config.tabs[0]);
                }}
              >
                Clear All
              </button>
            </div>
            <label>
              Resource Type
              <select>
                <option>All Types</option>
                <option>{section}</option>
              </select>
            </label>
            <label>
              Research Area
              <select>
                <option>All Research Areas</option>
                <option>Antarctica</option>
                <option>Southern Ocean</option>
              </select>
            </label>
            <label>
              Year Range
              <select>
                <option>All Years</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </label>
            <label>
              Tags / Keywords
              <input placeholder="Search tags or keywords..." />
            </label>
            <button
              className="apply-filter"
              onClick={() => setNotice("Filters applied to the resource list.")}
            >
              ⌕ &nbsp; Apply Filters
            </button>
            <div className="side-actions">
              <h3>Quick Actions</h3>
              <button
                onClick={() => setNotice("A new collection has been created.")}
              >
                Create Collection
              </button>
              <button
                onClick={() =>
                  setNotice("Your selected resources are ready to download.")
                }
              >
                Download Selected
              </button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

function AiToolPage({ section, username, onDashboard, onLogout, onNavigate }) {
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

function AiSemanticSearchSection({ setNotice }) {
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

function RagAssistantSection({ setNotice }) {
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

function AiSummarizationSection({ setNotice }) {
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

export default function App() {
  const [loading, setLoading] = useState(true),
    [user, setUser] = useState(null);
  const [section, setSection] = useState("Dashboard");
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      {loading && <Preloader />}
      {user ? (
        section === "Dashboard" ? (
          <Dashboard
            username={user}
            onLogout={() => {
              setUser(null);
              setSection("Dashboard");
            }}
            onNavigate={setSection}
          />
        ) : aiSections.includes(section) ? (
          <AiToolPage
            section={section}
            username={user}
            onDashboard={() => setSection("Dashboard")}
            onLogout={() => { setUser(null); setSection("Dashboard"); }}
            onNavigate={setSection}
          />
        ) : (
          <ResourcePage
            section={section}
            username={user}
            onDashboard={() => setSection("Dashboard")}
            onLogout={() => {
              setUser(null);
              setSection("Dashboard");
            }}
            onNavigate={setSection}
          />
        )
      ) : (
        <Login
          onLogin={(name) => {
            setUser(name);
            setSection("Dashboard");
          }}
        />
      )}
    </>
  );
}
