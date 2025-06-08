"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PenTool, Sparkles } from "lucide-react"

export function AIWritingAssistant() {
  const [section, setSection] = useState("projectSummary")
  const [content, setContent] = useState("")
  const [improvedContent, setImprovedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sectionOptions = [
    { value: "projectSummary", label: "Project Summary" },
    { value: "needStatement", label: "Statement of Need" },
    { value: "goals", label: "Goals and Objectives" },
    { value: "methodology", label: "Methodology" },
    { value: "evaluation", label: "Evaluation Plan" },
    { value: "sustainability", label: "Sustainability Plan" },
    { value: "budget", label: "Budget Justification" },
    { value: "organizationBackground", label: "Organization Background" },
  ]

  const handleImproveContent = async () => {
    if (!content.trim()) {
      alert("Please enter content to improve.")
      return
    }

    setIsLoading(true)
    try {
      // Simulate AI improvement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock improved content
      const improved = `${content}\n\n[AI IMPROVED VERSION]\n\nThis enhanced version incorporates stronger language, clearer objectives, and more compelling evidence. The narrative now better aligns with grant requirements and includes specific metrics for measuring success. Key improvements include:\n\n• More precise language and terminology\n• Stronger evidence-based arguments\n• Clear measurable outcomes\n• Better alignment with funder priorities\n• Enhanced readability and flow`

      setImprovedContent(improved)
    } catch (error) {
      console.error("Error improving content:", error)
      alert("Failed to improve content. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseImprovedContent = () => {
    setContent(improvedContent)
    setImprovedContent("")
    alert("The improved content has been applied.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Writing Assistant</span>
          <Badge variant="outline" className="ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Section</label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger>
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              {sectionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Your Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content here..."
            className="min-h-[150px]"
          />
        </div>

        {improvedContent && (
          <div>
            <label className="text-sm font-medium mb-2 block">Improved Content</label>
            <div className="border rounded-md p-3 bg-muted/50 min-h-[150px] whitespace-pre-wrap text-sm">
              {improvedContent}
            </div>
            <div className="mt-2 flex justify-end">
              <Button size="sm" onClick={handleUseImprovedContent}>
                Use This Version
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleImproveContent} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <PenTool className="h-4 w-4 mr-2 animate-pulse" />
              Improving Content...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Improve with AI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
