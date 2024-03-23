import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useWebSocketContext } from "./contexts/useWebSocketContext";
import Card from "./components/card/Card";
import LineChart from "./components/charts/LineChart";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { WebSocketData } from "./constants/types";

function App() {
  const { data, sendCommand } = useWebSocketContext();
  const telemetryData = data?.telemetry;
  return (
    <div className="App">
      {data ? (
  <div>
    <p>test: {JSON.stringify(telemetryData)}</p>
    <p>test: {telemetryData?.velocity.mission_time}</p>
    {/* <div style={{ height: "500px" }}>
    {telemetryData && (
      <>
              <LineChart<WebSocketData['telemetry']['altitude']>
          telemetryData={telemetryData.altitude}
          xDataKey="mission_time"
          yDataKey="metres"
        />
        <LineChart<WebSocketData['telemetry']['velocity']>
          telemetryData={telemetryData.velocity.y}
          xDataKey="mission_time"
          yDataKey="y"
        />
      </>
      )}
    </div> */}
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

