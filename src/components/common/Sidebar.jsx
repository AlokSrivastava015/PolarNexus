import React, { useState } from "react";
import Icon from "./Icon";
import { useTheme } from "./ThemeContext";
import AddAccountModal from "./AddAccountModal";

export default function Sidebar({
  activeSection = "Home",
  onNavigate,
  onLogout,
  isOpen = false,
  onClose,
  onSwitchUser,
}) {
  const { themeMode, setThemeMode } = useTheme();
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [openSettingsDrawer, setOpenSettingsDrawer] = useState(false);

  const isDashboardActive = activeSection === "Home" || activeSection === "Dashboard";

  const handleNavClick = (targetName) => {
    if (onNavigate) {
      onNavigate(targetName);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleSettingsClick = () => {
    setOpenSettingsDrawer((prev) => !prev);
  };

  return (
    <>
      <aside className={`floating-sidebar sidebar-hover ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <button className="close-nav" onClick={onClose} aria-label="Close Navigation">
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {/* 1. Dashboard */}
          <div className="nav-group">
            <button
              className={`nav-item nav-dashboard ${isDashboardActive ? "active" : ""}`}
              onClick={() => handleNavClick("Home")}
            >
              <Icon name="home" size={21} />
              <span className="item-label">Dashboard</span>
            </button>
          </div>

          {/* 2. Knowledge Repository */}
          <div className="nav-group">
            <div className="section-header sidebar-category-heading">
              <Icon name="book" size={20} />
              <span>Knowledge Repository</span>
            </div>
            <div className="submenu-list">
              {[
                { id: "Research Papers", label: "Research Papers", icon: "file", target: "Polar Research Repository" },
                { id: "Expedition Reports", label: "Expedition Reports", icon: "flag", target: "Expedition Reports" },
                { id: "Scientific Datasets", label: "Scientific Datasets", icon: "database", target: "Scientific Datasets" },
                { id: "Publications", label: "Publications", icon: "book", target: "Publications" },
                { id: "Photos / Videos", label: "Photos / Videos", icon: "image", target: "Photos / Videos" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`submenu-item ${
                    activeSection === item.target || activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item.target)}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. AI Workspace */}
          <div className="nav-group">
            <div className="section-header sidebar-category-heading">
              <Icon name="spark" size={20} />
              <span>AI Workspace</span>
            </div>
            <div className="submenu-list">
              {[
                { id: "AI Assistant", label: "AI Assistant", icon: "message", target: "RAG-based Assistant" },
                { id: "Semantic Search", label: "Semantic Search", icon: "search", target: "AI Semantic Search" },
                { id: "AI Summarization", label: "AI Summarization", icon: "spark", target: "AI Summarization" },
                { id: "Content Studio", label: "Content Studio", icon: "edit", target: "Content Studio" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`submenu-item ${
                    activeSection === item.target || activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item.target)}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Insights */}
          <div className="nav-group">
            <div className="section-header sidebar-category-heading">
              <Icon name="chart" size={20} />
              <span>Insights</span>
            </div>
            <div className="submenu-list">
              {[
                { id: "Research Insights", label: "Research Insights", icon: "target", target: "Research Insights" },
                { id: "Knowledge Graph", label: "Knowledge Graph", icon: "network", target: "Knowledge Graph" },
                { id: "Polar Map", label: "Polar Map", icon: "globe", target: "Polar Map" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`submenu-item ${
                    activeSection === item.target || activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item.target)}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Outreach */}
          <div className="nav-group">
            <div className="section-header sidebar-category-heading">
              <Icon name="megaphone" size={20} />
              <span>Outreach</span>
            </div>
            <div className="submenu-list">
              {[
                { id: "Outreach & Media", label: "Outreach & Media", icon: "megaphone", target: "Outreach & Media" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`submenu-item ${
                    activeSection === item.target || activeSection === item.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item.target)}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Settings */}
          <div className="nav-group settings-group-nav">
            <button
              className={`nav-item section-header settings-trigger-btn ${
                openSettingsDrawer ? "open" : ""
              }`}
              onClick={handleSettingsClick}
            >
              <Icon name="settings" size={20} />
              <span>Settings</span>
              <Icon
                name={openSettingsDrawer ? "chevronDown" : "chevronRight"}
                size={16}
                className="settings-chevron"
              />
            </button>

            {/* Quick settings inline options inside sidebar */}
            {openSettingsDrawer && (
              <div className="sidebar-inline-settings">
                <div className="theme-selector-inline">
                  <span className="theme-label-sm">Theme Mode:</span>
                  <div className="theme-segmented">
                    <button
                      className={themeMode === "light" ? "active" : ""}
                      onClick={() => setThemeMode("light")}
                      title="Light Theme"
                    >
                      <Icon name="sun" size={15} />
                      Light
                    </button>
                    <button
                      className={themeMode === "dark" ? "active" : ""}
                      onClick={() => setThemeMode("dark")}
                      title="Dark Theme"
                    >
                      <Icon name="moon" size={15} />
                      Dark
                    </button>
                    <button
                      className={themeMode === "default" ? "active" : ""}
                      onClick={() => setThemeMode("default")}
                      title="System Theme"
                    >
                      <Icon name="monitor" size={15} />
                      Default
                    </button>
                  </div>
                </div>

                <button
                  className="submenu-item settings-subitem"
                  onClick={() => {
                    if (onClose) onClose();
                    setIsAddAccountModalOpen(true);
                  }}
                >
                  <Icon name="userPlus" size={17} />
                  <span>Add another account</span>
                </button>

                <button
                  className="submenu-item settings-subitem logout-subitem"
                  onClick={() => {
                    if (onClose) onClose();
                    onLogout();
                  }}
                >
                  <Icon name="logout" size={17} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onSwitchUser={(newUser) => {
          if (onSwitchUser) onSwitchUser(newUser);
        }}
      />
    </>
  );
}
