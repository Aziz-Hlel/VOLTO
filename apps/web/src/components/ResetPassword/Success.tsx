
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function ResetPasswordSuccesfulLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-0  bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <CircleCheckIcon  />
          <h1 className=" text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4 ">Password Reset Successful</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2  leading-relaxed text-center text-xs sm:text-base">
            Your password has been updated successfully. You can now log in with your new credentials.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4 text-xs sm:text-base">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Account:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">your@email.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Action Completed:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">Password Reset</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date &amp; Time:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">October 1, 2025 at 3:45 PM</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
          >
            
            Return to Homepage
          </Link>
        </div>
      </Card>
    </div>
  )
}

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