import { getApiUrl } from "../util/getApiUrl";

export const getRecordings = async ({ clientId }: { clientId?: string }) => {
  const apiUrl = getApiUrl("recordings", { clientId });

  const response = await fetch(apiUrl);

  const data = (await response.json()) as { recordings: string[] };

  return data.recordings;
};