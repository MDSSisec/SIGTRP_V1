import type { MenuBarItem } from "@/components/ui/menuBar"
import type { AdminEntityFilter, AdminEntityItem } from "../types/admin-entity"

export function buildMenuItems(
  items: AdminEntityItem[],
): MenuBarItem<AdminEntityFilter>[] {
  const ativos = items.filter((item) => item.status === "Ativo").length
  const inativos = items.filter((item) => item.status === "Inativo").length

  return [
    { value: "todos", label: "Todos", count: items.length },
    { value: "ativos", label: "Ativos", count: ativos },
    { value: "inativos", label: "Inativos", count: inativos },
  ]
}

export function filterItems(
  items: AdminEntityItem[],
  filter: AdminEntityFilter,
  search: string,
) {
  const byStatus =
    filter === "todos"
      ? items
      : items.filter((item) =>
          filter === "ativos" ? item.status === "Ativo" : item.status === "Inativo",
        )

  const query = search.trim().toLowerCase()

  if (!query) {
    return byStatus
  }

  return byStatus.filter(
    (item) =>
      item.nome.toLowerCase().includes(query) ||
      item.descricao.toLowerCase().includes(query),
  )
}
