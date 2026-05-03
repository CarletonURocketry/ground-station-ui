import { ReplayPauseApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type ReplayPauseParams = {
  paused: boolean;
  clientId?: string;
};

export const replayPause = async ({ paused, clientId }: ReplayPauseParams) => {
  const apiUrl = getApiUrl("replayPause", {
    clientId,
    queryParams: { paused },
  });
  const response = await fetch(apiUrl, { method: "POST" });
  const data = (await response.json()) as ReplayPauseApiResponse;
  return data;
};
