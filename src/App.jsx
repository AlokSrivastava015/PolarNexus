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
    else if (resourceConfigs[name]) onNavigate(name);
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
