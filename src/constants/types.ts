export interface WebSocketData {
  org: string;
  rocket: string;
  version: string;
  status: {
    mission: {
      name: string;
      epoch: number;
      state: number;
      recording: boolean;
    };
    serial: {
      available_ports: string[];
    };
    rn2483_radio: {
      connected: boolean;
      connected_port: string;
      snr: number;
    };
    rocket: {
      mission_time: number;
      deployment_state: number;
      blocks_recorded: number;
      checkouts_missed: number;
    };
    replay: {
      state: number;
      speed: number;
      mission_list: {
        name: string;
        length: number;
        version: number;
      }[];
    };
  };
  telemetry: {
    last_mission_time: number;
    altitude_sea_level: {
      mission_time: number[];
      metres: number[];
      feet: number[];
    };
    altitude_launch_level: {
      mission_time: number[];
      metres: number[];
      feet: number[];
    };
    temperature: {
      mission_time: number[];
      celsius: number[];
    };
    pressure: {
      mission_time: number[];
      pascals: number[];
    };
    linear_acceleration_rel: {
      mission_time: number[];
      x: number[];
      y: number[];
      z: number[];
      magnitude: number[];
    };
    linear_acceleration_abs: {
      mission_time: number[];
      x: number[];
      y: number[];
      z: number[];
      magnitude: number[];
    };
    angular_velocity: {
      mission_time: number[];
      x: number[];
      y: number[];
      z: number[];
      magnitude: number[];
    };
    humidity: {
      mission_time: number[];
      percentage: number[];
    };
    coordinates: {
      mission_time: number[];
      latitude: number[];
      longitude: number[];
    };
  };
}

export interface VelocityData {
  mission_time: number[];
  x: number[];
  y: number[];
  z: number[];
  [key: string]: number[];
}

export interface ComponentPosition {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}