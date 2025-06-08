import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, DollarSignIcon, FileTextIcon } from "lucide-react"

interface Application {
  id: string
  projectTitle: string
  grantTitle: string
  status: string
  requestedAmount: number
  submittedAt?: string | null
  updatedAt: string
}

interface ApplicationHeaderProps {
  application: Application
}

const statusColors = {
  draft: "secondary",
  submitted: "default",
  review: "warning",
  approved: "success",
  rejected: "destructive",
} as const

export function ApplicationHeader({ application }: ApplicationHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{application.projectTitle}</h1>
          <p className="text-lg text-muted-foreground mt-1">Grant: {application.grantTitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={statusColors[application.status as keyof typeof statusColors]}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">Application #{application.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileTextIcon className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {application.status === "draft" && <Button>Continue Editing</Button>}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Requested Amount</p>
            <p className="text-sm text-muted-foreground">
              ${application.requestedAmount?.toLocaleString() || "Not specified"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Submitted</p>
            <p className="text-sm text-muted-foreground">{application.submittedAt || "Not submitted"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground">{application.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
