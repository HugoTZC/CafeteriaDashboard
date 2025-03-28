"use client"

import { useState, useEffect } from "react"
import { CreditCardIcon, SearchIcon, UsersIcon, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { StatCard } from "@/components/dashboard/stat-card"
import { VisitorsChart } from "@/components/dashboard/visitors-chart"
import { AttendanceRateChart } from "@/components/dashboard/attendance-rate-chart"
import { MultipleVisitsChart } from "@/components/dashboard/multiple-visits-chart"
import { EntriesTable } from "@/components/dashboard/entries-table"
import { DetailedAnalyticsChart } from "@/components/dashboard/detailed-analytics-chart"
import { AttendancePercentageChart } from "@/components/dashboard/attendance-percentage-chart"

import dashboardService, { type DashboardData } from "@/services/dashboard-service"

export default function CafeteriaDashboard() {
  const [dateRange, setDateRange] = useState("7d")
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await dashboardService.getDashboardData(dateRange)
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  if (loading || !dashboardData) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading dashboard data...</p>
      </div>
    )
  }

  const { weekData, recentEntries, totalVisitors, avgDailyVisitors, totalTwiceVisitors, avgAttendanceRate } =
    dashboardData

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <h1 className="text-lg font-semibold">Cafeteria Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-8 sm:w-[300px]" />
          </form>
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Today</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Visitors"
            value={totalVisitors}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            description={`${avgDailyVisitors} daily average`}
          />
          <StatCard
            title="Attendance Rate"
            value={`${avgAttendanceRate}%`}
            icon={<CreditCardIcon className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "+2.5% from last week",
              direction: "up",
            }}
          />
          <StatCard
            title="Multiple Visits"
            value={totalTwiceVisitors}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            trend={{
              value: "-0.8% from last week",
              direction: "down",
            }}
          />
          <StatCard
            title="Registered Users"
            value={weekData[0].registeredUsers}
            icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
            description="Total potential visitors"
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Detailed Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Daily Visitors</CardTitle>
                  <CardDescription>Number of people visiting the cafeteria each day</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <VisitorsChart data={weekData} />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Attendance Rate</CardTitle>
                  <CardDescription>Percentage of registered users who visited</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceRateChart attendanceRate={avgAttendanceRate} />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Multiple Visits</CardTitle>
                  <CardDescription>People who visited more than once per day</CardDescription>
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
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Attendance Analytics</CardTitle>
                <CardDescription>Comprehensive view of cafeteria attendance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <DetailedAnalyticsChart data={weekData} />
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Percentage</CardTitle>
                  <CardDescription>Daily percentage of registered users who visited</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendancePercentageChart data={weekData} />
                </CardContent>
              </Card>
              <div>
                <EntriesTable
                  title="All Entries"
                  description="Complete list of cafeteria check-ins"
                  entries={recentEntries}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

