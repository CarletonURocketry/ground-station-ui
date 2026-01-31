import {
  AltitudeSeaLevelData,
  FlightErrorData,
  FlightStatusData,
} from "@/store/telemetryStore";
import { missionStatusMap } from "./missionStatusMap";

let apogee: number = -1;

export const getApogee = (data: AltitudeSeaLevelData) => {
  if (!data.metres) return "No data";
  const latestAltitude = data.metres.at(-1);
  if (latestAltitude === undefined) {
    return "No data";
  } else {
    apogee = Math.max(apogee, latestAltitude);
    return `${apogee.toFixed(2)}m`;
  }
};

export const getAltitude = (data: AltitudeSeaLevelData) => {
  if (!data.metres) return "No data";
  const latestAltitude = data.metres.at(-1);
  return latestAltitude !== undefined
    ? `${latestAltitude.toFixed(2)}m`
    : "No data";
};

export const getMissionStatus = (data: FlightStatusData) => {
  if (!data.status_code) return "No data";
  const latestStatus = missionStatusMap(
    data.status_code[data.status_code.length - 1]
  );
  return latestStatus !== undefined ? latestStatus : "No data";
};

export const getErrorInfo = (data: FlightErrorData) => {
  if (!data.proc_id && !data.error_code) return "No data";
  return `PROC_ID: ${data.proc_id.at(-1)}` + `ERRNO: ${data.error_code.at(-1)}`;
};

export const getMissionTime = (data: number) => {
  if (!data) return "No data";
  return `T+${data.toFixed(3)}s`;
};
