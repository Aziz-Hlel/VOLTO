import type { ApproveMembershipDto } from "@/types/member/approve-membership";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const membershipService = {
  approveApplication: (membershipApplicationId: string, payload: ApproveMembershipDto) =>
    apiService.postThrowable(apiRoutes.member.approveApplication(membershipApplicationId), payload),
};
