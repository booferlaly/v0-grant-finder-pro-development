"use client"

import { ArrowUpRight, Calendar, DollarSign, Zap } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GrantOpportunityCardProps {
  id: string
  title: string
  organization: string
  amount: string
  deadline: string
  match: number
  tags: string[]
  description: string
  autoApplyEligible?: boolean
}

export function GrantOpportunityCard({
  id,
  title,
  organization,
  amount,
  deadline,
  match,
  tags,
  description,
  autoApplyEligible = false,
}: GrantOpportunityCardProps) {
  const [isAutoApplying, setIsAutoApplying] = useState(false)
  const [showAutoApplyDialog, setShowAutoApplyDialog] = useState(false)

  const handleViewDetails = () => {
    // Navigate to grant details page
    window.location.href = `/grants/${id}`
  }

  const handleApplyNow = () => {
    toast({
      title: "Starting application",
      description: `Opening application form for ${title}...`,
    })
    // In a real app, this would navigate to the application form
  }

  const handleAutoApply = () => {
    setShowAutoApplyDialog(true)
  }

  const confirmAutoApply = () => {
    setIsAutoApplying(true)
    setShowAutoApplyDialog(false)

    // Simulate auto-application process
    setTimeout(() => {
      setIsAutoApplying(false)
      toast({
        title: "Auto-application submitted",
        description: `Your application for ${title} has been automatically submitted for review.`,
      })
    }, 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{title}</CardTitle>
              {autoApplyEligible && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        <Zap className="h-3 w-3 mr-1" />
                        Auto-Apply
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eligible for auto-application with your pre-approved information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <CardDescription>{organization}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-lg font-bold flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {amount}
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Due: {deadline}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">Match Score</div>
          <div className="text-sm font-medium">{match}%</div>
        </div>
        <Progress value={match} className="h-2" />
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
        {autoApplyEligible ? (
          <>
            <Button
              size="sm"
              className="gap-1 bg-green-600 hover:bg-green-700"
              onClick={handleAutoApply}
              disabled={isAutoApplying}
            >
              {isAutoApplying ? "Auto-Applying..." : "Auto-Apply"}
              <Zap className="h-3 w-3" />
            </Button>

            <Dialog open={showAutoApplyDialog} onOpenChange={setShowAutoApplyDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Auto-Application</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to auto-apply for "{title}"? This will use your pre-approved information to
                    submit an application.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAutoApplyDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={confirmAutoApply}>Confirm Auto-Apply</Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Button size="sm" className="gap-1" onClick={handleApplyNow}>
            Apply Now
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
