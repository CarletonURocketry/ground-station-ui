import { API_ACTIONS_MAP } from "@/constants/api";
import { ApiActions } from "@/types/api";

type ApiQueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type ApiUrlOptions = {
  clientId?: string;
  queryParams?: ApiQueryParams;
};

export const getApiUrl = (action: ApiActions, options: ApiUrlOptions = {}) => {
  const url = new URL(API_ACTIONS_MAP[action]);
  const resolvedClientId = options.clientId || "";

  url.searchParams.append("client_id", resolvedClientId);

  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};
