import React from "react";
import "./Home.css";

// Components
import DashboardGraph from "../../components/dashboard/DashboardGraph";
import GaugeGraph from "../../components/dashboard/GaugeGraph";
import GNSSMeta from "../../components/dashboard/GNSSMeta";
import Card from "../../components/card/Card";
import GridLayout from 'react-grid-layout';
import LineChart from "../../components/dashboard/LineChart";

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
    <LineChart
      y_title={"Velocity (m/s)"}
      x_title={"Time (s)"}
      x_cb={get_velocity_mission_time}
      y_cb={get_acceleration_y}
    />,
    <LineChart
      y_title={"Altitude (m)"}
      x_title={"Time (s)"}
      x_cb={get_altitude_mission_time}
      y_cb={get_altitude_y}
    />,
    <LineChart
      y_title={" Acceletation (m/s²)"}
      x_title={"Time (s)"}
      x_cb={get_acceleration_mission_time}
      y_cb={get_acceleration_y}
      zoom_y={0}
    />,
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
    <GNSSMeta/>
  ]

  const numColumns = 4 // Number of columns in the grid
  const defaultItemWidth = 2 // Set the default width for all items
  const defaultItemHeight = 3 // Set the default height for all items
  const spacingX = 4 // Horizontal spacing between items
  const spacingY = 4 // Vertical spacing between items
  const minWidth = 1 // Minimum width for grid items
  const minHeight = 3 // Minimum height for grid items
  const containerWidth = (window.innerWidth * 0.8)
  
  // Create layout items for each component in graphArray with equal spacing
  const gridItems = graphArray.map((component, index) => {
    const col = index % numColumns
    const row = Math.floor(index / numColumns)
    const x = col * (defaultItemWidth + spacingX)
    const y = row * (defaultItemHeight + spacingY)

    return {
      i: `item${index}`,
      x,
      y,
      w: defaultItemWidth,
      h: defaultItemHeight,
      minW: minWidth,
      minH: minHeight
    }
  });
  const handleLayoutChange = (newLayouts) => {
    // Handle layout changes here
    console.log('Layout changed:', newLayouts);
  };

  return (
    <main id="home" className="page-main">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <GridLayout
          className="layout"
          layout={gridItems}
          cols={numColumns}
          rowHeight={100}
          width={containerWidth}
          onLayoutChange={handleLayoutChange}
          isResizable={true} // Enable resize handles
          isBounded={true}
          margin={[spacingX, spacingY]}
        >
          {graphArray.map((component, index) => (
            <div key={`item${index}`}>
              <Card key={index} bodyComponent={component} />
            </div>
          ))}
        </GridLayout>
      </section>
    </main>
  );
}
