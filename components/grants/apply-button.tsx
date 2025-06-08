"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ApplyButtonProps {
  grantId: string
}

export function ApplyButton({ grantId }: ApplyButtonProps) {
  const router = useRouter()

  const handleApply = () => {
    router.push(`/grants/${grantId}/apply`)
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleApply} className="w-full" size="lg">
        Apply for This Grant
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        You'll be guided through the application process step by step
      </p>
    </div>
  )
}
