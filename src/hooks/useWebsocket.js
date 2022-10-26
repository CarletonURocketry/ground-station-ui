import { useEffect, useState } from "react";
/**
 * Connects to a websocket and receives incoming data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} websocket_address
 * @returns Latest data as a state variable
 */
export function useWebsocket(websocket_address) {
  const [data, setData] = useState(null); // Initialize data as null until info is received from websocket
  const [reconnect, setReconnect] = useState(true); // Reconnection is attempted everytime this value is flipped

  useEffect(() => {
    // Create websocket
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
      setReconnect((reconnect) => !reconnect);
    };
  }, [reconnect]);

  return data;
}
