"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import { Button } from "../ui/button"
import { Mail, Plus } from "lucide-react"

export function NavTools({
  items,
}: {
  items: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton>
            <Mail />
            <span>Mail Generator</span>
          </SidebarMenuButton>
          <Button
            size="icon"
            className="size-8 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
          >
            <Plus />
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
