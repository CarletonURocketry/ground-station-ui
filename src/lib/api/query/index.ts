import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getRecordings, startReplay, stopReplay, replaySeek, replayPause } from "../functions";
import {
  StartReplayApiResponse,
  StopReplayApiResponse,
  ReplaySeekApiResponse,
  ReplayPauseApiResponse,
} from "@/types/api";

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

export const useReplayPause = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<ReplayPauseApiResponse, Error, boolean>
) => {
  const resolvedClientId = clientId || "";

  return useMutation<ReplayPauseApiResponse, Error, boolean>({
    mutationKey: ["replayPause", resolvedClientId],
    mutationFn: (paused) => replayPause({ paused, clientId: resolvedClientId }),
    ...options,
  });
};

export const useReplaySeek = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<ReplaySeekApiResponse, Error, number>
) => {
  const resolvedClientId = clientId || "";

  return useMutation<ReplaySeekApiResponse, Error, number>({
    mutationKey: ["replaySeek", resolvedClientId],
    mutationFn: (position) => replaySeek({ position, clientId: resolvedClientId }),
    ...options,
  });
};
