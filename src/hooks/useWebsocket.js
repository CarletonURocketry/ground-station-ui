import { useEffect, useState, useRef } from "react";
import { write_telemetry } from "../utils/storage";

/**
 * Connects to a websocket and receives incoming data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} websocket_address The URL address where the websocket is located
 * @param {boolean} debug Triggers data logging to console when true
 * @returns A reference to the current websocket instance and two state variables; one with status info and the other with replay status info
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
        mission_time: 0,
      },
      rn2483_radio: {
        connected: false,
      },
    },
  });

  // Define the structure of the replay status packet with default values for before connection
  const [replayStatus, setReplayStatus] = useState({
    status: "",
    speed: 1,
    mission_list: undefined,
  });

  // Open connection
  const onOpen = () => {
    console.log("Connected to websocket server.");
  };

  // Receiving data
  const onMessage = (event) => {
    var data = JSON.parse(event.data); // Parse incoming data
    console.log(data);

    if (debug) {
      console.log(data); // Data logging on debug
    }

    // Only write non-empty packets
    if (data.version != undefined) {
      write_telemetry(data.telemetry); // Write to local storage
      setStatus((oldStatus) => {
        return {
          ...oldStatus,
          version: data.version,
          org: data.org,
          status: data.status,
        };
      });
      setReplayStatus((oldStatus) => {
        return {
          ...oldStatus,
          status: data.status.replay.state,
          mission_list: data.status.replay.mission_list,
          speed: data.status.replay.speed,
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

  return [websocketRef, status, replayStatus];
}
