import { format } from "date-fns"
import { ServerIcon, SmartphoneIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/monitoring/status-badge"

interface Computer {
  id: string
  name: string
  ipAddress: string
  status: "connected" | "disconnected" | "powered_off"
  lastChecked: Date
}

interface Reader {
  id: string
  name: string
  status: "connected" | "disconnected" | "powered_off"
  lastChecked: Date
}

interface Room {
  id: number
  name: string
}

interface EquipmentCardProps {
  room: Room
  computer: Computer
  readers: Reader[]
}

export function EquipmentCard({ room, computer, readers }: EquipmentCardProps) {
  const hasIssues = computer.status !== "connected" || readers.some((r) => r.status !== "connected")

  return (
    <Card className={hasIssues ? "border-red-200" : ""}>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>
          {readers.length} NFC Reader{readers.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Computer status */}
        <div className="flex items-start justify-between rounded-md border p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ServerIcon className="h-4 w-4" />
              <h4 className="font-medium">{computer.name}</h4>
            </div>
            <p className="text-xs text-muted-foreground">IP: {computer.ipAddress}</p>
          </div>
          <StatusBadge status={computer.status} />
        </div>

        {/* Reader statuses */}
        {readers.map((reader) => (
          <div key={reader.id} className="flex items-start justify-between rounded-md border p-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <SmartphoneIcon className="h-4 w-4" />
                <h4 className="font-medium">{reader.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground">ID: {reader.id}</p>
            </div>
            <StatusBadge status={reader.status} />
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last checked: {format(computer.lastChecked, "MMM d, yyyy h:mm a")}
      </CardFooter>
    </Card>
  )
}

