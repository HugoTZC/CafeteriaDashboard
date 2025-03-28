import { format, subDays } from "date-fns"

// Types
export interface DashboardData {
  weekData: WeekData[]
  recentEntries: Entry[]
  totalVisitors: number
  avgDailyVisitors: number
  totalTwiceVisitors: number
  avgAttendanceRate: number
}

export interface WeekData {
  day: string
  date: string
  visitors: number
  twiceVisitors: number
  percentage: number
  registeredUsers: number
}

export interface Entry {
  id: string
  name: string
  tagId: string
  timestamp: string
  meal: string
}

// Mock data generator
export const generateMockData = (): DashboardData => {
  const today = new Date()
  const weekData: WeekData[] = []
  const registeredUsers = 450

  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i)
    const dayStr = format(date, "EEE")
    const visitors = Math.floor(Math.random() * 200) + 150
    const twiceVisitors = Math.floor(Math.random() * 50)
    const percentage = Math.round((visitors / registeredUsers) * 100)

    weekData.push({
      day: dayStr,
      date: format(date, "MMM dd"),
      visitors,
      twiceVisitors,
      percentage,
      registeredUsers,
    })
  }

  const recentEntries: Entry[] = [
    { id: "E001", name: "John Doe", tagId: "T1234", timestamp: "09:15 AM", meal: "Breakfast" },
    { id: "E002", name: "Jane Smith", tagId: "T2345", timestamp: "12:30 PM", meal: "Lunch" },
    { id: "E003", name: "Mike Johnson", tagId: "T3456", timestamp: "12:45 PM", meal: "Lunch" },
    { id: "E004", name: "Sarah Williams", tagId: "T4567", timestamp: "01:00 PM", meal: "Lunch" },
    { id: "E005", name: "John Doe", tagId: "T1234", timestamp: "01:15 PM", meal: "Lunch (2nd visit)" },
    { id: "E006", name: "Robert Brown", tagId: "T5678", timestamp: "01:30 PM", meal: "Lunch" },
    { id: "E007", name: "Emily Davis", tagId: "T6789", timestamp: "01:45 PM", meal: "Lunch" },
  ]

  // Calculate summary statistics
  const totalVisitors = weekData.reduce((sum, day) => sum + day.visitors, 0)
  const avgDailyVisitors = Math.round(totalVisitors / 7)
  const totalTwiceVisitors = weekData.reduce((sum, day) => sum + day.twiceVisitors, 0)
  const avgAttendanceRate = Math.round(weekData.reduce((sum, day) => sum + day.percentage, 0) / 7)

  return {
    weekData,
    recentEntries,
    totalVisitors,
    avgDailyVisitors,
    totalTwiceVisitors,
    avgAttendanceRate,
  }
}

// Service functions
const dashboardService = {
  // Get dashboard data
  getDashboardData: async (dateRange = "7d"): Promise<DashboardData> => {
    // Mock implementation
    return generateMockData()

    // Axios implementation (commented out)
    /*
    try {
      const response = await api.get(`/dashboard?range=${dateRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
    */
  },

  // Get recent entries
  getRecentEntries: async (limit = 10): Promise<Entry[]> => {
    // Mock implementation
    return generateMockData().recentEntries.slice(0, limit)

    // Axios implementation (commented out)
    /*
    try {
      const response = await api.get(`/entries/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent entries:', error);
      throw error;
    }
    */
  },

  // Get attendance statistics
  getAttendanceStats: async (
    dateRange = "7d",
  ): Promise<{
    totalVisitors: number
    avgDailyVisitors: number
    totalTwiceVisitors: number
    avgAttendanceRate: number
  }> => {
    // Mock implementation
    const data = generateMockData()
    return {
      totalVisitors: data.totalVisitors,
      avgDailyVisitors: data.avgDailyVisitors,
      totalTwiceVisitors: data.totalTwiceVisitors,
      avgAttendanceRate: data.avgAttendanceRate,
    }

    // Axios implementation (commented out)
    /*
    try {
      const response = await api.get(`/stats/attendance?range=${dateRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      throw error;
    }
    */
  },
}

export default dashboardService

