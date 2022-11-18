import { useEffect, useState, useRef } from "react";
import { write_telemetry } from "../utils/storage";

/**
 * Connects to a websocket and receives incoming data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} websocket_address The URL address where the websocket is located
 * @returns Latest data as a state variable and a reference to the websocket
 */
export function useWebsocket(websocket_address) {
  const websocketRef = useRef(null);
  const [waitingForReconnect, setWaitingForReconnect] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  // Open connection
  const onOpen = () => {
    setIsOpen(true);
    console.log("Connected to websocket server.");
  };

  // Receiving data
  const onMessage = (event) => {
    if (event.data) {
      write_telemetry(JSON.parse(event.data).telemetry_data); // Write to local storage
      console.log(JSON.parse(event.data).telemetry_data);
    }
  };

  useEffect(() => {
    if (waitingForReconnect) {
      return;
    }
    setIsOpen(false);

    if (!websocketRef.current) {
      const websocket = new WebSocket(websocket_address);
      websocketRef.current = websocket;

      websocket.onopen = onOpen;
      websocket.onmessage = onMessage;
      websocket.onclose = () => {
        if (waitingForReconnect) {
          return;
        }

        console.log("Disconnected from websocket.");

        setIsOpen(false);
        setWaitingForReconnect(true);
        setTimeout(() => setWaitingForReconnect(null), 2000);
      };

      return () => {
        websocketRef.current = null;
        websocket.close();
      };
    }
  }, [waitingForReconnect]);

  return websocketRef;
}
