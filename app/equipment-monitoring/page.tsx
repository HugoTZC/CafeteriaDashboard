import EquipmentMonitoring from "@/equipment-monitoring"
import AppNavigation from "@/app-navigation"

export default function MonitoringPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <EquipmentMonitoring />
    </div>
  )
}

