"use client"

import { useState } from "react"
import { SidebarDebugger } from "./sidebar/sidebar-fix"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-40px)]"}`}
    >
      <Card className="w-80">
        <CardHeader className="p-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CardTitle className="text-sm flex items-center justify-between">
            GrantGrunt Debug Panel
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              {isOpen ? "−" : "+"}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-3">
          <Tabs defaultValue="sidebar">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="talking-head">Talking Head</TabsTrigger>
            </TabsList>

            <TabsContent value="sidebar" className="mt-2">
              <div className="text-sm space-y-2">
                <p>Common sidebar issues:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Missing client directive</li>
                  <li>Navigation not working</li>
                  <li>Event handlers not firing</li>
                </ul>
                <SidebarDebugger />
              </div>
            </TabsContent>

            <TabsContent value="talking-head" className="mt-2">
              <div className="text-sm space-y-2">
                <p>Common talking head issues:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>State not updating</li>
                  <li>Animation/transition problems</li>
                  <li>Z-index conflicts</li>
                </ul>
                <Button className="w-full mt-2" onClick={() => (window.location.href = "/debug/talking-head")}>
                  Test Talking Head
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
