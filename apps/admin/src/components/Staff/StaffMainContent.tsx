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

const StaffMainContent = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { data } = useApiQuery<StaffResponseDto[]>({
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

  if (!staff) return <>loading ...</>;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Staff table</h2>
        </div>

        <Link to={"/staff/create"}>
          <Button className="flex items-center gap-2 cursor-pointer">Add Staff Member +</Button>
        </Link>
      </div>

      <StaffDataTable
        data={staff}
        setStaffForEdit={handleEditingStaff}
        setStaffForDeletion={setStaffForDeletion}
      />

      {selectedStaffToDelete && (
        <DeleteConfirmationDialog
          title="Delete Staff Member"
          description={`Are you sure you want to delete the event "${selectedStaffToDelete.username}"?`}
          removeObjectFromDeletion={setStaffForDeletion}
          objectId={selectedStaffToDelete.id}
        />
      )}
    </div>
  );
};

export default StaffMainContent;
