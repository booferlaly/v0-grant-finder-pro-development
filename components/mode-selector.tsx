"use client"

import { FileText, Globe, LineChart, Search } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function ModeSelector() {
  const handleModeSelect = (mode: string) => {
    toast({
      title: `${mode} mode activated`,
      description: `Switching to ${mode} mode...`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specialized Modes</CardTitle>
        <CardDescription>Select a mode to focus your grant work</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          onClick={() => handleModeSelect("Grant Research")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700">
            <Search className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-medium">Grant Research</p>
            <p className="text-xs text-muted-foreground">Find ideal opportunities</p>
          </div>
        </button>
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          onClick={() => handleModeSelect("Proposal Writing")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700">
            <FileText className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-medium">Proposal Writing</p>
            <p className="text-xs text-muted-foreground">Create compelling applications</p>
          </div>
        </button>
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          onClick={() => handleModeSelect("Global Grants")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700">
            <Globe className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-medium">Global Grants</p>
            <p className="text-xs text-muted-foreground">International funding sources</p>
          </div>
        </button>
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          onClick={() => handleModeSelect("Data Analysis")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700">
            <LineChart className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-medium">Data Analysis</p>
            <p className="text-xs text-muted-foreground">Transform insights into action</p>
          </div>
        </button>
      </CardContent>
    </Card>
  )
}
