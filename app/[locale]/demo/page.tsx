import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import { SiteHeader } from "@/components/dashboard/sidebar/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardProvider } from "@/components/dashboard/context/dashboard-context";
import DashboardRenderer from "@/components/dashboard/dashboard-renderer";
import { User } from "@supabase/supabase-js";

export default async function Page() {

  const user: User = {
    aud: "demouseraud",
    id: "demouserid",
    created_at: new Date().toLocaleDateString(),
    email: "user@demo.com",
    app_metadata: {},
    user_metadata: {
      name: "Demo User",
      lastName: "Lastname",
    }
  }

  return (
    <DashboardProvider user={user}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="bg-white/60">
          <SiteHeader />
          <DashboardRenderer />
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  )
}
