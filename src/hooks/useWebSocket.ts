import { useState, useEffect } from "react";

interface WebSocketData {
  org: string;
  rocket: string;
  version: string;
  status: any;
  telemetry: any;
}

/**
 * Custom hook to manage WebSocket connections.
 * @param {string} url - The WebSocket URL to connect to.
 * @returns {Object} The WebSocket connection data, error, and a function to send commands.
 * @returns {WebSocketData | null} data - The parsed data received from the WebSocket.
 * @returns {Event | null} error - The error event, if any occurred during the WebSocket connection.
 * @returns {Function} sendCommand - Function to send commands/messages to the WebSocket server.
 * @example
 * const { data, error, sendCommand } = useWebSocket('wss://example.com/socket');
 *
 * useEffect(() => {
 *   if (data) {
 *     console.log('Received data:', data);
 *   }
 * }, [data]);
 *
 * const handleSendCommand = () => {
 *   sendCommand('START_MISSION');
 * };
 */
const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<WebSocketData | null>(null);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData: WebSocketData = JSON.parse(event.data);
        setData(parsedData);
      } catch (e) {
        console.error("Error parsing WebSocket data:", e);
      }
    };

    ws.onerror = (event) => {
      setError(event);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendCommand = (command: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(command);
    }
  };

  return { data, error, sendCommand };
};

export default useWebSocket;
