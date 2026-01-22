import { useWebSocketContext } from "../../contexts/WebSocketContext";
import inspaceLogo from "../../assets/logoandtexttransparent.png";
import { TelemetryValue } from "./TelemetryValue";
import {
  getApogee,
  getAltitude,
  getMissionStatus,
  getMissionTime,
} from "./telemetryHelpers";

function TelemetryHeader() {
  const { data } = useWebSocketContext();

  return (
    <header className="rounded-lg bg-white border-b border-[#D8DADA] p-4">
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Logo and Status */}
        <div className="flex items-center gap-6">
          <img
            src={inspaceLogo}
            alt="CUInSpace Logo"
            className="h-12 md:h-14"
          />
          <TelemetryValue label="STATUS" value={getMissionStatus(data)} />
        </div>

        {/* Center: Mission Time - Absolutely positioned to center of screen */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex justify-center">
          <TelemetryValue label="MISSION TIME" value={getMissionTime(data)} />
        </div>

        {/* Right: Altitude, Apogee, Speed, Max Speed */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6">
          <TelemetryValue label="ALTITUDE" value={getAltitude(data)} />
          <TelemetryValue label="APOGEE" value={getApogee(data)} />
          <TelemetryValue label="SPEED" value="No data" />
          <TelemetryValue label="MAX SPEED" value="No data" />
        </div>
      </div>
    </header>
  );
}

export default TelemetryHeader;
