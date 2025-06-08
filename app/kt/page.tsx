import { KTSurrogate } from "@/components/kt/kt-surrogate"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "KT Surrogate Mode | GrantGrunt",
  description: "Admin-only AI assistant for deep nonprofit insights",
}

export default async function KTSurrogatePage() {
  const user = await getCurrentUser()

  // Check if user is admin (replace with your actual admin check)
  const isAdmin = user?.email === "admin@grantgrunt.com" || user?.role === "admin"

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container py-6">
      <KTSurrogate isAdmin={isAdmin} />
    </div>
  )
}
