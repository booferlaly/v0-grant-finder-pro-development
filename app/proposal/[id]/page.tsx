import { ArrowLeft, Calendar, Check, Clock, Download, FileText, Save, Send, DollarSign } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// This would typically come from a database or API
const proposalData = {
  "usda-community-food-projects": {
    id: "usda-community-food-projects",
    title: "USDA Community Food Projects Competitive Grant",
    organization: "U.S. Department of Agriculture",
    amount: "$125,000",
    deadline: "September 10, 2025",
    progress: 75,
    sections: [
      {
        name: "Project Summary",
        status: "complete",
        content:
          "Leftover Love's 'No Chow Left Behind' initiative addresses critical food insecurity in Portland by recovering surplus food from restaurants and events, then redistributing it to underserved communities through innovative mobile distribution points. This project will expand our current operations by 40%, establish three new community food hubs, and implement a digital tracking system to maximize efficiency and impact measurement.",
      },
      {
        name: "Organizational Capacity",
        status: "complete",
        content:
          "Founded in 2020, Leftover Love has successfully recovered over 500,000 pounds of food that would otherwise go to waste, serving approximately 15,000 individuals annually. Our team includes food safety experts, logistics specialists, and community organizers with deep connections in the neighborhoods we serve. We have established partnerships with 45 food donors and 12 community centers that serve as distribution points.",
      },
      {
        name: "Project Description",
        status: "in-progress",
        content:
          "The 'No Chow Left Behind' expansion project will implement a three-pronged approach to food recovery and distribution:\n\n1. Technology Enhancement: Development of a real-time food donation and distribution tracking system to optimize logistics and reduce response time.\n\n2. Community Food Hubs: Establishment of three new strategically located community food hubs in underserved neighborhoods, equipped with proper storage facilities and serving as both distribution centers and educational spaces.\n\n3. Mobile Distribution Fleet: Addition of two refrigerated vehicles to our fleet, enabling us to recover and distribute perishable items more efficiently and reach isolated communities.",
      },
      {
        name: "Budget",
        status: "in-progress",
        content:
          "Total Project Budget: $250,000\nRequested Amount: $125,000\nMatching Funds: $125,000\n\nBudget Breakdown:\n- Personnel: $85,000\n- Equipment (refrigerated vehicles): $70,000\n- Food Hub Setup: $45,000\n- Technology Development: $30,000\n- Training and Education: $15,000\n- Administrative Costs: $5,000",
      },
      {
        name: "Evaluation Plan",
        status: "not-started",
        content: "",
      },
      {
        name: "Sustainability Plan",
        status: "not-started",
        content: "",
      },
    ],
    aiSuggestions: [
      "Include specific metrics from your previous food recovery efforts to strengthen the Project Summary",
      "Add demographic information about the communities you serve in the Organizational Capacity section",
      "Develop a more detailed timeline for the Project Description",
      "Consider adding a line item for marketing and community outreach in the Budget",
    ],
  },
}

export default function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = proposalData[params.id as keyof typeof proposalData]

  if (!proposal) {
    return <div>Proposal not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Proposal: {proposal.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{proposal.organization}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Due: {proposal.deadline}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {proposal.amount}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proposal Sections</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{proposal.progress}% Complete</span>
                  <Progress value={proposal.progress} className="w-24 h-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={proposal.sections[2].name}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value={proposal.sections[0].name}>Summary</TabsTrigger>
                  <TabsTrigger value={proposal.sections[2].name}>Project</TabsTrigger>
                  <TabsTrigger value={proposal.sections[3].name}>Budget</TabsTrigger>
                </TabsList>

                {proposal.sections.map((section) => (
                  <TabsContent key={section.name} value={section.name} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{section.name}</h3>
                      <Badge
                        variant={
                          section.status === "complete"
                            ? "success"
                            : section.status === "in-progress"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          section.status === "complete"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : section.status === "in-progress"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : ""
                        }
                      >
                        {section.status === "complete" ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" /> Complete
                          </span>
                        ) : section.status === "in-progress" ? (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> In Progress
                          </span>
                        ) : (
                          "Not Started"
                        )}
                      </Badge>
                    </div>
                    <Textarea
                      value={section.content}
                      placeholder="Enter content for this section..."
                      className="min-h-[300px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">AI Enhance</Button>
                      <Button>Save Section</Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
              <CardDescription>Grantgrunt's recommendations to improve your proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Generate More Suggestions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Checklist</CardTitle>
              <CardDescription>Required items before submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">Project Summary (1 page max)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">Organizational Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-muted" />
                  <span className="text-sm">Project Narrative (15 pages max)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-muted" />
                  <span className="text-sm">Detailed Budget & Justification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-muted" />
                  <span className="text-sm">Letters of Commitment (3 required)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-sm border border-muted" />
                  <span className="text-sm">Matching Funds Documentation</span>
                </div>
              </div>
              <Button className="w-full mt-6 gap-2">
                <Send className="h-4 w-4" />
                Submit When Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
