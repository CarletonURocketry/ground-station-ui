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

    // Current coordinates
    const currentLat = data.gnss.latitude.at(-1);
    const currentLon = data.gnss.longitude.at(-1);

    return (
        <div className="absolute top-4 right-4 z-20 w-[340px] bg-white/80 backdrop-blur-md text-slate-900 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] font-mono text-xs overflow-hidden border border-white/20 flex flex-col max-h-[calc(100vh-2rem)]">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-2.5 py-1.5 bg-slate-50/50 border-b border-slate-200/50">
                <span className="text-[9px] font-black tracking-widest text-slate-800">
                    STATS FOR NERDS
                </span>
                <button
                    onClick={() => setIsStatsOpen(false)}
                    className="text-slate-400 hover:text-slate-900 transition-colors p-0.5 hover:bg-slate-200/50 rounded-lg"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {/* Altitude Card */}
                <StatCard
                    label="Altitude"
                    value={`${currentAltitude.toFixed(1)} m`}
                    chart={
                        <MiniSparkline
                            data={filteredData.altitudes}
                            color="#059669"
                            width={100}
                            height={30}
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
                            color="#2563eb"
                            width={100}
                            height={30}
                        />
                    }
                    subtext="Derived from altitude"
                />

                {/* Coordinates Row */}
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

                {/* Two-column grid for smaller stats */}
                <div className="grid grid-cols-2 gap-2">
                    {/* G-Force */}
                    <MiniStatCard
                        label="G-Force"
                        value={`${currentGForce.toFixed(2)} g`}
                        subtext={`Max: ${maxGForce.toFixed(2)} g`}
                        color={currentGForce > 3 ? "#e11d48" : "#059669"}
                    />

                    {/* Spin Rate */}
                    <MiniStatCard
                        label="Spin Rate"
                        value={`${currentSpinRate.toFixed(1)} °/s`}
                        chart={
                            <MiniSparkline
                                data={filteredData.angularVelocity}
                                color="#d97706"
                                width={70}
                                height={25}
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
                                className={`inline-flex items-center gap-1.5 ${hasGpsLock && !gpsStale ? "text-emerald-600" : "text-rose-600"}`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${hasGpsLock && !gpsStale ? "bg-emerald-500" : "bg-rose-500"}`}
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
                        color={timeSincePacket > 5 ? "#e11d48" : "#059669"}
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
            <div className="flex-shrink-0 px-2.5 py-1 bg-slate-50/50 border-t border-slate-200/50 text-[9px] text-slate-500 flex justify-between font-bold">
                <span>Ground Station UI</span>
                <span>
                    {data.altitude_sea_level.mission_time.length} data points
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
    <div className="bg-slate-50/40 border border-slate-100/50 rounded-xl p-2 flex items-center justify-between">
        <div className="flex-1">
            <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-0.5">
                {label}
            </div>
            <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                {value}
                {trend && trend !== "flat" && (
                    <span
                        className={`text-sm ${trend === "up" ? "text-emerald-600" : "text-rose-600"}`}
                    >
                        {trend === "up" ? "↑" : "↓"}
                    </span>
                )}
            </div>
            {subtext && (
                <div className="text-[8px] text-slate-400 mt-0.5 font-bold">{subtext}</div>
            )}
        </div>
        {chart && <div className="ml-2">{chart}</div>}
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
    color = "#0f172a",
    mocked,
}: MiniStatCardProps) => (
    <div className="bg-slate-50/40 border border-slate-100/50 rounded-xl p-1.5 relative">
        {mocked && (
            <span className="absolute top-1 right-1 text-[7px] text-amber-600 font-black uppercase tracking-tighter">
                mock
            </span>
        )}
        <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-0.5">
            {label}
        </div>
        <div className="text-base font-black" style={{ color }}>
            {value}
        </div>
        {subtext && <div className="text-[8px] text-slate-400 mt-0.5 font-bold">{subtext}</div>}
        {chart && <div className="mt-1">{chart}</div>}
    </div>
);

export default StatsForNerds;
