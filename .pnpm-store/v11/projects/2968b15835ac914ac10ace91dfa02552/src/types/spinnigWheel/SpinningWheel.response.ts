import type { RewardListResponse } from "./RewardListResponse.dto";

export type SpinningWheelResponseDto = {
  id: string;
  name?: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  rewardList: RewardListResponse[];
};
