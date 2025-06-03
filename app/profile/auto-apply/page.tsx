"use client"

import type React from "react"

import { ArrowLeft, Check, FileText, Info, Save, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { saveProfileSettings } from "@/app/actions/settings"

export default function AutoApplyPage() {
  // Organization information state
  const [orgInfo, setOrgInfo] = useState({
    name: "Leftover Love",
    ein: "12-3456789",
    mission:
      "Leftover Love is dedicated to reducing food waste and addressing food insecurity by recovering surplus food from restaurants and events and redistributing it to underserved communities through innovative mobile distribution points.",
    founded: "2020",
    employees: "12",
    address: "123 Main Street, Portland, OR 97201",
  })

  // Program information state
  const [programInfo, setProgInfo] = useState({
    programName: "No Chow Left Behind",
    programDesc:
      "The 'No Chow Left Behind' initiative addresses critical food insecurity in Portland by recovering surplus food from restaurants and events, then redistributing it to underserved communities through innovative mobile distribution points. This project has expanded our operations by 40%, established three community food hubs, and implemented a digital tracking system to maximize efficiency and impact measurement.",
    impact:
      "- Recovered over 500,000 pounds of food that would otherwise go to waste\n- Served approximately 15,000 individuals annually\n- Established partnerships with 45 food donors and 12 community centers\n- Reduced food waste by 30% in partner restaurants\n- Provided nutrition education to over 2,000 community members",
  })

  // Financial information state
  const [financialInfo, setFinancialInfo] = useState({
    budget: "$750,000",
    fiscalYear: "December 31",
    fundingSources:
      "- Foundation grants (45%)\n- Individual donations (30%)\n- Corporate sponsorships (15%)\n- Government grants (10%)",
  })

  // Contact information state
  const [contactInfo, setContactInfo] = useState({
    primaryName: "Jane Smith",
    primaryTitle: "Executive Director",
    primaryEmail: "jane@leftoverlove.org",
    primaryPhone: "(503) 555-1234",
    secondaryName: "Michael Johnson",
    secondaryTitle: "Development Director",
    secondaryEmail: "michael@leftoverlove.org",
    secondaryPhone: "(503) 555-5678",
  })

  // Auto-apply settings state
  const [autoApplySettings, setAutoApplySettings] = useState({
    enabled: true,
    minMatchScore: "85",
    maxGrantAmount: "100,000",
    requireApproval: true,
  })

  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const ORGANIZATION_ID = "123e4567-e89b-12d3-a456-426614174000"

  // Handle organization info changes
  const handleOrgInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setOrgInfo((prev) => ({ ...prev, [id.replace("org-", "")]: value }))
    setHasChanges(true)
  }

  // Handle program info changes
  const handleProgramInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProgInfo((prev) => ({ ...prev, [id.replace("program-", "").replace("-desc", "Desc")]: value }))
    setHasChanges(true)
  }

  // Handle financial info changes
  const handleFinancialInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFinancialInfo((prev) => ({ ...prev, [id.replace("financial-", "").replace("-sources", "Sources")]: value }))
    setHasChanges(true)
  }

  // Handle contact info changes
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const key = id.replace("primary-", "primary").replace("secondary-", "secondary")
    setContactInfo((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  // Handle auto-apply settings changes
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setAutoApplySettings((prev) => ({ ...prev, [id.replace("auto-apply-", "")]: value }))
    setHasChanges(true)
  }

  // Handle switch changes
  const handleSwitchChange = (checked: boolean, id: string) => {
    if (id === "auto-apply") {
      setAutoApplySettings((prev) => ({ ...prev, enabled: checked }))
    } else if (id === "require-approval") {
      setAutoApplySettings((prev) => ({ ...prev, requireApproval: checked }))
    }
    setHasChanges(true)
  }

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before saving.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const result = await saveProfileSettings({
        orgInfo,
        programInfo,
        financialInfo,
        contactInfo,
        autoApplySettings,
        organizationId: ORGANIZATION_ID,
      })

      if (result.success) {
        toast({
          title: "Changes saved",
          description: "Your auto-application settings have been updated.",
        })
        setHasChanges(false)
      } else {
        toast({
          title: "Error saving changes",
          description: result.error || "An unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Error saving changes",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Handle document view
  const handleViewDocument = (docName: string) => {
    toast({
      title: "Opening document",
      description: `Opening ${docName}...`,
    })
  }

  // Handle auto-apply to all eligible grants
  const handleAutoApplyAll = () => {
    toast({
      title: "Auto-applying to grants",
      description: "Starting auto-application process for all eligible grants...",
    })
  }

  const validateForm = () => {
    // Add your validation logic here
    return true // Return true if the form is valid, false otherwise
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Image src="/images/grantgrunt-logo.png" alt="Grant Grunt by Leftover Love" width={60} height={60} />
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-1">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Auto-Application Settings</h1>
              <p className="text-muted-foreground">
                Configure your pre-approved information for automatic grant applications
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="gap-2" onClick={handleSaveChanges} disabled={!hasChanges || saving}>
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pre-Approved Information</CardTitle>
              <CardDescription>
                This information will be used to automatically fill out grant applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="organization">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                </TabsList>

                <TabsContent value="organization" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input id="org-name" value={orgInfo.name} onChange={handleOrgInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-ein">EIN / Tax ID</Label>
                      <Input id="org-ein" value={orgInfo.ein} onChange={handleOrgInfoChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-mission">Mission Statement</Label>
                    <Textarea id="org-mission" rows={3} value={orgInfo.mission} onChange={handleOrgInfoChange} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-founded">Year Founded</Label>
                      <Input id="org-founded" value={orgInfo.founded} onChange={handleOrgInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-employees">Number of Employees</Label>
                      <Input id="org-employees" value={orgInfo.employees} onChange={handleOrgInfoChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-address">Address</Label>
                    <Textarea id="org-address" rows={2} value={orgInfo.address} onChange={handleOrgInfoChange} />
                  </div>
                </TabsContent>

                <TabsContent value="programs" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-programName">Primary Program</Label>
                    <Input
                      id="program-programName"
                      value={programInfo.programName}
                      onChange={handleProgramInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program-desc">Program Description</Label>
                    <Textarea
                      id="program-desc"
                      rows={4}
                      value={programInfo.programDesc}
                      onChange={handleProgramInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program-impact">Impact Metrics</Label>
                    <Textarea
                      id="program-impact"
                      rows={4}
                      value={programInfo.impact}
                      onChange={handleProgramInfoChange}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="financials" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="financial-budget">Annual Budget</Label>
                      <Input id="financial-budget" value={financialInfo.budget} onChange={handleFinancialInfoChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="financial-fiscalYear">Fiscal Year End</Label>
                      <Input
                        id="financial-fiscalYear"
                        value={financialInfo.fiscalYear}
                        onChange={handleFinancialInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="financial-fundingSources">Current Funding Sources</Label>
                    <Textarea
                      id="financial-fundingSources"
                      rows={3}
                      value={financialInfo.fundingSources}
                      onChange={handleFinancialInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="financial-docs">Financial Documents</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>2022 Audited Financial Statements</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDocument("2022 Audited Financial Statements")}
                        >
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>2022 Form 990</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument("2022 Form 990")}>
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Current Operating Budget</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDocument("Current Operating Budget")}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Contact</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary-Name">Name</Label>
                        <Input id="primary-Name" value={contactInfo.primaryName} onChange={handleContactInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary-Title">Title</Label>
                        <Input id="primary-Title" value={contactInfo.primaryTitle} onChange={handleContactInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary-Email">Email</Label>
                        <Input id="primary-Email" value={contactInfo.primaryEmail} onChange={handleContactInfoChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary-Phone">Phone</Label>
                        <Input id="primary-Phone" value={contactInfo.primaryPhone} onChange={handleContactInfoChange} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Secondary Contact</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="secondary-Name">Name</Label>
                        <Input
                          id="secondary-Name"
                          value={contactInfo.secondaryName}
                          onChange={handleContactInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondary-Title">Title</Label>
                        <Input
                          id="secondary-Title"
                          value={contactInfo.secondaryTitle}
                          onChange={handleContactInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondary-Email">Email</Label>
                        <Input
                          id="secondary-Email"
                          value={contactInfo.secondaryEmail}
                          onChange={handleContactInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondary-Phone">Phone</Label>
                        <Input
                          id="secondary-Phone"
                          value={contactInfo.secondaryPhone}
                          onChange={handleContactInfoChange}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Application Settings</CardTitle>
              <CardDescription>Configure how Grantgrunt applies for grants automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-apply">Enable Auto-Application</Label>
                  <p className="text-sm text-muted-foreground">Allow Grantgrunt to apply for grants automatically</p>
                </div>
                <Switch
                  id="auto-apply"
                  checked={autoApplySettings.enabled}
                  onCheckedChange={(checked) => handleSwitchChange(checked, "auto-apply")}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Auto-Apply Criteria</Label>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Minimum Match Score</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Only auto-apply for grants with this match score or higher</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="auto-apply-minMatchScore"
                      className="w-16 text-center"
                      value={autoApplySettings.minMatchScore}
                      onChange={handleSettingsChange}
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Maximum Grant Amount</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Only auto-apply for grants up to this amount</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="auto-apply-maxGrantAmount"
                      className="w-32 text-right"
                      value={autoApplySettings.maxGrantAmount}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Require Approval Before Submission</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>If enabled, you'll need to approve applications before final submission</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    id="require-approval"
                    checked={autoApplySettings.requireApproval}
                    onCheckedChange={(checked) => handleSwitchChange(checked, "require-approval")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Apply Eligible Grants</CardTitle>
              <CardDescription>Grants that match your auto-apply criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="font-medium text-sm">Healthy Food Financing Initiative</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    94% Match
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Oregon Community Foundation</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="font-medium text-sm">Community Food Projects Grant</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    92% Match
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Oregon Food Bank</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="font-medium text-sm">Zero Hunger, Zero Waste Foundation</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    93% Match
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Kroger Co. Foundation</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={handleAutoApplyAll}>
                <Zap className="h-4 w-4" />
                Auto-Apply to All Eligible Grants
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
