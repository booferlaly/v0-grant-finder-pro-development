import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSignIcon, UsersIcon } from "lucide-react"

interface Grant {
  id: string
  title: string
  category: string
  deadline: string
  awardAmount: string
  eligibility: string
  isNew?: boolean
}

interface GrantHeaderProps {
  grant: Grant
}

export function GrantHeader({ grant }: GrantHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{grant.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={grant.isNew ? "default" : "secondary"}>{grant.category}</Badge>
            {grant.isNew && <Badge variant="outline">New Opportunity</Badge>}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Deadline</p>
            <p className="text-sm text-muted-foreground">{grant.deadline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Award Amount</p>
            <p className="text-sm text-muted-foreground">{grant.awardAmount}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Eligibility</p>
            <p className="text-sm text-muted-foreground">{grant.eligibility}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
