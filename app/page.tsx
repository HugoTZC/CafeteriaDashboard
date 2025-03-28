import CafeteriaDashboard from "@/cafeteria-dashboard"
import AppNavigation from "@/app-navigation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <CafeteriaDashboard />
    </div>
  )
}

