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

function App() {
  // Websocket data
  const [websocketRef, status] = useWebsocket(
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
      </Navbar>

      <Controls websocketRef={websocketRef} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/replays"
          element={<Replays websocketRef={websocketRef} />}
        />
      </Routes>
    </div>
  );
}

export default App;
