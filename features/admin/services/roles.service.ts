import { parseApiResponse } from "@/lib/parse-api-response"
import type { Role } from "../types/role"

type RolesResponse = {
  roles: Role[]
}

export async function fetchRoles() {
  const response = await fetch("/api/admin/roles")
  const data = await parseApiResponse<RolesResponse>(response)
  return data.roles
}
