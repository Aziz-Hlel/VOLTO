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
  type PaginationState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    queryFn: async () => await userService.getUsers(searchParams),
  });
  const tableData = response?.data.data ?? [];
  const pagination = response?.data.pagination ?? { limit: 0, page: 0, total: 0, totalPages: 0 };

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
  }, [searchParams]);

  const columnFilters = useMemo(() => {
    const searchValue = searchParams.get("search");
    if (searchValue !== "") {
      return [
        {
          id: "email",
          value: searchValue,
        },
      ];
    }
    return [];
  }, [searchParams]);

  const onColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const newColumnFiltersState = typeof updater === "function" ? updater(columnFilters) : updater;
    const searchValue = (newColumnFiltersState[0]?.value as string) ?? "";

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      searchValue !== "" ? params.set("search", searchValue) : params.delete("search");
      return params;
    });
  };

  const pageSize = useMemo(() => {
    const page = Number(searchParams.get("limit"));
    if (page < 1) {
      searchParams.set("limit", "5");
    }
    return page;
  }, [searchParams]);

  const pageIndex = useMemo(() => {
    const page = Number(searchParams.get("page"));
    if (page < 1) {
      searchParams.set("page", "1");
    }
    return page;
  }, [searchParams]);

  const changePage = (direc: "next" | "prev" | number) => {
    if (pageIndex === 1 && direc === "prev") return;
    if (pageIndex === pagination.totalPages && direc === "next") return;

    let newPage: number = pagination.page;
    if (direc === "next") newPage = pagination.page + 1;
    if (direc === "prev") newPage = pagination.page - 1;
    if (typeof direc === "number") newPage = direc;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      return params;
    });
  };

  const onPageSizeChange = (limit: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", String(limit));
      params.set("page", "1");
      return params;
    });
  };

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
      sorting: sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="mt-6 mx-4 p-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Users Dashboard</h1>
            <p className="text-sm opacity-90">Welcome back VIP 👋</p>
          </div>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-md">
            Total Users: {pagination.total}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mt-8 mx-8">
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="🔍 Search by email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm border-gray-300 focus:ring-purple-500"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-gray-700">
                Columns <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-gray-200 rounded-md shadow-lg"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <Table className="w-full text-gray-800">
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-600 font-semibold text-sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-100 transition">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columnsRows.length}
                    className="text-center py-6 text-gray-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {pagination.limit * (pagination.page - 1) + 1}-
            {pagination.limit * (pagination.page - 1) + tableData.length} of {pagination.total}{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <Select onValueChange={onPageSizeChange} value={String(pageSize)}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Show</SelectLabel>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="space-x-2">
              <Button
                size="sm"
                onClick={() => changePage("prev")}
                disabled={pageIndex === 1}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Prev
              </Button>
              <Button
                size="sm"
                onClick={() => changePage("next")}
                disabled={pageIndex === pagination.totalPages}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
