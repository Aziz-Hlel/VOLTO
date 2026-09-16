import z from "zod";
import { membershipType } from "../enums/enums";

export const updateMembershipTypeSchema = z.object({
  membershipType: z.enum(membershipType, {
    message: "Please select a membership type",
  }),
});

export type UpdateMembershipType = z.infer<typeof updateMembershipTypeSchema>;
