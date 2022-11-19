import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";
import GaugeGraph from "../components/main-dash/GaugeGraph";

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

  //Temperature data callbacks
  const get_temp_y = (data) => {
    return data.map((packet) => packet.altitude.temperature.celsius);
  };

  //Velocity data callbacks
  const get_velocity_y = (data) => {
    return data.map((packet) => packet.gnss.speed);
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
      
      < GaugeGraph 
        x_cb ={get_altitude_mission_time }
        y_cb = {get_temp_y}
        unit = "°C"
        min = {0}
        max = {100}
        colour1 = "blue"
        colour2= "red"
        className = "card" /> 

       <GaugeGraph
       x_cb={get_altitude_mission_time}
       y_cb={get_pressure_y}
       unit = "KPa"
       min = {0}
       max = {120}
       colour1 = "red"
       colour2 = "green"
       className = "card"/>

       <DashboardGraph
       title="Veloctiy"
       x_title="Time (s)"
       y_title="Velocity (m/s)"
       x_cb={get_altitude_mission_time}
       y_cb={get_velocity_y}
      />

      </section>
    </main>
  );
}