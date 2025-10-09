import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const ladiesNightService = {
  details: () =>
    apiService.getThrowable<LadiesNightDetailsResponse>(apiRoutes.ladiesNight.details()),
};
