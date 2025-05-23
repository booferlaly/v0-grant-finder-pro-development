import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"

export default function RecentApplications() {
  const applications = [
    {
      id: "APP-2023-001",
      grantName: "Small Business Innovation Grant",
      organization: "National Science Foundation",
      submittedDate: "May 10, 2025",
      status: "approved",
      amount: "$50,000",
    },
    {
      id: "APP-2023-002",
      grantName: "Community Development Fund",
      organization: "Urban Development Agency",
      submittedDate: "May 5, 2025",
      status: "pending",
      amount: "$25,000",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "review":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <HelpCircle className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Recent Applications</h2>
        <Button variant="outline" size="sm" className="text-xs">
          <FileText className="h-3.5 w-3.5 mr-1" />
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:p-5 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-slate-800">{app.grantName}</h3>
                    <p className="text-sm text-slate-500">{app.organization}</p>
                  </div>
                  <div className="mt-2 md:mt-0">{getStatusBadge(app.status)}</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center text-sm gap-y-2 md:gap-x-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <FileText className="h-3.5 w-3.5" />
                    <span>ID: {app.id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Submitted: {app.submittedDate}</span>
                  </div>
                  <div className="font-medium text-emerald-600">{app.amount}</div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 md:p-5 md:border-l flex flex-row md:flex-col justify-between items-center md:items-start gap-2">
                <Button variant="outline" size="sm" className="text-xs w-full">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
