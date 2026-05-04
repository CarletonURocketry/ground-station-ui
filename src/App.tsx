import TelemetryHeader from "./components/header/TelemetryHeader";
import { Menu } from "./components/Menu";
import { Dashboard } from "./components/Dashboard";
import { QueryProvider } from "./contexts/QueryProvider";

function App() {
  return (
    <QueryProvider>
      {/* <MapProvider> */}
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

      {/* </MapProvider> */}
    </QueryProvider>
  );
}

export default App;
