import type { MembershipApplication } from "./Membership";

export type SortMember = Pick<
  MembershipApplication,
  "membershipType" | "fullName" | "email" | "cprId" | "nationality" | "seen" | "createdAt"
>;

export class GetMembersQuery {
  page: number = 1;

  limit: number = 5;

  sort?: SortMember;

  order?: "asc" | "desc";

  search?: string;
}
