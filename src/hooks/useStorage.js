import { useEffect, useRef, useState } from "react";
import { read_telemetry } from "../utils/storage";

// Returns x and y data whenever the local storage is updated
export function useStorage(x_cb, y_cb) {
  // Store the x and y data as a state variable that is updated with every change
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);

  const x_call = useRef(x_cb);
  const y_call = useRef(y_cb);

  useEffect(() => {
    x_call.current = x_cb;
    y_call.current = y_cb;
  });

  // Returns the result of the callback functions that parse historical data into their x and y components
  const get_x_y = () => {
    const historical_data = read_telemetry();

    setX(x_call.current(historical_data));
    setY(y_call.current(historical_data));
  };

  useEffect(() => {
    window.addEventListener("storage", get_x_y); // Trigger writing to state variables when local storage is updated

    return () => {
      window.removeEventListener("storage", get_x_y); // Cleanup event listener
    };
  }, []);

  // Return x and y states to be used
  return [x, y];
}
