import TelemetryHeader from "./components/TelemetryHeader";
import TelemetryDashboard from "./components/TelemetryDashboard";
import CommandInterface from "./components/CommandInterface";

import { useWebSocketContext } from "./contexts/WebsocketContext";

function App() {
  const { data } = useWebSocketContext();

  console.log(data);
  return (
    <div className="w-full h-full bg-[#F1F0EE] flex flex-col gap-2 p-2">
      <TelemetryHeader />
      <TelemetryDashboard />
      <CommandInterface />
    </div>
  );
}

export default App;
