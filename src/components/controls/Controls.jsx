import React from "react";
import "./Controls.css";

// Hooks
import { useState } from "react";
import { useKey } from "../../hooks/useKey";

// SVG components
import { ReactComponent as Play } from "../../assets/Play.svg";
import { ReactComponent as Pause } from "../../assets/Pause.svg";
import { ReactComponent as Forward } from "../../assets/Forward.svg";
import { ReactComponent as Stop } from "../../assets/Stop.svg";

// Utils
import { clear_telemetry } from "../../utils/storage";

export default function Controls({ websocketRef }) {
  const minSpeed = 0.25; // Minimum speed
  const maxSpeed = 4; // Maximum speed
  const [speed, setSpeed] = useState(1); // Tracks replay speed; normal speed of 1 by default

  // Sends the speed command to fast forward
  const fast_forward = () => {
    if (speed < maxSpeed) {
      setSpeed((prevSpeed) => prevSpeed * 2);
    }
    websocketRef.current.send(`telemetry replay speed ${speed}`);
  };

  // Sends the speed command to slow forward
  const slow_forward = () => {
    if (speed > minSpeed) {
      setSpeed((prevSpeed) => prevSpeed / 2);
    }
    websocketRef.current.send(`telemetry replay speed ${speed}`);
  };

  // Sends the play command
  const play = () => {
    websocketRef.current.send(`telemetry replay play`);
  };

  // Sends the pause command
  const pause = () => {
    websocketRef.current.send(`telemetry replay pause`);
  };

  // Sends the stop command
  const stop = () => {
    websocketRef.current.send(`telemetry replay stop`);
    clear_telemetry();
  };

  // When Shift + C is pressed, toggle controls
  const [hideControls, setHideControls] = useState(false);
  useKey("KeyC", "shift", () => {
    setHideControls((prevState) => !prevState);
  });

  return (
    <div className={hideControls ? "buttons" : "buttons hide-controls"}>
      <Forward
        id="backward"
        style={{ transform: "rotate(180deg)" }} // Flip the forward button to make it point backward
        onClick={slow_forward}
      />
      <Stop id="stop" onClick={stop} />
      <Play id="play" onClick={play} />
      <p>{speed}X</p>
      <Pause id="pause" onClick={pause} />
      <Forward id="forward" onClick={fast_forward} />
    </div>
  );
}
