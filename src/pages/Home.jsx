import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";

export default function Home() {
  // Altitude data callbacks
  const get_altitude_x = (data) => {
    return data.map((packet) => packet.altitude.mission_time / 1000);
  };
  const get_altitude_y = (data) => {
    return data.map((packet) => packet.altitude.altitude.metres);
  };

  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <DashboardGraph
          title="Altitude"
          x_title="Time (s)"
          y_title="Altitude (m)"
          x_cb={get_altitude_x}
          y_cb={get_altitude_y}
        />
      </section>
    </main>
  );
}
