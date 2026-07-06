import { USUARIO_TIPOS } from "@/features/admin/constants/users"
import type { PublicUser } from "@/features/login/types"

export const PROJETO_CREATE_PROFILE_IDS = [1, 5] as const

export function canCreateProjeto(user: PublicUser): boolean {
  const isInterno =
    user.tipo.trim().toLowerCase() === USUARIO_TIPOS.INTERNO

  return (
    isInterno &&
    (PROJETO_CREATE_PROFILE_IDS as readonly number[]).includes(user.perfilId)
  )
}
