import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMissions } from "../functions";
import { Mission } from "@/types/api";

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
