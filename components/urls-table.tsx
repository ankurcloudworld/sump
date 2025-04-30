"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data: Url[] = [
  {
    id: "URL-001",
    url: "https://api.example.com/v1",
    project: "E-commerce Platform",
    server: "api-server-01",
    status: "Live",
    environment: "Production",
    lastChecked: "2023-04-23T18:25:43.511Z",
    expiryDate: "2024-04-23T18:25:43.511Z",
  },
  {
    id: "URL-002",
    url: "https://admin.example.com",
    project: "Internal Dashboard",
    server: "web-server-01",
    status: "Live",
    environment: "Development",
    lastChecked: "2023-04-22T14:48:00.000Z",
    expiryDate: "2024-04-22T14:48:00.000Z",
  },
  {
    id: "URL-003",
    url: "https://api.example.com/v2",
    project: "Mobile API",
    server: "api-server-01",
    status: "Down",
    environment: "Staging",
    lastChecked: "2023-04-20T09:12:37.000Z",
    expiryDate: "2024-04-20T09:12:37.000Z",
  },
  {
    id: "URL-004",
    url: "https://customer.example.com",
    project: "Customer Portal",
    server: "web-server-01",
    status: "Live",
    environment: "Production",
    lastChecked: "2023-04-18T11:30:00.000Z",
    expiryDate: "2024-04-18T11:30:00.000Z",
  },
  {
    id: "URL-005",
    url: "https://analytics.example.com",
    project: "Analytics Service",
    server: "analytics-server-01",
    status: "Live",
    environment: "Development",
    lastChecked: "2023-04-15T16:45:22.000Z",
    expiryDate: "2024-04-15T16:45:22.000Z",
  },
  {
    id: "URL-006",
    url: "https://legacy.example.com",
    project: "Legacy System",
    server: "legacy-server-01",
    status: "Deprecated",
    environment: "Production",
    lastChecked: "2023-03-10T08:20:15.000Z",
    expiryDate: "2023-06-10T08:20:15.000Z",
  },
  {
    id: "URL-007",
    url: "https://www.example.com",
    project: "Marketing Website",
    server: "cdn-server-01",
    status: "Live",
    environment: "Production",
    lastChecked: "2023-04-05T13:15:45.000Z",
    expiryDate: "2024-04-05T13:15:45.000Z",
  },
]

export type Url = {
  id: string
  url: string
  project: string
  server: string
  status: "Live" | "Down" | "Deprecated"
  environment: "Development" | "Staging" | "Production"
  lastChecked: string
  expiryDate: string
}

export function UrlsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Url>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "url",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            URL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium text-blue-600 hover:underline">
          <a href={row.getValue("url")} target="_blank" rel="noopener noreferrer">
            {row.getValue("url")}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => <div>{row.getValue("project")}</div>,
    },
    {
      accessorKey: "server",
      header: "Server",
      cell: ({ row }) => <div>{row.getValue("server")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge
            variant="outline"
            className={
              status === "Live"
                ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                : status === "Down"
                  ? "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "environment",
      header: "Environment",
      cell: ({ row }) => {
        const environment = row.getValue("environment") as string

        return (
          <Badge
            variant="outline"
            className={
              environment === "Production"
                ? "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                : environment === "Development"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
            }
          >
            {environment}
          </Badge>
        )
      },
    },
    {
      accessorKey: "lastChecked",
      header: "Last Checked",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastChecked") as string)
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const url = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(url.id)}>Copy URL ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View URL details</DropdownMenuItem>
              <DropdownMenuItem>Edit URL</DropdownMenuItem>
              <DropdownMenuItem>Check URL status</DropdownMenuItem>
              <DropdownMenuItem>View linked project</DropdownMenuItem>
              <DropdownMenuItem>View linked server</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter URLs..."
          value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("url")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button>Add URL</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
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
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
