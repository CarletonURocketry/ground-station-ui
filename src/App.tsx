import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useWebSocketContext } from "./contexts/useWebSocketContext";
import Card from "./components/card/Card";
import LineChart from "./components/charts/LineChart";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { WebSocketData } from "./constants/types";
import TemperatureGauge from "./components/charts/TemperatureGauge";
import HumidityGauge from "./components/charts/HumidityGauge";
import PressureGauge from "./components/charts/PressureGauge";

function App() {
  const { data, sendCommand } = useWebSocketContext();
  const telemetryData = data?.telemetry;
  return (
    <div className="App">
      {data ? (
  <div style={{width: "100%", height: "100%"}}>
    <p>test: {JSON.stringify(telemetryData)}</p>
    {/* <p>test: {telemetryData?.velocity.mission_time}</p> */}
    <div style={{ height: "500px", width: "100%"}}>
    {telemetryData && (
      <>
      <Card bodyComponent={<TemperatureGauge temperature={telemetryData.temperature.celsius[0]} />} />
      <Card bodyComponent={
                <LineChart<WebSocketData['telemetry']['altitude']>
                telemetryData={telemetryData.altitude}
                xDataKey="mission_time"
                yDataKey="metres"
              />
      } />
        {/* <TemperatureGauge temperature={telemetryData.temperature.celsius[0]} />
        <HumidityGauge humidity={telemetryData.humidity.percentage[0]} />
        <PressureGauge pressure={telemetryData.pressure.pascals[0]/1000} />
        <LineChart<WebSocketData['telemetry']['altitude']>
          telemetryData={telemetryData.altitude}
          xDataKey="mission_time"
          yDataKey="metres"
        />
      <h3>Linear Acceleration - X Axis</h3>
      <LineChart<WebSocketData['telemetry']['linear_acceleration']>
          telemetryData={telemetryData.linear_acceleration}
          xDataKey="mission_time"
          yDataKey="x"
        />
              <h3>Linear Acceleration - Y Axis</h3>
      <LineChart<WebSocketData['telemetry']['linear_acceleration']>
          telemetryData={telemetryData.linear_acceleration}
          xDataKey="mission_time"
          yDataKey="y"
        />
              <h3>Linear Acceleration - Z Axis</h3>
      <LineChart<WebSocketData['telemetry']['linear_acceleration']>
          telemetryData={telemetryData.linear_acceleration}
          xDataKey="mission_time"
          yDataKey="z"
        /> */}
      </>
      )}
    </div>
  </div>
) : (
  <p>No data yet...</p>
)}
<button
  onClick={() =>
    // sendCommand("serial rn2483_radio connect /dev/tty.usbserial-0001")
    sendCommand("telemetry replay play TestData")
  }
>
  Send Command
</button>
    </div>
  );
}

export default App;

