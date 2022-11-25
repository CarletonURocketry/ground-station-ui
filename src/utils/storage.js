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
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  data = data ? data : {};
  return data;
}

/**
 * Shifts the buffer array to remove old data, making room for new data
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {JSON} new_data The new data of the key being written to
 * @param {Array} prev_buffer The array of previous buffer data
 */
function shift_array(new_data, prev_buffer) {
  prev_buffer.push(new_data); // Add new data to the end
  if (prev_buffer.length > resolution) {
    prev_buffer.shift(); // Remove oldest data when there's an overflow
  }
}

/**
 * Writes the most recent data to the local storage buffer
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {JSON} recent_data
 */
export function write_telemetry(recent_data) {
  // Get existing data
  let historic_telem = read_telemetry();

  // What sections to write to
  Object.keys(recent_data).forEach((key) => {
    // Ensure that key exists in historical buffer
    let buffer;
    if (historic_telem.hasOwnProperty(key)) {
      buffer = historic_telem[key]; // Read the last buffer data
    } else {
      buffer = [];
    }
    shift_array(recent_data[key], buffer); // Add new data to buffer
    historic_telem[key] = buffer; // Replace historical data with new stuff
  });
  // Once all historical data has been updated, overwrite localStorage copy
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historic_telem));
}

/**
 * Clears the local storage buffer of historical data
 */
export function clear_telemetry() {
  localStorage.removeItem(STORAGE_KEY);
}
