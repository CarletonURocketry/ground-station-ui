import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../components/main-dash/DashboardGraph";
import GaugeGraph from "../components/main-dash/GaugeGraph";
import GNSSMeta from "../components/main-dash/GNSSMeta";
import Card from "../components/card/Card";

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
    return data.altitude.map((packet) => packet.pressure.pascals / 1000); // kPa
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

  // Acceleration data callbacks
  const get_acceleration_y = (data) => {
    return data.mpu9250_imu.map((packet) => packet.accel_y);
  };

  const get_acceleration_mission_time = (data) => {
    return data.mpu9250_imu.map((packet) => packet.mission_time / 1000);
  };

  const graphArray = [
    <GaugeGraph
      title="Temperature"
      x_cb={get_altitude_mission_time}
      y_cb={get_temp_y}
      unit="°C"
      min={-20}
      max={50}
      inner_colour_1="red"
      inner_colour_2="blue"
      outer_colour="blue"
    />,
    <GNSSMeta/>,
    <DashboardGraph
      title="Altitude"
      x_title="Time"
      x_unit="s"
      y_title="Altitude"
      y_unit="m"
      x_cb={get_altitude_mission_time}
      y_cb={get_altitude_y}
      line_colour={2}
    />,
    <DashboardGraph
      title="Velocity"
      x_title="Time"
      x_unit="s"
      y_title="Velocity"
      y_unit="m/s"
      x_cb={get_velocity_mission_time}
      y_cb={get_velocity_y}
      line_colour={1}
    />,
    <DashboardGraph
      title="Acceleration"
      x_title="Time"
      x_unit="s"
      y_title="Acceleration"
      y_unit="m/s&#178;"
      x_cb={get_acceleration_mission_time}
      y_cb={get_acceleration_y}
      line_colour={1}
    />
  ]

  return (
    <main id="home" className="page-main">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        {graphArray.map((component, index) => (
          <Card key={index} bodyComponent={component} />
        ))}
      </section>
    </main>
  );
}
