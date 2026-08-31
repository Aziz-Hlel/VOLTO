import { membershipService } from "@/Api/services/membership.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteMembershipProps {
  title: string;
  description: string;
  membershipId: string;
  removeMembershipFromDeletion: () => void;
}

const DeleteMembership = ({
  title,
  description,
  membershipId,
  removeMembershipFromDeletion,
}: DeleteMembershipProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => membershipService.delete(membershipId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["memberships"], exact: false }),
  });

  const handleDelete = async () => {
    try {
      const response = await mutateAsync();

      if (response.success) {
        toast.success("Membership deleted successfully");
        removeMembershipFromDeletion();
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        toast.error(
          "Error deleting membership: " + String((error as { message: unknown }).message),
        );
      } else {
        toast.error("Error deleting membership");
      }
      removeMembershipFromDeletion();
    }
  };

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={removeMembershipFromDeletion}
            className="cursor-pointer"
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Please wait
              </>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMembership;
