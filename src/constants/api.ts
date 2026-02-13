// TODO: Change this to env var
export const API_BASE_URL = "http://localhost:8000";

export const MISSIONS_ENDPOINT = `${API_BASE_URL}/missions`;
export const REPLAY_PLAY_ENDPOINT = `${API_BASE_URL}/replay_play`;
export const REPLAY_STOP_ENDPOINT = `${API_BASE_URL}/replay_stop`;
export const REPLAY_PAUSE_ENDPOINT = `${API_BASE_URL}/replay_pause`;
export const REPLAY_STATUS_ENDPOINT = `${API_BASE_URL}/replay_status`;
export const REPLAY_SEEK_ENDPOINT = `${API_BASE_URL}/replay_seek`;

export const API_ACTIONS_MAP = {
  getMissions: MISSIONS_ENDPOINT,
  startReplay: REPLAY_PLAY_ENDPOINT,
  stopReplay: REPLAY_STOP_ENDPOINT,
  pauseReplay: REPLAY_PAUSE_ENDPOINT,
  getReplayStatus: REPLAY_STATUS_ENDPOINT,
  seekReplay: REPLAY_SEEK_ENDPOINT,
} as const;


