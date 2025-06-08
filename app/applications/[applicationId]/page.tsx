import { notFound, redirect } from "next/navigation"
import { getApplicationById } from "@/lib/applications/data"
import { getCurrentUser } from "@/lib/auth"
import { ApplicationHeader } from "@/components/applications/application-header"
import { ApplicationDetails } from "@/components/applications/application-details"
import { ApplicationTimeline } from "@/components/applications/application-timeline"
import { ApplicationActions } from "@/components/applications/application-actions"

export async function generateMetadata({ params }) {
  const application = await getApplicationById(params.applicationId)
  if (!application) return {}

  return {
    title: `Application #${params.applicationId} | GrantGrunt`,
    description: `Track status and details for your grant application`,
  }
}

export default async function ApplicationPage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?returnUrl=/applications/${params.applicationId}`)
  }

  const application = await getApplicationById(params.applicationId)

  if (!application || application.userId !== user.id) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <ApplicationHeader application={application} />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ApplicationDetails application={application} />
        </div>
        <div className="space-y-4">
          <ApplicationActions application={application} />
          <ApplicationTimeline application={application} />
        </div>
      </div>
    </div>
  )
}
