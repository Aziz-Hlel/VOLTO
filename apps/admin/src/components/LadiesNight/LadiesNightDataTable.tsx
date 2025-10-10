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

type LadiesNightDataResponseDto = {
  id: string;
  startDate: Date;
  totalParticipants: number;
  participantWithAllRedeemedDrinks: number;
  drinkQuota: number;
};

interface EventsDataTableProps {
  data: LadiesNightDataResponseDto[];
}

export const EventsDataTable: React.FC<EventsDataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof LadiesNightDataResponseDto>("startDate");
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

  const getdisplayedDate = (event: LadiesNightDataResponseDto) => {
    return new Date(event.startDate).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="max-w-52 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("startDate")}
                >
                  Event Date {sortBy === "startDate" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="max-w-52 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("totalParticipants")}
                >
                  Total Participants{" "}
                  {sortBy === "totalParticipants" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className=" max-w-52  whitespace-normal ">
                  Participants With All Redeemed Drinks
                </TableHead>
                <TableHead className="max-w-52">Drink Quota</TableHead>
                <TableHead className="max-w-52 whitespace-normal">Average Drinks Per Participant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No Events yet
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((tableRow) => (
                  <TableRow key={tableRow.id} className=" hover:cursor-default">
                    <TableCell className="text-sm">{getdisplayedDate(tableRow)}</TableCell>
                    <TableCell className="text-sm">{tableRow.totalParticipants}</TableCell>
                    <TableCell className="text-sm ">
                      {tableRow.participantWithAllRedeemedDrinks}
                    </TableCell>
                    <TableCell className="text-sm ">
                      {tableRow.drinkQuota}
                    </TableCell>
                    <TableCell className="text-sm">
                      {(tableRow.totalParticipants / tableRow.drinkQuota).toFixed(2)}
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
