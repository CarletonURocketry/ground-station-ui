import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getMissions, startReplay, stopReplay } from "../functions";
import {
  Mission,
  StartReplayApiResponse,
  StopReplayApiResponse,
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
