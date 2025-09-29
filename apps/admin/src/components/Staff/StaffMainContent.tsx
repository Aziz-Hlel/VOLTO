import { apiRoutes } from "@/Api";
import useApiQuery from "@/hooks/useApiQuery";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import type { StaffResponseDto } from "@/types/staff/StaffResponseDto";
import StaffDataTable from "./StaffDataTable";

const StaffMainContent = () => {
  const navigate = useNavigate();

  const { data } = useApiQuery<StaffResponseDto[]>({
    url: apiRoutes.staff.list(),
    queryParams: { page: 1, limit: 50 },
    queryKey: ["events"],
    options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
  });

  const [selectedEventToDelete, setSelectedEventToDelete] = useState<StaffResponseDto | null>(null);
  const staff = data?.data;

  function handleEditingEvent(id: string): void {
    navigate(`edit/${id}`);
  }

  const setEventForDeletion = (event?: StaffResponseDto) => {
    setSelectedEventToDelete(event ?? null);
  };

  if (!staff) return <>loading ...</>;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Events table</h2>
        </div>

        <Link to={"/events/create"}>
          <Button className="flex items-center gap-2 cursor-pointer">Add Staff Member +</Button>
        </Link>
      </div>

      <StaffDataTable
        data={staff}
        setEventForEdit={handleEditingEvent}
        setEventForDeletion={setEventForDeletion}
      />

      {/* {selectedEventToDelete &&
                < DeleteConfirmationDialog
                    title='Delete Event'
                    description={`Are you sure you want to delete the event "${selectedEventToDelete.name}"?`}
                    removeObjectFromDeletion={setEventForDeletion}
                    objectId={selectedEventToDelete.id}

                />} */}
    </div>
  );
};

export default StaffMainContent;
