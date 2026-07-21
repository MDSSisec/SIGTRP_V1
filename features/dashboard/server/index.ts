import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "@/features/login/server/session"

import { getDashboardStatsForUser } from "./dashboard.service"

export async function handleDashboardRequest(
  request: NextRequest,
  path: string[],
) {
  const sessionUser = await getSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const [resource] = path

  if ((!resource || resource === "stats") && request.method === "GET") {
    try {
      const stats = await getDashboardStatsForUser(sessionUser)
      return NextResponse.json({ stats })
    } catch (error) {
      console.error("[dashboard/stats]", error)
      return NextResponse.json(
        { error: "Não foi possível carregar as estatísticas do dashboard." },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
