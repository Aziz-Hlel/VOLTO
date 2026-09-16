import { membershipApplicationService } from "@/Api/services/membership.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { MembershipApplication } from "@/types/member/Membership";
import type { UpdateMemberDto } from "@/types/member/update-member.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, Loader2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

// ── UUID validation ───────────────────────────────────────────────────────────
const uuidSchema = z.string().min(1, "Invalid membership ID");

// ── Helper for nullable string fields ─────────────────────────────────────────
const requiredString = z
  .string("This field is required")
  .nonempty("This field is required")
  .max(255, "Maximum length of 255 characters exceeded");

const requiredDate = z.string().min(1, "Date of birth is required");

// ── Form schema ───────────────────────────────────────────────────────────────
const EditMembershipSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email"),
  cprId: requiredString,
  nationality: requiredString,
  dateOfBirth: requiredDate,
  mobileNumber: requiredString,
  emergencyContactName: requiredString,
  emergencyContactRelationship: requiredString,
  emergencyContactMobileNumber: requiredString,
});

type EditMembershipFormValues = z.infer<typeof EditMembershipSchema>;

// ── Props ─────────────────────────────────────────────────────────────────────
interface EditMembershipProps {
  membershipId?: string | null;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

interface EditMembershipFormProps {
  membership: MembershipApplication;
  targetId: string;
  onClose: (open: boolean) => void;
}

// ── Form Child Component ──────────────────────────────────────────────────────
const EditMembershipForm = ({ membership, targetId, onClose }: EditMembershipFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<EditMembershipFormValues>({
    resolver: zodResolver(EditMembershipSchema),
    defaultValues: {
      fullName: membership.fullName,
      email: membership.email,
      cprId: membership.cprId ?? "",
      nationality: membership.nationality ?? "",
      dateOfBirth: membership.dateOfBirth ?? "",
      mobileNumber: membership.mobileNumber ?? "",
      emergencyContactName: membership.emergencyContactName ?? "",
      emergencyContactRelationship: membership.emergencyContactRelationship ?? "",
      emergencyContactMobileNumber: membership.emergencyContactMobileNumber ?? "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateMemberDto) => membershipApplicationService.update(targetId, data),
  });

  const onSubmit = async (data: EditMembershipFormValues) => {
    try {
      const response = await mutateAsync(data as UpdateMemberDto);
      if (response.success) {
        toast.success("Membership updated successfully");
        onClose(false);
        await queryClient.refetchQueries({ queryKey: ["members"], exact: false });
        if (targetId) {
          queryClient.removeQueries({ queryKey: ["membership", targetId] });
        }
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      toast.error(e?.response?.data?.message ?? e?.error ?? "Failed to update membership");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col overflow-y-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <User className="h-5 w-5 text-purple-500" />
            Edit Membership
          </DialogTitle>
          <DialogDescription>
            Update the member application details below. Click <strong>Save changes</strong> when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 max-h-[60vh]">
          {/* Personal Information */}
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+973 3300 0000" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cprId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPR / ID</FormLabel>
                    <FormControl>
                      <Input placeholder="880101-1234" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Bahraini" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Emergency Contact */}
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactRelationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder="Spouse" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactMobileNumber"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Contact Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="+973 3300 0001" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity"
          >
            {isPending ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const EditApplicationDetails = ({
  membershipId: propMembershipId,
  open: propOpen,
  setOpen: propSetOpen,
}: EditMembershipProps) => {
  const navigate = useNavigate();

  const targetId = propMembershipId;
  const isOpen = propOpen ?? true;

  const handleClose = (newOpen: boolean) => {
    if (propSetOpen) {
      propSetOpen(newOpen);
    }
    if (!newOpen && !propSetOpen) {
      navigate("/membership");
    }
  };

  const handleBackToTable = () => {
    handleClose(false);
    navigate("/membership");
  };
  const isValidId = !!targetId && uuidSchema.safeParse(targetId).success;

  const {
    data: membershipResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["membership", targetId],
    queryFn: () => membershipApplicationService.get(targetId!),
    enabled: isOpen && isValidId,
    retry: false,
  });

  const membership = membershipResponse?.data;

  // ── Render helpers ─────────────────────────────────────────────────────────
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading membership details…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <div>
            <p className="text-xl font-bold text-destructive">Something went wrong</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;re having trouble loading this membership right now. Please try again or go
              back to the membership table.
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToTable} className="mt-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to membership table
          </Button>
        </div>
      );
    }

    if (!membership) return null;

    return (
      <EditMembershipForm membership={membership} targetId={targetId!} onClose={handleClose} />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-2xl">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicationDetails;
