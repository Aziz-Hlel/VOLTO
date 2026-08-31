import type { LadiesNightStatsResponse } from "./LadiesNightStatsResponse";

export type GetLadiesNightDataQueryDtoPaginated = {
  ladiesNightStats: LadiesNightStatsResponse[];
  count: number;
};
