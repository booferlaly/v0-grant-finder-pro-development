import { FileCheck, FileText, Search, Zap } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions by Grantgrunt</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 mt-0.5">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Auto-applied to Oregon Community Foundation grant</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 mt-0.5">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Found USDA Community Food Projects grant opportunity</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 mt-0.5">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Updated budget section for Oregon Community Foundation proposal</p>
            <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 mt-0.5">
            <FileCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Submitted Kroger Zero Hunger | Zero Waste LOI</p>
            <p className="text-xs text-muted-foreground">May 21, 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
