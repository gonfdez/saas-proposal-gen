"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { secondaryDashboardSections } from "../dashboard-sections"
import useDashboard from "../context/useDashboard"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

export function NavSecondary(props: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const t = useTranslations('dashboard.sectionTitle')
  const { setActiveSection } = useDashboard()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LanguageSwitcher withLabel className="justify-start p-2! font-normal!" buttonSize={"sm"} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          {secondaryDashboardSections.map((item) => (
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
