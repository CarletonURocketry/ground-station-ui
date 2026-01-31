import inspaceLogo from "../../assets/logoandtexttransparent.png";
import { TelemetryValue } from "./TelemetryValue";
import {
  getApogee,
  getAltitude,
  getMissionStatus,
  getMissionTime,
} from "./telemetryHelpers";
import { useTelemetryStore } from "@/store/telemetryStore";

function TelemetryHeader() {
  // const { data } = useWebSocketContext();
  const { data, lastMissionTime } = useTelemetryStore();

  return (
    <header className="rounded-lg bg-white border-b p-4">
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Logo and Status */}
        <div className="flex items-center gap-6">
          <img
            src={inspaceLogo}
            alt="CUInSpace Logo"
            className="h-12 md:h-14"
          />
          <TelemetryValue
            label="STATUS"
            value={getMissionStatus(data.flight_status)}
          />
        </div>

        {/* Center: Mission Time - Absolutely positioned to center of screen */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex justify-center">
          <TelemetryValue
            label="MISSION TIME"
            value={getMissionTime(lastMissionTime)}
          />
        </div>

        {/* Right: Altitude, Apogee, Speed, Max Speed */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6">
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
