import type { SpinningWheelResponseDto } from "@/types/spinnigWheel/SpinningWheel.response";
import { apiService } from "../apiService";
import apiRoutes from "../routes";
import type { UpdateSpinnigWheelDto } from "@/types/spinnigWheel/UpdateSpinnigWheel.dto";

export const SpinningWheelService = {
  details: async () =>
    await apiService.getThrowable<SpinningWheelResponseDto>(apiRoutes.spinningWheel.details()),

  update: async (spinningWheel: UpdateSpinnigWheelDto) =>
    await apiService.putThrowable<SpinningWheelResponseDto>(
      apiRoutes.spinningWheel.update(),
      spinningWheel,
    ),
};
