import React from "react";

export default function MissionTimer({ mission_time }) {
  // Convert ms to HH:MM:SS
  const mission_duration = new Date(mission_time).toISOString().slice(11, 19);

  return (
    <div id="mission-timer">
      <p style={{ fontWeight: 200, fontSize: "0.8rem" }}>
        <strong style={{ fontWeight: 400 }}>Mission duration: </strong>
        {mission_duration}
      </p>
    </div>
  );
}
