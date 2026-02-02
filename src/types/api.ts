import { API_ACTIONS_MAP } from "@/constants/api";

export type ApiActions = keyof typeof API_ACTIONS_MAP;

export type BaseApiResponse = {
  status: string;
};

export type Mission = {
  name: string;
  path: string;
};

export type MissionApiResponse = BaseApiResponse & {
  missions: Mission[];
};
