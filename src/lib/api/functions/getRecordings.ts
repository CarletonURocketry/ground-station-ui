import { RecordingApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

export const getRecordings = async ({ clientId }: { clientId?: string }) => {
  const apiUrl = getApiUrl("getRecordings", { clientId });

  const response = await fetch(apiUrl);

  const data = (await response.json()) as RecordingApiResponse;

  return data.recordings;
};
