export { DASHBOARD_ROUTE as AUTHENTICATED_HOME_ROUTE } from "@/features/dashboard"

export function isAdminProfile(perfilNome: string) {
  return perfilNome.trim().toLowerCase() === "administrador"
}
