import React, { useState } from "react";
import "./App.css";
import { useWebSocketContext } from "./contexts/useWebSocketContext";
import LineChart from "./components/charts/LineChart";
import TemperatureGauge from "./components/charts/TemperatureGauge";
import HumidityGauge from "./components/charts/HumidityGauge";
import PressureGauge from "./components/charts/PressureGauge";
import TopBar from "./components/topbar/TopBar";
import { ComponentPosition } from "./constants/types";
import ComponentGrid from "./components/grid/grid";

const initialLayout: ComponentPosition[] = [
  { i: 'Altitude', x: 0, y: 0, w: 2, h: 2 },
  { i: 'Humidity', x: 2, y: 0, w: 2, h: 2 },
  { i: 'Pressure', x: 4, y: 0, w: 2, h: 2 },
  { i: 'Temperature', x: 0, y: 2, w: 2, h: 2 },
  { i: 'LinearAcceleration', x: 2, y: 2, w: 2, h: 2 },
  { i: 'AngularVelocity', x: 4, y: 2, w: 2, h: 2 },
  { i: 'Coordinates', x: 0, y: 4, w: 1, h: 1 },
];

function App() {
  const { data, sendCommand } = useWebSocketContext();
  const [layout, setLayout] = useState<ComponentPosition[]>(initialLayout);

  const deleteComponent = (i: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== i));
  };

  const telemetryData = data?.telemetry;

  // Calculate Apogee
  const altitudeMetres = telemetryData?.altitude_launch_level.metres || [];
  const apogee = altitudeMetres.length > 0 ? Math.max(...altitudeMetres) : "No data";

  // Placeholder for Inclination
  const inclination = telemetryData ? "No data" : "No data";

  if (!telemetryData) {
    return (<p>Waiting</p>);
  }

  const componentMap = {
    Altitude: <LineChart telemetryData={telemetryData.altitude_launch_level} xDataKey="mission_time" yDataKey="metres" />,
    Humidity: <HumidityGauge humidity={telemetryData.humidity.percentage[0] || 0} />,
    Pressure: <PressureGauge pressure={telemetryData.pressure.pascals[0] || 0} />,
    Temperature: <TemperatureGauge temperature={telemetryData.temperature.celsius[0] || 0} />,
    LinearAcceleration: <LineChart telemetryData={telemetryData.linear_acceleration_rel} xDataKey="mission_time" yDataKey="magnitude" />,
    AngularVelocity: <LineChart telemetryData={telemetryData.angular_velocity} xDataKey="mission_time" yDataKey="magnitude" />,
    Coordinates: (
      <div>
      <p>
        Latitude: {telemetryData.coordinates.latitude[0] || "No data"}, 
        Longitude: {telemetryData.coordinates.longitude[0] || "No data"}
      </p>
    </div>
    ),
  };
console.log(telemetryData.coordinates.latitude)
  return (
    <div className="App">
      <TopBar
        spacecraft={data?.rocket || "No data"}
        missionTime={telemetryData ? `T+${telemetryData.last_mission_time / 1000}` : "No data"}
        altitude={altitudeMetres[0]?.toString() || "No data"}
        apogee={apogee.toString() || "No data"}
        inclination={inclination}
      />
      <ComponentGrid
        layout={layout}
        setLayout={setLayout}
        deleteComponent={deleteComponent}
        isEditorModeOn={true} // Change this to manage edit mode
        componentMap={componentMap}
      />
      <button
        onClick={() => sendCommand("telemetry replay play TestData")}
      >
        Send Command
      </button>
    </div>
  );
}

export default App;
