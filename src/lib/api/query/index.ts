import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getRecordings, startReplay, stopReplay } from "../functions";
import { StartReplayApiResponse, StopReplayApiResponse } from "@/types/api";

export const useRecordings = (
  { clientId }: { clientId?: string } = {},
  options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<string[], Error>({
    queryKey: ["recordings", clientId || ""],
    queryFn: () => getRecordings({ clientId }),
    ...options,
  });
};

export const useStartReplay = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<StartReplayApiResponse, Error, string>
) => {
  const resolvedClientId = clientId || "";

  return useMutation<StartReplayApiResponse, Error, string>({
    mutationKey: ["startReplay", resolvedClientId],
    mutationFn: (replayPath) =>
      startReplay({ replayPath, clientId: resolvedClientId }),
    ...options,
  });
};

export const useStopReplay = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<StopReplayApiResponse, Error, void>
) => {
  const resolvedClientId = clientId || "";

  return useMutation<StopReplayApiResponse, Error, void>({
    mutationKey: ["stopReplay", resolvedClientId],
    mutationFn: () => stopReplay({ clientId: resolvedClientId }),
    ...options,
  });
};
