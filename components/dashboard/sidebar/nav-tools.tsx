"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import { toolDashboardSections } from "../dashboard-sections"
import useDashboard from "../context/useDashboard"
import { useTranslations } from "next-intl"

export function NavTools() {
  const { setActiveSection } = useDashboard()
  const t = useTranslations("dashboard")

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("tools")}</SidebarGroupLabel>
      <SidebarMenu>
        {toolDashboardSections.map((item) => (
          <SidebarMenuItem key={item.sectionKey}>
            <SidebarMenuButton onClick={() => setActiveSection(item.sectionKey)}>
              <item.icon />
              <span>{item.sectionKey}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
