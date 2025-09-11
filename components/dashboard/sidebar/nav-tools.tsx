"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import { toolDashboardSections } from "../context/dashboard-sections"
import useDashboard from "../context/useDashboard"

export function NavTools() {
  const { setActiveSection } = useDashboard()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
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
