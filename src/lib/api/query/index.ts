import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getMissions,
  startReplay,
  stopReplay,
  pauseReplay,
  getReplayStatus,
  seekReplay,
} from "../functions";
import {
  Mission,
  StartReplayApiResponse,
  StopReplayApiResponse,
  PauseReplayApiResponse,
  ReplayStatusApiResponse,
  SeekReplayApiResponse,
} from "@/types/api";

export const useMissions = (
  { clientId }: { clientId?: string } = {},
  options?: Omit<UseQueryOptions<Mission[], Error>, "queryKey" | "queryFn">
) => {
  return useQuery<Mission[], Error>({
    queryKey: ["missions", clientId || ""],
    queryFn: () => getMissions({ clientId }),
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

export const usePauseReplay = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<
    PauseReplayApiResponse,
    Error,
    { paused: boolean; speed?: number }
  >
) => {
  const resolvedClientId = clientId || "";

  return useMutation<
    PauseReplayApiResponse,
    Error,
    { paused: boolean; speed?: number }
  >({
    mutationKey: ["pauseReplay", resolvedClientId],
    mutationFn: ({ paused, speed }) =>
      pauseReplay({ paused, speed, clientId: resolvedClientId }),
    ...options,
  });
};

export const useReplayStatus = (
  { clientId, enabled = false }: { clientId?: string; enabled?: boolean } = {},
  options?: Omit<
    UseQueryOptions<ReplayStatusApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const resolvedClientId = clientId || "";

  return useQuery<ReplayStatusApiResponse, Error>({
    queryKey: ["replayStatus", resolvedClientId],
    queryFn: () => getReplayStatus({ clientId: resolvedClientId }),
    enabled,
    refetchInterval: 500, // Poll every 500ms during replay
    ...options,
  });
};

export const useSeekReplay = (
  { clientId }: { clientId?: string } = {},
  options?: UseMutationOptions<SeekReplayApiResponse, Error, number>
) => {
  const resolvedClientId = clientId || "";

  return useMutation<SeekReplayApiResponse, Error, number>({
    mutationKey: ["seekReplay", resolvedClientId],
    mutationFn: (position) =>
      seekReplay({ position, clientId: resolvedClientId }),
    ...options,
  });
};


