import type { PublicUser } from "@/features/login/types"
import { parseApiResponse } from "@/lib/parse-api-response"

type SessionResponse = {
  user: PublicUser
}

export async function loginRequest(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await parseApiResponse<SessionResponse>(response)
  return data.user
}

export async function fetchSessionUser() {
  const response = await fetch("/api/auth/me")
  const data = await parseApiResponse<SessionResponse>(response)
  return data.user
}

export async function logoutRequest() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  })

  await parseApiResponse<{ ok: boolean }>(response)
}
