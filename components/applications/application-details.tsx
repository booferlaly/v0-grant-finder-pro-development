import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Application {
  id: string
  projectTitle: string
  projectSummary: string
  requestedAmount: number
  timeline?: string
  impact?: string
  status: string
}

interface ApplicationDetailsProps {
  application: Application
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="project">Project</TabsTrigger>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {application.projectSummary || "No project summary provided."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expected Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {application.impact || "No impact statement provided."}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="project" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{application.timeline || "No timeline provided."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Detailed methodology information would be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="budget" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Requested Amount:</span>
                <span className="text-lg font-bold">
                  ${application.requestedAmount?.toLocaleString() || "Not specified"}
                </span>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Detailed budget breakdown would be displayed here, including personnel costs, equipment, supplies, and
                  other expenses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="text-sm">Application Form.pdf</span>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="text-sm">Budget Justification.pdf</span>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span className="text-sm">Organization Chart.pdf</span>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
