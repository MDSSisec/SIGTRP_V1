import { cookies } from "next/headers"

import { isAdminProfile, isGestorProjetoProfile } from "../constants"
import type { PublicUser } from "../types/public-user"

const SESSION_COOKIE = "sigtrp_session"

function normalizeSessionUser(user: PublicUser): PublicUser {
  const isExterno = user.tipo.trim().toLowerCase() === "externo"

  return {
    ...user,
    isAdmin:
      typeof user.isAdmin === "boolean"
        ? user.isAdmin
        : !isExterno && isAdminProfile(user.perfilNome),
    isGestorProjeto:
      typeof user.isGestorProjeto === "boolean"
        ? user.isGestorProjeto
        : !isExterno && isGestorProjetoProfile(user.perfilNome),
  }
}

export async function createSession(user: PublicUser) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies()
  const value = cookieStore.get(SESSION_COOKIE)?.value

  if (!value) {
    return null
  }

  try {
    return normalizeSessionUser(JSON.parse(value) as PublicUser)
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE)
}
