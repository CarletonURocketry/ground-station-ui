import {
	useState,
	useRef,
	useEffect,
	type FormEvent,
	type KeyboardEvent,
	useImperativeHandle,
	forwardRef,
} from "react";
import { useWebSocketContext } from "../contexts/WebSocketContext";

interface CommandHistoryItem {
	command: string;
	timestamp: number;
	isError?: boolean;
	response?: string;
}

export interface CommandInterfaceHandle {
	sendCommandFromDialog: (command: string) => void;
}

function CommandInterface(
	_: unknown,
	ref: React.ForwardedRef<CommandInterfaceHandle>,
) {
	const [command, setCommand] = useState("");
	const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>(
		[],
	);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const { sendCommand, error, data } = useWebSocketContext();
	const historyRef = useRef<HTMLDivElement>(null);
	const prevErrorRef = useRef<Event | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Expose methods to parent components through ref
	useImperativeHandle(ref, () => ({
		sendCommandFromDialog: (commandText: string) => {
			const trimmedCommand = commandText.trim();
			if (trimmedCommand) {
				// Add command to history
				const newCommand: CommandHistoryItem = {
					command: trimmedCommand,
					timestamp: Date.now(),
				};
				setCommandHistory((prev) => [...prev, newCommand]);

				// Send the command through WebSocket
				sendCommand(trimmedCommand);

				// Refocus input after submission
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}
		},
	}));

	// Handle WebSocket errors, but clear them when we get new data
	useEffect(() => {
		if (error && error !== prevErrorRef.current) {
			setCommandHistory((prev) => [
				...prev,
				{
					command: "WebSocket connection lost - retrying...",
					timestamp: Date.now(),
					isError: true,
				},
			]);
			prevErrorRef.current = error;
		}
	}, [error]);

	// When we receive data, we know we're connected
	useEffect(() => {
		if (data && prevErrorRef.current) {
			setCommandHistory((prev) => [
				...prev,
				{
					command: "WebSocket connection restored",
					timestamp: Date.now(),
					isError: false,
				},
			]);
			prevErrorRef.current = null;
		}
	}, [data]);

	// Auto-scroll to bottom when history updates
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (historyRef.current) {
			historyRef.current.scrollTop = historyRef.current.scrollHeight;
		}
	}, [commandHistory]);

	// Focus input on mount
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (
				commandHistory.length > 0 &&
				historyIndex < commandHistory.length - 1
			) {
				const newIndex = historyIndex + 1;
				setHistoryIndex(newIndex);
				// Navigate from bottom to top of history
				setCommand(
					commandHistory[commandHistory.length - 1 - newIndex].command,
				);
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex > 0) {
				const newIndex = historyIndex - 1;
				setHistoryIndex(newIndex);
				// Navigate from top to bottom of history
				setCommand(
					commandHistory[commandHistory.length - 1 - newIndex].command,
				);
			} else if (historyIndex === 0) {
				// Clear command when reaching the bottom of history
				setHistoryIndex(-1);
				setCommand("");
			}
		} else if (e.key === "Tab") {
			e.preventDefault();
			// Add tab completion logic here if desired
		}
	};

	function handleCommandSubmit(e: FormEvent) {
		e.preventDefault();
		const trimmedCommand = command.trim();

		if (trimmedCommand) {
			// Reset history index when submitting new command
			setHistoryIndex(-1);

			// Add command to history immediately
			const newCommand: CommandHistoryItem = {
				command: trimmedCommand,
				timestamp: Date.now(),
			};
			setCommandHistory((prev) => [...prev, newCommand]);

			// Send the command through WebSocket
			sendCommand(trimmedCommand);
			setCommand("");

			// Refocus input after submission
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}
	}

	return (
		<div className="rounded-lg bg-white border border-[#D8DADA] p-4">
			<div className="font-mono">
				<div ref={historyRef} className="h-12 overflow-y-auto">
					{commandHistory.map((item, index) => (
						<div
							key={`${item.timestamp}-${index}`}
							className={`text-sm ${
								item.isError
									? "text-red-500"
									: item.command === "WebSocket connection restored"
										? "text-green-500"
										: ""
							}`}
						>
							<span className="text-gray-500">$ </span>
							<span>{item.command}</span>
							{item.response && (
								<div className="pl-4 text-gray-600">{item.response}</div>
							)}
						</div>
					))}
				</div>

				<div className="border-t border-[#D8DADA] my-2" />

				<form
					onSubmit={handleCommandSubmit}
					className="flex items-center gap-2"
				>
					<span className="text-gray-500 mr-2">$</span>
					<input
						ref={inputRef}
						type="text"
						value={command}
						onChange={(e) => setCommand(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-1 bg-transparent outline-none font-mono min-h-[40px]"
						placeholder="Enter command..."
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-[#F1F0EE] border border-[#D8DADA] rounded-md min-h-[40px] min-w-[80px] 
                hover:bg-[#E6E6E5] active:bg-[#D8DADA] touch-manipulation"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default forwardRef(CommandInterface);
