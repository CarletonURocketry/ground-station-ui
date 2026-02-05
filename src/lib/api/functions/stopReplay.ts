import { StopReplayApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type StopReplayParams = {
  clientId?: string;
};

export const stopReplay = async ({ clientId }: StopReplayParams) => {
  const apiUrl = getApiUrl("stopReplay", { clientId });

  const response = await fetch(apiUrl, {
    method: "POST",
  });

  const data = (await response.json()) as StopReplayApiResponse;

  return data;
};
