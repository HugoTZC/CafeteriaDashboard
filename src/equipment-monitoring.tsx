"use client"

import { useState, useEffect } from "react"
import { AlertTriangleIcon, CheckCircle2Icon, PowerOffIcon, RefreshCwIcon, SearchIcon } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

import { SystemHealthCard } from "@/src/components/monitoring/system-health-card"
import { StatusCard } from "@/src/components/monitoring/status-card"
import { FilterBar } from "@/src/components/monitoring/filter-bar"
import { EquipmentCard } from "@/src/components/monitoring/equipment-card"
import { NoResults } from "@/src/components/monitoring/no-results"

import monitoringService, { type EquipmentData, type SystemMetrics } from "@/src/services/monitoring-service"

export default function EquipmentMonitoring() {
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState("all")
  const [showOnlyIssues, setShowOnlyIssues] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch data
  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await monitoringService.getEquipmentData()
      const metrics = await monitoringService.getSystemMetrics()
      setEquipmentData(data)
      setMetrics(metrics)
    } catch (error) {
      console.error("Failed to fetch monitoring data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial data load
  useEffect(() => {
    fetchData()
  }, [])

  // Reset filters
  const resetFilters = () => {
    setFilterStatus("all")
    setShowOnlyIssues(false)
    setSearchQuery("")
  }

  // Filter equipment based on current filters
  const filteredEquipment = equipmentData.filter((room) => {
    // If showing only issues, filter out rooms where everything is connected
    if (showOnlyIssues) {
      const hasIssues =
        room.computers.some((computer)=>computer.status !== "Online") || room.readers.some((reader) => reader.status !== "Online")
      if (!hasIssues) return false
    }

    // Apply search filter to room name or device names
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesRoom = room.room.name.toLowerCase().includes(query)
      const matchesComputer =
        room.computers.some(
          (computer)=>computer.name.toLowerCase().includes(query)
        ) || room.computers.some((computer)=>computer.ipAddress.includes(query))
      const matchesReader = room.readers.some(
        (reader) => reader.name.toLowerCase().includes(query) || reader.ipAddress.toLowerCase().includes(query),
      )

      if (!matchesRoom && !matchesComputer && !matchesReader) return false
    }

    // Apply status filter
    if (filterStatus !== "all") {
      const matchesStatus =
        room.computers.some((computer)=>computer.status === filterStatus) || room.readers.some((reader) => reader.status === filterStatus)
      if (!matchesStatus) return false
    }

    return true
  })

  if (loading || !metrics) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Cargando datos de monitoreo...</p>
      </div>
    )
  }

  console.log(filteredEquipment)

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <h1 className="text-lg font-semibold">Equipment Monitoring</h1>
        <div className="ml-auto flex items-center gap-4">
          <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="buscar"
              placeholder="Buscar equipo..."
              className="w-[200px] pl-8 sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button variant="outline" size="sm" className="gap-1" onClick={fetchData} disabled={loading}>
            <RefreshCwIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refrescar</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SystemHealthCard
            healthPercentage={metrics.healthPercentage}
            connectedDevices={metrics.connected}
            totalDevices={metrics.total}
          />

          <StatusCard
            title="Dispositivos en Linea"
            value={metrics.connected}
            icon={<CheckCircle2Icon className="h-4 w-4 text-green-500" />}
            description="Funcionando normal"
          />

          <StatusCard
            title="Lectoras Fuera de Linea"
            value={metrics.poweredOff}
            icon={<AlertTriangleIcon className="h-4 w-4 text-red-500" />}
            description="Necesitan Atencion"
          />

          <StatusCard
            title="Computadoras Apagadas"
            value={metrics.disconnected}
            icon={<PowerOffIcon className="h-4 w-4 text-slate-500" />}
            description="No estan disponibles"
          />
        </div>

        {/* Filters */}
        <FilterBar
          showOnlyIssues={showOnlyIssues}
          setShowOnlyIssues={setShowOnlyIssues}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Equipment Status */}
        <div className="grid gap-4 md:grid-cols-2">
          {loading ? (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`loading-${index}`} className="animate-pulse">
                <div className="h-24 bg-muted rounded-lg"></div>
              </div>
            ))
          ) : filteredEquipment.length === 0 ? (
            // No results state
            <NoResults onReset={resetFilters} />
          ) : (
            // Equipment cards
            filteredEquipment.map((roomData, index) => (
              <EquipmentCard
                key={roomData.room?.id ?? `fallback-${index}`} // Aseguramos que siempre haya un key único
                room={roomData.room}
                computers={roomData.computers}
                readers={roomData.readers}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

