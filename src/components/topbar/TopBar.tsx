import React from "react";
import "./TopBar.css";

interface TopBarProps {
  spacecraft?: string;
  missionTime?: string;
  altitude?: string;
  apogee?: string;
  inclination?: string;
  availablePorts?: string[];
}

/**
 * TopBar Component
 * @param {string} spacecraft - The name of the spacecraft.
 * @param {string} missionTime - The mission time.
 * @param {string} altitude - The current altitude of the spacecraft.
 * @param {string} apogee - The highest altitude reached by the spacecraft.
 * @param {string} inclination - The inclination of the spacecraft's orbit.
 * @param {string[]} availablePorts - The list of available ports.
 * @returns {JSX.Element} The rendered TopBar component.
 */
function TopBar({
  spacecraft = "No data",
  missionTime = "No data",
  altitude = "No data",
  apogee = "No data",
  inclination = "No data",
  availablePorts = [],
}: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="logo">CUInSpace logo here</div>
      <div className="info">
        <div className="info-item">
          <span className="label">SPACECRAFT</span>
          <span className="value">{spacecraft}</span>
        </div>
        <div className="info-item">
          <span className="label">MISSION TIME</span>
          <span className="value">{missionTime}</span>
        </div>
        <div className="info-item">
          <span className="label">ALTITUDE</span>
          <span className="value">{altitude}</span>
        </div>
        <div className="info-item">
          <span className="label">APOGEE</span>
          <span className="value">{apogee}</span>
        </div>
        <div className="info-item">
          <span className="label">INCLINATION</span>
          <span className="value">{inclination}</span>
        </div>
        <div className="info-item">
          <select name="ports" id="ports" className="styled-select">
            {availablePorts.map((port) => (
              <option key={port} value={port} className="styled-option">
                {port}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
