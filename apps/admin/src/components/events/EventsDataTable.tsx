import React, { useState, type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import cronstrue from "cronstrue";
import { EventType } from "@/types/events/EventType";

interface EventsDataTableProps {
  data: EventResponseDto[];
  setEventForEdit: (id: string) => void;
  setEventForDeletion: (event: EventResponseDto) => void;
}

export const EventsDataTable: React.FC<EventsDataTableProps> = ({
  data,
  setEventForEdit,
  setEventForDeletion,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const weeklyEvents = data.filter((event) => event.type === EventType.WEEKLY);
  const pastSpecialEvents = data.filter(
    (event) => event.type === EventType.SPECIAL && new Date(event.endDate) < new Date(),
  );
  const upcomingSpecialEvents = data.filter(
    (event) => event.type === EventType.SPECIAL && new Date(event.endDate) >= new Date(),
  );

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px] cursor-pointer hover:bg-muted/50">
                  Name
                </TableHead>
                <TableHead className="min-w-[200px] cursor-pointer hover:bg-muted/50">
                  Description
                </TableHead>
                <TableHead className="hidden lg:table-cell">Date Range</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No admins found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  <TableRow className=" hover:cursor-default">
                    <TableCell colSpan={6} className="text-left bg-blue-300 py-6 text-white ">
                      Upcoming Special Events
                    </TableCell>
                  </TableRow>
                  {upcomingSpecialEvents.length > 0 ? (
                    upcomingSpecialEvents.map((event, index) => (
                      <EventTableRow
                        key={index}
                        event={event}
                        setEventForEdit={setEventForEdit}
                        setEventForDeletion={setEventForDeletion}
                      />
                    ))
                  ) : (
                    <TableRow className=" hover:cursor-default">
                      <TableCell colSpan={6} className="text-left py-6 text-black">
                        No upcoming special events
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow className=" hover:cursor-default">
                    <TableCell colSpan={6} className="text-left bg-blue-300 py-6 text-white ">
                      Weekly Events
                    </TableCell>
                  </TableRow>

                  {weeklyEvents.length > 0 ? (
                    weeklyEvents.map((event, index) => (
                      <EventTableRow
                        key={index}
                        event={event}
                        setEventForEdit={setEventForEdit}
                        setEventForDeletion={setEventForDeletion}
                      />
                    ))
                  ) : (
                    <TableRow className=" hover:cursor-default">
                      <TableCell colSpan={6} className="text-left py-6 text-black">
                        No weekly events
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow className=" hover:cursor-default">
                    <TableCell colSpan={6} className="text-left bg-blue-300 py-6 text-white ">
                      Past Special Events
                    </TableCell>
                  </TableRow>
                  {pastSpecialEvents.length > 0 ? (
                    pastSpecialEvents.map((event, index) => (
                      <EventTableRow
                        key={index}
                        event={event}
                        setEventForEdit={setEventForEdit}
                        setEventForDeletion={setEventForDeletion}
                      />
                    ))
                  ) : (
                    <TableRow className=" hover:cursor-default">
                      <TableCell colSpan={6} className="text-left py-6 text-black">
                        No past special events
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

interface EventTableRowProps {
  event: EventResponseDto;
  setEventForEdit: (id: string) => void;
  setEventForDeletion: (event: EventResponseDto) => void;
}

const EventTableRow: FC<EventTableRowProps> = ({ event, setEventForEdit, setEventForDeletion }) => {
  const getdisplayedEndtDate = (event: EventResponseDto) => {
    const startCron = cronstrue.toString(event.cronStartDate);
    const endCron = cronstrue.toString(event.cronEndDate).split(",")[0].split("At ")[1];
    return `${startCron.split(",")[1]}, ${startCron.split(",")[0]} to ${endCron} `;
  };

  const getdisplayedSpecialDate = (event: EventResponseDto) => {
    if (event.type === EventType.SPECIAL) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const formattedStartDate = new Intl.DateTimeFormat("en-US", {
        month: "long", // October
        day: "numeric", // 1
        year: "numeric", // 2025
      }).format(startDate);

      const formattedEndDate = new Intl.DateTimeFormat("en-US", {
        month: "long", // October
        day: "numeric", // 1
        year: "numeric", // 2025
      }).format(endDate);

      let dayRange =
        startDate.getDate() === endDate.getDate()
          ? `from ${formattedStartDate}`
          : `from ${formattedStartDate} to ${formattedEndDate}`;

      const startHour = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // 12-hour clock with AM/PM
      }).format(startDate);

      const endHour = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // 12-hour clock with AM/PM
      }).format(endDate);

      dayRange = `${dayRange}, at ${startHour} to ${endHour}`;

      return dayRange;
    }

    if (event.type === EventType.WEEKLY)
      return event.cronEndDate ? cronstrue.toString(event.cronEndDate).split(",")[0] : "N/A";
  };

  return (
    <>
      <TableRow className=" hover:cursor-default">
        <TableCell className="font-medium border-r">{event.name}</TableCell>
        <TableCell className="text-sm truncate max-w-60 px-2 border-r">
          {event.description}
        </TableCell>
        <TableCell className="text-sm">
          {event.type === "SPECIAL" ? getdisplayedSpecialDate(event) : getdisplayedEndtDate(event)}
        </TableCell>

        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem
                onClick={() => setEventForEdit(event.id)}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setEventForDeletion(event)}
                className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};
