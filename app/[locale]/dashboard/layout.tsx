import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <main className="m-4 md:my-0 md:mx-10">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}