import React from "react";
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
import staffService from "@/Api/services/staff.service";

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  removeObjectFromDeletion: () => void;
  objectId: string;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  title,
  description,
  objectId,
  removeObjectFromDeletion,
}) => {
  const mutationFn = () => staffService.delete(objectId);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"], exact: false }),
  });
  const handleDelete = async () => {
    try {
      const response = await mutateAsync();

      if (response.success) {
        toast.success("Staff Member deleted successfully");
        removeObjectFromDeletion();
      }
    } catch (error: unknown) {
      // const err = error as ApiResponse<any>;
      console.log(error);
      if (typeof error === "object" && error !== null && "message" in error) {
        toast.error(
          "Error deleting staff member : " + String((error as { message: unknown }).message),
        );
      } else {
        toast.error("Error deleting staff member ");
      }
      removeObjectFromDeletion();
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
          <AlertDialogCancel onClick={() => removeObjectFromDeletion()} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
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
