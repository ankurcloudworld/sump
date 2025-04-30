import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersTable } from "@/components/users-table"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        </div>
        <UsersTable />
      </div>
    </DashboardLayout>
  )
}
