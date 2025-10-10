import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const ladiesNightService = {
  details: async () =>
    await apiService.getThrowable<LadiesNightDetailsResponse>(apiRoutes.ladiesNight.details()),

  getQuota: async () =>
    await apiService.getThrowable<{ quota: number }>(apiRoutes.ladiesNight.getQuota()),
};
