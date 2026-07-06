import type { MenuBarItem } from "@/components/ui/menuBar"
import type { Usuario, UsuarioFilter } from "../types/usuario"

export function buildUsuarioMenuItems(
  usuarios: Usuario[],
): MenuBarItem<UsuarioFilter>[] {
  const ativos = usuarios.filter((usuario) => usuario.ativo).length
  const inativos = usuarios.filter((usuario) => !usuario.ativo).length

  return [
    { value: "todos", label: "Todos", count: usuarios.length },
    { value: "ativos", label: "Ativos", count: ativos },
    { value: "inativos", label: "Inativos", count: inativos },
  ]
}

export function filterUsuarios(
  usuarios: Usuario[],
  filter: UsuarioFilter,
  search: string,
) {
  const byStatus =
    filter === "todos"
      ? usuarios
      : usuarios.filter((usuario) =>
          filter === "ativos" ? usuario.ativo : !usuario.ativo,
        )

  const query = search.trim().toLowerCase()

  if (!query) {
    return byStatus
  }

  return byStatus.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(query) ||
      usuario.email.toLowerCase().includes(query) ||
      usuario.tipo.toLowerCase().includes(query),
  )
}
