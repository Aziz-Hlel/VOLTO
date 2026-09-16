import { membershipApplicationService } from "@/Api/services/membership.service";
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
import { membershipType } from "@/types/enums/enums";
import type { MembershipApplication } from "@/types/member/Membership";
import {
  updateMembershipTypeSchema,
  type UpdateMembershipType as UpdateMembershipTypeDto,
} from "@/types/member/update-memebership-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, Crown, Info, Sparkles, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditMembershipTypeProps {
  membershipApplication: MembershipApplication;
  handleCancel: () => void;
}

const fmtDateTime = (dateStr: string | null | undefined) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EditMembershipType = ({ membershipApplication, handleCancel }: EditMembershipTypeProps) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateMembershipTypeDto>({
    resolver: zodResolver(updateMembershipTypeSchema),
    defaultValues: {
      membershipType: membershipApplication.membershipType,
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateMembershipTypeDto) =>
      membershipApplicationService.updateType(membershipApplication.id, data),
  });

  const onSubmit = async (data: UpdateMembershipTypeDto) => {
    try {
      const response = await mutateAsync(data);
      if (response.success) {
        toast.success("Membership type updated successfully");
        await queryClient.refetchQueries({ queryKey: ["memberships"], exact: false });
        await queryClient.refetchQueries({
          queryKey: ["membership", membershipApplication.id],
          exact: false,
        });
        handleCancel();
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      toast.error(e?.response?.data?.message ?? e?.error ?? "Failed to update membership type");
    }
  };

  const hasMembership = !!membershipApplication.membership;
  const currentPeriodEnd = membershipApplication.membership?.currentPeriodEnd;

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Update Membership Type
          </DialogTitle>
          <DialogDescription>
            Change the membership tier for <strong>{membershipApplication.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Notice if user already has an active membership record */}
            {hasMembership && currentPeriodEnd && (
              <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-blue-900 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
                <CalendarClock className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-sm">Scheduled Points Reset Notice</p>
                  <p className="text-blue-700 dark:text-blue-300/90 leading-relaxed">
                    This action will take effect on the next reset of user points, which is set to
                    be on{" "}
                    <span className="font-semibold text-foreground dark:text-white">
                      {fmtDateTime(currentPeriodEnd)}
                    </span>
                    .
                  </p>
                </div>
              </div>
            )}

            {!hasMembership && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  This application is currently pending approval. Changing the tier will update the
                  application directly.
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="membershipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select membership type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={membershipType.REGULAR}>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-violet-500" />
                          <span>Regular</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={membershipType.VIP}>
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-500" />
                          <span>VIP</span>
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
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity"
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

export default EditMembershipType;
