import { USUARIO_TIPOS } from "@/features/admin/constants/users"
import type { PublicUser } from "@/features/login/types"

export const PROJETO_CREATE_PROFILE_IDS = [1, 5] as const

/** Perfis internos autorizados a editar tipo/status em Informações do Projeto. */
export const PROJETO_EDIT_INFO_PROFILE_IDS = [1, 5] as const

export function canCreateProjeto(user: PublicUser): boolean {
  const isInterno =
    user.tipo.trim().toLowerCase() === USUARIO_TIPOS.INTERNO

  return (
    isInterno &&
    (PROJETO_CREATE_PROFILE_IDS as readonly number[]).includes(user.perfilId)
  )
}

/** Administrador ou gestor interno do MDS (perfis 1 e 5). */
export function canEditProjetoInformacoes(user: PublicUser): boolean {
  if (user.isAdmin) return true

  const isInterno =
    user.tipo.trim().toLowerCase() === USUARIO_TIPOS.INTERNO

  return (
    isInterno &&
    (PROJETO_EDIT_INFO_PROFILE_IDS as readonly number[]).includes(user.perfilId)
  )
}

export function canDeleteProjeto(user: PublicUser): boolean {
  return canCreateProjeto(user)
}

export function isUsuarioExterno(user: PublicUser): boolean {
  return user.tipo.trim().toLowerCase() === "externo"
}
