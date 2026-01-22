import { missionStatusMap } from "./missionStatusMap";

let apogee: number = -1;

export const getApogee = (data: any) => {
  if (!data?.telemetry?.altitude_sea_level?.metres) return "No data";
  const latestAltitude =
    data.telemetry.altitude_sea_level.metres[
      data.telemetry.altitude_sea_level.metres.length - 1
    ];
  if (latestAltitude === undefined) {
    return "No data";
  } else {
    apogee = Math.max(apogee, latestAltitude);
    return `${apogee.toFixed(2)}m`;
  }
};

export const getAltitude = (data: any) => {
  if (!data?.telemetry?.altitude_sea_level?.metres) return "No data";
  const latestAltitude =
    data.telemetry.altitude_sea_level.metres[
      data.telemetry.altitude_sea_level.metres.length - 1
    ];
  return latestAltitude !== undefined
    ? `${latestAltitude.toFixed(2)}m`
    : "No data";
};

export const getMissionStatus = (data: any) => {
  if (!data?.telemetry.flight_status?.status_code) return "No data";
  const latestStatus = missionStatusMap(
    data.telemetry.flight_status.status_code[
      data.telemetry.flight_status.status_code.length - 1
    ]
  );
  return latestStatus !== undefined ? latestStatus : "No data";
};

export const getErrorInfo = (data: any) => {
  if (
    !data?.telemetry.flight_error?.proc_id &&
    !data?.telemetry.flight_error?.error_code
  )
    return "No data";
  return (
    `PROC_ID: ${
      data.telemetry.flight_error.proc_id[
        data.telemetry.flight_error.proc_id.length - 1
      ]
    }` +
    `ERRNO: ${
      data.telemetry.flight_error.error_code[
        data.telemetry.flight_error.error_code.length - 1
      ]
    }`
  );
};

export const getMissionTime = (data: any) => {
  if (!data?.telemetry?.last_mission_time) return "No data";
  return `T+${data.telemetry.last_mission_time.toFixed(3)}s`;
};
