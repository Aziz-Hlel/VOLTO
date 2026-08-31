import type { SpinningWheelStatsResponse } from "./SpinningWheelStatsResponse";

export type GetSpinningWheelDataPaginatedResponse = {
  spinningWheelStats: SpinningWheelStatsResponse[];
  count: number;
};
