import { ReplaySeekApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type ReplaySeekParams = {
  position: number;
  clientId?: string;
};

export const replaySeek = async ({ position, clientId }: ReplaySeekParams) => {
  const apiUrl = getApiUrl("replaySeek", {
    clientId,
    queryParams: { position },
  });
  const response = await fetch(apiUrl, { method: "POST" });
  const data = (await response.json()) as ReplaySeekApiResponse;
  return data;
};
