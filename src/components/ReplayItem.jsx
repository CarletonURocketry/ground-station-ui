import React from "react";
import "./ReplayItem.css";

import { clear_telemetry } from "../utils/storage";

export default function ReplayItem({ name, websocketRef }) {
  const command = (event) => {
    websocketRef.current.send(`telemetry replay play ${name}`);
    clear_telemetry(); // All data should be wiped because a new mission is starting
  };

  return (
    <li className="replay-item" onClick={command}>
      {name}
    </li>
  );
}
