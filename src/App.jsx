import { useEffect, useState } from 'react';

const Icon = ({ name, size = 24 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    mountain: <><path d="m3 18 5-8 3 4 3-6 7 10"/><path d="M3 20h18"/><path d="m7.5 10 .7-1.2.7 1.2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4.8 20c.7-4.1 3.1-6.2 7.2-6.2s6.5 2.1 7.2 6.2"/></>,
    flask: <><path d="M9 3h6"/><path d="M10 3v6l-5 8.3A2.4 2.4 0 0 0 7.1 21h9.8a2.4 2.4 0 0 0 2.1-3.7L14 9V3"/><path d="M8.1 15h7.8"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z"/></>,
    chart: <><path d="M4 20V4h16v16Z"/><path d="m7 16 3-4 3 2 4-6"/><path d="M16 8h1v1"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6"/><path d="M16 5a3 3 0 0 1 0 5.8"/><path d="M18 14c2 .5 3 2.5 3 6"/></>,
    snow: <><path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M7.7 4.5 12 7l4.3-2.5M7.7 19.5 12 17l4.3 2.5"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/></>,
    eye: <><path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5Z"/><circle cx="12" cy="12" r="2"/></>,
    shield: <path d="M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6Z"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

const features = [
  ['book', 'Knowledge', 'Repository'], ['chart', 'Digital Twin', 'Monitoring'],
  ['users', 'Outreach &', 'Collaboration'], ['snow', 'AI Insights &', 'Predictions'],
];

function Preloader() {
  return <div className="preloader" aria-label="Loading PolarNexus">
    <div className="loader-orb"><Icon name="mountain" size={44} /></div>
    <div className="loader-word"><span>Polar</span>Nexus</div>
    <div className="loader-line"><i /></div>
    <p>Connecting knowledge. Advancing polar futures.</p>
  </div>;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('Researcher');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  const submit = (event) => { event.preventDefault(); };
  return <>
    {loading && <Preloader />}
    <main className={`page ${loading ? 'page-hidden' : ''}`}>
      <section className="intro">
        <div className="brand"><div className="brand-mark"><Icon name="mountain" size={36}/></div><div><div className="brand-name"><span>Polar</span>Nexus<sup>✦</sup></div><p>Connecting Knowledge. Advancing Polar Futures.</p></div></div>
        <div className="hero-copy"><p className="eyebrow">Welcome to</p><h1><em>AI-Powered</em>Polar Knowledge,<br/>Outreach &<br/>Digital Twin Platform</h1><div className="blue-rule"/><p className="summary">Uniting polar research, real-time insights and intelligent monitoring to advance science, operations and collaboration in the world's final frontier.</p></div>
        <div className="feature-grid">{features.map(([icon, first, second]) => <article className="feature" key={icon}><div className="feature-icon"><Icon name={icon}/></div><p>{first}<br/>{second}</p></article>)}</div>
      </section>
      <section className="login-shell">
        <div className="role-switch" role="tablist" aria-label="Account type">
          {['Researcher', 'Scientist'].map((item) => <button key={item} className={role === item ? 'active' : ''} onClick={() => setRole(item)} role="tab" aria-selected={role === item}><Icon name={item === 'Researcher' ? 'user' : 'flask'} size={18}/>{item}</button>)}
        </div>
        <div className="login-content"><div className="account-orb"><Icon name={role === 'Researcher' ? 'user' : 'flask'} size={24}/></div><h2><span>{role}</span> Login</h2><p className="login-description">{role === 'Researcher' ? 'Access research reports, publications, datasets, media and outreach resources.' : 'Access research tools, station intelligence, data and scientific collaboration resources.'}</p>
          <form onSubmit={submit}><label>Username<div className="input-wrap"><Icon name="user" size={18}/><input required placeholder="Enter your username" aria-label="Username" /></div></label><label>Password<div className="input-wrap"><Icon name="lock" size={18}/><input required type={showPassword ? 'text' : 'password'} placeholder="Enter your password" aria-label="Password"/><button className="icon-button" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Show password"><Icon name="eye" size={18}/></button></div></label><button type="button" className="forgot">Forgot Password?</button><button className="login-button" type="submit">Login <Icon name="arrow" size={20}/><span>✻</span></button></form>
          <div className="divider">or</div><button className="google" type="button"><b>G</b> Login with Google</button><p className="secure"><Icon name="shield" size={16}/> Secure Access to Polar Intelligence Platform</p>
        </div>
      </section>
    </main>
  </>;
}

export default App;
