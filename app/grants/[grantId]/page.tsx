import { notFound } from "next/navigation"
import { getGrantById } from "@/lib/grants/data"
import { GrantHeader } from "@/components/grants/grant-header"
import { GrantDetails } from "@/components/grants/grant-details"
import { ApplyButton } from "@/components/grants/apply-button"

interface GrantPageProps {
  params: {
    grantId: string
  }
}

export async function generateMetadata({ params }: GrantPageProps) {
  const grant = await getGrantById(params.grantId)
  if (!grant) return {}

  return {
    title: `${grant.title} | GrantGrunt`,
    description: grant.shortDescription,
  }
}

export default async function GrantPage({ params }: GrantPageProps) {
  const grant = await getGrantById(params.grantId)

  if (!grant) {
    notFound()
  }

  return (
    <div className="container py-6 space-y-8">
      <GrantHeader grant={grant} />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GrantDetails grant={grant} />
        </div>
        <div className="space-y-4">
          <ApplyButton grantId={params.grantId} />
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-medium mb-2">Quick Facts</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Category</dt>
                <dd>{grant.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Deadline</dt>
                <dd>{grant.deadline}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Award Amount</dt>
                <dd>{grant.awardAmount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
