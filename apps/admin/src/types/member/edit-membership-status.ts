import z from "zod";
import { membershipStatus } from "../enums/enums";

export const updateMembershipStatusSchema = z.object({
  status: z.enum([membershipStatus.ACTIVE, membershipStatus.REJECTED, membershipStatus.SUSPENDED]),
});

export type UpdateMembershipStatus = z.infer<typeof updateMembershipStatusSchema>;
