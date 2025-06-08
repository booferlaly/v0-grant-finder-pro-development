import { db } from "@/lib/db"

export async function getUserApplications(userId) {
  try {
    // In a real app, you would use your database client here
    const applications = await db.applications.findMany({
      where: { userId },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        grant: {
          select: {
            title: true,
          },
        },
      },
    })

    return applications.map((app) => ({
      ...app,
      grantTitle: app.grant.title,
      // Ensure dates are strings
      submittedAt: app.submittedAt || null,
      createdAt: typeof app.createdAt === "string" ? app.createdAt : app.createdAt?.toLocaleDateString(),
      updatedAt: typeof app.updatedAt === "string" ? app.updatedAt : app.updatedAt?.toLocaleDateString(),
    }))
  } catch (error) {
    console.error("Failed to fetch user applications:", error)
    return []
  }
}

export async function getApplicationById(id) {
  try {
    // In a real app, you would use your database client here
    const application = await db.applications.findUnique({
      where: { id },
      include: {
        grant: true,
      },
    })

    return application
  } catch (error) {
    console.error(`Failed to fetch application ${id}:`, error)
    return null
  }
}
