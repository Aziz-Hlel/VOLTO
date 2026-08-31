import type { Membership } from "@/types/member/membership.dto";
import type { MembershipApplication } from "@/types/member/MembershipApplication";
import type { UpdateMemberStatusDto } from "@/types/member/update-member-status.dto";
import type { UpdateMemberDto } from "@/types/member/update-member.dto";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const membershipService = {
  list: (queryParams?: URLSearchParams) =>
    apiService.getThrowable<{
      data: MembershipApplication[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>(apiRoutes.membership.list(), { params: queryParams }),
  get: (membershipId: string) =>
    apiService.getThrowable<Membership>(apiRoutes.membership.get(membershipId)),
  update: (membershipId: string, membership: UpdateMemberDto) =>
    apiService.putThrowable(apiRoutes.membership.update(membershipId), membership),
  delete: (membershipId: string) =>
    apiService.deleteThrowable(apiRoutes.membership.delete(membershipId)),
  updateStatus: (membershipId: string, status: UpdateMemberStatusDto) =>
    apiService.patchThrowable(apiRoutes.membership.updateStatus(membershipId), status),
};
