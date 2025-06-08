"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { matchGrantsToProfile } from "@/lib/ai/ai-service"
import { useToast } from "@/components/ui/use-toast"

export function AIGrantMatcher({ userProfile, availableGrants }) {
  const [isLoading, setIsLoading] = useState(false)
  const [matchedGrants, setMatchedGrants] = useState([])
  const [activeTab, setActiveTab] = useState("matches")
  const { toast } = useToast()

  const handleFindMatches = async () => {
    setIsLoading(true)
    try {
      const matches = await matchGrantsToProfile(userProfile, availableGrants)
      setMatchedGrants(matches)
    } catch (error) {
      console.error("Error matching grants:", error)
      toast({
        title: "Error",
        description: "Failed to match grants. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Grant Matcher</span>
          <Badge variant="outline" className="ml-2">
            Powered by xAI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="profile">Your Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4 pt-4">
            {matchedGrants.length > 0 ? (
              <div className="space-y-4">
                {matchedGrants.map((grant) => (
                  <div key={grant.grantId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{grant.grantName}</h3>
                      <Badge>{grant.matchScore}% Match</Badge>
                    </div>
                    <Progress value={grant.matchScore} className="h-2 mb-4" />
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Match Reasons:</h4>
                        <ul className="text-sm list-disc pl-5">
                          {grant.matchReasons.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Areas to Strengthen:</h4>
                        <ul className="text-sm list-disc pl-5">
                          {grant.improvementAreas.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Use AI to find grants that match your organization's profile and mission.
                </p>
                <Button onClick={handleFindMatches} disabled={isLoading}>
                  {isLoading ? "Finding Matches..." : "Find Matching Grants"}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Organization Profile</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Name:</div>
                  <div>{userProfile.name}</div>
                  <div className="font-medium">Mission:</div>
                  <div>{userProfile.mission}</div>
                  <div className="font-medium">Focus Areas:</div>
                  <div>{userProfile.focusAreas.join(", ")}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Grant Preferences</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Minimum Amount:</div>
                  <div>${userProfile.preferences.minAmount.toLocaleString()}</div>
                  <div className="font-medium">Maximum Amount:</div>
                  <div>${userProfile.preferences.maxAmount.toLocaleString()}</div>
                  <div className="font-medium">Preferred Locations:</div>
                  <div>{userProfile.preferences.locations.join(", ")}</div>
                </div>
              </div>

              <Button onClick={() => (window.location.href = "/profile/edit")} variant="outline">
                Edit Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setMatchedGrants([])}>
          Reset
        </Button>
        <Button onClick={handleFindMatches} disabled={isLoading}>
          {isLoading ? "Finding Matches..." : "Refresh Matches"}
        </Button>
      </CardFooter>
    </Card>
  )
}
