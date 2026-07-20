import { BriefcaseBusinessIcon, HomeIcon, SettingsIcon } from "lucide-react"

import {
  ADMIN_ROUTE,
  ADMIN_USUARIOS_ROUTE,
} from "@/features/admin"
import { DASHBOARD_ROUTE } from "@/features/dashboard"
import { PROJETOS_ROUTE } from "@/features/projeto"
import type { PublicUser } from "@/features/login/types"

import type { NavMainItem } from "./nav-main"
import {
  canAccessSidebarNav,
  SIDEBAR_NAV,
} from "./sidebar-nav-rules"

export function buildSidebarNavItems(
  user: PublicUser,
  pathname: string,
): NavMainItem[] {
  const items: NavMainItem[] = []

  if (canAccessSidebarNav(user, SIDEBAR_NAV.INICIO)) {
    items.push({
      title: "Início",
      url: DASHBOARD_ROUTE,
      icon: <HomeIcon />,
      isActive:
        pathname === DASHBOARD_ROUTE ||
        pathname.startsWith(`${DASHBOARD_ROUTE}/`),
    })
  }

  if (canAccessSidebarNav(user, SIDEBAR_NAV.PROJETOS)) {
    items.push({
      title: "Projetos",
      url: PROJETOS_ROUTE,
      icon: <BriefcaseBusinessIcon />,
      isActive:
        pathname === PROJETOS_ROUTE ||
        pathname.startsWith(`${PROJETOS_ROUTE}/`),
    })
  }

  if (canAccessSidebarNav(user, SIDEBAR_NAV.ADMINISTRADOR)) {
    items.push({
      title: "Administrador",
      url: ADMIN_USUARIOS_ROUTE,
      icon: <SettingsIcon />,
      isActive: pathname.startsWith(ADMIN_ROUTE),
      items: [
        {
          title: "Usuários",
          url: ADMIN_USUARIOS_ROUTE,
          isActive:
            pathname === ADMIN_USUARIOS_ROUTE ||
            pathname.startsWith(`${ADMIN_USUARIOS_ROUTE}/`),
        },
      ],
    })
  }

  return items
}
