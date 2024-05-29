import React, { createContext, useContext, ReactNode } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { WebSocketData } from "../constants/types";

interface WebSocketContextType {
  data: WebSocketData | null;
  error: Event | null;
  sendCommand: (command: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider = ({
  children,
  url,
}: {
  children: ReactNode;
  url: string;
}) => {
  const { data, error, sendCommand } = useWebSocket(url);

  return (
    <WebSocketContext.Provider value={{ data, error, sendCommand }}>
      {children}
    </WebSocketContext.Provider>
  );
};
