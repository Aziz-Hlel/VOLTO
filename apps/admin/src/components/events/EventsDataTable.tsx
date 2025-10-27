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
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import cronstrue from "cronstrue";
import { EventType } from "@/types/events/EventType";
import parser from "cron-parser";
import { format, parseISO } from "date-fns";

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
    <div className="space-y-8 p-4 sm:p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
      {/* 🔍 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Event Management
        </h2>
      </div>

      {/* 🗓 Upcoming Special Events */}
      <EventSection
        title="Upcoming Special Events"
        events={upcomingSpecialEvents}
        color="from-pink-400 via-fuchsia-500 to-purple-500"
        setEventForEdit={setEventForEdit}
        setEventForDeletion={setEventForDeletion}
      />

      {/* 🔁 Weekly Events */}
      <EventSection
        title="Weekly Events"
        events={weeklyEvents}
        color="from-indigo-400 via-blue-500 to-sky-500"
        setEventForEdit={setEventForEdit}
        setEventForDeletion={setEventForDeletion}
      />

      {/* ⏳ Past Special Events */}
      <EventSection
        title="Past Special Events"
        events={pastSpecialEvents}
        color="from-gray-400 via-gray-500 to-gray-600"
        setEventForEdit={setEventForEdit}
        setEventForDeletion={setEventForDeletion}
      />
    </div>
  );
};

/* ========================== 🔹 SECTIONS ========================== */
interface EventSectionProps {
  title: string;
  color: string;
  events: EventResponseDto[];
  setEventForEdit: (id: string) => void;
  setEventForDeletion: (event: EventResponseDto) => void;
}

const EventSection: FC<EventSectionProps> = ({
  title,
  color,
  events,
  setEventForEdit,
  setEventForDeletion,
}) => (
  <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div
      className={`px-4 py-3 bg-gradient-to-r ${color} text-white font-semibold text-lg tracking-wide`}
    >
      {title}
    </div>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-600">Name</TableHead>
            <TableHead className="font-semibold text-gray-600">Description</TableHead>
            <TableHead className="font-semibold text-gray-600">Date Range</TableHead>
            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event, i) => (
              <EventTableRow
                key={i}
                event={event}
                setEventForEdit={setEventForEdit}
                setEventForDeletion={setEventForDeletion}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-400">
                No events available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);

/* ========================== 🔹 ROW ========================== */
interface EventTableRowProps {
  event: EventResponseDto;
  setEventForEdit: (id: string) => void;
  setEventForDeletion: (event: EventResponseDto) => void;
}

const EventTableRow: FC<EventTableRowProps> = ({ event, setEventForEdit, setEventForDeletion }) => {
  const getDisplayDate = (event: EventResponseDto) => {
    if (event.type === EventType.SPECIAL) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const dateDisplay = Intl.DateTimeFormat("en-US", {
        month: "long", // October
        day: "numeric", // 1
        year: "numeric", // 2025
        hour: "numeric",
      });
      return `${dateDisplay.format(start)} → ${dateDisplay.format(end)}`;

      return `${start.toLocaleTimeString()} → ${end.toLocaleDateString()}`;
    }

    const opts = { tz: "UTC" };

    const startInterval = parser.parseExpression(event.cronStartDate, opts);
    const nextStartDate = startInterval.next().toDate();
    const startLocalTime = format(nextStartDate, "hh:mm a"); // e.g., "02:30 PM"
    const dayOfWeek = format(nextStartDate, "EEEE"); // e.g., "Monday"

    const endInterval = parser.parseExpression(event.cronEndDate, opts);
    const endStartDate = endInterval.next().toDate();
    const endLocalTime = format(endStartDate, "hh:mm a"); // e.g., "02:30 PM"

    // Return whatever format you want:
    return `${dayOfWeek} at ${startLocalTime} → ${endLocalTime}`;

    return `${cronstrue.toString(event.cronStartDate)} (UTC time)`;
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell className="font-semibold">{event.name}</TableCell>
      <TableCell className="text-sm text-gray-600 truncate max-w-60">{event.description}</TableCell>
      <TableCell className="text-sm text-gray-600">{getDisplayDate(event)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg border border-gray-200">
            <DropdownMenuItem
              onClick={() => setEventForEdit(event.id)}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <Edit className="h-4 w-4 text-blue-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setEventForDeletion(event)}
              className="flex items-center gap-2 hover:bg-red-50 text-red-600"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
