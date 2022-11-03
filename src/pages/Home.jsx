import React from "react";
import "./Home.css";

// Components
import AltitudeGraph from "../components/main-dash/AltitudeGraph";
import AccerlerationGraph from "../components/main-dash/AccerlerationGraph";

export default function Home() {
  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <AltitudeGraph className="card" />
        <AccerlerationGraph className = "card1"/>
      </section>
    </main>
  );
}
