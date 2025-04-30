import { DashboardLayout } from "@/components/dashboard-layout"
import { UrlsTable } from "@/components/urls-table"

export default function UrlsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">URLs</h1>
        </div>
        <UrlsTable />
      </div>
    </DashboardLayout>
  )
}
