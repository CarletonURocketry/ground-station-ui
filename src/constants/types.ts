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
    altitude: {
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
    angular_velocity: {
      mission_time: number[];
      x: number[];
      y: number[];
      z: number[];
    };
    linear_acceleration: {
      mission_time: number[];
      x: number[];
      y: number[];
      z: number[];
    };
    humidity: {
      mission_time: number[];
      percentage: number[];
    };
    gnss: {
      mission_time: number[];
      latitude: number[];
      longitude: number[];
    };
    sats_in_use: {
      mission_time: number[];
      gps: number[];
      glonass: number[];
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