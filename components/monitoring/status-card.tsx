import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatusCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  indicator?: ReactNode
}

export function StatusCard({ title, value, icon, description, indicator }: StatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {indicator}
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  )
}

