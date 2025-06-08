"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// This is a debugging component to help identify the issue
export function SidebarDebugger() {
  const router = useRouter()

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`)
    router.push(path)
  }

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h3 className="font-medium">Sidebar Debugger</h3>

      <div className="space-y-2">
        <Button onClick={() => handleNavigation("/dashboard")} variant="outline" className="w-full justify-start">
          Test: Dashboard
        </Button>

        <Button onClick={() => handleNavigation("/grants")} variant="outline" className="w-full justify-start">
          Test: Grants
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Check browser console for navigation logs</p>
      </div>
    </div>
  )
}
