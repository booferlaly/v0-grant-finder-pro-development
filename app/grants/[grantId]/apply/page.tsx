import { notFound, redirect } from "next/navigation"
import { getGrantById } from "@/lib/grants/data"
import { getCurrentUser } from "@/lib/auth"
import { ApplicationForm } from "@/components/grants/application-form"

export async function generateMetadata({ params }) {
  const grant = await getGrantById(params.grantId)
  if (!grant) return {}

  return {
    title: `Apply for ${grant.title} | GrantGrunt`,
    description: `Submit your application for the ${grant.title} grant`,
  }
}

export default async function ApplyPage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?returnUrl=/grants/${params.grantId}/apply`)
  }

  const grant = await getGrantById(params.grantId)

  if (!grant) {
    notFound()
  }

  return (
    <div className="container py-6 max-w-4xl mx-auto">
      <ApplicationForm grant={grant} userId={user.id} />
    </div>
  )
}
