import { MissionApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

export const getMissions = async ({ clientId }: { clientId?: string }) => {
  const apiUrl = getApiUrl("getMissions", clientId);

  const response = await fetch(apiUrl);

  const data = (await response.json()) as MissionApiResponse;

  return data.missions;
};
