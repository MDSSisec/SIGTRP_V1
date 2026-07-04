import { DashboardTotals, DashboardUfSection } from "../components"

export function DashboardScreen() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden md:gap-6">
      <div className="shrink-0">
        <DashboardTotals />
      </div>
      <DashboardUfSection />
    </div>
  )
}
