import type { MenuBarItem } from "@/components/ui/menuBar"
import type { Role } from "../types/role"

export type RoleFilter = "todos"

export function buildRoleMenuItems(roles: Role[]): MenuBarItem<RoleFilter>[] {
  return [{ value: "todos", label: "Todos", count: roles.length }]
}

export function filterRoles(roles: Role[], search: string) {
  const query = search.trim().toLowerCase()

  if (!query) {
    return roles
  }

  return roles.filter(
    (role) =>
      role.nome.toLowerCase().includes(query) ||
      role.descricao.toLowerCase().includes(query),
  )
}
