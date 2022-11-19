import React from "react";

export default function ReplayItem({ name, websocketRef }) {
  const command = (event) => {
    websocketRef.current.send(`telemetry replay play ${name}`);
  };

  return <p onClick={command}>{name}</p>;
}
