export type LadiesNightStatsPeriod = "90d" | "180d" | "365d";

export type GetLadiesNightByPeriodDto = {
  period: LadiesNightStatsPeriod;
};
