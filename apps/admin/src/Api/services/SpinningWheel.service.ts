import type { SpinningWheelResponseDto } from "@/types/spinnigWheel/SpinningWheel.response";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { UpdateSpinnigWheelDto } from "@/types/spinnigWheel/UpdateSpinnigWheel.dto";
import type { GetSpinnigWheelDataQueryDto } from "@/types/spinnigWheel/GetSpinnigWheelDataQueryDto";
import type { GetSpinnigWheelDataByPeriodDto } from "@/types/spinnigWheel/GetSpinningWheelByPeriod.dto";
import type { GetSpinningWheelDataPaginatedResponse } from "@/types/spinnigWheel/GetSpinningWheelDataPaginatedResponse";
import type { SpinningWheelStatsResponse } from "@/types/spinnigWheel/SpinningWheelStatsResponse";

export const SpinningWheelService = {
  details: async () =>
    await apiService.getThrowable<SpinningWheelResponseDto>(apiRoutes.spinningWheel.details()),

  update: async (spinningWheel: UpdateSpinnigWheelDto) =>
    await apiService.putThrowable<SpinningWheelResponseDto>(
      apiRoutes.spinningWheel.update(),
      spinningWheel,
    ),

  stats: async (queryParams: GetSpinnigWheelDataQueryDto) =>
    await apiService.getThrowable<GetSpinningWheelDataPaginatedResponse>(
      apiRoutes.spinningWheel.stats(),
      { params: queryParams },
    ),

  statsByPeriod: async (queryParams: GetSpinnigWheelDataByPeriodDto) =>
    await apiService.getThrowable<SpinningWheelStatsResponse[]>(
      apiRoutes.spinningWheel.statsByPeriod(),
      { params: queryParams },
    ),
};
