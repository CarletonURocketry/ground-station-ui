import { useState, useEffect } from "react";
import { Command } from "cmdk";
import {
	IconCommand,
	IconX,
	IconTerminal,
	IconDeviceDesktop,
	IconRefresh,
	IconDeviceFloppy,
	IconPlayerPause,
	IconPlayerPlay,
	IconPlayerStop,
} from "@tabler/icons-react";

interface CommandDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCommandSelect?: (command: string) => void;
}

interface CommandItem {
	id: string;
	label: string;
	command: string;
	description: string;
	needsInput?: boolean;
	placeholder?: string;
}

// Command categories and their respective commands
const COMMANDS: Record<string, CommandItem[]> = {
	main: [
		{
			id: "authenticate",
			label: "Authenticate",
			command: "auth",
			description: "Authenticate as controlling user (required to issue commands)",
			needsInput: true,
			placeholder: "<password>"
		},
		{
			id: "deauthenticate",
			label: "Deauthenticate",
			command: "deauth",
			description: "Deauthenticate (can only be done if authenticated as controlling user)"
		},
		{
			id: "shutdown",
			label: "Shutdown",
			command: "shutdown",
			description: "Shuts down the ground-station backend",
		},
	],
	serial: [
		{
			id: "serial-update",
			label: "Update Serial Ports",
			command: "serial update",
			description: "Updates the list of available serial ports",
		},
		{
			id: "serial-connect",
			label: "Connect to Port",
			command: "serial rn2483_radio connect",
			description: "Connect to serial port",
			needsInput: true,
			placeholder: "<port>",
		},
		{
			id: "serial-disconnect",
			label: "Disconnect",
			command: "serial rn2483_radio disconnect",
			description: "Terminates active connection",
		},
	],
	telemetry: [
		{
			id: "telemetry-update",
			label: "Update Missions",
			command: "telemetry update",
			description: "Updates the list of missions",
		},
		{
			id: "telemetry-replay-play",
			label: "Play Mission",
			command: "telemetry replay play",
			description: "Starts mission replay",
			needsInput: true,
			placeholder: "<mission file name>",
		},
		{
			id: "telemetry-replay-pause",
			label: "Pause Replay",
			command: "telemetry replay pause",
			description: "Pauses mission replay",
		},
		{
			id: "telemetry-replay-resume",
			label: "Resume Replay",
			command: "telemetry replay resume",
			description: "Resumes mission replay",
		},
		{
			id: "telemetry-replay-speed",
			label: "Set Replay Speed",
			command: "telemetry replay speed",
			description: "Sets replay speed",
			needsInput: true,
			placeholder: "<speed>",
		},
		{
			id: "telemetry-replay-stop",
			label: "Stop Replay",
			command: "telemetry replay stop",
			description: "Stops mission replay",
		},
		{
			id: "telemetry-record-start",
			label: "Start Recording",
			command: "telemetry record start",
			description: "Starts recording (not implemented)",
			needsInput: true,
			placeholder: "<mission file name>",
		},
		{
			id: "telemetry-record-stop",
			label: "Stop Recording",
			command: "telemetry record stop",
			description: "Stops recording (not implemented)",
		},
	],
};

