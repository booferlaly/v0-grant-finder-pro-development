"use client"

import { Briefcase, FileText, Globe, LayoutDashboard, LineChart, Mail, Settings, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function Sidebar() {
  const pathname = usePathname()

  const handleNavigation = (path: string, label: string) => {
    if (path === "#") {
      toast({
        title: `${label} coming soon`,
        description: "This feature is currently under development.",
      })
    }
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-background p-4">
      <div className="flex flex-col items-center gap-2 px-2 mb-8">
        <Image
          src="/images/grantgrunt-logo.png"
          alt="Grant Grunt by Leftover Love"
          width={160}
          height={160}
          className="mb-2"
        />
      </div>
      <nav className="space-y-1.5">
        <Button variant={isActive("/") ? "default" : "ghost"} className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigation("#", "Grant Research")}
        >
          <Search className="h-4 w-4" />
          Grant Research
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigation("#", "Proposal Writing")}
        >
          <FileText className="h-4 w-4" />
          Proposal Writing
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigation("#", "Fiscal Sponsorship")}
        >
          <Briefcase className="h-4 w-4" />
          Fiscal Sponsorship
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigation("#", "Data Analysis")}
        >
          <LineChart className="h-4 w-4" />
          Data Analysis
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigation("#", "Global Grants")}
        >
          <Globe className="h-4 w-4" />
          Global Grants
        </Button>
      </nav>
      <div className="mt-auto space-y-1.5">
        <Button variant={isActive("/profile") ? "default" : "ghost"} className="w-full justify-start gap-2" asChild>
          <Link href="/profile/auto-apply">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => handleNavigation("#", "Support")}>
          <Mail className="h-4 w-4" />
          Support
        </Button>
      </div>
      <div className="mt-6 p-4 rounded-lg bg-muted">
        <p className="text-sm font-medium">Leftover Love</p>
        <p className="text-xs text-muted-foreground mt-1">"No Chow Left Behind"</p>
      </div>
    </div>
  )
}
