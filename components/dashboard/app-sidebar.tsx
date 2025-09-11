"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Folder,
  MessageCircleQuestionMark,
  DollarSign,
  MessageSquareText,
  FileText,
  Linkedin,
  StickyNote,
  Files,
} from "lucide-react"

import { NavTools } from "@/components/dashboard/nav-tools"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "../logo"
import { User } from "@supabase/supabase-js"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Saved Files",
      url: "#",
      icon: Files,
    },
    {
      title: "Pricing and Plans",
      url: "#",
      icon: DollarSign
    }
  ],
  navSecondary: [
    {
      title: "Get help",
      url: "#",
      icon: MessageCircleQuestionMark,
    }
  ],
  tools: [
    {
      name: "Message Generator",
      url: "#",
      icon: MessageSquareText,
    },
     {
      name: "PDF Generator",
      url: "#",
      icon: FileText,
    },
    {
      name: "LinkedIn Post Generator",
      url: "#",
      icon: Linkedin,
    },
    {
      name: "Reddit Post Generator",
      url: "#",
      icon: StickyNote,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}


export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTools items={data.tools} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
