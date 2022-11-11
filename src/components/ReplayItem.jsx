import React from "react";

export default function ReplayItem({ name, websocket }) {
  const command = (event) => {
    websocket.current.send(`replay ${name}`);
  };

  return <p onClick={command}>{name}</p>;
}
