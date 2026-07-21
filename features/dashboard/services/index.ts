import { parseApiResponse } from "@/lib/parse-api-response"

import type { DashboardStats } from "../types"

type DashboardStatsResponse = {
  stats: DashboardStats
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch("/api/dashboard/stats")
  const data = await parseApiResponse<DashboardStatsResponse>(response)
  return data.stats
}
