import TelemetryHeader from "./components/TelemetryHeader";
import TelemetryDashboard from "./components/TelemetryDashboard";
import CommandInterface from "./components/CommandInterface";

import { useWebSocketContext } from "./contexts/WebsocketContext";
import { MapProvider } from "./contexts/MapContext";

function App() {
	const { data } = useWebSocketContext();

	console.log(data);
	return (
		<MapProvider>
			<div className="w-full h-full bg-[#F1F0EE] flex flex-col gap-2 p-2">
				<TelemetryHeader />
				<TelemetryDashboard />
				<CommandInterface />
			</div>
		</MapProvider>
	);
}

export default App;
