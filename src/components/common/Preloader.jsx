import React from "react";
import Icon from "./Icon";

export default function Preloader() {
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
