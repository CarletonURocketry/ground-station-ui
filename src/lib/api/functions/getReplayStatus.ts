import { ReplayStatusApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type GetReplayStatusParams = {
    clientId?: string;
};

export const getReplayStatus = async ({ clientId }: GetReplayStatusParams) => {
    const apiUrl = getApiUrl("getReplayStatus", { clientId });

    const response = await fetch(apiUrl, {
        method: "GET",
    });

    const data = (await response.json()) as ReplayStatusApiResponse;

    return data;
};
