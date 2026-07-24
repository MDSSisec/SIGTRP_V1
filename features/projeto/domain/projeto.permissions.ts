/**
 * Regras de autorização relacionadas aos projetos.
 */

import { USUARIO_TIPOS } from "@/features/admin/constants/users"
import type { PublicUser } from "@/features/login/types"

/**
 * Verifica se o usuário pertence ao tipo informado.
 */
function isUserType(user: PublicUser, tipo: string): boolean {
  return user.tipo.trim().toLowerCase() === tipo
}

/**
 * Verifica se o usuário pode criar projetos.
 *
 * Administradores e Gestores do Projeto (interno) possuem essa permissão.
 */
export function canCreateProjeto(user: PublicUser): boolean {
  return user.isAdmin || user.isGestorProjeto
}

/**
 * Verifica se o usuário pode editar as informações do projeto.
 *
 * Administradores e Gestores do Projeto possuem essa permissão.
 */
export function canEditProjetoInformacoes(user: PublicUser): boolean {
  return user.isAdmin || user.isGestorProjeto
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
