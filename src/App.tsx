import React, { useState } from "react";
import "./App.css";
import { useWebSocketContext } from "./contexts/useWebSocketContext";
import LineChart from "./components/charts/LineChart";
import TemperatureGauge from "./components/charts/TemperatureGauge";
import HumidityGauge from "./components/charts/HumidityGauge";
import PressureGauge from "./components/charts/PressureGauge";
import TopBar from "./components/topbar/TopBar";
import ComponentGrid from "./components/grid/grid";
import { ComponentPosition } from "./constants/types";

const initialLayout: ComponentPosition[] = [
  { i: "Altitude", x: 0, y: 0, w: 2, h: 2 },
  { i: "Humidity", x: 2, y: 0, w: 2, h: 2 },
  { i: "Pressure", x: 4, y: 0, w: 2, h: 2 },
  { i: "VelocityX", x: 0, y: 2, w: 2, h: 2 },
  { i: "VelocityY", x: 2, y: 2, w: 2, h: 2 },
  { i: "VelocityZ", x: 4, y: 2, w: 2, h: 2 },
  // { i: "AccelerationX", x: 0, y: 0, w: 2, h: 2 },
  // { i: "AccelerationY", x: 0, y: 0, w: 2, h: 2 },
  // { i: "AccelerationZ", x: 0, y: 0, w: 2, h: 2 },
];

function App() {
  const { data, sendCommand } = useWebSocketContext();
  const [layout, setLayout] = useState<ComponentPosition[]>(initialLayout);

  const deleteComponent = (i: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== i));
  };

  const telemetryData = data?.telemetry;
  const rocketStatus = data?.status;

  const altitudeMetres = telemetryData?.altitude_launch_level.metres || [];
  const apogee =
    altitudeMetres.length > 0 ? Math.max(...altitudeMetres) : "No data";
  const inclination = telemetryData ? "0.10°" : "No data";
  const availablePorts = rocketStatus?.serial.available_ports || [];

  if (!telemetryData) {
    return <p>Waiting</p>;
  }

  const componentMap = {
    Altitude: (
      <LineChart
        telemetryData={telemetryData.altitude_launch_level}
        xDataKey="mission_time"
        yDataKey="metres"
      />
    ),
    Humidity: (
      <HumidityGauge humidity={telemetryData.humidity.percentage[0] || 0} />
    ),
    Pressure: (
      <PressureGauge pressure={telemetryData.pressure.pascals[0] || 0} />
    ),
    Temperature: (
      <TemperatureGauge
        temperature={telemetryData.temperature.celsius[0] || 0}
      />
    ),
    VelocityX: (
      <LineChart
        telemetryData={telemetryData.linear_acceleration_rel}
        xDataKey="mission_time"
        yDataKey="x"
      />
    ),
    VelocityY: (
      <LineChart
        telemetryData={telemetryData.linear_acceleration_rel}
        xDataKey="mission_time"
        yDataKey="y"
      />
    ),
    VelocityZ: (
      <LineChart
        telemetryData={telemetryData.linear_acceleration_rel}
        xDataKey="mission_time"
        yDataKey="z"
      />
    ),
    // AccelerationX: (
    //   <LineChart
    //     telemetryData={telemetryData.linear_acceleration_abs}
    //     xDataKey="mission_time"
    //     yDataKey="x"
    //   />
    // ),
    // AccelerationY: (
    //   <LineChart
    //     telemetryData={telemetryData.linear_acceleration_abs}
    //     xDataKey="mission_time"
    //     yDataKey="y"
    //   />
    // ),
    // AccelerationZ: (
    //   <LineChart
    //     telemetryData={telemetryData.linear_acceleration_abs}
    //     xDataKey="mission_time"
    //     yDataKey="z"
    //   />
    // ),
  };

  return (
    <div className="App">
      <TopBar
        spacecraft={data?.rocket || "No data"}
        missionTime={
          telemetryData
            ? `T+${telemetryData.last_mission_time / 1000}`
            : "No data"
        }
        altitude={altitudeMetres[0]?.toString() || "No data"}
        apogee={apogee.toString() || "No data"}
        inclination={inclination}
        availablePorts={availablePorts}
      />
      <ComponentGrid
        layout={layout}
        setLayout={setLayout}
        deleteComponent={deleteComponent}
        isEditorModeOn={true}
        componentMap={componentMap}
      />
      <button onClick={() => sendCommand("telemetry replay play TestData")}>
        Send Command
      </button>
    </div>
  );
}

export default App;
