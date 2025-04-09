import { startOfWeek, addDays, format, subDays, endOfWeek } from "date-fns"
import axios from 'axios'
import { API_URL } from "@/config"

// Types
export interface DashboardData {
  weekData: WeekData[]
  allEntries: Entry[]
  recentEntries: Entry[]
  totalVisitors: number
  avgDailyVisitors: number
  totalTwiceVisitors: number
  avgAttendanceRate: number
  weekNo: number
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
  index: string
  id: string
  name: string
  room: string
  meal: string
  timestamp: string
}

const formatDate = (d: Date) =>
  d.getFullYear() +
  "-" +
  String(d.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(d.getDate()).padStart(2, "0") +
  " " +
  String(d.getHours()).padStart(2, "0") +
  ":" +
  String(d.getMinutes()).padStart(2, "0") +
  ":" +
  String(d.getSeconds()).padStart(2, "0") +
  ".000";

// Data generator
export const getData = async(room = '0'): Promise<DashboardData> => {
  const today = new Date()
  const weekNo = await axios.get(API_URL+'/dashboard//week-number')
  const weekData: WeekData[] = []
  const resPlantDesc = await axios.get(API_URL+'/dashboard/room-description', {params: { room: room }})
  console.log("planta seleccionada: "+resPlantDesc.data)
  const resRegisteredUsers = await axios.get(API_URL+'/dashboard/total-eployees', { params: {plantDesc: resPlantDesc.data.toString()}})
  console.log(`no error`)
  console.log("Error")
  const registeredUsers = resRegisteredUsers.data

  const weekStart = formatDate(startOfWeek(today, { weekStartsOn: 1 }));
  const weekEnding = formatDate(endOfWeek(today, { weekStartsOn: 1 }));

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i); // Get each day from Sunday to Saturday
    const dayStr = format(date, "EEE"); // Format as "Sun", "Mon", etc.
  
    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(0, 0, 0, 1); // 00:00:00.001
    endDate.setHours(23, 59, 59, 999); // 23:59:59.999
  
    // Format Date to YYYY-MM-DD HH:MM:SS.000
  
    const from = formatDate(startDate);
    const to = formatDate(endDate);

    const visitors = await axios.get(API_URL+'/dashboard/total-consumers', {
      params: {
        plant: room,
        from: from,
        to: to
      }
    });
    
    const twiceVisitors = await axios.get(API_URL+'/dashboard/multiple-consumers', {
      params: { 
        plant: room,
        from: from,
        to: to
      }
    });

    const percentage = Math.round((visitors.data / registeredUsers) * 100)

    weekData.push({
      day: dayStr,
      date: format(date, "MMM dd"),
      visitors: visitors.data,
      twiceVisitors: twiceVisitors.data,
      percentage,
      registeredUsers,
    })
  }

  const resAllEntries = await axios.get(API_URL+'/dashboard/get-entries', {
    params: { 
      top: 100, 
      plant: room,
      from: weekStart,
      to: weekEnding,
    }})
  const allEntries: Entry[] = resAllEntries.data;
  console.log(allEntries);

  const resRecentEntries = await axios.get(API_URL+'/dashboard/get-entries', {
    params: { 
      top: 20, 
      plant: room ,
      from: weekStart,
      to: weekEnding,
    }});
  const recentEntries: Entry[] = resRecentEntries.data;
  console.log(recentEntries);

  // Calculate summary statistics
  const totalVisitors = weekData.reduce((sum, day) => sum + day.visitors, 0)
  const avgDailyVisitors = Math.round(totalVisitors / 7)
  const totalTwiceVisitors = weekData.reduce((sum, day) => sum + day.twiceVisitors, 0)
  const avgAttendanceRate = Math.round(weekData.reduce((sum, day) => sum + day.percentage, 0) / 7)

  return {
    weekData,
    allEntries,
    recentEntries,
    totalVisitors,
    avgDailyVisitors,
    totalTwiceVisitors,
    avgAttendanceRate,
    weekNo: weekNo.data,
  }
}

// Service functions
const dashboardService = {
  // Get dashboard data
  getDashboardData: async (room = '0'): Promise<DashboardData> => {
    return await getData(room)
  },

  // Get recent entries
  getRecentEntries: async (limit = 10): Promise<Entry[]> => {
    const data = await getData()
    return data.recentEntries.slice(0, limit)
  },

  // Get attendance statistics
  getAttendanceStats: async (
    room = '0',
  ): Promise<{
    totalVisitors: number
    avgDailyVisitors: number
    totalTwiceVisitors: number
    avgAttendanceRate: number
  }> => {
    const data = await getData(room)
    return {
      totalVisitors: data.totalVisitors,
      avgDailyVisitors: data.avgDailyVisitors,
      totalTwiceVisitors: data.totalTwiceVisitors,
      avgAttendanceRate: data.avgAttendanceRate,
    }
  },
}

export default dashboardService

