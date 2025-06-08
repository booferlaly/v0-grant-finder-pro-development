"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

// Define your navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Grants",
    href: "/grants",
    icon: "FileText",
  },
  {
    title: "Applications",
    href: "/applications",
    icon: "ClipboardList",
  },
  {
    title: "Hope Assistant",
    href: "/hope",
    icon: "MessageCircle",
  },
  {
    title: "KT Surrogate",
    href: "/kt",
    icon: "Shield",
  },
  // Add your other navigation items here
]

// Import all icons
import * as LucideIcons from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarMenu>
        {navItems.map((item) => {
          // Dynamically get the icon component
          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons]

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || pathname?.startsWith(`${item.href}/`)}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarContent>
  )
}
