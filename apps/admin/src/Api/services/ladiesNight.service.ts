import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { GetLadiesNightDataQueryDto } from "@/types/ladiesNight/GetLadiesNightDataQueryDto";

export const ladiesNightService = {
  details: async (queryParams:GetLadiesNightDataQueryDto) =>
    await apiService.getThrowable<LadiesNightDetailsResponse>(apiRoutes.ladiesNight.details(),{params: queryParams}),

  getQuota: async () =>
    await apiService.getThrowable<{ quota: number }>(apiRoutes.ladiesNight.getQuota()),
};
