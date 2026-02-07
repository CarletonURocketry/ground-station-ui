import { useMemo, useState, useEffect } from "react";
import { useTelemetryStore } from "@/store/telemetryStore";
import { useAppStore } from "@/store/appStore";
import { MiniSparkline } from "./charts/MiniSparkline";
import { X } from "lucide-react";

// G-force constant
const G = 9.81;

// Time window for graphs (5 minutes in seconds)
const TIME_WINDOW = 5 * 60;


export const StatsForNerds = () => {
    const { data, lastPacketWallTime } = useTelemetryStore();
    const { setIsStatsOpen } = useAppStore();
    const [timeSincePacket, setTimeSincePacket] = useState(0);

    // Update time since last packet every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastPacketWallTime > 0) {
                setTimeSincePacket(Math.floor((Date.now() - lastPacketWallTime) / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastPacketWallTime]);

    // Filter data to last 5 minutes
    const filteredData = useMemo(() => {
        const currentTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;
        const startTime = Math.max(0, currentTime - TIME_WINDOW);

        // Filter altitude data (use sea level as that's what the header displays)
        const altStartIdx = data.altitude_sea_level.mission_time.findIndex(
            (t) => t >= startTime
        );
        const altitudes =
            altStartIdx >= 0
                ? data.altitude_sea_level.metres.slice(altStartIdx)
                : [];
        const altTimes =
            altStartIdx >= 0
                ? data.altitude_sea_level.mission_time.slice(altStartIdx)
                : [];

        // Filter angular velocity data
        const angStartIdx = data.angular_velocity.mission_time.findIndex(
            (t) => t >= startTime
        );
        const angularVelocity =
            angStartIdx >= 0
                ? data.angular_velocity.magnitude.slice(angStartIdx)
                : [];

        // Filter acceleration data
        const accStartIdx = data.linear_acceleration.mission_time.findIndex(
            (t) => t >= startTime
        );
        const accelerations =
            accStartIdx >= 0
                ? data.linear_acceleration.magnitude.slice(accStartIdx)
                : [];

        return { altitudes, altTimes, angularVelocity, accelerations };
    }, [data]);

    // Compute velocity from altitude changes (derivative)
    const velocity = useMemo(() => {
        const { altitudes, altTimes } = filteredData;
        if (altitudes.length < 2) return [];

        const velocities: number[] = [];
        for (let i = 1; i < altitudes.length; i++) {
            const dt = altTimes[i] - altTimes[i - 1];
            if (dt > 0) {
                const dAlt = altitudes[i] - altitudes[i - 1];
                velocities.push(dAlt / dt);
            }
        }
        return velocities;
    }, [filteredData]);

    // Current values
    const currentAltitude = data.altitude_sea_level.metres.at(-1) ?? 0;
    const currentAccel = data.linear_acceleration.magnitude.at(-1) ?? 0;
    const currentGForce = currentAccel / G;
    const maxGForce = useMemo(() => {
        const magnitudes = data.linear_acceleration.magnitude;
        return magnitudes.length > 0 ? Math.max(...magnitudes) / G : 0;
    }, [data.linear_acceleration.magnitude]);

    const currentSpinRate = data.angular_velocity.magnitude.at(-1) ?? 0;
    const currentVelocity = velocity.at(-1) ?? 0;

    // GPS lock: assume locked if we have recent coordinates
    const hasGpsLock = data.gnss.latitude.length > 0;
    const lastGpsTime = data.gnss.mission_time.at(-1) ?? 0;
    const currentMissionTime =
        data.altitude_sea_level.mission_time.at(-1) ?? 0;
    const gpsStale = currentMissionTime - lastGpsTime > 10; // Stale if >10s old

    // Note: RSSI, SNR, and Battery data are not available in the current telemetry
    // These fields will show "N/A" in the UI

    return (
        <div className="absolute top-4 right-4 z-20 w-[380px] bg-black/85 backdrop-blur-sm text-white rounded-lg shadow-2xl font-mono text-xs overflow-hidden border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10">
                <span className="text-[11px] font-semibold tracking-wide text-white/90">
                    STATS FOR NERDS
                </span>
                <button
                    onClick={() => setIsStatsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors p-0.5 hover:bg-white/10 rounded"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
                {/* Altitude Card */}
                <StatCard
                    label="Altitude"
                    value={`${currentAltitude.toFixed(1)} m`}
                    chart={
                        <MiniSparkline
                            data={filteredData.altitudes}
                            color="#10B981"
                            width={100}
                            height={28}
                        />
                    }
                    trend={
                        velocity.length > 0
                            ? velocity.at(-1)! > 0
                                ? "up"
                                : velocity.at(-1)! < 0
                                    ? "down"
                                    : "flat"
                            : "flat"
                    }
                />

                {/* Velocity Card */}
                <StatCard
                    label="Velocity"
                    value={`${currentVelocity.toFixed(1)} m/s`}
                    chart={
                        <MiniSparkline
                            data={velocity}
                            color="#3B82F6"
                            width={100}
                            height={28}
                        />
                    }
                    subtext="Derived from altitude"
                />

                {/* Two-column grid for smaller stats */}
                <div className="grid grid-cols-2 gap-2">
                    {/* G-Force */}
                    <MiniStatCard
                        label="G-Force"
                        value={`${currentGForce.toFixed(2)} g`}
                        subtext={`Max: ${maxGForce.toFixed(2)} g`}
                        color={currentGForce > 3 ? "#EF4444" : "#10B981"}
                    />

                    {/* Spin Rate */}
                    <MiniStatCard
                        label="Spin Rate"
                        value={`${currentSpinRate.toFixed(1)} °/s`}
                        chart={
                            <MiniSparkline
                                data={filteredData.angularVelocity}
                                color="#F59E0B"
                                width={60}
                                height={20}
                                showArea={false}
                            />
                        }
                    />

                    {/* RSSI/SNR */}
                    <MiniStatCard
                        label="RSSI / SNR"
                        value="N/A"
                        subtext="Not available"
                        mocked
                    />

                    {/* GPS Lock */}
                    <MiniStatCard
                        label="GPS Lock"
                        value={
                            <span
                                className={`inline-flex items-center gap-1 ${hasGpsLock && !gpsStale ? "text-green-400" : "text-red-400"}`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${hasGpsLock && !gpsStale ? "bg-green-400" : "bg-red-400"}`}
                                />
                                {hasGpsLock && !gpsStale ? "LOCKED" : gpsStale ? "STALE" : "NO FIX"}
                            </span>
                        }
                        subtext={hasGpsLock ? `${data.gnss.latitude.length} fixes` : "—"}
                    />

                    {/* Time Since Last Packet */}
                    <MiniStatCard
                        label="Last Packet"
                        value={
                            timeSincePacket === 0 && lastPacketWallTime === 0
                                ? "—"
                                : `${timeSincePacket}s ago`
                        }
                        color={timeSincePacket > 5 ? "#EF4444" : "#10B981"}
                    />

                    {/* State of Charge */}
                    <MiniStatCard
                        label="Battery"
                        value="N/A"
                        subtext="Not available"
                        mocked
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="px-3 py-1.5 bg-white/5 border-t border-white/10 text-[9px] text-white/40 flex justify-between">
                <span>Ground Station UI</span>
                <span>
                    {data.altitude_launch_level.mission_time.length} data points
                </span>
            </div>
        </div>
    );
};

// Stat card with chart
interface StatCardProps {
    label: string;
    value: string;
    chart?: React.ReactNode;
    subtext?: string;
    trend?: "up" | "down" | "flat";
}

const StatCard = ({ label, value, chart, subtext, trend }: StatCardProps) => (
    <div className="bg-white/5 rounded-md p-2.5 flex items-center justify-between">
        <div className="flex-1">
            <div className="text-[10px] text-white/50 uppercase tracking-wide mb-0.5">
                {label}
            </div>
            <div className="text-lg font-bold text-white flex items-center gap-1.5">
                {value}
                {trend && trend !== "flat" && (
                    <span
                        className={`text-xs ${trend === "up" ? "text-green-400" : "text-red-400"}`}
                    >
                        {trend === "up" ? "↑" : "↓"}
                    </span>
                )}
            </div>
            {subtext && (
                <div className="text-[9px] text-white/40 mt-0.5">{subtext}</div>
            )}
        </div>
        {chart && <div className="ml-3">{chart}</div>}
    </div>
);

// Mini stat card for 2-column layout
interface MiniStatCardProps {
    label: string;
    value: React.ReactNode;
    subtext?: string;
    chart?: React.ReactNode;
    color?: string;
    mocked?: boolean;
}

const MiniStatCard = ({
    label,
    value,
    subtext,
    chart,
    color = "#FFFFFF",
    mocked,
}: MiniStatCardProps) => (
    <div className="bg-white/5 rounded-md p-2 relative">
        {mocked && (
            <span className="absolute top-1 right-1 text-[8px] text-yellow-500/70 uppercase">
                mock
            </span>
        )}
        <div className="text-[9px] text-white/50 uppercase tracking-wide mb-0.5">
            {label}
        </div>
        <div className="text-sm font-bold" style={{ color }}>
            {value}
        </div>
        {subtext && <div className="text-[9px] text-white/40 mt-0.5">{subtext}</div>}
        {chart && <div className="mt-1">{chart}</div>}
    </div>
);

export default StatsForNerds;
