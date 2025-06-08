import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon } from "lucide-react"

const statusColors = {
  draft: "secondary",
  submitted: "default",
  review: "warning",
  approved: "success",
  rejected: "destructive",
}

export function ApplicationCard({ application }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{application.projectTitle}</CardTitle>
            <CardDescription>Grant: {application.grantTitle}</CardDescription>
          </div>
          <Badge variant={statusColors[application.status]}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Submitted: {application.submittedAt || "Not submitted"}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Last updated: {application.updatedAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/applications/${application.id}`}>View Details</Link>
        </Button>
        {application.status === "draft" && (
          <Button asChild>
            <Link href={`/grants/${application.grantId}/apply?draft=${application.id}`}>Continue Editing</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
