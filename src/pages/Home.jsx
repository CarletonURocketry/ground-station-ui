import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";
import GaugeGraph from "../components/main-dash/GaugeGraph";

export default function Home() {
  // Altitude data callbacks
  const get_altitude_mission_time = (data) => {
    return data.altitude.map((packet) => packet.mission_time / 1000);
  };
  const get_altitude_y = (data) => {
    return data.altitude.map((packet) => packet.altitude.metres);
  };

  // Pressure data callbacks
  const get_pressure_y = (data) => {
    return data.altitude.map((packet) => packet.pressure.kilopascals);
  };

  // Temperature data callbacks
  const get_temp_y = (data) => {
    return data.altitude.map((packet) => packet.temperature.celsius);
  };

  // Velocity data callbacks
  const get_velocity_y = (data) => {
    return data.gnss.map((packet) => packet.speed);
  };

  const get_velocity_mission_time = (data) => {
    return data.gnss.map((packet) => packet.mission_time / 1000);
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
          className="card"
        />

        <GaugeGraph
          title="Temperature"
          x_cb={get_altitude_mission_time}
          y_cb={get_temp_y}
          unit="°C"
          min={0}
          max={100}
          inner_colour_1="blue"
          inner_colour_2="red"
          outer_colour="blue"
          className="card"
        />

        <GaugeGraph
          title="Pressure"
          x_cb={get_altitude_mission_time}
          y_cb={get_pressure_y}
          unit="KPa"
          min={0}
          max={120}
          inner_colour_1="red"
          inner_colour_2="green"
          outer_colour="red"
          className="card"
        />

        <DashboardGraph
          title="Velocity"
          x_title="Time (s)"
          y_title="Velocity (m/s)"
          x_cb={get_velocity_mission_time}
          y_cb={get_velocity_y}
          className="card"
        />
      </section>
    </main>
  );
}
