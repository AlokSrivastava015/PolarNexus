import React, { useState } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import { features } from "../../data/mockData";

export default function Login({ onLogin }) {
  const [role, setRole] = useState("Researcher");
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");

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
