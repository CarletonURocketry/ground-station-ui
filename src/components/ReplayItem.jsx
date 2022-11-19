import React from "react";
import "./ReplayItem.css";

export default function ReplayItem({ name, websocketRef }) {
  const command = (event) => {
    websocketRef.current.send(`telemetry replay play ${name}`);
  };

  return (
    <li className="replay-item" onClick={command}>
      {name}
    </li>
  );
}
