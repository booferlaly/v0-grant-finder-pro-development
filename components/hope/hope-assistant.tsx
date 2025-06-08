"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHopeResponse } from "@/lib/ai/ai-service"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function HopeAssistant({ userProfile = null }: { userProfile?: any }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm Hope! I'm here to help you with your grant applications. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

    try {
      // Format messages for AI
      const formattedMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      // Add the new user message
      formattedMessages.push({
        role: "user",
        content: input,
      })

      // Get AI response
      const response = await getHopeResponse(formattedMessages, userProfile || {})

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center h-10 w-10">
                H
              </div>
            </Avatar>
            Hope Assistant
          </CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="grants">Grants</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
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
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="grants" className="h-full m-0">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Grant Recommendations</h3>
            <p className="text-muted-foreground mb-4">
              Ask Hope to find grants that match your organization's profile and mission.
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("Find grants for food security programs")
                }}
              >
                Find grants for food security programs
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("What grants have deadlines in the next 30 days?")
                }}
              >
                What grants have deadlines in the next 30 days?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("Find grants that match my organization's profile")
                }}
              >
                Find grants that match my organization's profile
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="writing" className="h-full m-0">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Writing Assistant</h3>
            <p className="text-muted-foreground mb-4">Get help with writing and improving your grant applications.</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("Help me write a compelling project summary")
                }}
              >
                Help me write a compelling project summary
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("Review my budget justification section")
                }}
              >
                Review my budget justification section
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => {
                  setActiveTab("chat")
                  setInput("How can I improve my impact statement?")
                }}
              >
                How can I improve my impact statement?
              </Button>
            </div>
          </div>
        </TabsContent>
      </CardContent>
      <CardFooter className="p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hope a question..."
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
