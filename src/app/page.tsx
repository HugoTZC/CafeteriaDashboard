import CafeteriaDashboard from "@/src/cafeteria-dashboard"
import AppNavigation from "@/src/app-navigation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigation />
      <CafeteriaDashboard />
    </div>
  )
}

