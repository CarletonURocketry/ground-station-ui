import React from "react";
import "./Navbar.css";

// Components
import MissionTimer from "./MissionTimer";

// Utils
import { clear_telemetry } from "../../utils/storage";

export default function Navbar({ version, org, status, children }) {
  // Unpack data
  var board_connected = false; // Assume disconnect
  var call_sign = "Flightless";
  var status_name = "Grounded";
  var mission_time = 0; // Start at 0
  if (status) {
    board_connected = status.rn2483_radio.connected;
    call_sign = status.rocket.call_sign;
    status_name = status.rocket.status.status_name;
    mission_time = status.rocket.last_mission_time;
  }

  const connection = board_connected ? "connected" : "disconnected";

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
          <MissionTimer mission_time={mission_time} />
          <p>{`${call_sign} | ${status_name}`}</p>
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
