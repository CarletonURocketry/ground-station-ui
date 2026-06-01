import { ReplayStatusApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type ReplayStatusParams = {
  clientId?: string;
};

export const replayStatus = async ({ clientId }: ReplayStatusParams) => {
  const apiUrl = getApiUrl("replayStatus", { clientId });
  const response = await fetch(apiUrl);
  const data = (await response.json()) as ReplayStatusApiResponse;
  return data;
};
