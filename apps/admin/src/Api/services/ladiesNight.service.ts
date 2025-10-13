import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { GetLadiesNightDataQueryDto } from "@/types/ladiesNight/GetLadiesNightDataQueryDto";
import type { LadiesNightStatsResponse } from "@/types/ladiesNight/LadiesNightStatsResponse";
import type { GetLadiesNightDataQueryDtoPaginated } from "@/types/ladiesNight/GetLadiesNightDataQueryDtoPaginated";

export const ladiesNightService = {
  details: async () =>
    await apiService.getThrowable<LadiesNightDetailsResponse>(apiRoutes.ladiesNight.details()),

  getQuota: async () =>
    await apiService.getThrowable<{ quota: number }>(apiRoutes.ladiesNight.getQuota()),

  updateQuota: async (quota: number) =>
    await apiService.patchThrowable<{ quota: number }>(apiRoutes.ladiesNight.updateQuota(), {
      quota,
    }),

  stats: async (queryParams: GetLadiesNightDataQueryDto) =>
    await apiService.getThrowable<GetLadiesNightDataQueryDtoPaginated>(
      apiRoutes.ladiesNight.stats(),
      { params: queryParams },
    ),
};
