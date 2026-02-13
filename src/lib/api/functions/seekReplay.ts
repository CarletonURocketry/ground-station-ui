import { SeekReplayApiResponse } from "@/types/api";
import { getApiUrl } from "../util/getApiUrl";

type SeekReplayParams = {
    position: number;
    clientId?: string;
};

export const seekReplay = async ({ position, clientId }: SeekReplayParams) => {
    const apiUrl = getApiUrl("seekReplay", {
        clientId,
        queryParams: {
            position,
        },
    });

    const response = await fetch(apiUrl, {
        method: "POST",
    });

    const data = (await response.json()) as SeekReplayApiResponse;

    return data;
};
