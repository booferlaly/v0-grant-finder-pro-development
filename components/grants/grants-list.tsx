import { getAvailableGrants } from "@/lib/grants/data"
import { GrantCard } from "./grant-card"

export async function GrantsList() {
  const grants = await getAvailableGrants()

  if (grants.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No grants available</h3>
        <p className="text-muted-foreground">Check back later for new opportunities</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {grants.map((grant) => (
        <GrantCard key={grant.id} grant={grant} />
      ))}
    </div>
  )
}
