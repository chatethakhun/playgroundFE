import { createFileRoute, Outlet } from '@tanstack/react-router'
import DashboardSidebar from '@/components/ui/dashbaord/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
export const Route = createFileRoute('/_admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-[calc(100dvw-14rem)] ml-auto">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
