import React from "react";
import "./Home.css";

// Components
import AltitudeGraph from "../components/main-dash/AltitudeGraph";
import AccerlerationGraph from "../components/main-dash/AccerlerationGraph";
import DashboardGraph from "../components/main-dash/DashboardGraph";

export default function Home() {
  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <AltitudeGraph className="card" />
        <AccerlerationGraph className = "card1"/>
        <DashboardGraph
          title="Altitude"
          x_title="Time (s)"
          y_title="Altitude (m)"
          x_cb={get_altitude_mission_time}
          y_cb={get_altitude_y}
        />
        <DashboardGraph
          title="Pressure"
          x_title="Time (s)"
          y_title="Pressure (kPa)"
          x_cb={get_altitude_mission_time}
          y_cb={get_pressure_y}
        />
      </section>
    </main>
  );
}

