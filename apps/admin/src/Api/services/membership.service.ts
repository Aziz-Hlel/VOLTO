import type { MembershipApplication } from "@/types/member/Membership";
import type { UpdateMemberStatusDto } from "@/types/member/update-member-status.dto";
import type { UpdateMemberDto } from "@/types/member/update-member.dto";
import type { UpdateMembershipType } from "@/types/member/update-memebership-type";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const membershipApplicationService = {
  list: (queryParams?: URLSearchParams) =>
    apiService.getThrowable<{
      data: MembershipApplication[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>(apiRoutes.membershipApplication.list(), { params: queryParams }),
  get: (membershipId: string) =>
    apiService.getThrowable<MembershipApplication>(
      apiRoutes.membershipApplication.get(membershipId),
    ),
  update: (membershipId: string, membership: UpdateMemberDto) =>
    apiService.putThrowable(apiRoutes.membershipApplication.update(membershipId), membership),
  delete: (membershipId: string) =>
    apiService.deleteThrowable(apiRoutes.membershipApplication.delete(membershipId)),
  updateStatus: (membershipId: string, status: UpdateMemberStatusDto) =>
    apiService.patchThrowable(apiRoutes.membershipApplication.updateStatus(membershipId), status),
  updateType: (membershipId: string, payload: UpdateMembershipType) =>
    apiService.patchThrowable(apiRoutes.membershipApplication.updateType(membershipId), payload),
};
