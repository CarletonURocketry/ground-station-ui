// Writes the previous "n" data packets to local storage for retrieval
const STORAGE_KEY = "telemetry";
var resolution = 10; // Show 10 historical data points by default

export function set_resolution(new_res) {
  resolution = new_res;
}

export function read_telemetry() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

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

export function clear_telemetry() {
  localStorage.removeItem(STORAGE_KEY);
}
