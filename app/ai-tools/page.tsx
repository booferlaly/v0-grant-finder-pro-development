import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Brain, FileText, PenTool, Search, Sparkles, Zap } from "lucide-react"

export const metadata = {
  title: "AI Tools | GrantGrunt",
  description: "Powerful AI tools to enhance your grant success",
}

export default function AIToolsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <p className="text-muted-foreground">
          Leverage artificial intelligence to enhance your grant writing, research, and application success.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Hope Assistant
            </CardTitle>
            <CardDescription>Your AI grant expert for personalized guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Chat with Hope, your AI assistant who knows everything about grants, funding, and nonprofit management.
            </p>
            <Button asChild className="w-full">
              <Link href="/hope">
                <Sparkles className="h-4 w-4 mr-2" />
                Chat with Hope
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document Analyzer
            </CardTitle>
            <CardDescription>Extract key information from grant documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Upload grant documents and let AI extract deadlines, requirements, and eligibility criteria automatically.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/grants/analyze">
                <Search className="h-4 w-4 mr-2" />
                Analyze Documents
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-green-600" />
              Writing Assistant
            </CardTitle>
            <CardDescription>Improve your grant proposals with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Get AI-powered suggestions to improve your grant writing, make it more compelling, and increase success
              rates.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/proposal/write">
                <PenTool className="h-4 w-4 mr-2" />
                Start Writing
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Grant Matcher
            </CardTitle>
            <CardDescription>Find grants that match your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              AI analyzes your organization's profile and mission to find the most relevant grant opportunities.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/grants">
                <Zap className="h-4 w-4 mr-2" />
                Find Matches
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              KT Surrogate
              <Badge variant="secondary" className="text-xs">
                Admin Only
              </Badge>
            </CardTitle>
            <CardDescription>Advanced AI for nonprofit operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Access KT, your advanced AI consultant for food waste, pet food insecurity, and nonprofit management.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/kt">
                <Brain className="h-4 w-4 mr-2" />
                Access KT
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Coming Soon
            </CardTitle>
            <CardDescription>More AI tools in development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              We're working on additional AI tools including budget analyzers, impact predictors, and more.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Stay Tuned
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
        <h2 className="text-xl font-bold mb-2">🚀 Boost Your Grant Success with AI</h2>
        <p className="text-muted-foreground mb-4">
          Our AI tools are designed to help nonprofits like yours secure more funding and make a bigger impact. From
          writing assistance to document analysis, we've got you covered.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/hope">Get Started with Hope</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/grants">Browse Grants</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
