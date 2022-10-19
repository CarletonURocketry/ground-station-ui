import React from "react";
import "./Navbar.css";

export default function Navbar({ version, org, status, children }) {
  // Unpack data
  var board_connected = false; // Assume disconnect
  var call_sign = "Nonexistent";
  var status_code = "-1";
  var status_name = "Dead";
  if (status) {
    board_connected = status.board.connected;
    call_sign = status.rocket.call_sign;
    status_code = status.rocket.status_code;
    status_name = status.rocket.status_name;
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
          <p>{`${call_sign} | ${status_code} | ${status_name}`}</p>
        </div>
        <p id="connection-status" className={connection}>
          {connection}
        </p>
      </div>
      <div id="nav-links">{children}</div>
    </nav>
  );
}
