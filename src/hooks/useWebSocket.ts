import { useState, useEffect } from "react";

interface WebSocketData {
  org: string;
  rocket: string;
  version: string;
  status: any;
  telemetry: any;
}

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
