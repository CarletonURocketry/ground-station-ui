import React from "react";

// Components
import ReplayItem from "../components/ReplayItem";

export default function Replays({ websocketRef, missions }) {
  let replays = <></>;
  if (missions !== undefined) {
    replays = missions.map((mission) => (
      <ReplayItem
        name={mission.name}
        key={mission.name}
        websocketRef={websocketRef}
      />
    ));
  }

  return (
    <main id="replays" className="page-main">
      <h1>Data Available for Replay</h1>
      <section>{replays}</section>
    </main>
  );
}
