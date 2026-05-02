// TODO: Change this to env var
export const API_BASE_URL = "http://localhost:8000";

export const RECORDINGS_ENDPOINT = `${API_BASE_URL}/recordings`;
export const REPLAY_PLAY_ENDPOINT = `${API_BASE_URL}/replay_play`;
export const REPLAY_STOP_ENDPOINT = `${API_BASE_URL}/replay_stop`;

export const API_ACTIONS_MAP = {
  recordings: RECORDINGS_ENDPOINT,
  startReplay: REPLAY_PLAY_ENDPOINT,
  stopReplay: REPLAY_STOP_ENDPOINT,
} as const;
