"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { secondaryDashboardSections } from "../context/dashboard-sections"
import useDashboard from "../context/useDashboard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function NavSecondary(props: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { setActiveSection } = useDashboard()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <DropdownMenu>
                <SidebarMenuButton asChild className="p-0">
                  <DropdownMenuTrigger asChild>
                    <div>
                      <Globe />
                      <span>language</span>
                    </div>
                  </DropdownMenuTrigger>
                </SidebarMenuButton>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => switchLanguage("en")}>english</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchLanguage("es")}>spanish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {secondaryDashboardSections.map((item) => (
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
