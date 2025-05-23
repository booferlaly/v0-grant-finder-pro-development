"use client"

import { FileText, Search, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GrantOpportunityCard } from "@/components/grant-opportunity-card"
import { ModeSelector } from "@/components/mode-selector"
import { RecentActivity } from "@/components/recent-activity"
import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearch = () => {
    setIsSearchOpen(true)
  }

  const handleNewProposal = () => {
    toast({
      title: "Creating new proposal",
      description: "Redirecting to proposal builder...",
    })
    // In a real app, this would navigate to a new proposal page
  }

  const handleViewAllProposals = () => {
    toast({
      title: "Loading proposals",
      description: "Showing all active proposals...",
    })
    // In a real app, this would navigate to proposals list page
  }

  const performSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Searching grants",
        description: `Searching for grants matching "${searchQuery}"...`,
      })
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Image src="/images/grantgrunt-logo.png" alt="Grant Grunt by Leftover Love" width={60} height={60} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Grantgrunt Dashboard</h1>
              <p className="text-muted-foreground">AI-powered grant expert for Leftover Love</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                  Search Grants
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search Grants</DialogTitle>
                  <DialogDescription>Search for grants by keyword, organization, or funding amount</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Query</Label>
                    <Input
                      id="search"
                      placeholder="e.g., food security, USDA, $50,000"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && performSearch()}
                    />
                  </div>
                  <Button onClick={performSearch} className="w-full">
                    Search Grants
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="gap-2" onClick={handleNewProposal}>
              <FileText className="h-4 w-4" />
              New Proposal
            </Button>
          </div>
        </div>

        <StatsCards />

        <div className="grid gap-6 mt-8 md:grid-cols-7">
          <div className="md:col-span-5">
            <Card className="mb-6 border-green-100 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <Zap className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Auto-Application Ready</h3>
                      <p className="text-sm text-muted-foreground">
                        Your nonprofit profile is complete and ready for auto-applications
                      </p>
                    </div>
                  </div>
                  <Link href="/profile/auto-apply">
                    <Button size="sm">Manage Auto-Apply Settings</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="local">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Grant Opportunities</h2>
                <TabsList>
                  <TabsTrigger value="local">Local</TabsTrigger>
                  <TabsTrigger value="federal">Federal</TabsTrigger>
                  <TabsTrigger value="global">Global</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="local" className="space-y-4">
                <GrantOpportunityCard
                  id="healthy-food-financing"
                  title="Healthy Food Financing Initiative"
                  organization="Oregon Community Foundation"
                  amount="$50,000"
                  deadline="August 15, 2023"
                  match={94}
                  tags={["Food Security", "Local", "Community"]}
                  description="Supports projects that increase access to fresh, healthy food in underserved communities through innovative food recovery and distribution models."
                  autoApplyEligible={true}
                />
                <GrantOpportunityCard
                  id="neighborhood-economic-development"
                  title="Neighborhood Economic Development Grant"
                  organization="Prosper Portland"
                  amount="$25,000"
                  deadline="July 31, 2023"
                  match={89}
                  tags={["Local", "Economic Development", "Food Systems"]}
                  description="Provides funding for neighborhood-based initiatives that strengthen local food systems and create economic opportunities in underserved communities."
                  autoApplyEligible={true}
                />
                <GrantOpportunityCard
                  id="community-food-projects-local"
                  title="Community Food Projects Grant"
                  organization="Oregon Food Bank"
                  amount="$15,000"
                  deadline="September 30, 2023"
                  match={92}
                  tags={["Local", "Food Justice", "Community"]}
                  description="Supports community-led food projects that address food insecurity and build sustainable local food systems in Oregon communities."
                  autoApplyEligible={false}
                />
              </TabsContent>
              <TabsContent value="federal" className="space-y-4">
                <GrantOpportunityCard
                  id="usda-community-food-projects"
                  title="Community Food Projects Competitive Grant Program"
                  organization="USDA National Institute of Food and Agriculture"
                  amount="$400,000"
                  deadline="June 14, 2023"
                  match={95}
                  tags={["Federal", "Food Security", "Community Development"]}
                  description="Supports projects that help meet the food needs of low-income individuals, increase community self-reliance, and promote comprehensive responses to local food access issues."
                  autoApplyEligible={true}
                />
                <GrantOpportunityCard
                  id="epa-solid-waste"
                  title="Solid Waste Infrastructure for Recycling Grant Program"
                  organization="Environmental Protection Agency"
                  amount="$500,000"
                  deadline="July 25, 2023"
                  match={87}
                  tags={["Federal", "Waste Reduction", "Infrastructure"]}
                  description="Funds projects that improve local post-consumer materials management including food waste prevention, reduction, and recycling."
                  autoApplyEligible={false}
                />
                <GrantOpportunityCard
                  id="farmers-market-promotion"
                  title="Farmers Market Promotion Program"
                  organization="USDA Agricultural Marketing Service"
                  amount="$250,000"
                  deadline="May 2, 2023"
                  match={86}
                  tags={["Federal", "Agriculture", "Food Distribution"]}
                  description="Supports projects that develop, coordinate, and expand direct producer-to-consumer markets to help increase access to locally grown foods."
                  autoApplyEligible={true}
                />
              </TabsContent>
              <TabsContent value="global" className="space-y-4">
                <GrantOpportunityCard
                  id="food-waste-innovation"
                  title="Food Waste Innovation Challenge"
                  organization="The Rockefeller Foundation"
                  amount="$200,000"
                  deadline="October 15, 2023"
                  match={91}
                  tags={["Global", "Innovation", "Food Waste"]}
                  description="Supports innovative solutions to reduce food waste and loss across the supply chain, with a focus on scalable technologies and approaches."
                  autoApplyEligible={false}
                />
                <GrantOpportunityCard
                  id="zero-hunger-zero-waste"
                  title="Zero Hunger, Zero Waste Foundation Innovation Fund"
                  organization="Kroger Co. Foundation"
                  amount="$100,000"
                  deadline="August 1, 2023"
                  match={93}
                  tags={["Global", "Food Recovery", "Innovation"]}
                  description="Funds innovative organizations with solutions to prevent food waste and end hunger in communities across the U.S."
                  autoApplyEligible={true}
                />
                <GrantOpportunityCard
                  id="sustainable-food-systems"
                  title="Sustainable Food Systems Grant"
                  organization="Cargill Foundation"
                  amount="$150,000"
                  deadline="September 30, 2023"
                  match={85}
                  tags={["Global", "Sustainability", "Food Systems"]}
                  description="Supports organizations working to build more sustainable food systems through reducing waste, improving distribution efficiency, and increasing access to nutritious food."
                  autoApplyEligible={false}
                />
              </TabsContent>
            </Tabs>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Active Proposals</CardTitle>
                <CardDescription>Track your current grant applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">USDA Community Food Projects</p>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            Auto-Applied
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Due in 14 days</p>
                      </div>
                      <p className="text-sm font-medium">75% Complete</p>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Oregon Community Foundation Grant</p>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            Auto-Applied
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Due in 21 days</p>
                      </div>
                      <p className="text-sm font-medium">45% Complete</p>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Kroger Zero Hunger | Zero Waste</p>
                        <p className="text-sm text-muted-foreground">Due in 30 days</p>
                      </div>
                      <p className="text-sm font-medium">20% Complete</p>
                    </div>
                    <Progress value={20} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleViewAllProposals}>
                  View All Proposals
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <ModeSelector />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}
