import { DashboardLayout } from "@/components/dashboard-layout"
import { ServersTable } from "@/components/servers-table"

export default function ServersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Servers</h1>
        </div>
        <ServersTable />
      </div>
    </DashboardLayout>
  )
}
