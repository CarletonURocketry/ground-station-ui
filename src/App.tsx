// import { useState, useRef } from "react";
import TelemetryHeader from "./components/TelemetryHeader";
import TelemetryDashboard from "./components/TelemetryDashboard";
import FloatingMenu from "./components/FloatingMenu";
// import CommandInterface from "./components/CommandInterface";
// import type { CommandInterfaceHandle } from "./components/CommandInterface";
// import CommandDialog from "./components/CommandDialog";

import { MapProvider } from "./contexts/MapContext";
import SideBar from "./components/SideBar";
import { useState } from "react";

function App() {
  // const commandInterfaceRef = useRef<CommandInterfaceHandle>(null);
  // const [open, setOpen] = useState(false);

  // function handleOpenCommandDialog() {
  //   setOpen(true);
  // }

  // function handleCommandSelect(command: string) {
  //   if (commandInterfaceRef.current) {
  //     commandInterfaceRef.current.sendCommandFromDialog(command);
  //   }
  // }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <MapProvider>
      <div className="w-full h-full bg-[#F1F0EE] flex flex-col gap-2 p-2">
        <TelemetryHeader/>
        <div className="w-full h-full flex flex-row gap-4">
          {/** Sidebar on the left; conditionally rendered */}
          {isSidebarOpen && <SideBar />}
          <div className="flex-1">
            <TelemetryDashboard />
          </div>
          <FloatingMenu onToggleSidebar={(nextOpen: boolean) => setIsSidebarOpen(nextOpen)} />
        </div>
        
        
        {/* <CommandInterface ref={commandInterfaceRef} /> */}

        {/* Command Dialog - can be opened with Cmd+K (Mac) or Ctrl+K (Windows/Linux) */}
        {/* <CommandDialog
          open={open}
          onOpenChange={setOpen}
          onCommandSelect={handleCommandSelect}
        /> */}
      </div>
    </MapProvider>
  );
}

export default App;
