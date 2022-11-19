import { useEffect, useState, useRef } from "react";
import { write_telemetry } from "../utils/storage";

/**
 * Connects to a websocket and receives incoming data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} websocket_address The URL address where the websocket is located
 * @param {boolean} debug Triggers data logging to console when true
 * @returns A reference to the current websocket instance and a state variable with status information
 */
export function useWebsocket(websocket_address, debug = false) {
  const websocketRef = useRef(null);
  const [waitingForReconnect, setWaitingForReconnect] = useState(null);

  // Define structure of status object with default values for before connection
  const [status, setStatus] = useState({
    version: "X.X.X",
    org: "CUInSpace",
    status: {
      rocket: {
        call_sign: "Flightless",
        status: {
          state: "Grounded",
        },
        last_mission_time: 0,
      },
      rn2483_radio: {
        connected: false,
      },
    },
  });

  // Open connection
  const onOpen = () => {
    console.log("Connected to websocket server.");
  };

  // Receiving data
  const onMessage = (event) => {
    var data = JSON.parse(event.data); // Parse incoming data

    if (debug) {
      console.log(data); // Data logging on debug
    }

    // Only write non-empty packets
    if (data.version != undefined) {
      write_telemetry(data.telemetry_data); // Write to local storage
      setStatus((oldStatus) => {
        return {
          ...oldStatus,
          version: data.version,
          org: data.org,
          status: data.status,
        };
      });
    }
  };

  useEffect(() => {
    if (waitingForReconnect) {
      return;
    }

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

        setWaitingForReconnect(true);
        setTimeout(() => setWaitingForReconnect(null), 2000);
      };

      return () => {
        websocketRef.current = null;
        websocket.close();
      };
    }
  }, [waitingForReconnect]);

  return [websocketRef, status];
}
