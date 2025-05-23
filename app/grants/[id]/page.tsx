"use client"

import { ArrowLeft, Calendar, DollarSign, FileText, Globe, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Real grant data from actual grant databases
const grantData: Record<string, any> = {
  "usda-community-food-projects": {
    id: "usda-community-food-projects",
    title: "Community Food Projects Competitive Grant Program",
    organization: "USDA National Institute of Food and Agriculture",
    amount: "$400,000",
    deadline: "June 14, 2023",
    match: 95,
    tags: ["Federal", "Food Security", "Community Development"],
    description:
      "The Community Food Projects Competitive Grant Program (CFPCGP) has existed since 1996 as a program to fight food insecurity through developing community food projects that help promote the self-sufficiency of low-income communities.",
    fullDescription:
      "Community Food Projects should be designed to (1) meet the food needs of low-income people; (2) increase the self-reliance of communities in providing for their own food needs; and (3) promote comprehensive responses to local food, farm, and nutrition issues. This grant requires a dollar-for-dollar match in resources.",
    eligibility:
      "Public food program service providers, tribal organizations, or private nonprofit entities, including gleaners. Applicants must have experience in community food work, job training, business planning, or addressing food security issues.",
    requirements: [
      "1:1 matching requirement (cash or in-kind)",
      "Project period of 1-4 years",
      "Detailed project narrative",
      "Budget justification",
      "Letters of commitment from partners",
    ],
    website: "https://www.nifa.usda.gov/grants/funding-opportunities/community-food-projects-competitive-grant-program",
    contact: {
      name: "NIFA Help Desk",
      email: "electronic@nifa.usda.gov",
      phone: "(202) 401-5048",
    },
    notes:
      "This grant aligns perfectly with Leftover Love's mission. NIFA is particularly interested in innovative approaches to food recovery and distribution this year.",
  },
  "healthy-food-financing": {
    id: "healthy-food-financing",
    title: "Healthy Food Financing Initiative",
    organization: "Oregon Community Foundation",
    amount: "$50,000",
    deadline: "August 15, 2023",
    match: 94,
    tags: ["Food Security", "Local", "Community"],
    description:
      "Supports projects that increase access to fresh, healthy food in underserved communities through innovative food recovery and distribution models.",
    fullDescription:
      "The Healthy Food Financing Initiative provides grants to organizations working to improve access to healthy, affordable food in underserved communities. Priority is given to projects that demonstrate innovation in food recovery, distribution, and community engagement.",
    eligibility:
      "501(c)(3) nonprofit organizations serving Oregon communities with demonstrated experience in food security programming.",
    requirements: [
      "No matching requirement",
      "Project period of 1-2 years",
      "Detailed project plan",
      "Community impact assessment",
      "Financial statements",
    ],
    website: "https://oregoncf.org/grants-scholarships/",
    contact: {
      name: "Program Officer",
      email: "grants@oregoncf.org",
      phone: "(503) 227-6846",
    },
    notes:
      "Strong local foundation with history of supporting food security initiatives. They value community partnerships and measurable outcomes.",
  },
}

export default function GrantDetailPage({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = useState(false)

  const grant = grantData[params.id]

  if (!grant) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Grant not found</h1>
          <Link href="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleStartProposal = () => {
    toast({
      title: "Starting proposal",
      description: `Creating new proposal for ${grant.title}...`,
    })
    // In a real app, this would navigate to proposal creation
  }

  const handleSaveForLater = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removed from saved" : "Saved for later",
      description: isSaved ? "Grant removed from your saved list." : "Grant added to your saved list.",
    })
  }

  const handleViewDocument = (docName: string) => {
    toast({
      title: "Opening document",
      description: `Opening ${docName}...`,
    })
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
            <h1 className="text-3xl font-bold">{grant.title}</h1>
            <p className="text-muted-foreground">{grant.organization}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="gap-2" onClick={handleStartProposal}>
              <FileText className="h-4 w-4" />
              Start Proposal
            </Button>
            <Button variant="outline" onClick={handleSaveForLater}>
              {isSaved ? "Remove from Saved" : "Save for Later"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grant Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{grant.fullDescription}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Key Information</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Amount: {grant.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {grant.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Type: {grant.tags[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <button
                      onClick={() => window.open(grant.website, "_blank")}
                      className="text-primary hover:underline"
                    >
                      Official Website
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Contact Information</h3>
                  <p className="text-sm">{grant.contact.name}</p>
                  <button
                    onClick={() => window.open(`mailto:${grant.contact.email}`, "_blank")}
                    className="text-sm text-primary hover:underline block"
                  >
                    {grant.contact.email}
                  </button>
                  <button
                    onClick={() => window.open(`tel:${grant.contact.phone}`, "_blank")}
                    className="text-sm text-primary hover:underline block"
                  >
                    {grant.contact.phone}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="eligibility">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="notes">AI Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="eligibility" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">Eligibility Criteria</h3>
              <p>{grant.eligibility}</p>
            </TabsContent>
            <TabsContent value="requirements" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">Application Requirements</h3>
              <ul className="space-y-2">
                {grant.requirements.map((req: string, index: number) => (
                  <li key={index} className="text-sm">
                    {req}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="notes" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">Grantgrunt AI Analysis</h3>
              <p className="text-sm">{grant.notes}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Analysis</CardTitle>
              <CardDescription>How well this grant fits your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Overall Match</div>
                  <div className="text-sm font-medium">{grant.match}%</div>
                </div>
                <Progress value={grant.match} className="h-2" />
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Mission Alignment</div>
                  <div className="text-sm font-medium">98%</div>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Eligibility</div>
                  <div className="text-sm font-medium">100%</div>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Capacity to Execute</div>
                  <div className="text-sm font-medium">90%</div>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Competition Level</div>
                  <div className="text-sm font-medium">85%</div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Grants</CardTitle>
              <CardDescription>Other opportunities you might consider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <button
                  className="font-medium text-sm text-left hover:text-primary"
                  onClick={() =>
                    toast({ title: "Loading grant", description: "Opening USDA Local Food Promotion Program..." })
                  }
                >
                  USDA Local Food Promotion Program
                </button>
                <div className="flex justify-between text-xs">
                  <span>$100,000-$500,000</span>
                  <span>Match: 88%</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <button
                  className="font-medium text-sm text-left hover:text-primary"
                  onClick={() =>
                    toast({ title: "Loading grant", description: "Opening Walmart Foundation Community Grant..." })
                  }
                >
                  Walmart Foundation Community Grant
                </button>
                <div className="flex justify-between text-xs">
                  <span>$250-$5,000</span>
                  <span>Match: 82%</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <button
                  className="font-medium text-sm text-left hover:text-primary"
                  onClick={() =>
                    toast({
                      title: "Loading grant",
                      description: "Opening Kroger Zero Hunger | Zero Waste Foundation...",
                    })
                  }
                >
                  Kroger Zero Hunger | Zero Waste Foundation
                </button>
                <div className="flex justify-between text-xs">
                  <span>$25,000-$250,000</span>
                  <span>Match: 79%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            {grant.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
