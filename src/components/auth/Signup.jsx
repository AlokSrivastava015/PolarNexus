import React, { useState } from "react";
import Icon from "../common/Icon";
import Brand from "../common/Brand";
import { features } from "../../data/mockData";
import { signup } from "../../services/api";

export default function Signup({ onSignup, onLogin }) {
  const [role, setRole] = useState("Researcher");
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setSubmitting(true);
    try {
      const user = await signup({ username: form.username.trim(), email: form.email.trim(), password: form.password, full_name: form.fullName.trim() || null, role: role.toLowerCase() });
      onSignup(user.full_name || user.username);
    } catch (requestError) {
      setError(requestError.message || "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="page">
    <section className="intro">
      <Brand />
      <div className="hero-copy"><p className="eyebrow">Join PolarNexus</p><h1><em>Build knowledge</em> for the world’s<br />final frontier.</h1><div className="blue-rule" /><p className="summary">Create your secure account to access polar research, datasets, outreach resources and intelligent tools.</p></div>
      <div className="feature-grid">{features.map(([icon, first, second]) => <article className="feature" key={first}><div className="feature-icon"><Icon name={icon} /></div><p>{first}<br />{second}</p></article>)}</div>
    </section>
    <section className="login-shell signup-shell">
      <div className="role-switch">{["Researcher", "Scientist"].map((item) => <button key={item} type="button" className={role === item ? "active" : ""} onClick={() => setRole(item)}><Icon name={item === "Researcher" ? "user" : "flask"} size={18} />{item}</button>)}</div>
      <div className="login-content"><div className="account-orb"><Icon name="user" size={24} /></div><h2>Create <span>Account</span></h2><p className="login-description">Your password is securely managed by Supabase Auth.</p>
        <form onSubmit={submit}>
          <label>Full name<div className="input-wrap"><Icon name="user" size={18} /><input value={form.fullName} onChange={update("fullName")} placeholder="Enter your name" /></div></label>
          <label>Username<div className="input-wrap"><Icon name="user" size={18} /><input value={form.username} onChange={update("username")} required minLength="3" placeholder="Choose a username" /></div></label>
          <label>Email<div className="input-wrap"><Icon name="message" size={18} /><input value={form.email} onChange={update("email")} required type="email" placeholder="Enter your email" /></div></label>
          <label>Password<div className="input-wrap"><Icon name="lock" size={18} /><input value={form.password} onChange={update("password")} required type="password" minLength="12" placeholder="At least 12 characters" /></div></label>
          <label>Confirm password<div className="input-wrap"><Icon name="lock" size={18} /><input value={form.confirmPassword} onChange={update("confirmPassword")} required type="password" placeholder="Repeat your password" /></div></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-button" type="submit" disabled={submitting}>{submitting ? "Creating account…" : "Create Account"}<Icon name="arrow" size={20} /><span>✻</span></button>
        </form>
        <p className="auth-switch">Already have an account? <button type="button" onClick={onLogin}>Sign in</button></p>
      </div>
    </section>
  </main>;
}
