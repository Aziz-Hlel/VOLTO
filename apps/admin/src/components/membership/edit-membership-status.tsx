import { membershipService } from "@/Api/services/member.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { membershipStatus } from "@/types/enums/enums";
import {
  updateMembershipStatusSchema,
  type UpdateMembershipStatus as UpdateMembershipStatusDto,
} from "@/types/member/edit-membership-status";
import type { MembershipApplication } from "@/types/member/Membership";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Ban, CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditMembershipStatusProps {
  membership: MembershipApplication;
  handleCancel: () => void;
  open?: boolean;
}

const EditMembershipStatus = ({
  membership,
  handleCancel,
  open = true,
}: EditMembershipStatusProps) => {
  const queryClient = useQueryClient();

  const currentStatus =
    (membership.membership?.status as UpdateMembershipStatusDto["status"]) ||
    membershipStatus.ACTIVE;

  const form = useForm<UpdateMembershipStatusDto>({
    resolver: zodResolver(updateMembershipStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const selectedStatus = form.watch("status");
  const isRestricted =
    selectedStatus === membershipStatus.REJECTED || selectedStatus === membershipStatus.SUSPENDED;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateMembershipStatusDto) =>
      membershipService.updateStatus(membership.membership.id, data),
  });

  const onSubmit = async (data: UpdateMembershipStatusDto) => {
    try {
      const response = await mutateAsync(data);
      if (response.success) {
        toast.success("Membership status updated successfully");
        await queryClient.refetchQueries({ queryKey: ["memberships"], exact: false });
        await queryClient.refetchQueries({
          queryKey: ["membership", membership.id],
          exact: false,
        });
        handleCancel();
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      toast.error(e?.response?.data?.message ?? e?.error ?? "Failed to update membership status");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <ShieldAlert className="h-5 w-5 text-indigo-500" />
            Update Membership Status
          </DialogTitle>
          <DialogDescription>
            Change the status for <strong>{membership.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {isRestricted && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-sm">Card Usage & Reset Notice</p>
                  <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
                    The user will not be able to use the membership card. However, scheduled point
                    resetting will still apply at the same schedule.
                  </p>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={membershipStatus.ACTIVE}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Active</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={membershipStatus.SUSPENDED}>
                        <div className="flex items-center gap-2">
                          <Ban className="h-4 w-4 text-orange-500" />
                          <span>Suspended</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={membershipStatus.REJECTED}>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span>Rejected</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity"
              >
                {isPending ? <Spinner /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMembershipStatus;
