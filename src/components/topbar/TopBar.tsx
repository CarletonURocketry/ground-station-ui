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
        <div className="theme-switch">{ThemeSwitch()}</div>
      </div>
    </div>
  );
}

function ThemeSwitch() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  function handleSwitchChange() {
    setIsLightTheme(!isLightTheme);
    if (isLightTheme) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }

  return (
    <Switch
      onChange={handleSwitchChange}
      checked={isLightTheme}
      checkedHandleIcon={
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#1C274C"
            ></path>{" "}
          </g>
        </svg>
      }
      uncheckedHandleIcon={
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      }
      // the following is a workaround to extract css variables and pass them
      // as props because the Switch library only supports hex values
      onColor={window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--red-color")}
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
}

export default TopBar;
