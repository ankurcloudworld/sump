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

const data: Server[] = [
  {
    id: "SRV-001",
    name: "api-server-01",
    ip: "192.168.1.101",
    type: "VM",
    provider: "AWS",
    region: "us-east-1",
    status: "Online",
    projects: ["E-commerce Platform", "Mobile API"],
    lastUpdated: "2023-04-23T18:25:43.511Z",
  },
  {
    id: "SRV-002",
    name: "db-server-01",
    ip: "192.168.1.102",
    type: "VM",
    provider: "AWS",
    region: "us-east-1",
    status: "Online",
    projects: ["E-commerce Platform"],
    lastUpdated: "2023-04-22T14:48:00.000Z",
  },
  {
    id: "SRV-003",
    name: "web-server-01",
    ip: "192.168.1.103",
    type: "Container",
    provider: "Azure",
    region: "eastus",
    status: "Online",
    projects: ["Internal Dashboard", "Customer Portal"],
    lastUpdated: "2023-04-20T09:12:37.000Z",
  },
  {
    id: "SRV-004",
    name: "cache-server-01",
    ip: "192.168.1.104",
    type: "VM",
    provider: "GCP",
    region: "us-central1",
    status: "Online",
    projects: ["E-commerce Platform", "Mobile API"],
    lastUpdated: "2023-04-18T11:30:00.000Z",
  },
  {
    id: "SRV-005",
    name: "analytics-server-01",
    ip: "192.168.1.105",
    type: "Serverless",
    provider: "AWS",
    region: "us-west-2",
    status: "Online",
    projects: ["Analytics Service"],
    lastUpdated: "2023-04-15T16:45:22.000Z",
  },
  {
    id: "SRV-006",
    name: "legacy-server-01",
    ip: "10.0.0.10",
    type: "VM",
    provider: "OnPrem",
    region: "N/A",
    status: "Offline",
    projects: ["Legacy System"],
    lastUpdated: "2023-03-10T08:20:15.000Z",
  },
  {
    id: "SRV-007",
    name: "cdn-server-01",
    ip: "192.168.1.107",
    type: "Container",
    provider: "AWS",
    region: "eu-west-1",
    status: "Online",
    projects: ["Marketing Website"],
    lastUpdated: "2023-04-05T13:15:45.000Z",
  },
]

export type Server = {
  id: string
  name: string
  ip: string
  type: "VM" | "Container" | "Serverless"
  provider: "AWS" | "Azure" | "GCP" | "OnPrem"
  region: string
  status: "Online" | "Offline" | "Maintenance"
  projects: string[]
  lastUpdated: string
}

export function ServersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Server>[] = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Server Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "ip",
      header: "IP Address",
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("ip")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => <div>{row.getValue("provider")}</div>,
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => <div>{row.getValue("region")}</div>,
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
              status === "Online"
                ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                : status === "Offline"
                  ? "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => {
        const projects = row.getValue("projects") as string[]
        return <div>{projects.length} project(s)</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const server = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(server.id)}>
                Copy server ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View server details</DropdownMenuItem>
              <DropdownMenuItem>Edit server</DropdownMenuItem>
              <DropdownMenuItem>View linked projects</DropdownMenuItem>
              <DropdownMenuItem>View server logs</DropdownMenuItem>
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
          placeholder="Filter servers..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button>Add Server</Button>
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
