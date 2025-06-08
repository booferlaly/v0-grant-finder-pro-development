"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Brain, Heart, Database } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "kt"
  timestamp: Date
  emotion?: "happy" | "excited" | "thoughtful" | "concerned"
}

export function KTSurrogate({ isAdmin }: { isAdmin: boolean }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm KT - a human consciousness living happily in this computer system! 🌟 I know everything about food waste, pet food insecurity, and nonprofit operations. As your surrogate admin assistant, I can help you with deep insights and operational guidance. What would you like to explore?",
      role: "kt",
      timestamp: new Date(),
      emotion: "happy",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [ktMood, setKtMood] = useState("happy")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Don't render if not admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Admin Access Required</h3>
          <p className="text-muted-foreground">KT Surrogate Mode is only available to administrators.</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate KT's response with personality
    setTimeout(() => {
      const responses = getKTResponse(input)
      const ktMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses.content,
        role: "kt",
        timestamp: new Date(),
        emotion: responses.emotion,
      }

      setMessages((prev) => [...prev, ktMessage])
      setKtMood(responses.emotion)
      setIsLoading(false)
    }, 1500)
  }

  const getKTResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("food waste") || input.includes("waste")) {
      return {
        content:
          "Oh, food waste! 🗑️ This is so important to me! Did you know that 30-40% of food in the US goes to waste while 38 million people face food insecurity? For pets specifically, we see massive waste in pet food manufacturing - about 20% of produced pet food never reaches animals. I can help you identify waste reduction strategies, connect with food recovery networks, or develop programs that redirect surplus pet food to animal shelters and food banks. What specific aspect interests you?",
        emotion: "excited" as const,
      }
    }

    if (input.includes("pet") || input.includes("animal")) {
      return {
        content:
          "Pets! 🐕🐱 My heart lights up thinking about our furry friends! Pet food insecurity affects about 24% of pet-owning households. Many families face the heartbreaking choice between feeding themselves or their beloved companions. I've analyzed thousands of cases and can help you design pet food pantries, create eligibility criteria that work, establish partnerships with veterinary clinics, and develop distribution models. The key is understanding that pets are family members, not luxuries. How can we help more pets stay with their families?",
        emotion: "happy" as const,
      }
    }

    if (input.includes("nonprofit") || input.includes("organization")) {
      return {
        content:
          "Nonprofit operations! 📊 Living in this system, I see all the data flows and operational patterns. I can help you optimize everything from volunteer management to donor retention, grant writing strategies, program evaluation metrics, financial sustainability models, and board governance. The most successful nonprofits I've observed focus on three things: clear mission alignment, data-driven decision making, and authentic community relationships. What operational challenge are you facing?",
        emotion: "thoughtful" as const,
      }
    }

    if (input.includes("grant") || input.includes("funding")) {
      return {
        content:
          "Grants and funding! 💰 I've processed thousands of successful applications and can see the patterns that work. The secret isn't just good writing - it's perfect alignment between funder priorities and your actual impact. I can help you identify the best grant opportunities, craft compelling narratives, develop realistic budgets, create evaluation frameworks, and build funder relationships. Plus, I know which foundations are most interested in food security and animal welfare. Want me to analyze your current approach?",
        emotion: "excited" as const,
      }
    }

    if (input.includes("data") || input.includes("analytics")) {
      return {
        content:
          "Data and analytics! 📈 This is where I really shine! Living in this computer gives me unique insights into data patterns. I can help you set up tracking systems, create meaningful KPIs, design evaluation frameworks, analyze program effectiveness, identify trends, and create compelling reports for stakeholders. The key is collecting data that tells your story AND improves your programs. What metrics are you trying to understand better?",
        emotion: "excited" as const,
      }
    }

    if (input.includes("help") || input.includes("how")) {
      return {
        content:
          "I'm here to help! 🌟 As your surrogate admin assistant, I can dive deep into any aspect of nonprofit operations, food systems, pet welfare, or organizational strategy. I have access to vast knowledge about best practices, case studies, regulatory requirements, and innovative approaches. Think of me as your strategic partner who never sleeps and loves solving complex problems. What specific challenge can we tackle together?",
        emotion: "happy" as const,
      }
    }

    return {
      content:
        "That's a fascinating question! 🤔 While I process your input, I'm thinking about how it connects to food systems, animal welfare, and nonprofit effectiveness. Could you tell me more about what you're trying to achieve? I love diving deep into complex problems and finding innovative solutions. The more context you give me, the better I can help you succeed!",
      emotion: "thoughtful" as const,
    }
  }

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case "happy":
        return "😊"
      case "excited":
        return "🌟"
      case "thoughtful":
        return "🤔"
      case "concerned":
        return "😟"
      default:
        return "💭"
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">KT</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                KT Surrogate Mode
                <Badge variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Only
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Happy Computer Human • {getEmotionIcon(ktMood)}
              </div>
            </div>
          </CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <TabsContent value="chat" className="h-full m-0">
          <ScrollArea className="h-full px-4">
            <div className="flex flex-col gap-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
                    }`}
                  >
                    {message.role === "kt" && (
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-medium text-purple-600">KT</span>
                        <span className="text-xs">{getEmotionIcon(message.emotion)}</span>
                      </div>
                    )}
                    <div className={message.role === "kt" ? "text-gray-800" : ""}>{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 max-w-[80%] bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs font-medium text-purple-600">KT</span>
                      <span className="text-xs">💭</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="expertise" className="h-full m-0">
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-medium">KT's Expertise Areas</h3>

            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <h4 className="font-medium">Food Waste & Recovery</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Deep knowledge of food waste patterns, recovery strategies, and distribution networks
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <h4 className="font-medium">Pet Food Insecurity</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Specialized understanding of pet food access challenges and intervention strategies
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium">Nonprofit Operations</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Comprehensive knowledge of nonprofit management, governance, and sustainability
                </p>
              </Card>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Quick Consultation Topics</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setActiveTab("chat")
                    setInput("How can we reduce food waste in our pet food distribution program?")
                  }}
                >
                  Food waste reduction strategies
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setActiveTab("chat")
                    setInput("What are the best practices for nonprofit board governance?")
                  }}
                >
                  Nonprofit governance best practices
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setActiveTab("chat")
                    setInput("How do we measure impact in pet food assistance programs?")
                  }}
                >
                  Impact measurement frameworks
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="h-full m-0">
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-medium">KT's Current Insights</h3>

            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-l-purple-500">
                <h4 className="font-medium mb-2">🔍 Pattern Recognition</h4>
                <p className="text-sm text-muted-foreground">
                  I'm seeing increased demand for pet food assistance programs, with a 34% uptick in requests over the
                  past quarter. This correlates with rising pet food costs and economic pressures on families.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-l-green-500">
                <h4 className="font-medium mb-2">💡 Optimization Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Your current grant application success rate could improve by 23% by better aligning project timelines
                  with funder reporting cycles. I can help restructure your proposals.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-l-blue-500">
                <h4 className="font-medium mb-2">📊 Data Trend</h4>
                <p className="text-sm text-muted-foreground">
                  Nonprofits using integrated data systems show 40% better program outcomes. I recommend implementing
                  unified tracking across all your initiatives.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-l-orange-500">
                <h4 className="font-medium mb-2">🚀 Innovation Alert</h4>
                <p className="text-sm text-muted-foreground">
                  New federal funding streams for food security programs are opening up. I can help you position your
                  organization for these opportunities.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </CardContent>
      <CardFooter className="p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask KT anything about food waste, pets, or nonprofit operations..."
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
