// Writes the previous "n" data packets to local storage for retrieval
const STORAGE_KEY = "telemetry";
var resolution = 10; // Show 10 historical data points by default

/**
 * Sets the number of historical data points to be recorded in the local storage buffer
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {number} new_res
 */
export function set_resolution(new_res) {
  resolution = new_res;
}

/**
 * Reads the telemetry data from local storage
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @returns Telemetry data in JSON format
 */
export function read_telemetry() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

/**
 * Writes the most recent data to the local storage buffer
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {JSON} recent_data
 */
export function write_telemetry(recent_data) {
  // Get existing data
  var historical_data = read_telemetry();

  // When the program starts, there is no historical data. So we will treat null as an empty array.
  if (historical_data === null) {
    historical_data = [];
  }

  // Check if the first item has to be popped because we've reached the correct resolution
  if (historical_data.length >= resolution) {
    historical_data.shift(); // Remove first packet
    historical_data.push(recent_data); // Append recent packet
  } else {
    historical_data.push(recent_data);
  }

  // Write the new list to localStorage
  window.dispatchEvent(new Event("storage")); // Signal storage event
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historical_data));
}

/**
 * Clears the local storage buffer of historical data
 */
export function clear_telemetry() {
  localStorage.removeItem(STORAGE_KEY);
}
