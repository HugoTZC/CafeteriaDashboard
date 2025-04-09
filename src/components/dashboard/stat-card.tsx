import type { ReactNode } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend.direction === "up" ? (
              <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
            ) : trend.direction === "down" ? (
              <ArrowDownIcon className="mr-1 h-3 w-3 text-rose-500" />
            ) : null}
            <span>{trend.value}</span>
          </div>
        ) : description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  )
}

