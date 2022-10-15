import "./App.css";

// Hooks
import { useWebsocket } from "./hooks/useWebsocket";
import { useState } from "react";

// Components
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import PageLink from "./components/nav/PageLink";

// Pages
import Home from "./pages/Home";

function App() {
  // Websocket data
  const [data, setData] = useWebsocket("ws://localhost:33845/websocket");
  console.log(data);

  // Current page
  const [currentPage, setCurrentPage] = useState("/"); // To Do

  return (
    <div id="App">
      <Navbar>
        <PageLink to="/">Home</PageLink>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
