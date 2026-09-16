import type { CreateMemberTransaction } from "@/types/memberTransaction/create-member-transaction";
import type { ListMemberTransactionCursor } from "@/types/memberTransaction/list-member-transaction-req";
import type { ListMemberTransactionRes } from "@/types/memberTransaction/list-member-transaction-res";
import { apiService } from "../apiService";
import apiRoutes from "../routes";

export const memberTransactionService = {
  create: async (memberId: string, data: CreateMemberTransaction) =>
    apiService.postThrowable(apiRoutes.memberTransaction.create(memberId), data),
  list: async (memberId: string, cursor?: ListMemberTransactionCursor) =>
    apiService.getThrowable<ListMemberTransactionRes>(apiRoutes.memberTransaction.list(memberId), {
      params: cursor,
    }),
};
