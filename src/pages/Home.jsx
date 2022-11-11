import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";

export default function Home() {
  // Altitude data callbacks
  const get_altitude_mission_time = (data) => {
    return data.map((packet) => packet.altitude.mission_time / 1000);
  };
  const get_altitude_y = (data) => {
    return data.map((packet) => packet.altitude.altitude.metres);
  };

  // Pressure data callbacks
  const get_pressure_y = (data) => {
    return data.map((packet) => packet.altitude.pressure.kilopascals);
  };

  return (
    <main id="home" className="page-main">
      <h1>Main Dashboard</h1>
      <section id="graphs">
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
