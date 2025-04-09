import EquipmentMonitoring from "@/src/equipment-monitoring"
import AppNavigation from "@/src/app-navigation"

export default function MonitoringPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <EquipmentMonitoring />
    </div>
  )
}

