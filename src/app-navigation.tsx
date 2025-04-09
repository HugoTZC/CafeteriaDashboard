"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3Icon, ServerIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ThemeToggle } from "@/src/components/theme-toggle"

export default function AppNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname === "/equipment-monitoring" ? "monitoring" : "dashboard")

  return (
    <div className="flex justify-between items-center border-b bg-background px-4 py-2">
      <Tabs value={activeTab} className="w-full max-w-md" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard" asChild>
            <Link href="/" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="monitoring" asChild>
            <Link href="/equipment-monitoring" className="flex items-center gap-2">
              <ServerIcon className="h-4 w-4" />
              <span>Monitoreo de Equipos</span>
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ThemeToggle />
    </div>
  )
}

