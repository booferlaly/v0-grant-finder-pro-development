"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function saveApplication(data) {
  try {
    // In a real app, you would use your database client here
    // This is a simplified example
    const application = await db.applications.create({
      data: {
        grantId: data.grantId,
        userId: data.userId,
        status: data.status,
        projectTitle: data.projectTitle,
        projectSummary: data.projectSummary,
        requestedAmount: Number.parseFloat(data.requestedAmount),
        timeline: data.timeline,
        impact: data.impact,
        submittedAt: data.status === "submitted" ? new Date() : null,
      },
    })

    revalidatePath("/applications")
    revalidatePath(`/applications/${application.id}`)

    return application
  } catch (error) {
    console.error("Failed to save application:", error)
    throw new Error("Failed to save application")
  }
}

export async function updateApplicationStatus(id, status) {
  try {
    // In a real app, you would use your database client here
    const application = await db.applications.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    revalidatePath("/applications")
    revalidatePath(`/applications/${id}`)

    return application
  } catch (error) {
    console.error("Failed to update application status:", error)
    throw new Error("Failed to update application status")
  }
}
