import { useState, useEffect } from "react";
import type { WebSocketData } from "../constants/websocket";

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => {
			console.log("WebSocket Connected"); // Add this log
			setSocket(ws);
			setError(null); // Clear any previous errors
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
			console.log("WebSocket error:", event); // Add this log
			// Only set error if we don't have a socket
			if (!socket) {
				setError(event);
			}
		};

		ws.onclose = () => {
			console.log("WebSocket closed"); // Add this log
			setSocket(null);
		};

		return () => {
			ws.close();
		};
	}, [url]);

	const sendCommand = (command: string) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(command);
			return true;
		}
		return false;
	};

	return { data, error, sendCommand, isConnected: !!socket };
};
export default useWebSocket;
