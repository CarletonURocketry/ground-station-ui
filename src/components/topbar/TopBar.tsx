import React from "react";
import "./TopBar.css";

interface TopBarProps {
  spacecraft?: string;
  missionTime?: string;
  altitude?: string;
  apogee?: string;
  inclination?: string;
}

function TopBar({
  spacecraft = "No data",
  missionTime = "No data",
  altitude = "No data",
  apogee = "No data",
  inclination = "No data",
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
      </div>
    </div>
  );
}

export default TopBar;
