import { isAdminProfile } from "../constants"
import type { PublicUser } from "../types/public-user"
import { findUserByEmail } from "./users.repository"

function parseRoles(roles: string): number[] {
  try {
    const parsed = JSON.parse(roles) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((role): role is number => typeof role === "number")
  } catch {
    return []
  }
}

type AuthUserRecord = NonNullable<Awaited<ReturnType<typeof findUserByEmail>>>

export function toPublicUser(user: AuthUserRecord): PublicUser {
  const perfilNome = user.perfil_nome
  const isExterno = user.tipo.trim().toLowerCase() === "externo"

  return {
    id: user.id,
    email: user.email,
    name: user.nome,
    tipo: user.tipo,
    perfilId: user.perfil_id,
    perfilNome,
    roles: parseRoles(user.roles),
    isAdmin: !isExterno && isAdminProfile(perfilNome),
  }
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<PublicUser> {
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPassword = password.trim()

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Informe e-mail e senha.")
  }

  const user = await findUserByEmail(normalizedEmail)

  if (!user) {
    throw new Error("E-mail ou senha inválidos.")
  }

  if (!user.ativo) {
    throw new Error("Usuário inativo. Entre em contato com o administrador.")
  }

  if ((user.senha ?? "").trim() !== normalizedPassword) {
    throw new Error("E-mail ou senha inválidos.")
  }

  return toPublicUser(user)
}

export async function getAuthenticatedUserByEmail(email: string) {
  const user = await findUserByEmail(email)

  if (!user || !user.ativo) {
    return null
  }

  return toPublicUser(user)
}
