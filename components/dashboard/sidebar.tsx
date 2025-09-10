"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabase"
import { Brain, LogOut } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"

export function DashboardSidebar() {
  const t = useTranslations("dashboard")
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-secondary">
        <SidebarGroup>
          <SidebarGroupLabel>{t("tools")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button variant="ghost" className="w-full justify-start">
              <Brain className="w-4 h-4 mr-2" />
              {t("proposalGenerator")}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t("logout")}
        </Button>
      </div>
    </Sidebar >
  )
}