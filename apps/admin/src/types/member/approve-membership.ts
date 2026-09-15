import z from "zod";
import { membershipDuration } from "../enums/enums";

export const approveMembershipSchema = z.object({
  duration: z.enum(membershipDuration, {
    message: "Please select a membership duration",
  }),

  applicationReceivedBy: z
    .string("Please enter a valid receiver name")
    .nonempty("Please enter a valid receiver name")
    .max(255, "Cannot exceed 255 characters")
    .nullable(),

  membershipNumberIssued: z
    .string("Please enter a valid membership number issued")
    .nonempty("Please enter a valid membership number issued")
    .max(255, "Cannot exceed 255 characters")
    .nullable(),
    
  membershipCardSerialNumber: z
    .string("Please enter a valid card serial number")
    .nonempty("Please enter a valid card serial number")
    .max(255, "Cannot exceed 255 characters")
    .nullable(),

  approvalBy: z
    .string("Please enter a valid receiver name")
    .max(255, "Cannot exceed 255 characters")
    .nullable(),
  remarks: z
    .string("Please enter a valid remark")
    .max(255, "Cannot exceed 255 characters")
    .nullable(),
});

export type ApproveMembershipDto = z.infer<typeof approveMembershipSchema>;
