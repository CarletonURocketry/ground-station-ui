import inspaceLogo from "../../assets/logoandtexttransparent.png";
import { TelemetryValue } from "./TelemetryValue";
import {
  getApogee,
  getAltitude,
  getMissionStatus,
  getMissionTime,
} from "./telemetryHelpers";
import { useTelemetryStore } from "@/store/telemetryStore";
// import { useWebSocketContext } from "@/contexts/WebSocketContext";

function TelemetryHeader() {
  // const { data } = useWebSocketContext();
  const { data, lastMissionTime } = useTelemetryStore();

  return (
    <header className="rounded-lg bg-white border-b p-2 sm:p-4">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center justify-between">
          <img
            src={inspaceLogo}
            alt="CUInSpace Logo"
            className="h-10 sm:h-12"
          />
          <TelemetryValue
            label="STATUS"
            value={getMissionStatus(data.flight_status)}
          />
          <TelemetryValue
            label="MISSION TIME"
            value={getMissionTime(lastMissionTime)}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <TelemetryValue
            label="ALTITUDE"
            value={getAltitude(data.altitude_sea_level)}
          />
          <TelemetryValue
            label="APOGEE"
            value={getApogee(data.altitude_sea_level)}
          />
          <TelemetryValue label="SPEED" value="No data" />
          <TelemetryValue label="MAX SPEED" value="No data" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="relative hidden md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <img src={inspaceLogo} alt="CUInSpace Logo" className="h-14" />
          <TelemetryValue
            label="STATUS"
            value={getMissionStatus(data.flight_status)}
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <TelemetryValue
            label="MISSION TIME"
            value={getMissionTime(lastMissionTime)}
          />
        </div>

        <div className="flex items-center gap-6">
          <TelemetryValue
            label="ALTITUDE"
            value={getAltitude(data.altitude_sea_level)}
          />
          <TelemetryValue
            label="APOGEE"
            value={getApogee(data.altitude_sea_level)}
          />
          <TelemetryValue label="SPEED" value="No data" />
          <TelemetryValue label="MAX SPEED" value="No data" />
        </div>
      </div>
    </header>
  );
}

export default TelemetryHeader;
