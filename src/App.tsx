import React, { useEffect, useState } from "react";
import "./App.css";
import { useWebSocketContext } from "./contexts/useWebSocketContext";
import LineChart from "./components/charts/LineChart";
import TemperatureGauge from "./components/charts/TemperatureGauge";
import HumidityGauge from "./components/charts/HumidityGauge";
import PressureGauge from "./components/charts/PressureGauge";
import TopBar from "./components/topbar/TopBar";
import { ComponentPosition } from "./constants/types";
import ComponentGrid from "./components/grid/grid";
import CoordinatesMap from "./components/charts/CoordinatesMap";
import MultiLineChart from "./components/charts/MultiLineChart";
import CommandLineComponent from "./components/CommandLine/CommandLine";
import CommandLine from "./components/CommandLine/CommandLine";

const initialLayout: ComponentPosition[] = [
  { i: 'Altitude', x: 0, y: 0, w: 2, h: 2 },
  { i: 'Linear Acceleration', x: 2, y: 0, w: 2, h: 2 },
  { i: 'Angular Velocity', x: 4, y: 0, w: 2, h: 2 },
  { i: 'Humidity', x: 0, y: 2, w: 1, h: 2 },
  { i: 'Pressure', x: 1, y: 2, w: 1, h: 2 },
  { i: 'Temperature', x: 2, y: 2, w: 1, h: 2 },
  // { i: 'Coordinates', x: 3, y: 2, w: 1, h: 2 },
];

function App() {
  const { data, sendCommand } = useWebSocketContext();
  const [layout, setLayout] = useState<ComponentPosition[]>(initialLayout);
  const [apogee, setApogee] = useState<number | string>("No data");

  const deleteComponent = (i: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== i));
  };

  const telemetryData = data?.telemetry;
  const rocketStatus = data?.status;

  // Calculate Apogee
  // Calculate and update Apogee
  useEffect(() => {
    if (telemetryData) {
      const altitudeMetres = telemetryData.altitude_launch_level.metres || [];
      const currentMaxAltitude = altitudeMetres.length > 0 ? Math.max(...altitudeMetres) : 0;
      setApogee(prevApogee => {
        if (prevApogee === "No data") return currentMaxAltitude;
        return Math.max(prevApogee as number, currentMaxAltitude);
      });
    }
  }, [telemetryData]);
  
  // const inclination = telemetryData ? "0.10°" : "No data";
  const inclination = "No data"
  const availablePorts = rocketStatus?.serial.available_ports || [];

  if (!telemetryData) {
    return (<p>Waiting for backend</p>);
  }

  const componentMap = {
    Altitude: <LineChart telemetryData={telemetryData.altitude_launch_level} xDataKey="mission_time" yDataKey="metres" />,
    Humidity: <HumidityGauge humidity={telemetryData.humidity.percentage[0] || 0} />,
    Pressure: <PressureGauge pressure={telemetryData.pressure.pascals[0] || 0} />,
    Temperature: <TemperatureGauge temperature={telemetryData.temperature.celsius[0] || 0} />,
    "Linear Acceleration": <MultiLineChart telemetryData={telemetryData.linear_acceleration_rel} />,
    "Angular Velocity": <MultiLineChart telemetryData={telemetryData.angular_velocity} />,
  };
  return (
    <div className="App">
      <TopBar
        spacecraft={data?.rocket || "No data"}
        missionTime={telemetryData ? `T+${telemetryData.last_mission_time / 1000}` : "No data"}
        altitude={telemetryData.altitude_launch_level.metres[0]?.toString() || "No data"}
        apogee={apogee.toString() || "No data"}
        inclination={inclination}
        availablePorts={availablePorts}
      />
      <CommandLine sendCommand={sendCommand} />
      <ComponentGrid
        layout={layout}
        setLayout={setLayout}
        deleteComponent={deleteComponent}
        isEditorModeOn={true} // Change this to manage edit mode
        componentMap={componentMap}
      />
      <CoordinatesMap latitude={telemetryData.coordinates.latitude.at(-1) || undefined} longitude={telemetryData.coordinates.longitude.at(-1) || undefined} />
    </div>
  );
}

export default App;
