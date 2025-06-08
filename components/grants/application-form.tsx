"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveApplication } from "@/lib/applications/actions"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  projectTitle: z.string().min(5, {
    message: "Project title must be at least 5 characters.",
  }),
  projectSummary: z.string().min(50, {
    message: "Project summary must be at least 50 characters.",
  }),
  requestedAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Please enter a valid amount." }),
  timeline: z.string().min(20, {
    message: "Timeline must be at least 20 characters.",
  }),
  impact: z.string().min(50, {
    message: "Impact statement must be at least 50 characters.",
  }),
})

export function ApplicationForm({ grant, userId }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      projectSummary: "",
      requestedAmount: "",
      timeline: "",
      impact: "",
    },
  })

  async function onSaveDraft(data) {
    setIsSaving(true)
    try {
      const result = await saveApplication({
        grantId: grant.id,
        userId,
        status: "draft",
        ...data,
      })

      toast({
        title: "Draft saved",
        description: "Your application draft has been saved successfully.",
      })

      router.push(`/applications/${result.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  async function onSubmit(data) {
    setIsSubmitting(true)
    try {
      const result = await saveApplication({
        grantId: grant.id,
        userId,
        status: "submitted",
        ...data,
      })

      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })

      router.push(`/applications/${result.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for {grant.title}</CardTitle>
        <CardDescription>Complete all sections to submit your application</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="impact">Impact & Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title of your project" {...field} />
                      </FormControl>
                      <FormDescription>A clear, concise title for your project</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectSummary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a brief summary of your project"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Summarize your project in 2-3 paragraphs</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <div></div>
                  <Button type="button" onClick={() => setActiveTab("details")}>
                    Next: Project Details
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="requestedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requested Amount ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5000" {...field} />
                      </FormControl>
                      <FormDescription>The funding amount you're requesting (in USD)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Previous: Basic Information
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("impact")}>
                    Next: Impact & Timeline
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="impact">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Timeline</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project timeline and key milestones"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Outline the timeline for implementing your project</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Impact</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the expected impact of your project"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Explain how your project will make a difference</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                    Previous: Project Details
                  </Button>
                  <div></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={form.handleSubmit(onSaveDraft)} disabled={isSaving || isSubmitting}>
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </Card>
  )
}
