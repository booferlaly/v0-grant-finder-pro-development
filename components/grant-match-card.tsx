import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign } from "lucide-react"

interface GrantMatchCardProps {
  title: string
  organization: string
  amount: string
  matchPercentage: number
  deadline: string
  tags: string[]
}

export default function GrantMatchCard({
  title,
  organization,
  amount,
  matchPercentage,
  deadline,
  tags,
}: GrantMatchCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{organization}</p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 font-medium text-sm px-2 py-1 rounded-full">
            {matchPercentage}% Match
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-medium">{amount}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-500">Deadline: {deadline}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Details
          </Button>
          <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs">
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
