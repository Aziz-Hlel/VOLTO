import React, { useState } from "react";
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
  const [sortBy, setSortBy] = useState<keyof EventResponseDto>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = data.filter(
    (event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()),
    // ||
    // event.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === "asc") {
      return (aValue as any) < (bValue as any) ? -1 : (aValue as any) > (bValue as any) ? 1 : 0;
    } else {
      return (aValue as any) > (bValue as any) ? -1 : (aValue as any) < (bValue as any) ? 1 : 0;
    }
  });

  const handleSort = (column: keyof EventResponseDto) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

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
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="min-w-[150px] cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("name")}
                >
                  Full Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="min-w-[200px] cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("type")}
                >
                  Email {sortBy === "type" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="hidden lg:table-cell">Date Range</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No admins found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((event) => (
                  <TableRow key={event.id} className=" hover:cursor-default">
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell className="text-sm">{event.description}</TableCell>
                    <TableCell className="text-sm">
                      {event.type === "SPECIAL"
                        ? getdisplayedSpecialDate(event)
                        : getdisplayedEndtDate(event)}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
