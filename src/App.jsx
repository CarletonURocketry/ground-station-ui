import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useKey } from "./hooks/useKey";
import { useEffect, useState } from "react";

// Components
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import PageLink from "./components/nav/PageLink";

// Utilities
import { write_telemetry, set_resolution } from "./utils/storage";

// Pages
import Home from "./pages/Home";
import Replays from "./pages/Replays";

function App() {
  // Websocket data
  const [data, websocket] = useWebsocket("ws://localhost:33845/websocket");

  // Unpack and distribute data
  var version = "X.X.X";
  var organization = "CU InSpace";
  var status = null;

  if (data) {
    version = data.version;
    organization = data.org;
    status = data.status;
  }

  // Write the newest data to local storage so it can be accessed anywhere
  set_resolution(10);
  useEffect(() => {
    if (data) {
      write_telemetry(data.telemetry_data);
    }
  }, [data]);

  // Current page
  const [currentPage, setCurrentPage] = useState("/"); // To Do: Have the current page link highlighted red

  // Update, connect and disconnect commands
  useKey("KeyK", "shift", () => {
    websocket.current.send("serial rn2483_radio connect test");
  });
  useKey("KeyD", "shift", () => {
    websocket.current.send("serial rn2483_radio disconnect");
  });

  return (
    <div id="App">
      <Navbar version={version} org={organization} status={status}>
        <PageLink to="/">Home</PageLink>
        <PageLink to="/replays">Replays</PageLink>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/replays" element={<Replays websocket={websocket} />} />
      </Routes>
    </div>
  );
}

export default App;
