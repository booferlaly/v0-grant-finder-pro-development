import { Suspense } from "react"
import { GrantsList } from "@/components/grants/grants-list"
import { GrantsListSkeleton } from "@/components/grants/grants-list-skeleton"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "Available Grants | GrantGrunt",
  description: "Browse and apply for available grant opportunities",
}

export default function GrantsPage() {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader
        title="Available Grants"
        description="Browse and apply for available grant opportunities that match your organization's mission"
      />
      <Suspense fallback={<GrantsListSkeleton />}>
        <GrantsList />
      </Suspense>
    </div>
  )
}
