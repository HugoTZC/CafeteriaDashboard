import { CheckCircle2Icon, PowerOffIcon, WifiOffIcon } from "lucide-react"

import { Badge } from "@/src/components/ui/badge"

interface StatusBadgeProps {
  status: "Online" | "Offline" | "Powered Off"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "Online") {
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50 flex items-center gap-1"
      >
        <CheckCircle2Icon className="h-3 w-3" />
        Online
      </Badge>
    )
  } else if (status === "Offline") {
    return (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50 flex items-center gap-1"
      >
        <WifiOffIcon className="h-3 w-3" />
        Offline
      </Badge>
    )
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700 flex items-center gap-1"
      >
        <PowerOffIcon className="h-3 w-3" />
        Powered Off
      </Badge>
    )
  }
}

