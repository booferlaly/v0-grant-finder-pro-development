"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { reviewApplication } from "@/lib/ai/ai-service"
import { useToast } from "@/components/ui/use-toast"

export function AIApplicationReviewer({ application, grantCriteria }) {
  const [review, setReview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const handleReviewApplication = async () => {
    setIsLoading(true)
    try {
      const reviewResult = await reviewApplication(application, grantCriteria)
      setReview(reviewResult)
    } catch (error) {
      console.error("Error reviewing application:", error)
      toast({
        title: "Error",
        description: "Failed to review application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Application Review</span>
          <Badge variant="outline" className="ml-2">
            Powered by xAI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {review ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Overall Score</h3>
              <span className={`text-2xl font-bold ${getScoreColor(review.overallScore)}`}>
                {review.overallScore}/100
              </span>
            </div>
            <Progress value={review.overallScore} className="h-2 mb-4" />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-medium mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {review.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Weaknesses</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {review.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="pt-4">
                <div className="space-y-4">
                  {Object.entries(review.sectionFeedback).map(([section, feedback]) => (
                    <div key={section} className="border rounded-lg p-3">
                      <h3 className="font-medium mb-1">{section}</h3>
                      <p className="text-sm">{feedback}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="pt-4">
                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {review.recommendations.map((recommendation, i) => (
                      <li key={i}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Use AI to review your application against the grant criteria and get detailed feedback.
            </p>
            <Button onClick={handleReviewApplication} disabled={isLoading}>
              {isLoading ? "Reviewing Application..." : "Review Application"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setReview(null)}>
          Reset
        </Button>
        <Button onClick={handleReviewApplication} disabled={isLoading}>
          {isLoading ? "Reviewing..." : "Refresh Review"}
        </Button>
      </CardFooter>
    </Card>
  )
}
