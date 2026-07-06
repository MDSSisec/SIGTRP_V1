import type { MenuBarItem } from "@/components/ui/menuBar"
import type { Profile } from "../types/profile"

export type ProfileFilter = "todos"

export function buildProfileMenuItems(
  profiles: Profile[],
): MenuBarItem<ProfileFilter>[] {
  return [{ value: "todos", label: "Todos", count: profiles.length }]
}

export function filterProfiles(profiles: Profile[], search: string) {
  const query = search.trim().toLowerCase()

  if (!query) {
    return profiles
  }

  return profiles.filter(
    (profile) =>
      profile.nome.toLowerCase().includes(query) ||
      profile.descricao.toLowerCase().includes(query),
  )
}
