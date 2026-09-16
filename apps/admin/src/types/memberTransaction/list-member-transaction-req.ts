import z from "zod";

export const listMemberTransactionCursorSchema = z.object({
  limit: z.number().min(1, "Limit must be at least 1").optional().catch(5),
  transactionId: z.uuid().optional().catch(undefined),
});

export type ListMemberTransactionCursor = z.infer<typeof listMemberTransactionCursorSchema>;
