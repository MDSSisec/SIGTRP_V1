import { NextResponse, type NextRequest } from "next/server"

import { authenticateUser } from "./auth.service"
import { createSession, destroySession, getSessionUser } from "./session"

export async function handleAuthRequest(
  request: NextRequest,
  path: string[]
) {
  const [action] = path

  if (request.method === "POST" && action === "login") {
    const body = (await request.json()) as {
      email?: string
      password?: string
    }

    try {
      const user = authenticateUser(body.email ?? "", body.password ?? "")
      await createSession(user)

      return NextResponse.json({ user })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível entrar."

      return NextResponse.json({ error: message }, { status: 401 })
    }
  }

  if (request.method === "GET" && action === "me") {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    return NextResponse.json({ user })
  }

  if (request.method === "POST" && action === "logout") {
    await destroySession()

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
