import { API_ACTIONS_MAP } from "@/constants/api";

export type ApiActions = keyof typeof API_ACTIONS_MAP;

export type BaseApiResponse = {
  status: string;
};

export type Mission = {
  name: string;
  path: string;
};

export type MissionApiResponse = BaseApiResponse & {
  missions: Mission[];
};

export type StartReplayApiResponse = BaseApiResponse & {
  replay_path: string;
  speed: number;
};

export type StopReplayApiResponse = BaseApiResponse;

export type PauseReplayApiResponse = BaseApiResponse & {
  paused: boolean;
};

export type ReplayStatusApiResponse = BaseApiResponse & {
  is_playing: boolean;
  is_paused: boolean;
  current_line: number;
  total_lines: number;
  progress: number;
  speed: number;
  replay_path: string | null;
};

export type SeekReplayApiResponse = BaseApiResponse & {
  position: number;
  total: number;
};


