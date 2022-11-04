import { useEffect, useState, useRef } from "react";
/**
 * Connects to a websocket and receives incoming data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} websocket_address The URL address where the websocket is located
 * @returns Latest data as a state variable and a reference to the websocket
 */
export function useWebsocket(websocket_address) {
  const [data, setData] = useState(null); // Initialize data as null until info is received from websocket
  const [reconnect, setReconnect] = useState(true); // Reconnection is attempted everytime this value is flipped
  const websocket = useRef();

  useEffect(() => {
    // Create websocket
    websocket.current = new WebSocket(websocket_address);

    // Open connection
    websocket.current.onopen = () => {
      console.log("Connected to websocket server.");
    };

    // Receiving data
    websocket.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    // Closing connection
    websocket.current.onclose = () => {
      console.log("Disconnected from websocket server.");
      setData(null); // Reset data to null so there is indication that the connection was closed
      setReconnect((reconnect) => !reconnect);
    };
  }, [reconnect]);

  return [data, websocket];
}
