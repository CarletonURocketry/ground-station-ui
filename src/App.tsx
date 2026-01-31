// import { useState, useRef } from "react";
import TelemetryHeader from "./components/header/TelemetryHeader";
// import TelemetryDashboard from "./components/TelemetryDashboard";
// import FloatingMenu from "./components/FloatingMenu";

// import { MapProvider } from "./contexts/MapContext";
import { Menu } from "./components/Menu";
import { useTelemetryStore } from "./store/telemetryStore";
import { Dashboard } from "./components/Dashboard";
// useState left commented out in case command dialog wiring is re-enabled

function App() {
  const { data } = useTelemetryStore();

  console.log("Telemetry packets:", data);
  return (
    // <MapProvider>
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <TelemetryHeader />
      <div className="w-full h-full flex flex-row space-y-4">
        <div className="flex-1">
          <Dashboard />
          {/* <TelemetryDashboard /> */}
        </div>
        {/* <FloatingMenu /> */}
        <div>
          <Menu />
        </div>
      </div>
    </div>
    // </MapProvider>
  );
}

export default App;
