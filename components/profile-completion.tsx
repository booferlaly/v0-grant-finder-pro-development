import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"

export default function ProfileCompletion() {
  const completedSteps = 3
  const totalSteps = 5
  const completionPercentage = (completedSteps / totalSteps) * 100

  const steps = [
    { name: "Basic Information", completed: true },
    { name: "Financial Details", completed: true },
    { name: "Project Description", completed: true },
    { name: "Documents Upload", completed: false },
    { name: "Preferences", completed: false },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Complete Your Profile</CardTitle>
        <div className="mt-1 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Profile Completion</span>
            <span className="font-medium text-emerald-600">{completionPercentage}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-2">
              {step.completed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <Circle className="h-4 w-4 text-slate-300" />
              )}
              <span className={`text-sm ${step.completed ? "text-slate-700" : "text-slate-500"}`}>{step.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <Button variant="outline" size="sm" className="w-full text-xs">
          Complete Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
