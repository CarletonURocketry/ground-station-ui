import { useStatsData } from "./useStatsData";
import { StatsForNerdsHeader } from "./StatsForNerdsHeader";
import { StatsForNerdsFooter } from "./StatsForNerdsFooter";
import { StatsForNerdsGrid } from "./StatsForNerdsGrid";
import { StatCard } from "./StatCard";
import { MiniStatCard } from "./MiniStatCard";
import { MiniSparkline } from "@/components/charts/MiniSparkline";

export function StatsForNerds() {
  const {
    data,
    filteredData,
    velocity,
    timeSincePacket,
    lastPacketWallTime,
    currentAltitude,
    currentGForce,
    maxGForce,
    currentSpinRate,
    currentVelocity,
    altitudeTrend,
    hasGpsLock,
    gpsStale,
    currentLat,
    currentLon,
  } = useStatsData();

  return (
    <div className="absolute top-4 right-4 z-20 w-[340px] bg-stats-panel-bg backdrop-blur-md text-stats-value rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] font-mono text-xs overflow-hidden border border-stats-panel-border flex flex-col max-h-[calc(100vh-2rem)]">
      <StatsForNerdsHeader />

      <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
        <StatCard
          label="Altitude"
          value={`${currentAltitude.toFixed(1)} m`}
          chart={
            <MiniSparkline
              data={filteredData.altitudes}
              color="var(--stats-chart-altitude)"
              width={100}
              height={30}
            />
          }
          trend={altitudeTrend}
        />

        <StatCard
          label="Velocity"
          value={`${currentVelocity.toFixed(1)} m/s`}
          chart={
            <MiniSparkline
              data={velocity}
              color="var(--stats-chart-velocity)"
              width={100}
              height={30}
            />
          }
          subtext="Derived from altitude"
        />

        <div className="grid grid-cols-2 gap-2">
          <MiniStatCard
            label="Latitude"
            value={currentLat !== undefined ? currentLat.toFixed(6) : "—"}
            subtext="Degrees"
          />
          <MiniStatCard
            label="Longitude"
            value={currentLon !== undefined ? currentLon.toFixed(6) : "—"}
            subtext="Degrees"
          />
        </div>

        <StatsForNerdsGrid
          currentGForce={currentGForce}
          maxGForce={maxGForce}
          currentSpinRate={currentSpinRate}
          angularVelocityData={filteredData.angularVelocity}
          hasGpsLock={hasGpsLock}
          gpsStale={gpsStale}
          gpsFixCount={data.gnss.latitude.length}
          timeSincePacket={timeSincePacket}
          lastPacketWallTime={lastPacketWallTime}
        />
      </div>

      <StatsForNerdsFooter
        dataPointsCount={data.altitude_sea_level.mission_time.length}
      />
    </div>
  );
}
