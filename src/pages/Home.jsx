import React from "react";
import "./Home.css";

// Components
import AltitudeGraph from "../components/main-dash/AltitudeGraph";

export default function Home() {
  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <AltitudeGraph className="card" />
      </section>
    </main>
  );
}
