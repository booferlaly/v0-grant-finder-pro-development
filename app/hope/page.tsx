import { HopeAssistant } from "@/components/hope/hope-assistant"
import { getUserProfile } from "@/lib/data"

export const metadata = {
  title: "Hope Assistant | GrantGrunt",
  description: "Your AI assistant for grant applications",
}

export default async function HopePage() {
  // Get user profile or use default
  let userProfile
  try {
    userProfile = await getUserProfile()
  } catch (error) {
    // Use default profile if fetch fails
    userProfile = {
      name: "Your Organization",
      mission: "Making a positive impact in the community",
      focusAreas: ["Community Development", "Education", "Health"],
    }
  }

  return (
    <div className="container py-6">
      <HopeAssistant userProfile={userProfile} />
    </div>
  )
}
