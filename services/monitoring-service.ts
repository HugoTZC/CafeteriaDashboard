// Types
export interface Room {
  id: number
  name: string
}

export interface Computer {
  id: string
  name: string
  ipAddress: string
  status: "connected" | "disconnected" | "powered_off"
  lastChecked: Date
}

export interface Reader {
  id: string
  name: string
  status: "connected" | "disconnected" | "powered_off"
  lastChecked: Date
}

export interface EquipmentData {
  room: Room
  computer: Computer
  readers: Reader[]
}

export interface SystemMetrics {
  total: number
  connected: number
  disconnected: number
  poweredOff: number
  healthPercentage: number
}

// Mock data generator
export const generateMockEquipmentData = (): EquipmentData[] => {
  const rooms: Room[] = [
    { id: 1, name: "Main Dining Hall" },
    { id: 2, name: "Staff Cafeteria" },
    { id: 3, name: "Executive Dining Room" },
    { id: 4, name: "Student Lounge" },
  ]

  const getRandomStatus = (): "connected" | "disconnected" | "powered_off" => {
    // Weighted random to make most devices connected
    const rand = Math.random()
    if (rand > 0.85) return "disconnected"
    if (rand > 0.95) return "powered_off"
    return "connected"
  }

  const equipmentData: EquipmentData[] = rooms.map((room) => {
    // Each room has one computer
    const computerStatus = getRandomStatus()

    // If computer is powered off, readers are automatically powered off too
    const readerStatus1 = computerStatus === "powered_off" ? "powered_off" : getRandomStatus()

    // Randomly decide if this computer has 1 or 2 readers
    const hasSecondReader = Math.random() > 0.3
    const readerStatus2 = hasSecondReader
      ? computerStatus === "powered_off"
        ? "powered_off"
        : getRandomStatus()
      : null

    const lastChecked = new Date()

    return {
      room,
      computer: {
        id: `PC-${room.id}`,
        name: `Computer ${room.id}`,
        ipAddress: `192.168.1.${room.id * 10}`,
        status: computerStatus,
        lastChecked,
      },
      readers: [
        {
          id: `NFC-${room.id}-1`,
          name: `Reader ${room.id}-1`,
          status: readerStatus1,
          lastChecked,
        },
        ...(hasSecondReader
          ? [
              {
                id: `NFC-${room.id}-2`,
                name: `Reader ${room.id}-2`,
                status: readerStatus2,
                lastChecked,
              },
            ]
          : []),
      ],
    }
  })

  return equipmentData
}

// Calculate metrics from equipment data
export const calculateMetrics = (equipmentData: EquipmentData[]): SystemMetrics => {
  let totalDevices = 0
  let connectedDevices = 0
  let disconnectedDevices = 0
  let poweredOffDevices = 0

  equipmentData.forEach((room) => {
    // Count computer
    totalDevices++
    if (room.computer.status === "connected") connectedDevices++
    if (room.computer.status === "disconnected") disconnectedDevices++
    if (room.computer.status === "powered_off") poweredOffDevices++

    // Count readers
    room.readers.forEach((reader) => {
      totalDevices++
      if (reader.status === "connected") connectedDevices++
      if (reader.status === "disconnected") disconnectedDevices++
      if (reader.status === "powered_off") poweredOffDevices++
    })
  })

  return {
    total: totalDevices,
    connected: connectedDevices,
    disconnected: disconnectedDevices,
    poweredOff: poweredOffDevices,
    healthPercentage: totalDevices > 0 ? Math.round((connectedDevices / totalDevices) * 100) : 0,
  }
}

// Service functions
const monitoringService = {
  // Get all equipment data
  getEquipmentData: async (): Promise<EquipmentData[]> => {
    // Mock implementation
    return generateMockEquipmentData()

    // Axios implementation (commented out)
    /*
    try {
      const response = await api.get('/equipment');
      return response.data;
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      throw error;
    }
    */
  },

  // Get system metrics
  getSystemMetrics: async (): Promise<SystemMetrics> => {
    // Mock implementation
    const equipmentData = generateMockEquipmentData()
    return calculateMetrics(equipmentData)

    // Axios implementation (commented out)
    /*
    try {
      const response = await api.get('/equipment/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      throw error;
    }
    */
  },

  // Update equipment status (for testing)
  updateEquipmentStatus: async (
    equipmentId: string,
    status: "connected" | "disconnected" | "powered_off",
  ): Promise<void> => {
    // Mock implementation
    console.log(`Updating equipment ${equipmentId} to status ${status}`)

    // Axios implementation (commented out)
    /*
    try {
      await api.patch(`/equipment/${equipmentId}`, { status });
    } catch (error) {
      console.error('Error updating equipment status:', error);
      throw error;
    }
    */
  },
}

export default monitoringService

