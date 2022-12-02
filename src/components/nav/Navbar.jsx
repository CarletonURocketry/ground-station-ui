import React from "react";
import "./Navbar.css";

// Components
import MissionTimer from "./MissionTimer";

// Utils
import { clear_telemetry } from "../../utils/storage";

export default function Navbar({ version, org, status, children }) {
  // Convert connection status
  const connection = status.rn2483_radio.connected
    ? "connected"
    : "disconnected";

  // Handle deployment status
  const deployment = status.rocket.deployment_state_text
    ? status.rocket.deployment_state_text.toUpperCase()
    : "DNE";

  // Handle mission name
  const mission_name = status.mission ? status.mission.name : "";

  return (
    <nav>
      <div id="rocket-info">
        <div id="logo">
          <img
            src={require("../../assets/colour_logo.png")}
            alt="CuInSpace Logo"
          />
        </div>
        <div id="sub-info">
          <div>
            <h1 id="org">{org}</h1>
            <p id="version">{`v${version}`}</p>
          </div>
          <MissionTimer mission_time={status.rocket.last_mission_time} />
          <p>{`${mission_name} | ${deployment}`}</p>
        </div>
        <p id="connection-status" className={connection}>
          {connection}
        </p>
      </div>
      <button onClick={clear_telemetry}>clr strg</button>
      <div id="nav-links">{children}</div>
    </nav>
  );
}
