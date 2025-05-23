import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, TrendingUp, DollarSign } from "lucide-react"

export default function CommunityFundingSection() {
  const causes = [
    {
      id: 1,
      title: "Local School Music Program",
      description: "Help fund instruments and music education for underprivileged students",
      category: "Education",
      goalAmount: 15000,
      raisedAmount: 9750,
      backers: 87,
      daysLeft: 14,
    },
    {
      id: 2,
      title: "Community Garden Initiative",
      description: "Transform vacant lots into productive community gardens",
      category: "Environment",
      goalAmount: 8000,
      raisedAmount: 6200,
      backers: 124,
      daysLeft: 21,
    },
  ]

  const investments = [
    {
      id: 1,
      title: "Clean Energy Startup",
      description: "Innovative solar technology for residential buildings",
      category: "Energy",
      investmentAmount: 50000,
      expectedReturn: "8-12%",
      riskLevel: "Medium",
      term: "3-5 years",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Community & Investment Opportunities</h2>
        <Button variant="outline" size="sm" className="text-xs">
          <Users className="h-3.5 w-3.5 mr-1" />
          View All
        </Button>
      </div>

      <Tabs defaultValue="causes">
        <TabsList className="mb-4">
          <TabsTrigger value="causes">
            <Heart className="h-3.5 w-3.5 mr-1" />
            Causes
          </TabsTrigger>
          <TabsTrigger value="investments">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            Investments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="causes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {causes.map((cause) => (
              <Card key={cause.id} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{cause.title}</CardTitle>
                    <Badge variant="outline" className="bg-slate-50">
                      {cause.category}
                    </Badge>
                  </div>
                  <CardDescription>{cause.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Raised</span>
                        <span className="font-medium">
                          ${cause.raisedAmount.toLocaleString()} of ${cause.goalAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(cause.raisedAmount / cause.goalAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{cause.backers} backers</span>
                      <span>{cause.daysLeft} days left</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Heart className="h-3.5 w-3.5 mr-1" />
                    Support This Cause
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investments.map((investment) => (
              <Card key={investment.id} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{investment.title}</CardTitle>
                    <Badge variant="outline" className="bg-slate-50">
                      {investment.category}
                    </Badge>
                  </div>
                  <CardDescription>{investment.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500">Investment Amount</p>
                      <p className="text-sm font-medium">${investment.investmentAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500">Expected Return</p>
                      <p className="text-sm font-medium text-emerald-600">{investment.expectedReturn}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    Invest Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
