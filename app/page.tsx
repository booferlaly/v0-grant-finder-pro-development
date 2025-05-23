import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Bell, Users, FileText, DollarSign, BarChart3 } from "lucide-react"
import GrantMatchCard from "@/components/grant-match-card"
import ProfileCompletion from "@/components/profile-completion"
import CommunityFundingSection from "@/components/community-funding-section"
import RecentApplications from "@/components/recent-applications"
import ChatbotButton from "@/components/chatbot-button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-800">GrantFinder Pro</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-sm font-medium text-emerald-700">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Welcome back Katie</CardTitle>
              <CardDescription>You have 3 new grant matches and 2 pending applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for grants, opportunities, or causes..."
                  className="w-full rounded-md border border-slate-200 pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  My Applications
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  Community
                </Button>
              </div>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                Find Grants
              </Button>
            </CardFooter>
          </Card>

          <ProfileCompletion />
        </div>

        <Tabs defaultValue="grants" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="grants">Grant Matches</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="community">Community Funding</TabsTrigger>
          </TabsList>

          <TabsContent value="grants" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Your Top Matches</h2>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                View All Matches
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <GrantMatchCard
                title="Small Business Innovation Grant"
                organization="National Science Foundation"
                amount="$50,000"
                matchPercentage={92}
                deadline="June 15, 2025"
                tags={["Small Business", "Innovation", "Technology"]}
              />

              <GrantMatchCard
                title="Community Development Fund"
                organization="Urban Development Agency"
                amount="$25,000"
                matchPercentage={87}
                deadline="July 10, 2025"
                tags={["Community", "Development", "Urban"]}
              />

              <GrantMatchCard
                title="Green Energy Initiative"
                organization="Environmental Protection Fund"
                amount="$35,000"
                matchPercentage={84}
                deadline="August 5, 2025"
                tags={["Energy", "Environment", "Sustainability"]}
              />
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <RecentApplications />
          </TabsContent>

          <TabsContent value="community">
            <CommunityFundingSection />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                Grant Success Insights
              </CardTitle>
              <CardDescription>Track your application success rate and optimize your strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-md bg-slate-50">
                <p className="text-slate-500 text-sm">Grant success visualization chart will appear here</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="text-xs">
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auto Applier</CardTitle>
              <CardDescription>Let us handle the application process for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Free Plan</span>
              </div>
              <p className="text-sm text-slate-600">
                Upgrade to our Premium plan to automatically apply to grants that match your profile.
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Upgrade to Premium</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
