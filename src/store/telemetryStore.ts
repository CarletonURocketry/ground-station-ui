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

// Helper to merge telemetry data
function mergeTelemetryData(
  e: TelemetryData,
  p: TelemetryPacket
): TelemetryData {
  return {
    altitude_sea_level: {
      mission_time: e.altitude_sea_level.mission_time.concat(
        p.altitude_sea_level?.mission_time ?? []
      ),
      metres: e.altitude_sea_level.metres.concat(
        p.altitude_sea_level?.metres ?? []
      ),
    },
    altitude_launch_level: {
      mission_time: e.altitude_launch_level.mission_time.concat(
        p.altitude_launch_level?.mission_time ?? []
      ),
      metres: e.altitude_launch_level.metres.concat(
        p.altitude_launch_level?.metres ?? []
      ),
    },
    temperature: {
      mission_time: e.temperature.mission_time.concat(
        p.temperature?.mission_time ?? []
      ),
      celsius: e.temperature.celsius.concat(p.temperature?.celsius ?? []),
    },
    pressure: {
      mission_time: e.pressure.mission_time.concat(
        p.pressure?.mission_time ?? []
      ),
      pascals: e.pressure.pascals.concat(p.pressure?.pascals ?? []),
    },
    linear_acceleration: {
      mission_time: e.linear_acceleration.mission_time.concat(
        p.linear_acceleration?.mission_time ?? []
      ),
      x: e.linear_acceleration.x.concat(p.linear_acceleration?.x ?? []),
      y: e.linear_acceleration.y.concat(p.linear_acceleration?.y ?? []),
      z: e.linear_acceleration.z.concat(p.linear_acceleration?.z ?? []),
      magnitude: e.linear_acceleration.magnitude.concat(
        p.linear_acceleration?.magnitude ?? []
      ),
    },
    angular_velocity: {
      mission_time: e.angular_velocity.mission_time.concat(
        p.angular_velocity?.mission_time ?? []
      ),
      x: e.angular_velocity.x.concat(p.angular_velocity?.x ?? []),
      y: e.angular_velocity.y.concat(p.angular_velocity?.y ?? []),
      z: e.angular_velocity.z.concat(p.angular_velocity?.z ?? []),
      magnitude: e.angular_velocity.magnitude.concat(
        p.angular_velocity?.magnitude ?? []
      ),
    },
    humidity: {
      mission_time: e.humidity.mission_time.concat(
        p.humidity?.mission_time ?? []
      ),
      percentage: e.humidity.percentage.concat(p.humidity?.percentage ?? []),
    },
    gnss: {
      mission_time: e.gnss.mission_time.concat(p.gnss?.mission_time ?? []),
      latitude: e.gnss.latitude.concat(p.gnss?.latitude ?? []),
      longitude: e.gnss.longitude.concat(p.gnss?.longitude ?? []),
    },
    voltage: {
      ...e.voltage,
      mission_time: e.voltage.mission_time.concat(
        p.voltage?.mission_time ?? []
      ),
      ...Object.fromEntries(
        Object.entries(p.voltage ?? {})
          .filter(([k]) => k !== "mission_time")
          .map(([k, v]) => [k, (e.voltage[k] ?? []).concat(v)])
      ),
    },
    magnetic_field: {
      mission_time: e.magnetic_field.mission_time.concat(
        p.magnetic_field?.mission_time ?? []
      ),
      x: e.magnetic_field.x.concat(p.magnetic_field?.x ?? []),
      y: e.magnetic_field.y.concat(p.magnetic_field?.y ?? []),
      z: e.magnetic_field.z.concat(p.magnetic_field?.z ?? []),
      magnitude: e.magnetic_field.magnitude.concat(
        p.magnetic_field?.magnitude ?? []
      ),
    },
    flight_status: {
      mission_time: e.flight_status.mission_time.concat(
        p.flight_status?.mission_time ?? []
      ),
      status_code: e.flight_status.status_code.concat(
        p.flight_status?.status_code ?? []
      ),
    },
    flight_error: {
      mission_time: e.flight_error.mission_time.concat(
        p.flight_error?.mission_time ?? []
      ),
      proc_id: e.flight_error.proc_id.concat(p.flight_error?.proc_id ?? []),
      error_code: e.flight_error.error_code.concat(
        p.flight_error?.error_code ?? []
      ),
    },
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

  addPacket: (packet: TelemetryPacket) => {
    set((state) => {
      const packetMaxTime = getMaxMissionTime(packet);
      return {
        data: mergeTelemetryData(state.data, packet),
        lastMissionTime: Math.max(state.lastMissionTime, packetMaxTime),
      };
    });
  },

  clearState: () => {
    set({ data: initialData, lastMissionTime: 0 });
  },
}));
