import React from "react";
import Icon from "./Icon";

export default function Brand({ compact = false }) {
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
