import React, { useState } from "react";
import "./TopBar.css";
import Switch from "react-switch";

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
      <img src="logoandtexttransparentsmol.png" className="logo-png" alt="" />
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
        <div className="theme-switch">
          {ThemeSwitch()}
        </div>
      </div>
    </div>
  );
}

function ThemeSwitch() {
  const [isLightTheme, setIsLightTheme] = useState(true)

  function handleSwitchChange() {
    setIsLightTheme(!isLightTheme);
    if (isLightTheme) {
      document.documentElement.classList.add("light-mode");
    }
    else {
      document.documentElement.classList.remove("light-mode");
    }
  }

  return (
    <Switch onChange={handleSwitchChange} checked={isLightTheme}
      offColor="#00B5E2"
      offHandleColor="#f7f749"
      onColor="#265396"
      onHandleColor="#ebe9bd"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  )
}

export default TopBar;
