import { apiRoutes } from "@/Api";
import useApiQuery from "@/hooks/useApiQuery";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import { EventsDataTable } from "./EventsDataTable";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { PlusCircle } from "lucide-react";
import { Spinner } from "../ui/spinner";

const EventMainContent = () => {
  const navigate = useNavigate();
  const { data, isFetched } = useApiQuery<EventResponseDto[]>({
    url: apiRoutes.events.list(),
    queryParams: { page: 1, limit: 50 },
    queryKey: ["events"],
    options: { enabled: true, config: { params: { page: 1, limit: 50 } } },
  });

  const [selectedEventToDelete, setSelectedEventToDelete] = useState<EventResponseDto | null>(null);
  const events = data?.data;

  const handleEditingEvent = (id: string) => navigate(`edit/${id}`);
  const setEventForDeletion = (event?: EventResponseDto) => setSelectedEventToDelete(event ?? null);

  if (!isFetched)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-gray-100 to-gray-200 p-4 sm:p-6 lg:p-10 space-y-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 shadow-lg text-white border border-blue-300">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">🍾 Events Dashboard</h1>
          <p className="text-sm sm:text-base mt-1 text-blue-100">
            Manage your upcoming events easily. <span className="text-red-300 font-medium">* You cannot edit a live event.</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/events/create" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
              <PlusCircle className="w-5 h-5" />
              <span>Add Event</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Events Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[320px]">
            <EventsDataTable
              data={events}
              setEventForEdit={handleEditingEvent}
              setEventForDeletion={setEventForDeletion}
            />
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {selectedEventToDelete && (
          <DeleteConfirmationDialog
            title="Delete Event"
            description={`Are you sure you want to delete the event "${selectedEventToDelete.name}"?`}
            removeObjectFromDeletion={setEventForDeletion}
            objectId={selectedEventToDelete.id}
          />
        )}
      </main>
    </div>
  );
};

export default EventMainContent;