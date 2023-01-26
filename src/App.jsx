import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useState } from "react";

// Components
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import { NavLink } from "react-router-dom";
import Controls from "./components/controls/Controls";

// Pages
import Home from "./pages/Home";
import Replays from "./pages/Replays";
import Map from "./pages/Map";

function App() {
  // Websocket data
  const [websocketRef, status, replayStatus] = useWebsocket(
    "ws://localhost:33845/websocket",
    false
  );

  // Current pageS
  return (
    <div id="App">
      <Navbar version={status.version} org={status.org} status={status.status}>
        <NavLink
          className={({ isActive }) => (isActive ? "link-active" : "link")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          to="/replays"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          Replays
        </NavLink>
        <NavLink to="/Map"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        >Map</NavLink>
      </Navbar>

      <Controls websocketRef={websocketRef} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/replays"
          element={
            <Replays
              websocketRef={websocketRef}
              missions={replayStatus.mission_list}
            />
          }
        />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
