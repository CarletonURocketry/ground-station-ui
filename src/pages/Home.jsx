import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <div className="card" id="1"></div>
        <div className="card" id="2"></div>
        <div className="card" id="3"></div>
        <div className="card" id="4"></div>
        <div className="card" id="5"></div>
        <div className="card" id="6"></div>
        <div className="card" id="7"></div>
      </section>
    </main>
  );
}
