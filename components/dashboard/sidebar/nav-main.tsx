"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import useDashboard from "../context/useDashboard"
import { mainDashboardSections } from "../dashboard-sections"
import { useTranslations } from "next-intl"

export function NavMain() {
  const t = useTranslations('dashboard.sectionTitle')
  const { setActiveSection } = useDashboard()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {mainDashboardSections.map((item) => (
            <SidebarMenuItem key={item.sectionKey}>
              <SidebarMenuButton onClick={() => setActiveSection(item.sectionKey)}>
                <item.icon />
                <span>{t(item.sectionKey)}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
