import { useState, useRef } from "react";
import TelemetryHeader from "./components/TelemetryHeader";
import TelemetryDashboard from "./components/TelemetryDashboard";
import CommandInterface from "./components/CommandInterface";
import type { CommandInterfaceHandle } from "./components/CommandInterface";
import CommandDialog from "./components/CommandDialog";

import { MapProvider } from "./contexts/MapContext";

function App() {
	const commandInterfaceRef = useRef<CommandInterfaceHandle>(null);
	const [open, setOpen] = useState(false);
	
	function handleOpenCommandDialog() {
		setOpen(true);
	}
	
	function handleCommandSelect(command: string) {
		if (commandInterfaceRef.current) {
			commandInterfaceRef.current.sendCommandFromDialog(command);
		}
	}
	
	return (
		<MapProvider>
			<div className="w-full h-full bg-[#F1F0EE] flex flex-col gap-2 p-2">
				<TelemetryHeader onCommandOpen={handleOpenCommandDialog} />
				<TelemetryDashboard />
				<CommandInterface ref={commandInterfaceRef} />

				{/* Command Dialog - can be opened with Cmd+K (Mac) or Ctrl+K (Windows/Linux) */}
				<CommandDialog 
					open={open} 
					onOpenChange={setOpen} 
					onCommandSelect={handleCommandSelect}
				/>
			</div>
		</MapProvider>
	);
}

export default App;
