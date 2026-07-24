import type { MenuBarItem } from "@/components/ui/menuBar"
import { isAdminProfile } from "@/features/login/constants"
import {
  normalizeUsuarioTipo,
  USUARIO_TIPOS,
} from "../constants"
import type { Usuario, UsuarioFilter } from "../types"

export function buildUsuarioMenuItems(
  usuarios: Usuario[],
): MenuBarItem<UsuarioFilter>[] {
  const ativos = usuarios.filter((usuario) => usuario.ativo).length
  const inativos = usuarios.filter((usuario) => !usuario.ativo).length
  const internos = usuarios.filter(
    (usuario) => normalizeUsuarioTipo(usuario.tipo) === USUARIO_TIPOS.INTERNO,
  ).length
  const externos = usuarios.filter(
    (usuario) => normalizeUsuarioTipo(usuario.tipo) === USUARIO_TIPOS.EXTERNO,
  ).length

  return [
    { value: USUARIO_TIPOS.INTERNO, label: "Interno", count: internos },
    { value: USUARIO_TIPOS.EXTERNO, label: "Externo", count: externos },
    { value: "todos", label: "Todos", count: usuarios.length },
    { value: "ativos", label: "Ativos", count: ativos },
    { value: "inativos", label: "Inativos", count: inativos },
  ]
}

/**
 * Remove usuários com perfil Administrador.
 * Usado para Gestor do Projeto, que não deve ver administradores.
 */
export function excludeAdministradores(
  usuarios: Usuario[],
  perfilNomeById: Map<number, string>,
): Usuario[] {
  return usuarios.filter((usuario) => {
    const perfilNome = perfilNomeById.get(usuario.perfilId) ?? ""
    return !isAdminProfile(perfilNome)
  })
}

export function filterUsuarios(
  usuarios: Usuario[],
  filter: UsuarioFilter,
  search: string,
) {
  const byFilter = (() => {
    switch (filter) {
      case "ativos":
        return usuarios.filter((usuario) => usuario.ativo)
      case "inativos":
        return usuarios.filter((usuario) => !usuario.ativo)
      case USUARIO_TIPOS.INTERNO:
      case USUARIO_TIPOS.EXTERNO:
        return usuarios.filter(
          (usuario) => normalizeUsuarioTipo(usuario.tipo) === filter,
        )
      case "todos":
      default:
        return usuarios
    }
  })()

  const query = search.trim().toLowerCase()

  if (!query) {
    return byFilter
  }

  return byFilter.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(query) ||
      usuario.email.toLowerCase().includes(query) ||
      usuario.tipo.toLowerCase().includes(query),
  )
}
