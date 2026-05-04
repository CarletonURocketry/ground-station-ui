import { useMemo, useState, useEffect, useRef } from "react";
import { useTelemetryStore } from "@/store/telemetryStore";
import { G } from "@/lib/constants/science";
import { TIME_WINDOW_SECONDS } from "@/lib/constants/graphs";

export function useStatsData() {
  const { data, lastPacketWallTime } = useTelemetryStore();
  const [timeSincePacket, setTimeSincePacket] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastPacketWallTime > 0) {
        setTimeSincePacket(
          Math.floor((Date.now() - lastPacketWallTime) / 1000)
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastPacketWallTime]);

  const filteredData = useMemo(() => {
    const currentTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;
    const startTime = Math.max(0, currentTime - TIME_WINDOW_SECONDS);

    const altStartIdx = data.altitude_sea_level.mission_time.findIndex(
      (t) => t >= startTime
    );
    const altitudes =
      altStartIdx >= 0 ? data.altitude_sea_level.metres.slice(altStartIdx) : [];
    const altTimes =
      altStartIdx >= 0
        ? data.altitude_sea_level.mission_time.slice(altStartIdx)
        : [];

    const angStartIdx = data.angular_velocity.mission_time.findIndex(
      (t) => t >= startTime
    );
    const angularVelocity =
      angStartIdx >= 0
        ? data.angular_velocity.magnitude.slice(angStartIdx)
        : [];

    const accStartIdx = data.linear_acceleration.mission_time.findIndex(
      (t) => t >= startTime
    );
    const accelerations =
      accStartIdx >= 0
        ? data.linear_acceleration.magnitude.slice(accStartIdx)
        : [];

    return { altitudes, altTimes, angularVelocity, accelerations };
  }, [data]);

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

  const currentAltitude = data.altitude_sea_level.metres.at(-1) ?? 0;
  const currentAccel = data.linear_acceleration.magnitude.at(-1) ?? 0;
  const currentGForce = currentAccel / G;
  const maxGForce = useMemo(() => {
    const magnitudes = data.linear_acceleration.magnitude;
    return magnitudes.length > 0 ? Math.max(...magnitudes) / G : 0;
  }, [data.linear_acceleration.magnitude]);

  const currentSpinRate = data.angular_velocity.magnitude.at(-1) ?? 0;

  const tempAltRef = useRef<{ alt: number; time: number }[]>([]);
  const lastSecondRef = useRef(-1);
  const [currentVelocity, setCurrentVelocity] = useState(0);

  useEffect(() => {
    const metres = data.altitude_sea_level.metres;
    const times = data.altitude_sea_level.mission_time;
    if (metres.length === 0) return;

    const latestAlt = metres.at(-1)!;
    const latestTime = times.at(-1)!;
    const second = Math.floor(latestTime * 4);

    if (lastSecondRef.current === -1) lastSecondRef.current = second;

    if (second !== lastSecondRef.current) {
      const temp = tempAltRef.current;
      if (temp.length >= 2) {
        const dt = temp.at(-1)!.time - temp[0].time;
        if (dt > 0) setCurrentVelocity((temp.at(-1)!.alt - temp[0].alt) / dt);
      }
      tempAltRef.current = [];
      lastSecondRef.current = second;
    }

    tempAltRef.current.push({ alt: latestAlt, time: latestTime });
  }, [data.altitude_sea_level]);

  const hasGpsLock = data.gnss.latitude.length > 0;
  const lastGpsTime = data.gnss.mission_time.at(-1) ?? 0;
  const currentMissionTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;
  const gpsStale = currentMissionTime - lastGpsTime > 10;

  const currentLat = data.gnss.latitude.at(-1);
  const currentLon = data.gnss.longitude.at(-1);

  const altitudeTrend: "up" | "down" | "flat" =
    velocity.length > 0
      ? velocity.at(-1)! > 0
        ? "up"
        : velocity.at(-1)! < 0
          ? "down"
          : "flat"
      : "flat";

  return {
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
  };
}
