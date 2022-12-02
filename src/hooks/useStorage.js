import { useEffect, useRef, useState } from "react";
import { read_telemetry } from "../utils/storage";

/**
 * Fetches data from the local storage data buffer
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {function} fetch_cb Callback function that takes an array of telemetry packets as input and maps it to an array of data points to be returned
 * @returns An array of historical telemetry data points as React state variables.
 */
export function useStorage(fetch_cb) {
  // Store the x and y data as a state variable that is updated with every change
  const [data, setData] = useState([]);

  const fetch_cbRef = useRef(fetch_cb);

  // Returns the result of the callback function that fetch an array of historical telemetry data points
  const get_x_y = () => {
    let historical_data = read_telemetry();

    // Never pass null data to mapping functions
    if (historical_data == null) {
      historical_data = [];
    }

    setData(fetch_cbRef.current(historical_data));
  };

  useEffect(() => {
    window.addEventListener("storage", get_x_y); // Trigger writing to state variables when local storage is updated

    return () => {
      window.removeEventListener("storage", get_x_y); // Remove event listener when host component is not rendered
    };
  }, []);

  // Return data as a state variable
  return data;
}
