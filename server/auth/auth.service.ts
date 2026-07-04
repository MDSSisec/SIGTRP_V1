import type { PublicUser } from "./auth.types"

export function authenticateUser(
  email: string,
  _password: string
): PublicUser {
  const normalizedEmail = email.trim().toLowerCase() || "usuario@org.gov.br"

  return {
    email: normalizedEmail,
    name:
      normalizedEmail === "usuario@org.gov.br"
        ? "Usuário"
        : formatNameFromEmail(normalizedEmail),
  }
}

function formatNameFromEmail(email: string) {
  const localPart = email.split("@")[0] ?? email

  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
