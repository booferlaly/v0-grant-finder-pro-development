import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

interface Application {
  id: string
  status: string
  submittedAt?: string | null
  updatedAt: string
}

interface ApplicationTimelineProps {
  application: Application
}

export function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  const timelineEvents = [
    {
      status: "draft",
      title: "Application Created",
      description: "Application draft was created",
      date: "January 15, 2024",
      completed: true,
    },
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Application was submitted for review",
      date: application.submittedAt || null,
      completed: application.status !== "draft",
    },
    {
      status: "review",
      title: "Under Review",
      description: "Application is being reviewed by the grant committee",
      date: null,
      completed: ["review", "approved", "rejected"].includes(application.status),
    },
    {
      status: "decision",
      title: "Decision Made",
      description: "Final decision has been made",
      date: null,
      completed: ["approved", "rejected"].includes(application.status),
    },
  ]

  const getStatusIcon = (event: any) => {
    if (event.completed) {
      if (application.status === "rejected" && event.status === "decision") {
        return <XCircle className="h-4 w-4 text-red-500" />
      }
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    if (event.status === application.status) {
      return <Clock className="h-4 w-4 text-blue-500" />
    }
    return <AlertCircle className="h-4 w-4 text-gray-300" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.status} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">{getStatusIcon(event)}</div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  {event.date && <span className="text-xs text-muted-foreground">{event.date}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                {event.status === application.status && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    Current Status
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
