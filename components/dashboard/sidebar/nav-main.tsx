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
import { mainDashboardSections } from "../context/dashboard-sections"

export function NavMain() {
  const { setActiveSection } = useDashboard()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {mainDashboardSections.map((item) => (
            <SidebarMenuItem key={item.sectionKey}>
              <SidebarMenuButton onClick={() => setActiveSection(item.sectionKey)}>
                <item.icon />
                <span>{item.sectionKey}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
