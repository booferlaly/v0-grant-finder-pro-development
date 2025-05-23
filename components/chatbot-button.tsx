"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send } from "lucide-react"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 w-80 z-50">
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="pb-3 flex flex-row items-center justify-between bg-emerald-50">
              <CardTitle className="text-sm font-medium text-emerald-800 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-emerald-600" />
                Grant Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4 text-slate-500" />
              </Button>
            </CardHeader>
            <CardContent className="p-3 h-64 overflow-y-auto bg-white">
              <div className="space-y-3">
                <div className="bg-slate-100 p-2 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Hello! I'm your Grant Assistant. How can I help you today?</p>
                </div>
                <div className="bg-emerald-100 p-2 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-sm">How do I qualify for grants?</p>
                </div>
                <div className="bg-slate-100 p-2 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Qualification depends on the specific grant, but generally you'll need to:</p>
                  <ul className="text-sm list-disc pl-5 mt-1">
                    <li>Meet eligibility criteria</li>
                    <li>Complete required documentation</li>
                    <li>Submit before deadlines</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 border-t bg-white">
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <Button size="icon" className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}
