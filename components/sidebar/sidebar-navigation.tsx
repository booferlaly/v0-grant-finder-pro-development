"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, FileText, Users, Settings, MessageSquare, HelpCircle } from "lucide-react"

export function SidebarNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Grants",
      icon: FileText,
      path: "/grants",
    },
    {
      title: "Applications",
      icon: FileText,
      path: "/applications",
    },
    {
      title: "Users",
      icon: Users,
      path: "/users",
    },
    {
      title: "Chat Assistant",
      icon: MessageSquare,
      path: "/assistant",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      title: "Help",
      icon: HelpCircle,
      path: "/help",
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => router.push(item.path)} isActive={pathname === item.path}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
