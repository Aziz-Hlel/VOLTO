import z from "zod";
import { transactionType } from "../enums/enums";

export const createMemberTransactionSchema = z.object({
  type: z.enum([transactionType.EARN, transactionType.REDEEM], {
    error: "Transaction type is required",
  }),
  amount: z
    .number({ error: "Amount must be a number" })
    .min(0.001, "Amount must be greater than 0")
    .max(2000, "Amount should not be more than 2000 PTS")
    .refine(
      (val) => {
        const decimals = val.toString().split(".")[1];
        return !decimals || decimals.length <= 3;
      },
      { message: "Amount cannot have more than 3 decimal places" },
    ),
  note: z.string().max(255, "Note cannot exceed 255 characters").optional(),
});

export type CreateMemberTransaction = z.infer<typeof createMemberTransactionSchema>;
