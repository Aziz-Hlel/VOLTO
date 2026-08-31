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
import type { LadiesNightStatsResponse } from "@/types/ladiesNight/LadiesNightStatsResponse";
import type { GetLadiesNightDataQueryDto } from "@/types/ladiesNight/GetLadiesNightDataQueryDto";
import { Spinner } from "../ui/spinner";

interface EventsDataTableProps {
  data?: LadiesNightStatsResponse[];
  count: number;
  query: GetLadiesNightDataQueryDto;
  setQuery: (query: GetLadiesNightDataQueryDto) => void;
}

export const DataTable: React.FC<EventsDataTableProps> = ({ data, count, query, setQuery }) => {
  const getdisplayedDate = (event: LadiesNightStatsResponse) => {
    const date = new Date(event.startDate);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long", // October
      day: "numeric", // 1
      year: "numeric", // 2025
    }).format(date);

    return formattedDate;
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="border-b ">
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-52 cursor-pointer hover:bg-muted/50">
                  Event Date
                </TableHead>
                <TableHead className="max-w-52 cursor-pointer hover:bg-muted/50">
                  Total Participants{" "}
                </TableHead>
                <TableHead className=" max-w-52  whitespace-normal ">
                  Participants With All Redeemed Drinks
                </TableHead>
                <TableHead className="max-w-52">Drink Quota</TableHead>
                <TableHead className="max-w-52">Total Drinks Consumed</TableHead>
                <TableHead className="max-w-52 whitespace-normal">
                  Average Drinks Per Participant
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No Data yet
                  </TableCell>
                </TableRow>
              )}

              {data.length !== 0 &&
                data.map((tableRow) => (
                  <TableRow key={tableRow.id} className="hover:cursor-default">
                    <TableCell className="text-sm border-r">{getdisplayedDate(tableRow)}</TableCell>
                    <TableCell className="text-sm border-r">{tableRow.totalParticipants}</TableCell>
                    <TableCell className="text-sm border-r">
                      {tableRow.participantWithAllRedeemedDrinks}
                    </TableCell>
                    <TableCell className="text-sm border-r">{tableRow.drinkQuota}</TableCell>
                    <TableCell className="text-sm border-r">
                      {tableRow.totalDrinksConsumed}
                    </TableCell>
                    <TableCell className="text-sm border-r">
                      {(tableRow.totalDrinksConsumed / tableRow.drinkQuota).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}

              {data.length === 0 &&
                Array.from({ length: 7 - data.length }).map((_, i) => (
                  <TableRow
                    key={`empty-${i}`}
                    className="hover:cursor-default opacity-0 select-none pointer-events-none"
                  >
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className=" w-full flex justify-end p-2 gap-x-2 ">
            <div className="flex items-center justify-end">
              <p className="text-sm text-muted-foreground">
                {/* Page {query.page} of {Math.ceil(count / query.limit)} - 
                Showing {data.length} of {count} */}
                Showing {query.limit * (query.page - 1) + 1}-
                {query.limit * (query.page - 1) + data.length} of {count} results
              </p>
            </div>
            <div className="flex gap-x-2">
              <Button
                className="w-12 h-8 enabled:cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 transition-all"
                disabled={query.page === 1}
                onClick={() => setQuery({ ...query, page: query.page - 1 })}
              >
                Prev
              </Button>
              <Button
                className="w-12 h-8 enabled:cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 transition-all"
                disabled={query.page >= Math.ceil(count / query.limit)}
                onClick={() => setQuery({ ...query, page: query.page + 1 })}
              >
                Next
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
