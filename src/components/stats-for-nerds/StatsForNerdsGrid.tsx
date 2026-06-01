import { MiniStatCard } from "./MiniStatCard";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import { cn } from "@/lib/utils";

export interface StatsForNerdsGridProps {
  currentGForce: number;
  maxGForce: number;
  currentSpinRate: number;
  angularVelocityData: number[];
  hasGpsLock: boolean;
  gpsStale: boolean;
  gpsFixCount: number;
  timeSincePacket: number;
  lastPacketWallTime: number;
}

export function StatsForNerdsGrid({
  currentGForce,
  maxGForce,
  currentSpinRate,
  angularVelocityData,
  hasGpsLock,
  gpsStale,
  gpsFixCount,
  timeSincePacket,
  lastPacketWallTime,
}: StatsForNerdsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <MiniStatCard
        label="G-Force"
        value={`${currentGForce.toFixed(2)} g`}
        subtext={`Max: ${maxGForce.toFixed(2)} g`}
        color={
          currentGForce > 3 ? "var(--stats-danger)" : "var(--stats-success)"
        }
      />

      <MiniStatCard
        label="Spin Rate"
        value={`${currentSpinRate.toFixed(1)} °/s`}
        chart={
          <MiniSparkline
            data={angularVelocityData}
            color="var(--stats-chart-spin)"
            width={70}
            height={25}
            showArea={false}
          />
        }
      />

      <MiniStatCard
        label="RSSI / SNR"
        value="N/A"
        subtext="Not available"
        mocked
      />

      <MiniStatCard
        label="GPS Lock"
        value={
          <span
            className={cn(
              "inline-flex items-center gap-1.5",
              hasGpsLock && !gpsStale
                ? "text-stats-success"
                : "text-stats-danger"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                hasGpsLock && !gpsStale ? "bg-stats-success" : "bg-stats-danger"
              )}
            />
            {hasGpsLock && !gpsStale ? "LOCKED" : gpsStale ? "STALE" : "NO FIX"}
          </span>
        }
        subtext={hasGpsLock ? `${gpsFixCount} fixes` : "—"}
      />

      <MiniStatCard
        label="Last Packet"
        value={
          timeSincePacket === 0 && lastPacketWallTime === 0
            ? "—"
            : `${timeSincePacket}s ago`
        }
        color={
          timeSincePacket > 5 ? "var(--stats-danger)" : "var(--stats-success)"
        }
      />

      <MiniStatCard
        label="Battery"
        value="N/A"
        subtext="Not available"
        mocked
      />
    </div>
  );
}
