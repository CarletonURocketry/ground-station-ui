import { useEffect, useState, useRef } from "react";

// Maps the modifier key string to the event variable specifying whether it was pressed or not
const modifier_pressed = (event) => {
  return {
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
    none: true,
  };
};

/**
 * Calls a callback when a specific key combination is pressed
 * @param {string} key The keycode for the main key used in the combination
 * @param {string} modifier The name of the modifier key used in the combination (alt, shift or ctrl)
 * @param {function} callback The callback function to be executed when the combination is pressed
 */
export function useKey(key, modifier, callback) {
  // No modifier specified
  if (modifier == null) {
    modifier = "none";
  }

  // Callback
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, []);

  useEffect(() => {
    // Keypress event handler function
    const handler = (event) => {
      // If the correct key combo was pressed
      if (event.code === key && modifier_pressed(event)[modifier]) {
        callbackRef.current(); // Call the corresponding callback
      }
    };

    // Add keypress event listener
    document.addEventListener("keypress", handler);

    // Remove the event listener when the component calling useKey stops being rendered
    return () => document.removeEventListener("keypress", handler);
  }, [key]);
}
