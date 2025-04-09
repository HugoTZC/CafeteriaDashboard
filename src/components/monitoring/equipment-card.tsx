import { format } from "date-fns"
import { ServerIcon, SmartphoneIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { StatusBadge } from "@/src/components/monitoring/status-badge"

interface Computer {
  id: string
  name: string
  ipAddress: string
  status: "Online" | "Powered Off"
  lastChecked: Date
}

interface Reader {
  id: string
  name: string
  ipAddress: string
  status: "Online" | "Offline"
  lastChecked: Date
}

interface Room {
  id: number
  name: string
}

interface EquipmentCardProps {
  room: Room
  computers: Computer[]
  readers: Reader[]
}

export function EquipmentCard({ room, computers, readers }: EquipmentCardProps) {
  const hasIssues = computers.some((c) => c.status !== "Online") || readers.some((r) => r.status !== "Online")

  return (
    <Card className={hasIssues ? "border-red-200" : ""}>
      <CardHeader>
        <CardTitle>{room.name} - Planta {room.id}</CardTitle>
        <CardDescription>
          {readers.length} NFC Reader{readers.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Computer status */}
        {computers.map((computer) => (
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
        ))}

        {/* Reader statuses */}
        {readers.map((reader) => (
          <div key={reader.id} className="flex items-start justify-between rounded-md border p-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <SmartphoneIcon className="h-4 w-4" />
                <h4 className="font-medium">{reader.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground">IP: {reader.ipAddress}</p>
            </div>
            <StatusBadge status={reader.status} />
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {computers.map((computer) => (
          <p>Last checked: {format(computer.lastChecked, "MMM d, yyyy h:mm a")}</p>
        ))}
      </CardFooter>
    </Card>
  )
}

// export function EquipmentCard({ room, computer, readers }: EquipmentCardProps) {
//   // Asegurar valores predeterminados si no están definidos
//   const safeComputer = computer || { name: "Unknown", ipAddress: "N/A", status: "disconnected", lastChecked: new Date() };
//   const safeReaders = readers || [];

//   const hasIssues = safeComputer.status !== "connected" || safeReaders.some((r) => r.status !== "connected");

//   return (
//     <Card className={hasIssues ? "border-red-200" : ""}>
//       <CardHeader>
//         <CardTitle>{room?.name || "No Room"}</CardTitle>
//         <CardDescription>
//           {safeReaders.length} NFC Reader{safeReaders.length !== 1 ? "s" : ""}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Computer status */}
//         <div className="flex items-start justify-between rounded-md border p-3">
//           <div className="space-y-1">
//             <div className="flex items-center gap-2">
//               <ServerIcon className="h-4 w-4" />
//               <h4 className="font-medium">{safeComputer.name}</h4>
//             </div>
//             <p className="text-xs text-muted-foreground">IP: {safeComputer.ipAddress}</p>
//           </div>
//           <StatusBadge status={safeComputer.status} />
//         </div>

//         {/* Reader statuses */}
//         {safeReaders.map((reader) => (
//           <div key={reader.id} className="flex items-start justify-between rounded-md border p-3">
//             <div className="space-y-1">
//               <div className="flex items-center gap-2">
//                 <SmartphoneIcon className="h-4 w-4" />
//                 <h4 className="font-medium">{reader.name}</h4>
//               </div>
//               <p className="text-xs text-muted-foreground">ID: {reader.id}</p>
//             </div>
//             <StatusBadge status={reader.status} />
//           </div>
//         ))}
//       </CardContent>
//       <CardFooter className="text-xs text-muted-foreground">
//         Last checked: {safeComputer.lastChecked ? format(safeComputer.lastChecked, "MMM d, yyyy h:mm a") : "N/A"}
//       </CardFooter>
//     </Card>
//   );
// }