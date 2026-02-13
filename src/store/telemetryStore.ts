/**
 *
 *
 *
 *
 * TODO: SEPERATE TYPES INTO THEIR OWN FILE/FOLDERS
 *
 *
 *
 *
 */

import { create } from "zustand";

// Telemetry data types (consolidated arrays)
export interface AltitudeSeaLevelData {
  mission_time: number[];
  metres: number[];
}

export interface AltitudeLaunchLevelData {
  mission_time: number[];
  metres: number[];
}

export interface TemperatureData {
  mission_time: number[];
  celsius: number[];
}

export interface PressureData {
  mission_time: number[];
  pascals: number[];
}

export interface LinearAccelerationData {
  mission_time: number[];
  x: number[];
  y: number[];
  z: number[];
  magnitude: number[];
}

export interface AngularVelocityData {
  mission_time: number[];
  x: number[];
  y: number[];
  z: number[];
  magnitude: number[];
}

export interface HumidityData {
  mission_time: number[];
  percentage: number[];
}

export interface GnssData {
  mission_time: number[];
  latitude: number[];
  longitude: number[];
}

export interface VoltageData {
  mission_time: number[];
  [channel: string]: number[]; // Dynamic channels: "0", "1", etc.
}

export interface MagneticFieldData {
  mission_time: number[];
  x: number[];
  y: number[];
  z: number[];
  magnitude: number[];
}

export interface FlightStatusData {
  mission_time: number[];
  status_code: number[];
}

export interface FlightErrorData {
  mission_time: number[];
  proc_id: number[];
  error_code: number[];
}

// Incoming packet from websocket (same structure, used for type clarity)
export interface TelemetryPacket {
  altitude_sea_level?: AltitudeSeaLevelData;
  altitude_launch_level?: AltitudeLaunchLevelData;
  temperature?: TemperatureData;
  pressure?: PressureData;
  linear_acceleration?: LinearAccelerationData;
  angular_velocity?: AngularVelocityData;
  humidity?: HumidityData;
  gnss?: GnssData;
  voltage?: VoltageData;
  magnetic_field?: MagneticFieldData;
  flight_status?: FlightStatusData;
  flight_error?: FlightErrorData;
}

// Consolidated telemetry data store
interface TelemetryData {
  altitude_sea_level: AltitudeSeaLevelData;
  altitude_launch_level: AltitudeLaunchLevelData;
  temperature: TemperatureData;
  pressure: PressureData;
  linear_acceleration: LinearAccelerationData;
  angular_velocity: AngularVelocityData;
  humidity: HumidityData;
  gnss: GnssData;
  voltage: VoltageData;
  magnetic_field: MagneticFieldData;
  flight_status: FlightStatusData;
  flight_error: FlightErrorData;
}

interface TelemetryState {
  data: TelemetryData;
  lastMissionTime: number;
  lastPacketWallTime: number; // Wall-clock time when last packet was received (Date.now())
  addPacket: (packet: TelemetryPacket) => void;
  clearState: () => void;
}

const initialData: TelemetryData = {
  altitude_sea_level: { mission_time: [], metres: [] },
  altitude_launch_level: { mission_time: [], metres: [] },
  temperature: { mission_time: [], celsius: [] },
  pressure: { mission_time: [], pascals: [] },
  linear_acceleration: { mission_time: [], x: [], y: [], z: [], magnitude: [] },
  angular_velocity: { mission_time: [], x: [], y: [], z: [], magnitude: [] },
  humidity: { mission_time: [], percentage: [] },
  gnss: { mission_time: [], latitude: [], longitude: [] },
  voltage: { mission_time: [] },
  magnetic_field: { mission_time: [], x: [], y: [], z: [], magnitude: [] },
  flight_status: { mission_time: [], status_code: [] },
  flight_error: { mission_time: [], proc_id: [], error_code: [] },
};

