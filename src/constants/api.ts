// TODO: Change this to env var
export const API_BASE_URL = "http://localhost:8000";

export const MISSIONS_ENDPOINT = `${API_BASE_URL}/missions`;

export const API_ACTIONS_MAP = {
  getMissions: MISSIONS_ENDPOINT,
} as const;
