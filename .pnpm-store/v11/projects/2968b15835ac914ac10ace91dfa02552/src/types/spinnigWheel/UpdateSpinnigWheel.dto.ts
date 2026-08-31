import type { RewardListResponse } from "./RewardListResponse.dto";
import type { SpinningWheelResponseDto } from "./SpinningWheel.response";

export type UpdateSpinnigWheelDto = Omit<SpinningWheelResponseDto, "isActive" | "rewardList"> & {
  rewardList: Omit<RewardListResponse, "wheelId">[];
};
