import { useEffect, useState, useRef } from "react";

/**
 * Maps the modifier name to the event variable specifying if it was pressed
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {event} event
 * @returns Modifier key names to booleans values representing whether or not they were pressed during the passed event
 */
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
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} key The JavaScript keycode for the main key used in the combination
 * @param {string} modifier The name of the modifier key used in the combination (alt, shift or ctrl)
 * @param {function} callback The callback function, taking an event as a parameter, to be executed when the combination is pressed
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
