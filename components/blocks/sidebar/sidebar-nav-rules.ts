import {
  ADMIN_ROUTE,
  ADMIN_USUARIOS_ROUTE,
} from "@/features/admin"
import { DASHBOARD_ROUTE } from "@/features/dashboard"
import { PROJETOS_ROUTE } from "@/features/projeto"
import type { PublicUser } from "@/features/login/types"

export const SIDEBAR_NAV = {
  INICIO: "inicio",
  PROJETOS: "projetos",
  ADMINISTRADOR: "administrador",
} as const

export type SidebarNavKey =
  (typeof SIDEBAR_NAV)[keyof typeof SIDEBAR_NAV]

const INTERNAV_ITEMS: SidebarNavKey[] = [
  SIDEBAR_NAV.INICIO,
  SIDEBAR_NAV.PROJETOS,
]

const ADMIN_ITEMS: SidebarNavKey[] = [
  SIDEBAR_NAV.INICIO,
  SIDEBAR_NAV.PROJETOS,
  SIDEBAR_NAV.ADMINISTRADOR,
]

const NAV_ROUTE_BY_KEY: Record<SidebarNavKey, string> = {
  [SIDEBAR_NAV.INICIO]: DASHBOARD_ROUTE,
  [SIDEBAR_NAV.PROJETOS]: PROJETOS_ROUTE,
  [SIDEBAR_NAV.ADMINISTRADOR]: ADMIN_ROUTE,
}

function normalizeTipo(tipo: string) {
  return tipo.trim().toLowerCase()
}

function canSeeAdminMenu(user: PublicUser) {
  return Boolean(user.isAdmin || user.isGestorProjeto)
}

export function getAllowedSidebarNavItems(user: PublicUser): SidebarNavKey[] {
  if (normalizeTipo(user.tipo) === "externo") {
    return [SIDEBAR_NAV.PROJETOS]
  }

  if (canSeeAdminMenu(user)) {
    return ADMIN_ITEMS
  }

  return INTERNAV_ITEMS
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

function canGestorAccessAdminPath(pathname: string) {
  return (
    pathname === ADMIN_ROUTE ||
    pathname === ADMIN_USUARIOS_ROUTE ||
    pathname.startsWith(`${ADMIN_USUARIOS_ROUTE}/`)
  )
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
    if (!canAccessSidebarNav(user, SIDEBAR_NAV.ADMINISTRADOR)) {
      return false
    }

    // Gestor do Projeto: só Usuários (não perfis/permissões/status).
    if (user.isGestorProjeto && !user.isAdmin) {
      return canGestorAccessAdminPath(pathname)
    }

    return true
  }

  return true
}
