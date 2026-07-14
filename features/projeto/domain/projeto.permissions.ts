/**
 * Regras de autorização relacionadas aos projetos.
 */

import { USUARIO_TIPOS } from "@/features/admin/constants/users"
import type { PublicUser } from "@/features/login/types"

/**
 * Perfis internos autorizados a criar projetos.
 */
export const PROJETO_CREATE_PROFILE_IDS = [1, 5] as const

/**
 * Perfis internos autorizados a editar as informações gerais do projeto.
 */
export const PROJETO_EDIT_INFO_PROFILE_IDS = [1, 5] as const

/**
 * Verifica se o usuário pertence ao tipo informado.
 */
function isUserType(user: PublicUser, tipo: string): boolean {
  return user.tipo.trim().toLowerCase() === tipo
}

/**
 * Verifica se o usuário possui um dos perfis informados.
 */
function hasProfile(
  user: PublicUser,
  profiles: readonly number[],
): boolean {
  return profiles.includes(user.perfilId)
}

/**
 * Verifica se o usuário é interno.
 */
function isUsuarioInterno(user: PublicUser): boolean {
  return isUserType(user, USUARIO_TIPOS.INTERNO)
}

/**
 * Verifica se o usuário pode criar projetos.
 *
 * Apenas usuários internos com perfil autorizado possuem essa permissão.
 */
export function canCreateProjeto(user: PublicUser): boolean {
  return (
    isUsuarioInterno(user) &&
    hasProfile(user, PROJETO_CREATE_PROFILE_IDS)
  )
}

/**
 * Verifica se o usuário pode editar as informações do projeto.
 *
 * Administradores possuem acesso irrestrito.
 * Para os demais usuários, é necessário ser interno e possuir
 * um dos perfis autorizados.
 */
export function canEditProjetoInformacoes(
  user: PublicUser,
): boolean {
  if (user.isAdmin) {
    return true
  }

  return (
    isUsuarioInterno(user) &&
    hasProfile(user, PROJETO_EDIT_INFO_PROFILE_IDS)
  )
}

/**
 * Verifica se o usuário pode excluir projetos.
 *
 * Atualmente utiliza a mesma regra da criação de projetos.
 */
export function canDeleteProjeto(user: PublicUser): boolean {
  return canCreateProjeto(user)
}

/**
 * Verifica se o usuário é externo.
 */
export function isUsuarioExterno(user: PublicUser): boolean {
  return isUserType(user, USUARIO_TIPOS.EXTERNO)
}