import { NextResponse, type NextRequest } from "next/server"

import { handleAdminRequest } from "@/features/admin/server"
import { handleAuthRequest } from "@/features/login/server"
import { handleProjetosRequest } from "@/features/projeto/server"

type ApiParams = {
  path?: string[]
}

export async function handleApiRequest(
  request: NextRequest,
  params: ApiParams,
) {
  const [domain, ...rest] = params.path ?? []

  switch (domain) {
    case "admin":
      return handleAdminRequest(request, rest)
    case "auth":
      return handleAuthRequest(request, rest)
    case "health":
      return NextResponse.json({ ok: true })
    case "projetos":
      return handleProjetosRequest(request, rest)
    default:
      return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
  }
}
