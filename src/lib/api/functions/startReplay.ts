import { StartReplayApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type StartReplayParams = {
  replayPath: string;
  clientId?: string;
};

export const startReplay = async ({
  replayPath,
  clientId,
}: StartReplayParams) => {
  const apiUrl = getApiUrl("startReplay", {
    clientId,
    queryParams: {
      replay_path: replayPath,
    },
  });

  const response = await fetch(apiUrl, {
    method: "POST",
  });

  const data = (await response.json()) as StartReplayApiResponse;

  return data;
};
