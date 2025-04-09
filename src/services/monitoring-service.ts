import axios from 'axios'
import { API_URL } from '../../config';

// Types
export interface Room {
  id: number
  name: string
}

export interface Computer {
  id: string
  name: string
  ipAddress: string
  status: "Online" | "Powered Off"
  lastChecked: Date
}

export interface Reader {
  id: string
  name: string
  ipAddress: string
  status: "Online" | "Offline"
  lastChecked: Date
}

export interface EquipmentData {
  room: Room
  computers: Computer[]
  readers: Reader[]
}

export interface SystemMetrics {
  total: number
  connected: number
  disconnected: number
  poweredOff: number
  healthPercentage: number
}

// Service functions
const monitoringService = {
  // Get all equipment data
  getEquipmentData: async (): Promise<EquipmentData[]> => {
    try {
      const { data } = await axios.get(API_URL + '/monitor/verify-equipment');
      return data
    } catch (error) {
      console.error("Error fetching equipment data:", error)
      return []
    }
  },

  // Get system metrics
  getSystemMetrics: async (): Promise<SystemMetrics> => {
    try {
      const { data } = await axios.get(API_URL + '/monitor/equipment-metrics')
      return data
    } catch (error) {
      console.error("Error fetching equipment data:", error)
      return {
        total: 0,
        connected: 0,
        disconnected: 0,
        poweredOff: 0,
        healthPercentage: 0,
      }
    }
  },

  // Update equipment status (for testing)
  // updateEquipmentStatus: async (
  //   equipmentId: string,
  //   status: "connected" | "disconnected" | "powered_off",
  // ): Promise<void> => {
  //   // Mock implementation
  //   console.log(`Updating equipment ${equipmentId} to status ${status}`)

  //   // Axios implementation (commented out)
  //   /*
  //   try {
  //     await api.patch(`/equipment/${equipmentId}`, { status });
  //   } catch (error) {
  //     console.error('Error updating equipment status:', error);
  //     throw error;
  //   }
  //   */
  // },
}

export default monitoringService

