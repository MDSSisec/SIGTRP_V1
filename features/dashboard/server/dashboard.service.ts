import type { PublicUser } from "@/features/login/types"
import { isUsuarioExterno } from "@/features/projeto/domain/projeto.permissions"

import { getDashboardStats } from "../repositories/dashboard.repository"
import type { DashboardStats } from "../types"

export async function getDashboardStatsForUser(
  user: PublicUser,
): Promise<DashboardStats> {
  if (isUsuarioExterno(user)) {
    return getDashboardStats({ responsavelExternoId: user.id })
  }

  return getDashboardStats()
}
