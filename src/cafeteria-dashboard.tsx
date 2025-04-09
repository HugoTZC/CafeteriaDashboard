"use client"

import { useState, useEffect } from "react"
import { CreditCardIcon, SearchIcon, UsersIcon, CalendarIcon } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

import { StatCard } from "@/src/components/dashboard/stat-card"
import { VisitorsChart } from "@/src/components/dashboard/visitors-chart"
import { AttendanceRateChart } from "@/src/components/dashboard/attendance-rate-chart"
import { MultipleVisitsChart } from "@/src/components/dashboard/multiple-visits-chart"
import { EntriesTable } from "@/src/components/dashboard/entries-table"
import { EntriesModal } from "@/src/components/dashboard/entries-modal"
import { DetailedAnalyticsChart } from "@/src/components/dashboard/detailed-analytics-chart"
import { AttendancePercentageChart } from "@/src/components/dashboard/attendance-percentage-chart"

import dashboardService, { type DashboardData } from "@/src/services/dashboard-service"

export default function CafeteriaDashboard() {
  const [room, setDateRange] = useState('0')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEntriesModal, setShowEntriesModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await dashboardService.getDashboardData(room)
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [room])

  if (loading || !dashboardData) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Cargando informacion...</p>
      </div>
    )
  }

  const { 
    weekData,
    allEntries,
    recentEntries, 
    totalVisitors, 
    avgDailyVisitors, 
    totalTwiceVisitors, 
    avgAttendanceRate,
    weekNo,
  } = dashboardData

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <h1 className="text-lg font-semibold">Cafeteria Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          {/* <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-8 sm:w-[300px]" />
          </form> */}
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Semana {weekNo}</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Descripción General </h2>
          <div className="flex items-center gap-2">
            <Select value={room} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'>Todo</SelectItem>
                <SelectItem value='1'>Planta 1</SelectItem>
                <SelectItem value='2'>Planta 2</SelectItem>
                <SelectItem value='3'>Planta 3</SelectItem>
                <SelectItem value='4'>Planta 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de comensales"
            value={totalVisitors}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            description={`${avgDailyVisitors} promedio diario`}
          />
          <StatCard
            title="Porcentage de asistencia"
            value={`${avgAttendanceRate}%`}
            icon={<CreditCardIcon className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "+2.5%  RSP",
              direction: "up",
            }}
          />
          <StatCard
            title="Repeticiones"
            value={totalTwiceVisitors}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "-0.8%  RSP",
              direction: "down",
            }}
          />
          <StatCard
            title="Total de Empleados"
            value={weekData[0].registeredUsers}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            description="comensales potenciales"
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analisis</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Comensales Diarios</CardTitle>
                  <CardDescription>Numero de comensales al dia</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <VisitorsChart data={weekData} />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Porcentage de Asistencia</CardTitle>
                  <CardDescription>Porcentage de empleados que asistieron a cafeteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceRateChart attendanceRate={avgAttendanceRate} />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Repeticiones por Dia</CardTitle>
                  <CardDescription>Checadas de servicio extra</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <MultipleVisitsChart data={weekData} />
                </CardContent>
              </Card>
              <div className="lg:col-span-4">
              <EntriesTable
                  title="Recent Entries"
                  description="Latest cafeteria check-ins"
                  entries={recentEntries}
                  limit={5}
                  showViewAll={true}
                  onViewAll={() => setShowEntriesModal(true)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analisis Completo de Asistencia</CardTitle>
                <CardDescription>Metricos compactos de la asistencia a cafeteria</CardDescription>
              </CardHeader>
              <CardContent>
                <DetailedAnalyticsChart data={weekData} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Porcentaje de Asistencia</CardTitle>
                  <CardDescription>Porcentage de registros diarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendancePercentageChart data={weekData} />
                </CardContent>
              </Card>
              <div>
                <EntriesTable
                  title="Ultimos registros"
                  description="Lista completa de checadas en cafeteria"
                  entries={recentEntries}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {/* Entries Modal */}
        <EntriesModal isOpen={showEntriesModal} onClose={() => setShowEntriesModal(false)} entries={allEntries} />
      </main>
    </div>
  )
}

