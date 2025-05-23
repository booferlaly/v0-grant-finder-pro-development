"use client"

import { ArrowLeft, Check, FileText, Send, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

export default function AutoApplyReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApproveSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application submitted",
        description: "Your grant application has been successfully submitted.",
      })
    }, 1500)
  }

  const handleReject = () => {
    toast({
      title: "Application rejected",
      description: "The auto-generated application has been rejected. You can edit it manually.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Image src="/images/grantgrunt-logo.png" alt="Grant Grunt by Leftover Love" width={60} height={60} />
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Auto-Application Review</h1>
              <p className="text-muted-foreground">Review and approve auto-generated grant applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>USDA Community Food Projects Competitive Grant</CardTitle>
                  <CardDescription>Auto-generated application ready for review</CardDescription>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  Pending Approval
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="project-summary">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="project-summary">Project Summary</TabsTrigger>
                  <TabsTrigger value="narrative">Project Narrative</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                  <TabsTrigger value="attachments">Attachments</TabsTrigger>
                </TabsList>

                <TabsContent value="project-summary" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Project Title</h3>
                    <p className="text-sm p-3 border rounded-md bg-muted/50">
                      No Chow Left Behind: Expanding Food Recovery and Distribution in Portland
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Project Summary</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <p>
                        Leftover Love's 'No Chow Left Behind' initiative addresses critical food insecurity in Portland
                        by recovering surplus food from restaurants and events, then redistributing it to underserved
                        communities through innovative mobile distribution points. This project will expand our current
                        operations by 40%, establish three new community food hubs, and implement a digital tracking
                        system to maximize efficiency and impact measurement.
                      </p>
                      <p className="mt-2">
                        Founded in 2020, Leftover Love has successfully recovered over 500,000 pounds of food that would
                        otherwise go to waste, serving approximately 15,000 individuals annually. Our team includes food
                        safety experts, logistics specialists, and community organizers with deep connections in the
                        neighborhoods we serve. We have established partnerships with 45 food donors and 12 community
                        centers that serve as distribution points.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Geographic Area Served</h3>
                    <p className="text-sm p-3 border rounded-md bg-muted/50">
                      Portland, Oregon metropolitan area, with a focus on North Portland, East Portland, and Southeast
                      Portland neighborhoods with high rates of food insecurity.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="narrative" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Project Approach</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <p>
                        The 'No Chow Left Behind' expansion project will implement a three-pronged approach to food
                        recovery and distribution:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>
                          <strong>Technology Enhancement:</strong> Development of a real-time food donation and
                          distribution tracking system to optimize logistics and reduce response time.
                        </li>
                        <li>
                          <strong>Community Food Hubs:</strong> Establishment of three new strategically located
                          community food hubs in underserved neighborhoods, equipped with proper storage facilities and
                          serving as both distribution centers and educational spaces.
                        </li>
                        <li>
                          <strong>Mobile Distribution Fleet:</strong> Addition of two refrigerated vehicles to our
                          fleet, enabling us to recover and distribute perishable items more efficiently and reach
                          isolated communities.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Community Engagement</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <p>Our community engagement strategy involves:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Partnering with neighborhood associations and community leaders to identify optimal locations
                          for food hubs
                        </li>
                        <li>
                          Recruiting and training community volunteers to assist with food distribution and education
                        </li>
                        <li>
                          Conducting regular listening sessions with food recipients to continuously improve our
                          services
                        </li>
                        <li>
                          Collaborating with local chefs to provide cooking demonstrations using commonly recovered food
                          items
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Expected Outcomes</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <p>By the end of the grant period, we expect to achieve:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>40% increase in food recovery, from 500,000 to 700,000 pounds annually</li>
                        <li>35% increase in individuals served, from 15,000 to 20,250 annually</li>
                        <li>Establishment of 3 new community food hubs serving at least 250 individuals weekly each</li>
                        <li>50% reduction in food waste among 20 new restaurant partners</li>
                        <li>Development of a replicable model for community-based food recovery and distribution</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Budget Summary</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <p className="font-medium">Total Project Budget: $250,000</p>
                      <p>Requested Amount: $125,000</p>
                      <p>Matching Funds: $125,000</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Budget Breakdown</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-medium">Personnel</p>
                          <p>$85,000</p>
                        </div>
                        <div>
                          <p className="font-medium">Equipment (refrigerated vehicles)</p>
                          <p>$70,000</p>
                        </div>
                        <div>
                          <p className="font-medium">Food Hub Setup</p>
                          <p>$45,000</p>
                        </div>
                        <div>
                          <p className="font-medium">Technology Development</p>
                          <p>$30,000</p>
                        </div>
                        <div>
                          <p className="font-medium">Training and Education</p>
                          <p>$15,000</p>
                        </div>
                        <div>
                          <p className="font-medium">Administrative Costs</p>
                          <p>$5,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Matching Funds Sources</h3>
                    <div className="text-sm p-3 border rounded-md bg-muted/50">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Oregon Community Foundation: $50,000 (confirmed)</li>
                        <li>Corporate Sponsors: $40,000 (confirmed from 3 sponsors)</li>
                        <li>Individual Donations: $25,000 (confirmed)</li>
                        <li>In-kind Donations: $10,000 (equipment and professional services)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Required Attachments</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>Form SF-424 (Application for Federal Assistance)</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>Form SF-424A (Budget Information)</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>Leftover Love 501(c)(3) Determination Letter</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>Letters of Commitment (5)</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span>Current Board of Directors List</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2" onClick={handleReject}>
                <X className="h-4 w-4" />
                Reject & Edit Manually
              </Button>
              <Button className="gap-2" onClick={handleApproveSubmit} disabled={isSubmitting}>
                <Check className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Approve & Submit"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Auto-generated by Grantgrunt AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Completion Status</div>
                  <div className="text-sm font-medium">100%</div>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-sm">All required fields completed</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-sm">All required attachments included</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-sm">Budget matches requirements</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="text-sm">Character/word counts within limits</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Grant Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funder:</span>
                    <span>USDA NIFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span>$125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span>June 14, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Match Score:</span>
                    <span>95%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={handleApproveSubmit} disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Grantgrunt's analysis of this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <p className="font-medium">Strengths:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Strong alignment with USDA priorities for community food security</li>
                  <li>Clear, measurable outcomes with specific metrics</li>
                  <li>Demonstrated track record of success with previous food recovery efforts</li>
                  <li>Solid matching funds already secured</li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <p className="font-medium">Suggestions for Improvement:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consider adding more details about sustainability plan after grant period</li>
                  <li>Strengthen the evaluation methodology section</li>
                  <li>Add more specific information about community partnerships</li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <p className="font-medium">Success Probability:</p>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="h-2 flex-1" />
                  <span>85%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on historical data from similar applications and current USDA funding priorities
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
