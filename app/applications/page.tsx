import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { ApplicationsList } from "@/components/applications/applications-list"
import { ApplicationsListSkeleton } from "@/components/applications/applications-list-skeleton"
import { ApplicationsFilters } from "@/components/applications/applications-filters"

export const metadata = {
  title: "My Applications | GrantGrunt",
  description: "Track and manage your grant applications",
}

export default function ApplicationsPage() {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="My Applications" description="Track and manage your grant applications" />
      <ApplicationsFilters />
      <Suspense fallback={<ApplicationsListSkeleton />}>
        <ApplicationsList />
      </Suspense>
    </div>
  )
}
