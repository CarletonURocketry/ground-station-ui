import { API_ACTIONS_MAP } from "@/constants/api";
import { ApiActions } from "@/types/api";

export const getApiUrl = (action: ApiActions, clientId?: string) => {
  const url = new URL(API_ACTIONS_MAP[action]);
  url.searchParams.append("client_id", clientId || "");

  return url.toString();
};
