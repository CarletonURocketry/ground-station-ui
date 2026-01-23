import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./index.css";
import App from "./App.tsx";
import { WebSocketProvider } from "./contexts/WebSocketContext.tsx";

const hostname = window.location.hostname;
const wsUrl = `ws://${hostname}:33845/websocket`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebSocketProvider url={wsUrl}>
      <App />
    </WebSocketProvider>
  </StrictMode>
);
