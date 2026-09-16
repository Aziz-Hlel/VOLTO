import { membershipService } from "@/Api/services/member.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { membershipDuration, membershipType } from "@/types/enums/enums";
import {
  approveMembershipSchema,
  type ApproveMembershipDto,
} from "@/types/member/approve-membership";
import type { MembershipApplication } from "@/types/member/Membership";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RenewMembershipProps {
  application: MembershipApplication;
  handleCancel: () => void;
}

const RenewMembership = ({ application, handleCancel }: RenewMembershipProps) => {
  const queryClient = useQueryClient();

  const form = useForm<ApproveMembershipDto>({
    resolver: zodResolver(approveMembershipSchema),
    defaultValues: {
      membershipType: application.membershipType,
      duration: application.membership?.duration ?? undefined,
      applicationReceivedBy: "",
      membershipNumberIssued: application.membership?.membershipNumberIssued ?? "",
      membershipCardSerialNumber: application.membership?.membershipCardSerialNumber ?? "",
      approvalBy: "",
      remarks: null,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ApproveMembershipDto) =>
      membershipService.renewApplication(application.membership.id, data),
  });

  const onSubmit = async (data: ApproveMembershipDto) => {
    try {
      const response = await mutateAsync(data);
      if (response.success) {
        toast.success("Membership renewed successfully!");
        await queryClient.refetchQueries({ queryKey: ["members"], exact: false });
        await queryClient.refetchQueries({
          queryKey: ["members", application.id],
          exact: false,
        });
        handleCancel?.();
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      toast.error(e?.response?.data?.message ?? e?.error ?? "Failed to renew membership");
    }
  };

  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && handleCancel?.()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            Renew Membership
          </DialogTitle>
          <DialogDescription>
            Fill in the renewal details for <strong>{application.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="membershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select membership type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(membershipType).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key.charAt(0) + key.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(membershipDuration).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key.charAt(0) + key.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationReceivedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Received By</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter receiver name"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membershipNumberIssued"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Number Issued</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. M-10023" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membershipCardSerialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SN-987654" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approvalBy"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Approval By</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter approver name"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any extra notes or remarks..."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {handleCancel && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                {isPending ? <Spinner /> : "Renew Membership"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenewMembership;
