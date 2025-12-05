import { BadgeCheck } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SuccessfulReservationModal = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader className="">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-yellow-400/10 sm:mx-0  mx-auto">
            <BadgeCheck className="size-9 text-yellow-400 dark:text-yellow-400" />
          </div>
          <AlertDialogTitle>Reservation Request Received</AlertDialogTitle>
          <AlertDialogDescription>
            We’ve received your reservation request. A member of the Volto team will reach out soon
            to confirm the details and finalize your booking.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleBackToHome} className="  cursor-pointer bg-yellow-400 text-white hover:bg-yellow-500 focus-visible:ring-yellow-400 ">
            Back to Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessfulReservationModal;
