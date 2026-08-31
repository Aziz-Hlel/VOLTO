import type { MembershipApplication } from "@/types/member/MembershipApplication";
import {
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  flexRender,
  type Updater,
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
import { ArrowUp, ArrowUpDown, ChevronDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import EditMembership from "./edit-membership";
import DeleteMembership from "./delete-membership";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { membershipService } from "@/Api/services/membership.service";
import { useSearchParams } from "react-router-dom";
import { membershipStatus } from "@/types/enums/enums";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case membershipStatus.APPROVED:
      return "default";
    case membershipStatus.PENDING:
      return "secondary";
    case membershipStatus.REJECTED:
    case membershipStatus.SUSPENDED:
    case membershipStatus.EXPIRED:
      return "destructive";
    default:
      return "outline";
  }
};

const columnsRowsBase: ColumnDef<MembershipApplication>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium capitalize">{row.getValue("fullName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
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
    accessorKey: "membershipType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="font-semibold">
        {row.getValue("membershipType")}
      </Badge>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "cprId",
    header: "CPR / ID",
    cell: ({ row }) => <div>{row.getValue("cprId") ?? "-"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nationality") ?? "-"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          {column.getIsSorted() === "asc" && <ArrowUp />}
          {column.getIsSorted() === "desc" && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ArrowUpDown />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return (
        <div className="text-sm text-gray-600">
          {date ? new Date(date as string | Date).toLocaleDateString() : "-"}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
]
const MembershipActionsCell = ({
  row,
  onEdit,
  onDelete,
}: {
  row: { original: MembershipApplication };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-md">
      <DropdownMenuItem
        className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => onEdit(row.original.id)}
      >
        <Edit className="h-4 w-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        className="flex items-center gap-2 text-destructive hover:bg-destructive/10 cursor-pointer"
        onClick={() => onDelete(row.original.id)}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


const MembershipTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedMembershipId, setSelectedMembershipId] = useState<string | null>(null);
  const [membershipIdToDelete, setMembershipIdToDelete] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedMembershipId(id);
    setEditOpen(true);
  };

  const removeMembershipFromDeletion = () => {
    setMembershipIdToDelete(null);
  };

  const columnsRows = useMemo<ColumnDef<MembershipApplication>[]>(
    () => [
      ...columnsRowsBase,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <MembershipActionsCell
            row={row}
            onEdit={handleEdit}
            onDelete={setMembershipIdToDelete}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  const { data: response } = useQuery({
    queryKey: ["memberships", searchParams.toString()],
    queryFn: async () => await membershipService.list(searchParams),
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
    if (searchValue) {
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
      if (searchValue !== "") {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      return params;
    });
  };

  const pageSize = useMemo(() => {
    const limit = Number(searchParams.get("limit"));
    if (!limit || limit < 1) {
      return 5;
    }
    return limit;
  }, [searchParams]);

  const pageIndex = useMemo(() => {
    const page = Number(searchParams.get("page"));
    if (!page || page < 1) {
      return 1;
    }
    return page;
  }, [searchParams]);

  const changePage = (direc: "next" | "prev" | number) => {
    if (pageIndex === 1 && direc === "prev") return;
    if (pageIndex === pagination.totalPages && direc === "next") return;

    let newPage: number = pagination.page || 1;
    if (direc === "next") newPage = (pagination.page || 1) + 1;
    if (direc === "prev") newPage = (pagination.page || 1) - 1;
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
    onColumnVisibilityChange: setColumnVisibility,
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
            <h1 className="text-2xl font-bold">Membership Dashboard</h1>
            <p className="text-sm opacity-90">Manage membership applications and members 👋</p>
          </div>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-md">
            Total Applications: {pagination.total}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mt-8 mx-8">
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="🔍 Search by name or email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? searchParams.get("search") ?? ""}
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
                    No membership applications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}-
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{" "}
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
                disabled={pageIndex === pagination.totalPages || pagination.totalPages === 0}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EditMembership
        membershipId={selectedMembershipId}
        open={editOpen}
        setOpen={setEditOpen}
      />
      {membershipIdToDelete && (
        <DeleteMembership
          title="Delete membership"
          description="Are you sure you want to delete this membership? This action cannot be undone."
          membershipId={membershipIdToDelete}
          removeMembershipFromDeletion={removeMembershipFromDeletion}
        />
      )}
    </>
  );
};

export default MembershipTable;
    
