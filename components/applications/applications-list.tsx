import { getUserApplications } from "@/lib/applications/data"
import { getCurrentUser } from "@/lib/auth"
import { ApplicationCard } from "./application-card"

export async function ApplicationsList() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const applications = await getUserApplications(user.id)

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No applications found</h3>
        <p className="text-muted-foreground">You haven't submitted any grant applications yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}
