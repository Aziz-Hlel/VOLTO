import type { memeberTransactionRespose } from "./member-transaction-response";

export type ListMemberTransactionRes = {
  data: memeberTransactionRespose[];
  nextCursor: string | null;
};
