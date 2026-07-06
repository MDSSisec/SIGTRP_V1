import { ADMIN_ROUTE } from "@/features/admin"
import { DASHBOARD_ROUTE } from "@/features/dashboard"
import { PROJETOS_ROUTE } from "@/features/projetos"
import type { PublicUser } from "@/features/login/types"

export const SIDEBAR_NAV = {
  INICIO: "inicio",
  PROJETOS: "projetos",
  ADMINISTRADOR: "administrador",
} as const

export type SidebarNavKey =
  (typeof SIDEBAR_NAV)[keyof typeof SIDEBAR_NAV]

const PROFILE_NAV_RULES = {
  administrador: [
    SIDEBAR_NAV.INICIO,
    SIDEBAR_NAV.PROJETOS,
    SIDEBAR_NAV.ADMINISTRADOR,
  ],
  proponente: [SIDEBAR_NAV.INICIO, SIDEBAR_NAV.PROJETOS],
  parceiro: [SIDEBAR_NAV.PROJETOS],
  consultor: [SIDEBAR_NAV.PROJETOS],
} as const satisfies Record<string, SidebarNavKey[]>

const NAV_ROUTE_BY_KEY: Record<SidebarNavKey, string> = {
  [SIDEBAR_NAV.INICIO]: DASHBOARD_ROUTE,
  [SIDEBAR_NAV.PROJETOS]: PROJETOS_ROUTE,
  [SIDEBAR_NAV.ADMINISTRADOR]: ADMIN_ROUTE,
}

function normalizeTipo(tipo: string) {
  return tipo.trim().toLowerCase()
}

function normalizePerfilNome(perfilNome: string) {
  return perfilNome.trim().toLowerCase()
}

export function getAllowedSidebarNavItems(user: PublicUser): SidebarNavKey[] {
  if (normalizeTipo(user.tipo) === "externo") {
    return [SIDEBAR_NAV.PROJETOS]
  }

  const perfil = normalizePerfilNome(user.perfilNome)

  if (perfil in PROFILE_NAV_RULES) {
    return [...PROFILE_NAV_RULES[perfil as keyof typeof PROFILE_NAV_RULES]]
  }

  return [SIDEBAR_NAV.PROJETOS]
}

export function canAccessSidebarNav(
  user: PublicUser,
  navKey: SidebarNavKey,
): boolean {
  return getAllowedSidebarNavItems(user).includes(navKey)
}

export function getDefaultAuthenticatedRoute(user: PublicUser): string {
  const allowedItems = getAllowedSidebarNavItems(user)
  const firstNavKey = allowedItems[0] ?? SIDEBAR_NAV.PROJETOS

  return NAV_ROUTE_BY_KEY[firstNavKey]
}

export function canAccessRoute(user: PublicUser, pathname: string): boolean {
  if (
    pathname === DASHBOARD_ROUTE ||
    pathname.startsWith(`${DASHBOARD_ROUTE}/`)
  ) {
    return canAccessSidebarNav(user, SIDEBAR_NAV.INICIO)
  }

  if (
    pathname === PROJETOS_ROUTE ||
    pathname.startsWith(`${PROJETOS_ROUTE}/`)
  ) {
    return canAccessSidebarNav(user, SIDEBAR_NAV.PROJETOS)
  }

  if (pathname.startsWith(ADMIN_ROUTE)) {
    return canAccessSidebarNav(user, SIDEBAR_NAV.ADMINISTRADOR)
  }

  return true
}