function CommandDialog({
	open,
	onOpenChange,
	onCommandSelect,
}: CommandDialogProps) {
	const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [commandWithInput, setCommandWithInput] = useState<{
		command: string;
		needsInput: boolean;
		placeholder: string;
	} | null>(null);

	// Reset input when dialog closes
	useEffect(() => {
		if (!open) {
			setInputValue("");
			setSelectedCommand(null);
			setCommandWithInput(null);
		}
	}, [open]);

	// Handle keyboard shortcut to open dialog
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				onOpenChange(!open);
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, onOpenChange]);

	function handleBackdropClick() {
		onOpenChange(false);
	}

	function handleBackdropKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			onOpenChange(false);
		}
	}

	function handleCloseDialog() {
		onOpenChange(false);
	}

	function handleCloseKeyDown(event: React.KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			onOpenChange(false);
		}
	}

	function handleCommandSelect(commandItem: CommandItem) {
		if (commandItem.needsInput && commandItem.placeholder) {
			setCommandWithInput({
				command: commandItem.command,
				needsInput: true,
				placeholder: commandItem.placeholder,
			});
			setSelectedCommand(commandItem.id);
		} else {
			if (onCommandSelect) {
				onCommandSelect(commandItem.command);
				onOpenChange(false);
			}
		}
	}

	function handleInputSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (commandWithInput && inputValue.trim() && onCommandSelect) {
			const fullCommand = `${commandWithInput.command} ${inputValue.trim()}`;
			onCommandSelect(fullCommand);
			onOpenChange(false);
		}
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	function handleInputKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			setCommandWithInput(null);
			setSelectedCommand(null);
		}
	}

	function getCommandIcon(commandId: string) {
		if (commandId.includes("shutdown"))
			return <IconDeviceDesktop className="w-4 h-4" />;
		if (commandId.includes("update"))
			return <IconRefresh className="w-4 h-4" />;
		if (commandId.includes("connect"))
			return <IconTerminal className="w-4 h-4" />;
		if (commandId.includes("play") || commandId.includes("resume"))
			return <IconPlayerPlay className="w-4 h-4" />;
		if (commandId.includes("pause"))
			return <IconPlayerPause className="w-4 h-4" />;
		if (commandId.includes("stop"))
			return <IconPlayerStop className="w-4 h-4" />;
		if (commandId.includes("record"))
			return <IconDeviceFloppy className="w-4 h-4" />;
		return <IconCommand className="w-4 h-4" />;
	}

	return (
		<Command.Dialog
			open={open}
			onOpenChange={onOpenChange}
			className="fixed inset-0 z-50 flex items-start justify-center sm:items-center"
			shouldFilter={false}
		>
			<div
				className="bg-black/50 fixed inset-0"
				onClick={handleBackdropClick}
				onKeyDown={handleBackdropKeyDown}
				role="button"
				tabIndex={0}
			/>

			<div className="relative bg-white w-full h-full sm:h-auto sm:max-h-[85vh] sm:w-[90%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-3xl rounded-none sm:rounded-lg border-0 sm:border border-[#D8DADA] shadow-lg overflow-hidden">
				{commandWithInput ? (
					<div className="p-4 sm:p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-sm sm:text-base font-medium">
								Enter parameter for command
							</h3>
							<button
								type="button"
								onClick={() => {
									setCommandWithInput(null);
									setSelectedCommand(null);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										setCommandWithInput(null);
										setSelectedCommand(null);
									}
								}}
								className="text-gray-400 hover:text-gray-500"
								aria-label="Cancel"
							>
								<IconX className="w-4 h-4 sm:w-5 sm:h-5" />
							</button>
						</div>

						<div className="mb-4 text-sm sm:text-base text-gray-500">
							<code className="bg-[#F1F0EE] px-1.5 py-1 rounded">
								{commandWithInput.command} {commandWithInput.placeholder}
							</code>
						</div>

						<form onSubmit={handleInputSubmit} className="flex gap-2">
							<input
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								onKeyDown={handleInputKeyDown}
								placeholder={commandWithInput.placeholder}
								className="flex-1 border border-[#D8DADA] rounded-md px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#D8DADA]"
								ref={(input) => input?.focus()}
							/>
							<button
								type="submit"
								className="px-3 py-2 sm:px-4 sm:py-3 bg-[#F1F0EE] border border-[#D8DADA] rounded-md text-sm sm:text-base hover:bg-[#E6E6E5] active:bg-[#D8DADA]"
							>
								Execute
							</button>
						</form>
					</div>
				) : (
					<>
						{/* Mobile Header with Close Button */}
						<div className="sm:hidden flex items-center justify-between border-b border-[#D8DADA] px-4 py-3">
							<h2 className="text-base font-medium">Commands</h2>
							<button
								type="button"
								onClick={handleCloseDialog}
								onKeyDown={handleCloseKeyDown}
								className="text-gray-500 hover:text-gray-700"
								aria-label="Close dialog"
							>
								<IconX className="w-5 h-5" />
							</button>
						</div>

						<Command.List className="max-h-[calc(100vh-120px)] sm:max-h-[60vh] overflow-y-auto py-2 px-1 sm:px-2">
							<Command.Empty className="py-6 text-center text-sm sm:text-base text-gray-500">
								No results found.
							</Command.Empty>

							<Command.Group heading="Main Commands" className="px-2 py-1">
								{COMMANDS.main.map((cmd) => (
									<CommandItem
										key={cmd.id}
										value={cmd.id}
										icon={getCommandIcon(cmd.id)}
										onSelect={() => handleCommandSelect(cmd)}
										isSelected={selectedCommand === cmd.id}
									>
										<div className="flex flex-col">
											<span className="text-sm sm:text-base">{cmd.label}</span>
											<span className="text-xs sm:text-sm text-gray-500">
												{cmd.description}
											</span>
										</div>
									</CommandItem>
								))}
							</Command.Group>

							<Command.Separator className="my-2 h-px bg-[#D8DADA]" />

							<Command.Group heading="Serial Commands" className="px-2 py-1">
								{COMMANDS.serial.map((cmd) => (
									<CommandItem
										key={cmd.id}
										value={cmd.id}
										icon={getCommandIcon(cmd.id)}
										onSelect={() => handleCommandSelect(cmd)}
										isSelected={selectedCommand === cmd.id}
									>
										<div className="flex flex-col">
											<span className="text-sm sm:text-base">{cmd.label}</span>
											<span className="text-xs sm:text-sm text-gray-500">
												{cmd.description}
											</span>
										</div>
									</CommandItem>
								))}
							</Command.Group>

							<Command.Separator className="my-2 h-px bg-[#D8DADA]" />

							<Command.Group heading="Telemetry Commands" className="px-2 py-1">
								{COMMANDS.telemetry.map((cmd) => (
									<CommandItem
										key={cmd.id}
										value={cmd.id}
										icon={getCommandIcon(cmd.id)}
										onSelect={() => handleCommandSelect(cmd)}
										isSelected={selectedCommand === cmd.id}
									>
										<div className="flex flex-col">
											<span className="text-sm sm:text-base">{cmd.label}</span>
											<span className="text-xs sm:text-sm text-gray-500">
												{cmd.description}
											</span>
										</div>
									</CommandItem>
								))}
							</Command.Group>
						</Command.List>
					</>
				)}
			</div>
		</Command.Dialog>
	);
}

// Helper component for command items
function CommandItem({
	value,
	icon,
	children,
	onSelect,
	isSelected,
}: {
	value: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	onSelect: () => void;
	isSelected?: boolean;
}) {
	return (
		<Command.Item
			value={value}
			onSelect={onSelect}
			className={`flex items-center gap-2 px-2 py-2 sm:py-2.5 text-sm rounded-md cursor-pointer ${
				isSelected ? "bg-[#F1F0EE]" : ""
			} data-[selected=true]:bg-[#F1F0EE] data-[selected=true]:outline-none`}
		>
			{icon && <span className="text-gray-500 flex-shrink-0">{icon}</span>}
			<span className="flex-1 min-w-0">{children}</span>
		</Command.Item>
	);
}

export default CommandDialog;
