"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, X, Minimize, Maximize } from "lucide-react"

export function TalkingHead() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("Hi there! I'm Hope, your grant assistant. How can I help you today?")

  // Toggle the assistant open/closed
  const toggleAssistant = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  // Toggle minimized state
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={`w-80 transition-all duration-200 ${isMinimized ? "h-12" : "h-96"}`}>
          <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-2">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="font-medium">Hope - Grant Assistant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-primary-foreground/20"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize className="h-3 w-3" /> : <Minimize className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-primary-foreground/20"
                onClick={toggleAssistant}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <CardContent className="p-0 h-[calc(100%-48px)] flex flex-col">
              <div className="flex-1 p-4 overflow-auto">
                <div className="flex mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2 shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">{message}</div>
                </div>
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="rounded-l-none">Send</Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ) : (
        <Button onClick={toggleAssistant} size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
