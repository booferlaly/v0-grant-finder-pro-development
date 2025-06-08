import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getGrantStatistics, getUpcomingDeadlines, getFeaturedGrants } from "@/lib/grants/data"
import { CalendarIcon, FileTextIcon } from "lucide-react"

export const metadata = {
  title: "Dashboard | GrantGrunt",
  description: "Your grant application dashboard with real-time data",
}

export default async function DashboardPage() {
  const [stats, upcomingDeadlines, featuredGrants] = await Promise.all([
    getGrantStatistics(),
    getUpcomingDeadlines(14),
    getFeaturedGrants(),
  ])

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Badge variant="outline" className="text-xs">
          Live Data • Updated {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Real-time Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Grants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActive}</div>
            <p className="text-xs text-muted-foreground">{stats.newThisWeek} new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalFunding / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Across all active grants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grant Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground">Different focus areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <CalendarIcon className="h-5 w-5" />
              Urgent Deadlines (Next 14 Days)
            </CardTitle>
            <CardDescription>Don't miss these upcoming opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 3).map((grant) => (
                <div key={grant.id} className="flex justify-between items-center p-3 bg-white rounded border">
                  <div>
                    <div className="font-medium">{grant.title}</div>
                    <div className="text-sm text-muted-foreground">{grant.provider}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-600">{grant.deadline}</div>
                    <div className="text-xs text-muted-foreground">{grant.awardAmount}</div>
                  </div>
                </div>
              ))}
            </div>
            {upcomingDeadlines.length > 3 && (
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/grants?filter=upcoming">View All Upcoming Deadlines</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/grants">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Browse {stats.totalActive} Active Grants
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/applications">View My Applications</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/hope">Chat with Hope Assistant</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/ai-tools">Explore AI Tools</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Featured Grants */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Opportunities</CardTitle>
            <CardDescription>Recommended grants based on current trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredGrants.slice(0, 3).map((grant) => (
                <div key={grant.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm leading-tight">{grant.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{grant.provider}</div>
                    <div className="text-xs text-green-600 mt-1">{grant.awardAmount}</div>
                  </div>
                  <div className="text-right ml-4">
                    {grant.isNew && <Badge className="text-xs mb-1">New</Badge>}
                    <div className="text-xs text-muted-foreground">{grant.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/grants?filter=featured">View All Featured Grants</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
