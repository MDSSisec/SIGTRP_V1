import { cookies } from "next/headers"

import type { PublicUser } from "../types/public-user"

const SESSION_COOKIE = "sigtrp_session"

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
    return JSON.parse(value) as PublicUser
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_COOKIE)
}
