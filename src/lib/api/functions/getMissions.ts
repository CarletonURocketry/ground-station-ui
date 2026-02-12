import { MissionApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

export const getMissions = async ({ clientId }: { clientId?: string }) => {
  const apiUrl = getApiUrl("getMissions", { clientId });

  /*
  Uncomment (and comment out the fetch(apiUrl) line) if you want to use the missions/ folder for the replays, instead of the recordings/ folder

  const urlModified = new URL(apiUrl);
  urlModified.searchParams.append("source", "missions");

  const response = await fetch(urlModified.toString());
  */
  const response = await fetch(apiUrl);

  const data = (await response.json()) as MissionApiResponse;

  return data.missions;
};
