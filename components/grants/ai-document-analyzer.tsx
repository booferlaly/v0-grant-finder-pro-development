"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Brain, CheckCircle } from "lucide-react"

export function AIDocumentAnalyzer() {
  const [documentText, setDocumentText] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target?.result as string
      setDocumentText(text)
      setActiveTab("analyze")
    }
    reader.readAsText(file)
  }

  const handleAnalyzeDocument = async () => {
    if (!documentText.trim()) {
      alert("Please upload or paste a document to analyze.")
      return
    }

    setIsLoading(true)
    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock analysis result
      const mockAnalysis = {
        grantName: "Community Food Security Initiative",
        provider: "USDA Rural Development",
        amount: "$50,000 - $250,000",
        deadline: "March 15, 2024",
        eligibility: [
          "Non-profit organizations with 501(c)(3) status",
          "Community-based organizations",
          "Faith-based organizations",
          "Tribal organizations",
        ],
        focusAreas: [
          "Food access and security",
          "Community food systems",
          "Nutrition education",
          "Food recovery and distribution",
        ],
        evaluationCriteria: [
          "Project impact and sustainability (30%)",
          "Organizational capacity (25%)",
          "Community need and support (20%)",
          "Budget appropriateness (15%)",
          "Innovation and collaboration (10%)",
        ],
        keyRequirements: [
          "Detailed project narrative (max 10 pages)",
          "Comprehensive budget with justification",
          "Letters of support from community partners",
          "Organizational chart and staff qualifications",
          "Evaluation plan with measurable outcomes",
        ],
      }

      setAnalysis(mockAnalysis)
      setActiveTab("results")
    } catch (error) {
      console.error("Error analyzing document:", error)
      alert("Failed to analyze document. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Document Analyzer</span>
          <Badge variant="outline" className="ml-2">
            <Brain className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysis}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="pt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="document-upload"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label htmlFor="document-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-medium">Upload Grant Document</div>
                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                    <p className="text-xs text-muted-foreground">Supports TXT, PDF, DOC, DOCX</p>
                  </div>
                </label>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">or</p>
              </div>

              <Button onClick={() => setActiveTab("analyze")} variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Paste Document Text
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analyze" className="pt-4">
            <div className="space-y-4">
              <textarea
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste grant document text here..."
                className="w-full min-h-[300px] p-3 border rounded-md resize-none"
              />

              <Button onClick={handleAnalyzeDocument} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Document...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="pt-4">
            {analysis && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Analysis Complete</span>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Grant Overview</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div>{analysis.grantName}</div>
                    <div className="font-medium">Provider:</div>
                    <div>{analysis.provider}</div>
                    <div className="font-medium">Amount:</div>
                    <div>{analysis.amount}</div>
                    <div className="font-medium">Deadline:</div>
                    <div>{analysis.deadline}</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Eligibility Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysis.eligibility?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Focus Areas</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysis.focusAreas?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Evaluation Criteria</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysis.evaluationCriteria?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Key Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {analysis.keyRequirements?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {activeTab === "results" && (
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setActiveTab("analyze")}>
              Analyze Another Document
            </Button>
            <Button>Save to Grant Database</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
