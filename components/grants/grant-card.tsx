import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ArrowRightIcon, MapPinIcon, BuildingIcon } from "lucide-react"

interface Grant {
  id: string
  title: string
  shortDescription: string
  category: string
  deadline: string
  awardAmount: string
  provider: string
  location?: string
  isNew?: boolean
  focusAreas?: string[]
}

interface GrantCardProps {
  grant: Grant
}

export function GrantCard({ grant }: GrantCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{grant.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge variant={grant.isNew ? "default" : "outline"}>{grant.isNew ? "New" : grant.category}</Badge>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BuildingIcon className="h-4 w-4 mr-1" />
          <span className="truncate">{grant.provider}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{grant.shortDescription}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Deadline: {grant.deadline}</span>
          </div>

          {grant.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{grant.location}</span>
            </div>
          )}

          <div className="text-sm font-medium text-green-600">{grant.awardAmount}</div>

          {grant.focusAreas && grant.focusAreas.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {grant.focusAreas.slice(0, 2).map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
              {grant.focusAreas.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{grant.focusAreas.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/grants/${grant.id}`}>
            View Details <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
