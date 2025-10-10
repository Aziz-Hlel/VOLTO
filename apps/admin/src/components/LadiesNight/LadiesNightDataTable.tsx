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
import type { LadiesNightDataResponseDto } from "@/types/events/eventResponse.dto";
import cronstrue from "cronstrue";
import { EventType } from "@/types/events/EventType";

type LadiesNightDataResponseDto = {
  id: string;
  startDate: Date;
  totalParticipants: number;
  participantWithAllRedeemedDrinks: number;
  drinkQuota: number;
};

interface EventsDataTableProps {
  data: LadiesNightDataResponseDto[];
  setEventForEdit: (id: string) => void;
  setEventForDeletion: (event: LadiesNightDataResponseDto) => void;
}

export const EventsDataTable: React.FC<EventsDataTableProps> = ({
  data,
  setEventForEdit,
  setEventForDeletion,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof LadiesNightDataResponseDto>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // const filteredData = data.filter(
  //   (tableRow) => tableRow.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   // ||
  //   // event.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === "asc") {
      return (aValue as any) < (bValue as any) ? -1 : (aValue as any) > (bValue as any) ? 1 : 0;
    } else {
      return (aValue as any) > (bValue as any) ? -1 : (aValue as any) < (bValue as any) ? 1 : 0;
    }
  });

  const handleSort = (column: keyof LadiesNightDataResponseDto) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getdisplayedStartDate = (event: LadiesNightDataResponseDto) => {
  return  new Date(event.startDate).toLocaleDateString() ;  };



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
                  onClick={() => handleSort("startDate")}
                >
                  Event Date {sortBy === "startDate" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="min-w-[200px] cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("totalParticipants")}
                >
                  Total Participants {sortBy === "totalParticipants" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="hidden lg:table-cell">Start Date</TableHead>
                <TableHead className="hidden lg:table-cell">End Date</TableHead>
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
                    <TableCell className="font-medium">
                      {event.startDate.toLocaleDateString()}
                    </TableCell>
                    {/* <TableCell className="text-sm">{event.}</TableCell> */}
                    <TableCell className="text-sm">{getdisplayedStartDate(event)}</TableCell>

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
