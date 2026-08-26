import React, { useState } from "react";
import Icon from "./Icon";

export default function AddAccountModal({ isOpen, onClose, onSwitchUser }) {
  const [activeTab, setActiveTab] = useState("switch"); // 'switch' | 'add'
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Senior Researcher");

  if (!isOpen) return null;

  const existingAccounts = [
    { name: "Dr. Ananya Sen", email: "ananya.sen@polarnexus.org", role: "Principal Scientist", active: true },
    { name: "Prof. Mark Johnson", email: "m.johnson@polar-institute.org", role: "Climate Researcher", active: false },
    { name: "Dr. Rajesh Kumar", email: "rajesh.k@ncoea.gov.in", role: "Expedition Commander", active: false },
  ];

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      onSwitchUser(newUsername.trim());
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="account-modal-card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="header-title">
            <Icon name="userPlus" size={22} />
            <div>
              <h3>Account Manager</h3>
              <p>Switch between accounts or connect a new research identity.</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </header>

        <div className="modal-tab-bar">
          <button
            className={activeTab === "switch" ? "active" : ""}
            onClick={() => setActiveTab("switch")}
          >
            Saved Accounts
          </button>
          <button
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
            + Add Another Account
          </button>
        </div>

        {activeTab === "switch" ? (
          <div className="modal-body accounts-list">
            {existingAccounts.map((acc) => (
              <div
                key={acc.email}
                className="account-item-row"
                onClick={() => {
                  onSwitchUser(acc.name);
                  onClose();
                }}
              >
                <div className="avatar-circle">
                  <Icon name="user" size={18} />
                </div>
                <div className="account-item-info">
                  <b>{acc.name}</b>
                  <small>{acc.email} • {acc.role}</small>
                </div>
                {acc.active ? (
                  <span className="active-badge">Active</span>
                ) : (
                  <button className="switch-btn">Switch</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <form className="modal-body add-account-form" onSubmit={handleAddAccount}>
            <label>
              Full Name
              <input
                type="text"
                placeholder="e.g. Dr. Elena Vance"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Research Email Address
              <input
                type="email"
                placeholder="elena@polar-research.org"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Role / Institution
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="Senior Researcher">Senior Researcher</option>
                <option value="Expedition Lead">Expedition Lead</option>
                <option value="Field Analyst">Field Analyst</option>
                <option value="Guest Scholar">Guest Scholar</option>
              </select>
            </label>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add & Switch Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
