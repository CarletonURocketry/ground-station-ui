import { PauseReplayApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type PauseReplayParams = {
    paused: boolean;
    speed?: number;
    clientId?: string;
};

export const pauseReplay = async ({
    paused,
    speed = 1.0,
    clientId,
}: PauseReplayParams) => {
    const apiUrl = getApiUrl("pauseReplay", {
        clientId,
        queryParams: {
            paused,
            speed,
        },
    });

    const response = await fetch(apiUrl, {
        method: "POST",
    });

    const data = (await response.json()) as PauseReplayApiResponse;

    return data;
};
