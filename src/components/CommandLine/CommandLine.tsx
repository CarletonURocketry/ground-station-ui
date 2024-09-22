import React, { useState } from "react";
import "./CommandLine.css"

interface CommandLineProps {
  sendCommand: (command: string) => void;
}

const commandHistory: string[] = [];
let commandHistoryIndex = -1; //  -1 because the list is empty

/**
 * CommandLine
 * @param {function} sendCommand - Function to send commands to the backend.
 * @returns {JSX.Element} The rendered CommandLine.
 */
function CommandLine({ sendCommand }: CommandLineProps): JSX.Element {
  const [command, setCommand] = useState("");


  const handleCommandHistoryNavigation = (key: string) => {
    if (commandHistory.length === 0) {
      return;
    }

    if (key === "ArrowUp" && commandHistoryIndex > 0) {
      commandHistoryIndex -= 1;
      setCommand(commandHistory[commandHistoryIndex]);
    }
    else if (key === "ArrowDown" && commandHistoryIndex < commandHistory.length - 1) {
      commandHistoryIndex += 1;
      setCommand(commandHistory[commandHistoryIndex]);
    }
  }

  const handleSendCommand = () => {
    if (command.trim()) {
      commandHistory.push(command);
      commandHistoryIndex = commandHistory.length;
      sendCommand(command);
      setCommand(""); // Clear the input after sending the command
    }
  };

  return (
    <div className="command-line">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
        className="command-input"
        onKeyDown={(e) => handleCommandHistoryNavigation(e.key)}
      />
      <button onClick={handleSendCommand} className="send-button">
        Send Command
      </button>
    </div>
  );
}

export default CommandLine;
