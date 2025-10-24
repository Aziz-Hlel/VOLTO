import type { User } from "@/types/user";
import {
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type Updater,
} from "@tanstack/react-table";
import { ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/Api/services/user.service";
import { useSearchParams } from "react-router-dom";
const data: User[] = [
  {
    id: "1",
    email: "q8a9g@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "WAITER",
    phoneNumber: "1234567890",
    gender: "M",
    tier: "GOLD",
  },
  {
    id: "2",
    email: "eoBtG@example.com",
    firstName: "Jane",
    lastName: "Doe",
    role: "WAITER",
    phoneNumber: "1234567890",
    gender: "F",
    tier: "GOLD",
  },
  {
    id: "3",
    email: "oBtG@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "WAITER",
    phoneNumber: "1234567890",
    gender: "M",
    tier: "GOLD",
  },
];
const columnsRows: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,

    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("firstName")}</div>,

    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("lastName")}</div>,

    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase  text-start px-4">
        {row.getValue("gender") === "M" ? "Male" : "Female"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="uppercase text-center">{row.getValue("phoneNumber") ?? "-"}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
];

const UsersTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: response } = useQuery({
    queryKey: ["users", searchParams.toString()],
    queryFn: async () => await userService.getUsers(searchParams.toString()),
  });


  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const onSortingChange = (updater: Updater<SortingState>) => {
    const newSortingState = typeof updater === "function" ? updater(sorting) : updater;

    const sortField = newSortingState[0]?.id ?? "createdAt";
    const sortOrder = newSortingState[0]?.desc ? "desc" : "asc";

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sort", sortField);
      params.set("order", sortOrder);
      return params;
    });
  };

  const sorting = useMemo(() => {
    if (searchParams.get("sort") && searchParams.get("order")) {
      return [
        {
          id: searchParams.get("sort") as string,
          desc: searchParams.get("order") === "desc",
        },
      ];
    }
    return [];
  },[searchParams])

  const columnFilters = useMemo(() => {
    if(searchParams.get("search")) {
      return [
        {
          id: "search",
          value: searchParams.get("search") as string,
        },
      ];
    }
    return [];
  },[searchParams])

  const onColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const newColumnFiltersState = typeof updater === "function" ? updater(columnFilters) : updater;

    const searchValue = (newColumnFiltersState[0]?.value as string) ?? "";

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      searchValue !== "" ? params.set("search", searchValue) : params.delete("search");
      return params;
    });
  };

  const tableData = response?.data.data ?? [];
  const pagination = response?.data.pagination ?? { limit: 0, page: 0, total: 0 };

  const table = useReactTable({
    data: tableData,
    columns: columnsRows,
    onSortingChange: onSortingChange,
    onColumnFiltersChange: onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting:sorting,
      columnFilters:columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columnsRows.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected. */}
            Showing {pagination.limit * (pagination.page - 1) + 1}-
            {pagination.limit * (pagination.page - 1) + tableData.length} of {pagination.total}{" "}
            results
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
