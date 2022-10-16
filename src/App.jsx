import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useState } from "react";

// Components
import { Routes, Route, json } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import PageLink from "./components/nav/PageLink";

// Pages
import Home from "./pages/Home";

function App() {
  // Websocket data
  const [data, setData] = useWebsocket("ws://localhost:33845/websocket");
  console.log(data);

  // Unpack and distribute data
  var telemetry_data = null;
  var version = "X.X.X";
  var organization = "CU InSpace";
  var status = null;
  if (data) {
    telemetry_data = data.telemetry_data;
    version = data.version;
    organization = data.org;
    status = data.status;
  }

  // Current page
  const [currentPage, setCurrentPage] = useState("/"); // To Do: Have the current page link highlighted red

  return (
    <div id="App">
      <Navbar version={version} org={organization} status={status}>
        <PageLink to="/">Home</PageLink>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home data={telemetry_data} />} />
      </Routes>
    </div>
  );
}

export default App;
