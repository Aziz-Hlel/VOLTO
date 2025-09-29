import { apiRoutes } from "@/Api";
import useApiQuery from "@/hooks/useApiQuery";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import { EventsDataTable } from "./EventsDataTable";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

const EventMainContent = () => {
  const navigate = useNavigate();

  const { data } = useApiQuery<EventResponseDto[]>({
    url: apiRoutes.events.list(),
    queryParams: { page: 1, limit: 50 },
    queryKey: ["events"],
    options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
  });

  const [selectedEventToDelete, setSelectedEventToDelete] = useState<EventResponseDto | null>(null);
  const events = data?.data;

  function handleEditingEvent(id: string): void {
    navigate(`edit/${id}`);
  }

  const setEventForDeletion = (event?: EventResponseDto) => {
    setSelectedEventToDelete(event ?? null);
  };

  if (!events) return <>loading ...</>;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Events table</h2>
        </div>

        <Link to={"/events/create"}>
          <Button className="flex items-center gap-2 cursor-pointer">Add Event +</Button>
        </Link>
      </div>

      <EventsDataTable
        data={events}
        setEventForEdit={handleEditingEvent}
        setEventForDeletion={setEventForDeletion}
      />

      {selectedEventToDelete && (
        <DeleteConfirmationDialog
          title="Delete Event"
          description={`Are you sure you want to delete the event "${selectedEventToDelete.name}"?`}
          removeObjectFromDeletion={setEventForDeletion}
          objectId={selectedEventToDelete.id}
        />
      )}
    </div>
  );
};

export default EventMainContent;
