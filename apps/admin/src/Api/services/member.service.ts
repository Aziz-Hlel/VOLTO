import type { ApproveMembershipDto } from "@/types/member/approve-membership";
import type { UpdateMembershipStatus } from "@/types/member/edit-membership-status";
import type { EditMembershipDetailsSchemaType } from "@/types/member/edit-memebership-details";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const membershipService = {
  approveApplication: (membershipApplicationId: string, payload: ApproveMembershipDto) =>
    apiService.postThrowable(apiRoutes.member.approveApplication(membershipApplicationId), payload),
  renewApplication: (membershipApplicationId: string, payload: ApproveMembershipDto) =>
    apiService.postThrowable(apiRoutes.member.renewMemebership(membershipApplicationId), payload),
  editDetails: (membershipApplicationId: string, payload: EditMembershipDetailsSchemaType) =>
    apiService.patchThrowable(apiRoutes.member.editDetails(membershipApplicationId), payload),
  updateStatus: (membershipApplicationId: string, payload: UpdateMembershipStatus) =>
    apiService.patchThrowable(apiRoutes.member.updateStatus(membershipApplicationId), payload),
};
