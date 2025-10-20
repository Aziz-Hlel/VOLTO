import { apiRoutes } from "@/Api";
import useApiQuery from "@/hooks/useApiQuery";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import type { StaffResponseDto } from "@/types/staff/StaffResponseDto";
import StaffDataTable from "./StaffDataTable";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { Spinner } from "../ui/spinner";

const StaffMainContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isFetched } = useApiQuery<StaffResponseDto[]>({
    url: apiRoutes.staff.list(),
    queryParams: { page: 1, limit: 50 },
    queryKey: ["staff"],
    options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
  });

  const [selectedStaffToDelete, setSelectedStaffToDelete] = useState<StaffResponseDto | null>(null);
  const staff = data?.data;

  function handleEditingStaff(staff: StaffResponseDto): void {
    if (staff.role === "SUPER_ADMIN" && user?.role !== "SUPER_ADMIN") {
      toast.error("You don't have permission to edit this staff member");
      return;
    }
    navigate(`edit/${staff.id}`);
  }

  const setStaffForDeletion = (staff?: StaffResponseDto) => {
    if (staff?.role === "SUPER_ADMIN" && user?.role !== "SUPER_ADMIN") {
      toast.error("You don't have permission to delete this staff member");
      return;
    }
    setSelectedStaffToDelete(staff ?? null);
  };

  if (!isFetched) return <Spinner />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-6 space-y-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">💼 Staff Dashboard</h1>
          <p className="text-sm sm:text-base mt-1 text-purple-100">
            Manage your team efficiently and securely
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6">
        {/* Add Staff Button */}
        <div className="flex justify-end">
          <Link to={"/staff/create"}>
            <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all">
              + Add Staff
            </Button>
          </Link>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 overflow-x-auto w-full">
          <StaffDataTable
            data={staff}
            setStaffForEdit={handleEditingStaff}
            setStaffForDeletion={setStaffForDeletion}
          />
        </div>
      </main>

      {/* Delete Dialog */}
      {selectedStaffToDelete && (
        <DeleteConfirmationDialog
          title="Delete Staff Member"
          description={`Are you sure you want to delete "${selectedStaffToDelete.firstName}"?`}
          removeObjectFromDeletion={setStaffForDeletion}
          objectId={selectedStaffToDelete.id}
        />
      )}
    </div>
  );
};

export default StaffMainContent;
