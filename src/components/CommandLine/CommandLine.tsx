import React, { useState } from "react";
import "./CommandLine.css"

interface CommandLineProps {
  sendCommand: (command: string) => void;
}

/**
 * CommandLine
 * @param {function} sendCommand - Function to send commands to the backend.
 * @returns {JSX.Element} The rendered CommandLine.
 */
function CommandLine({ sendCommand }: CommandLineProps): JSX.Element {
  const [command, setCommand] = useState("");

  const handleSendCommand = () => {
    if (command.trim()) {
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
      />
      <button onClick={handleSendCommand} className="send-button">
        Send Command
      </button>
    </div>
  );
}

export default CommandLine;
