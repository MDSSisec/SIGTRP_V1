import { NextResponse, type NextRequest } from "next/server"

import { handleAuthRequest } from "@/server/auth"

type ApiParams = {
  path?: string[]
}

export async function handleApiRequest(
  request: NextRequest,
  params: ApiParams
) {
  const [domain, ...rest] = params.path ?? []

  switch (domain) {
    case "auth":
      return handleAuthRequest(request, rest)
    case "health":
      return NextResponse.json({ ok: true })
    default:
      return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
  }
}
