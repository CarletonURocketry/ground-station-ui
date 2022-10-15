import { useEffect, useState } from "react";

export function useWebsocket(websocket_address) {
  // Initialize data as null until info is received from websocket
  const [data, setData] = useState(null);

  useEffect(() => {
    // Connect to websocket
    var websocket = new WebSocket(websocket_address);

    // Open connection
    websocket.onopen = () => {
      console.log("Connected to websocket server.");
    };

    // Receiving data
    websocket.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    // Closing connection
    websocket.onclose = () => {
      console.log("Disconnected from websocket server.");
      setData(null); // Reset data to null so there is indication that the connection was closed
    };
  }, []);

  return [data, setData];
}
