import { useEffect, useRef, useState } from "react";
import { read_telemetry } from "../utils/storage";

/**
 * Fetches x and y data from historical telemetry data in local storage
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {function} x_cb Callback function specifying how to map a list of telemetry data packets to a list of required x data points
 * @param {function} y_cb Callback funtion specifying how to map a list of telemetry data packets to a list of required y data points
 * @returns X and Y data point arrays as state variables
 */
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
    var historical_data = read_telemetry();

    // Never pass null data to mapping functions
    if (historical_data == null) {
      historical_data = [];
    }

    setX(x_call.current(historical_data));
    setY(y_call.current(historical_data));
  };

  useEffect(() => {
    window.addEventListener("storage", get_x_y); // Trigger writing to state variables when local storage is updated

    return () => {
      window.removeEventListener("storage", get_x_y); // Remove event listener when host component is not rendered
    };
  }, []);

  // Return x and y states to be used
  return [x, y];
}
