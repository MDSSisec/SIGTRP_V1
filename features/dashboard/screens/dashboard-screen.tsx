import { DashboardTotals, DashboardUfSection } from "../components"

export function DashboardScreen() {
  return (
    <div className="flex h-[calc(100svh-9rem)] min-h-[520px] flex-col gap-4 overflow-hidden md:gap-6">
      <div className="shrink-0">
        <DashboardTotals />
      </div>
      <DashboardUfSection />
    </div>
  )
}
