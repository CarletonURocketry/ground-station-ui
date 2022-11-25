import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";
import GaugeGraph from "../components/main-dash/GaugeGraph";

export default function Home() {
  // Altitude data callbacks
  const get_altitude_mission_time = (data) => {
    console.log(data);
    let stuff = data.altitude.map((packet) => packet.mission_time / 1000);
    console.log(stuff);
    return stuff;
  };
  const get_altitude_y = (data) => {
    return data.altitude.map((packet) => packet.altitude.metres);
  };

  // Pressure data callbacks
  const get_pressure_y = (data) => {
    return data.pressure.map((packet) => packet.kilopascals);
  };

  // Temperature data callbacks
  const get_temp_y = (data) => {
    return data.temperature.map((packet) => packet.celsius);
  };

  // Velocity data callbacks
  const get_velocity_y = (data) => {
    return data.gnss.map((packet) => packet.speed);
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

        <GaugeGraph
          x_cb={get_altitude_mission_time}
          y_cb={get_temp_y}
          unit="°C"
          min={0}
          max={100}
          colour1="blue"
          colour2="red"
          className="card"
        />

        <GaugeGraph
          x_cb={get_altitude_mission_time}
          y_cb={get_pressure_y}
          unit="KPa"
          min={0}
          max={120}
          colour1="red"
          colour2="green"
          className="card"
        />

        <DashboardGraph
          title="Velocity"
          x_title="Time (s)"
          y_title="Velocity (m/s)"
          x_cb={get_altitude_mission_time}
          y_cb={get_velocity_y}
        />
      </section>
    </main>
  );
}
