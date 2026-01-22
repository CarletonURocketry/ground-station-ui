// import { useState, useRef } from "react";
import TelemetryHeader from "./components/TelemetryHeader";
import TelemetryDashboard from "./components/TelemetryDashboard";
import FloatingMenu from "./components/FloatingMenu";

import { MapProvider } from "./contexts/MapContext";
// useState left commented out in case command dialog wiring is re-enabled

function App() {
  return (
    <MapProvider>
      <div className="w-full h-full bg-[#F1F0EE] flex flex-col gap-2 p-2">
        <TelemetryHeader />
        <div className="w-full h-full flex flex-row gap-4">
          <div className="flex-1">
            <TelemetryDashboard />
          </div>
          <FloatingMenu />
        </div>
      </div>
    </MapProvider>
  );
}

export default App;
