import { parseApiResponse } from "@/lib/parse-api-response"
import type { Profile } from "../types/profile"

type ProfilesResponse = {
  profiles: Profile[]
}

export async function fetchProfiles() {
  const response = await fetch("/api/admin/profiles")
  const data = await parseApiResponse<ProfilesResponse>(response)
  return data.profiles
}
