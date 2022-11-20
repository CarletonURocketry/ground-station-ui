import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useState } from "react";
import { useKey } from "./hooks/useKey";

// Components
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import PageLink from "./components/nav/PageLink";
import { NavLink } from 'react-router-dom';

// Utilities
import { set_resolution } from "./utils/storage";

// Pages
import Home from "./pages/Home";
import Replays from "./pages/Replays";

function App() {
  // Websocket data
  set_resolution(10); // Keep 10 historical points
  const [websocketRef, status] = useWebsocket(
    "ws://localhost:33845/websocket",
    true
  );

  // Current pageS
  const [currentPage, setCurrentPage] = useState("/"); // To Do: Have the current page link highlighted red

  return (
    <div id="App">
      <Navbar version={status.version} org={status.org} status={status.status}>
        <NavLink exact className={({ isActive }) => (isActive ? "link-active" : "link")} to="/" >Home</NavLink>
        <NavLink to="/replays" className={({ isActive }) => (isActive ? "link-active" : "link")}>Replays</NavLink> 
      </Navbar>
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