// Helper to merge and sort telemetry arrays based on mission_time
function mergeSorted<T>(
  existing: T,
  incoming: Partial<T> | undefined
): T {
  const e = existing as any;
  const p = incoming as any;

  if (!p || !p.mission_time || p.mission_time.length === 0) {
    return existing;
  }

  // Fast path: if new data is strictly after existing data, we can just concat
  const lastExistingTime = e.mission_time.length > 0
    ? e.mission_time[e.mission_time.length - 1]
    : -Infinity;

  if (p.mission_time[0] >= lastExistingTime) {
    const result: any = { ...e };
    for (const key in e) {
      if (Array.isArray(e[key])) {
        result[key] = e[key].concat(p[key] || []);
      }
    }
    return result as T;
  }

  // Slow path: merge and sort
  const keys = Object.keys(e).filter(k => Array.isArray(e[k]));
  const combined = [];

  // Add old items
  for (let i = 0; i < e.mission_time.length; i++) {
    const item: any = {};
    for (const key of keys) {
      item[key] = e[key][i];
    }
    combined.push(item);
  }

  // Add new items
  for (let i = 0; i < p.mission_time.length; i++) {
    const item: any = {};
    for (const key of keys) {
      item[key] = p[key][i];
    }
    combined.push(item);
  }

  // Sort by mission_time
  combined.sort((a, b) => a.mission_time - b.mission_time);

  // Unzip back into arrays
  const result: any = { ...e };
  for (const key of keys) {
    result[key] = combined.map(item => item[key]);
  }

  return result as T;
}

// Helper to merge telemetry data
function mergeTelemetryData(
  e: TelemetryData,
  p: TelemetryPacket
): TelemetryData {
  return {
    altitude_sea_level: mergeSorted(e.altitude_sea_level, p.altitude_sea_level),
    altitude_launch_level: mergeSorted(e.altitude_launch_level, p.altitude_launch_level),
    temperature: mergeSorted(e.temperature, p.temperature),
    pressure: mergeSorted(e.pressure, p.pressure),
    linear_acceleration: mergeSorted(e.linear_acceleration, p.linear_acceleration),
    angular_velocity: mergeSorted(e.angular_velocity, p.angular_velocity),
    humidity: mergeSorted(e.humidity, p.humidity),
    gnss: mergeSorted(e.gnss, p.gnss),
    voltage: mergeSorted(e.voltage, p.voltage),
    magnetic_field: mergeSorted(e.magnetic_field, p.magnetic_field),
    flight_status: mergeSorted(e.flight_status, p.flight_status),
    flight_error: mergeSorted(e.flight_error, p.flight_error),
  };
}

// Helper to get the max mission time from a packet
function getMaxMissionTime(packet: TelemetryPacket): number {
  const times = [
    packet.altitude_sea_level?.mission_time,
    packet.altitude_launch_level?.mission_time,
    packet.temperature?.mission_time,
    packet.pressure?.mission_time,
    packet.linear_acceleration?.mission_time,
    packet.angular_velocity?.mission_time,
    packet.humidity?.mission_time,
    packet.gnss?.mission_time,
    packet.voltage?.mission_time,
    packet.magnetic_field?.mission_time,
    packet.flight_status?.mission_time,
    packet.flight_error?.mission_time,
  ]
    .filter((arr): arr is number[] => arr !== undefined && arr.length > 0)
    .map((arr) => arr.at(-1) ?? 0);

  return times.length > 0 ? Math.max(...times) : 0;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  data: initialData,
  lastMissionTime: 0,
  lastPacketWallTime: 0,

  addPacket: (packet: TelemetryPacket) => {
    set((state) => {
      const packetMaxTime = getMaxMissionTime(packet);
      return {
        data: mergeTelemetryData(state.data, packet),
        lastMissionTime: Math.max(state.lastMissionTime, packetMaxTime),
        lastPacketWallTime: Date.now(),
      };
    });
  },

  clearState: () => {
    set({ data: initialData, lastMissionTime: 0, lastPacketWallTime: 0 });
  },
}));
