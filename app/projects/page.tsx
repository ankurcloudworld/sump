import { DashboardLayout } from "@/components/dashboard-layout"
import { ProjectsTable } from "@/components/projects-table"

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        </div>
        <ProjectsTable />
      </div>
    </DashboardLayout>
  )
}
