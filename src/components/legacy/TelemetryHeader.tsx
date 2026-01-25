import { useWebSocketContext } from "../contexts/WebSocketContext";
import inspaceLogo from "../assets/logoandtexttransparent.png";

interface TelemetryValueProps {
  label: string;
  value: string | number;
}

const missionStatusMap = (code: number) => {
  switch (code) {
    case 0:
      return "SYSTEMS_NOMINAL";
    case 1:
      return "IDLE";
    case 2:
      return "CHANGED_AIRBORNE";
    case 3:
      return "ROCKET_ASCENT";
    case 4:
      return "ROCKET_APOGEE";
    case 5:
      return "ROCKET_LANDED";
    case 6:
      return "UPDATE_IDLE";
    case 7:
      return "UPDATE_AIRBORNE";
    case 8:
      return "UPDATE_ASCENT";
    case 9:
      return "UPDATE_DESCENT";
    case 10:
      return "UPDATE_LANDED";
    default:
      return "Unknown";
  }
};

function TelemetryValue({ label, value }: TelemetryValueProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-mono font-medium text-sm md:text-base">
        {value}
      </span>
    </div>
  );
}

let apogee: number = -1;

function TelemetryHeader() {
  const { data } = useWebSocketContext();

  const getApogee = () => {
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

  const getAltitude = () => {
    if (!data?.telemetry?.altitude_sea_level?.metres) return "No data";
    const latestAltitude =
      data.telemetry.altitude_sea_level.metres[
        data.telemetry.altitude_sea_level.metres.length - 1
      ];
    return latestAltitude !== undefined
      ? `${latestAltitude.toFixed(2)}m`
      : "No data";
  };

  const getMissionStatus = () => {
    if (!data?.telemetry.flight_status?.status_code) return "No data";
    const latestStatus = missionStatusMap(
      data.telemetry.flight_status.status_code[
        data.telemetry.flight_status.status_code.length - 1
      ]
    );
    return latestStatus !== undefined ? latestStatus : "No data";
  };

  const getErrorInfo = () => {
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

  const getMissionTime = () => {
    if (!data?.telemetry?.last_mission_time) return "No data";
    return `T+${data.telemetry.last_mission_time.toFixed(3)}s`;
  };

  return (
    <header className="rounded-lg bg-white border-b border-[#D8DADA] p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center space-x-2">
          <img
            src={inspaceLogo}
            alt="CUInSpace Logo"
            className="h-12 md:h-14"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center gap-4 md:gap-8">
          <TelemetryValue label="MISSION TIME" value={getMissionTime()} />
          <TelemetryValue label="STATUS" value={getMissionStatus()} />
          <TelemetryValue label="ALTITUDE" value={getAltitude()} />
          <TelemetryValue label="APOGEE" value={getApogee()} />
          <TelemetryValue label="SPEED" value="No data" />
          <TelemetryValue label="MAX SPEED" value="No data" />
        </div>
      </div>
    </header>
  );
}

export default TelemetryHeader;
