import React from "react";

// Components
import ReplayItem from "../components/ReplayItem";

export default function Replays({ websocketRef }) {
  return (
    <main id="replays" className="page-main">
      <h1>Data Available for Replay</h1>
      <section>
        <ReplayItem name={"Devil The Rocket"} websocketRef={websocketRef} />
      </section>
    </main>
  );
}
