import React, { createContext, useContext, ReactNode } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { WebSocketData } from "../constants/types";

interface WebSocketContextType {
  data: WebSocketData | null;
  error: Event | null;
  sendCommand: (command: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

/**
 * Custom hook to use the WebSocket context.
 * @throws Will throw an error if the hook is used outside a WebSocketProvider.
 * @returns {WebSocketContextType} The WebSocket context value.
 */
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  }
  return context;
};

/**
 * WebSocketProvider Component
 * @param {ReactNode} children - The child components to render within the provider.
 * @param {string} url - The WebSocket URL to connect to.
 * @returns {JSX.Element} The rendered WebSocketProvider component.
 */
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

