import React from "react";

// Components
import ReplayItem from "../components/ReplayItem";

export default function Replays({ websocket }) {
  return (
    <main id="replays" className="page-main">
      <h1>Data Available for Replay</h1>
      <section>
        <ReplayItem name={"Joyride"} websocket={websocket} />
        <ReplayItem name={"Crash Landing"} websocket={websocket} />
      </section>
    </main>
  );
}
