import React from "react";
import Icon from "./Icon";
import { useTheme } from "./ThemeContext";

export default function SettingsModal({
  isOpen,
  onClose,
  onOpenAddAccount,
  onLogout,
}) {
  const { themeMode, setThemeMode } = useTheme();

  if (!isOpen) return null;

  const themes = [
    {
      id: "light",
      label: "1 - Light",
      subtext: "Clean, crisp high-contrast layout",
      icon: "sun",
    },
    {
      id: "dark",
      label: "2 - Dark",
      subtext: "Deep polar night dark theme",
      icon: "moon",
    },
    {
      id: "default",
      label: "3 - Default (Device)",
      subtext: "Matches system appearance",
      icon: "monitor",
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-modal-card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="header-title">
            <Icon name="settings" size={22} />
            <div>
              <h3>Settings & Preferences</h3>
              <p>Customize system behavior, themes and session settings.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </header>

        <div className="settings-body">
          {/* Theme Section */}
          <section className="settings-group">
            <div className="group-label">
              <Icon name="sun" size={18} />
              <div>
                <h4>Appearance & Theme</h4>
                <p>Choose your preferred interface theme style.</p>
              </div>
            </div>

            <div className="theme-options-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-card ${themeMode === t.id ? "active" : ""}`}
                  onClick={() => setThemeMode(t.id)}
                >
                  <div className="theme-icon-wrap">
                    <Icon name={t.icon} size={20} />
                  </div>
                  <div className="theme-card-info">
                    <b>{t.label}</b>
                    <small>{t.subtext}</small>
                  </div>
                  {themeMode === t.id && (
                    <span className="check-mark">
                      <Icon name="checkCircle" size={16} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <hr className="settings-divider" />

          {/* Account Section */}
          <section className="settings-group">
            <div className="group-label">
              <Icon name="userPlus" size={18} />
              <div>
                <h4>Account & Profiles</h4>
                <p>Add auxiliary accounts or switch existing logins.</p>
              </div>
            </div>

            <button
              type="button"
              className="settings-action-btn"
              onClick={() => {
                onClose();
                onOpenAddAccount();
              }}
            >
              <div className="btn-icon">
                <Icon name="userPlus" size={18} />
              </div>
              <div className="btn-text">
                <b>Add another account</b>
                <small>Connect institutional or secondary polar research identity</small>
              </div>
              <Icon name="chevronRight" size={16} />
            </button>
          </section>

          <hr className="settings-divider" />

          {/* Logout Section */}
          <section className="settings-group">
            <div className="group-label danger">
              <Icon name="logout" size={18} />
              <div>
                <h4>Session & Security</h4>
                <p>Terminate current active session securely.</p>
              </div>
            </div>

            <button
              type="button"
              className="settings-action-btn logout-btn"
              onClick={() => {
                onClose();
                onLogout();
              }}
            >
              <div className="btn-icon">
                <Icon name="logout" size={18} />
              </div>
              <div className="btn-text">
                <b>Logout</b>
                <small>Safely log out of your PolarNexus workspace</small>
              </div>
              <Icon name="arrow" size={16} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
