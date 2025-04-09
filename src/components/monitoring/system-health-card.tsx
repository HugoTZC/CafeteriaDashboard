import { ServerIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"

interface SystemHealthCardProps {
  healthPercentage: number
  connectedDevices: number
  totalDevices: number
}

export function SystemHealthCard({ healthPercentage, connectedDevices, totalDevices }: SystemHealthCardProps) {
  // Determine color based on health percentage
  const getHealthColor = () => {
    if (healthPercentage > 90) return "bg-green-500 dark:bg-green-600"
    if (healthPercentage > 70) return "bg-yellow-500 dark:bg-yellow-600"
    return "bg-red-500 dark:bg-red-600"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Salud del Sistema</CardTitle>
        <ServerIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{healthPercentage}%</div>
        <Progress value={healthPercentage} className={`h-2 mt-2 [&>div]:${getHealthColor()}`} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0%</span>
          {/* <span>{healthPercentage}%</span> */}
          <span>100%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {connectedDevices} de {totalDevices} dispositivos en linea
        </p>
      </CardContent>
    </Card>
  )
}

