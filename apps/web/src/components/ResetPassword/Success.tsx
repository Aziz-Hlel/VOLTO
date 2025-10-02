import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import type { FC } from "react";


type Props = {
  email : string,
}

const ResetPasswordSuccesfulLayout: FC<Props> = ({ email }) => {

  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",   // October
      day: "numeric",  // 1
      year: "numeric", // 2025
      hour: "numeric",
      minute: "numeric",
      hour12: true     // 12-hour clock with AM/PM
    }).format(date);

  

  return (
    <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className=" flex flex-col items-center space-y-2 "> 
                <CircleCheckIcon  />
                <span>Password Reset Successful</span>
                 </DialogTitle>
            <DialogDescription>
                Your password has been updated successfully. You can now log in with your new credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4 text-xs sm:text-base">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Account:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Action Completed:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">Password Reset</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date &amp; Time:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">{formattedDate}</span>
          </div>
        </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className=" cursor-pointer ">Return to Homepage</Button>
            </DialogClose>
            <Button type="submit" className=" cursor-pointer ">Login</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordSuccesfulLayout;




function CircleCheckIcon() {
  return (
    <svg
      className="text-green-500 h-16 w-16"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}