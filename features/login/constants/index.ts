export { DASHBOARD_ROUTE as AUTHENTICATED_HOME_ROUTE } from "@/features/dashboard"

export const REMEMBERED_LOGIN_EMAIL_KEY = "sigtrp:remembered-login-email"
export const REMEMBERED_LOGIN_PASSWORD_KEY = "sigtrp:remembered-login-password"

export function isAdminProfile(perfilNome: string) {
  return perfilNome.trim().toLowerCase() === "administrador"
}

/** Gestor do Projeto (ou nome legado "Gestor Interno"). */
export function isGestorProjetoProfile(perfilNome: string) {
  const nome = perfilNome.trim().toLowerCase()
  return nome === "gestor do projeto" || nome === "gestor interno"
}
