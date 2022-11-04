import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useEffect, useState } from "react";

// Components
import { Routes, Route, json } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import PageLink from "./components/nav/PageLink";

// Utilities
import {
  read_telemetry,
  write_telemetry,
  set_resolution,
  clear_telemetry,
} from "./utils/storage";

// Pages
import Home from "./pages/Home";

function App() {
  // Websocket data
  const [data, websocket] = useWebsocket("ws://localhost:33845/websocket");
  console.log(data);

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

  return (
    <div id="App">
      <Navbar version={version} org={organization} status={status}>
        <PageLink to="/">Home</PageLink>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
