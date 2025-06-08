"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Download, Share, Trash2, MoreHorizontal, Copy, MessageSquare } from "lucide-react"

interface Application {
  id: string
  status: string
  grantId: string
}

interface ApplicationActionsProps {
  application: Application
}

export function ApplicationActions({ application }: ApplicationActionsProps) {
  const handleEdit = () => {
    window.location.href = `/grants/${application.grantId}/apply?draft=${application.id}`
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading application...")
  }

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?")) {
      // Implement delete functionality
      console.log("Deleting application...")
    }
  }

  const handleDuplicate = () => {
    // Implement duplicate functionality
    console.log("Duplicating application...")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {application.status === "draft" && (
          <Button onClick={handleEdit} className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Continue Editing
          </Button>
        )}

        <Button onClick={handleDownload} variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>

        <Button onClick={handleShare} variant="outline" className="w-full">
          <Share className="h-4 w-4 mr-2" />
          Share Application
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate Application
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Grant Officer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600"
              disabled={application.status === "submitted"}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}
