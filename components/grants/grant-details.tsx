import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Grant {
  id: string
  title: string
  description: string
  category: string
  deadline: string
  awardAmount: string
  eligibility: string
}

interface GrantDetailsProps {
  grant: Grant
}

export function GrantDetails({ grant }: GrantDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grant Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{grant.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eligibility Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{grant.eligibility}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Required Documents</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Completed application form</li>
                <li>Project proposal (max 5 pages)</li>
                <li>Detailed budget and budget justification</li>
                <li>Organization's IRS determination letter</li>
                <li>Board of directors list</li>
                <li>Most recent audited financial statements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Evaluation Criteria</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Alignment with grant priorities</li>
                <li>Organizational capacity and experience</li>
                <li>Project feasibility and sustainability</li>
                <li>Expected impact and outcomes</li>
                <li>Budget appropriateness</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
