"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { BriefcaseBusinessIcon, HomeIcon, SettingsIcon } from "lucide-react"

import type { PublicUser } from "@/server/auth/auth.types"
import {
  ADMIN_ROLES_ROUTE,
  ADMIN_ROUTE,
  ADMIN_STATUS_ROUTE,
  ADMIN_TIPOS_ROUTE,
  ADMIN_USUARIOS_ROUTE,
} from "@/features/admin"
import { DASHBOARD_ROUTE } from "@/features/dashboard"
import { PROJETOS_ROUTE } from "@/features/projetos"
import { NavMain, type NavMainItem } from "@/components/blocks/sidebar/nav-main"
import { NavUser } from "@/components/blocks/sidebar/nav-user"
import { SidebarBrand } from "@/components/blocks/sidebar/sidebar-brand"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: PublicUser
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname()

  const navMainItems = React.useMemo<NavMainItem[]>(() => {
    const items: NavMainItem[] = [
      {
        title: "Início",
        url: DASHBOARD_ROUTE,
        icon: <HomeIcon />,
        isActive:
          pathname === DASHBOARD_ROUTE ||
          pathname.startsWith(`${DASHBOARD_ROUTE}/`),
      },
      {
        title: "Projetos",
        url: PROJETOS_ROUTE,
        icon: <BriefcaseBusinessIcon />,
        isActive:
          pathname === PROJETOS_ROUTE ||
          pathname.startsWith(`${PROJETOS_ROUTE}/`),
      },
      {
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
          {
            title: "Roles",
            url: ADMIN_ROLES_ROUTE,
            isActive:
              pathname === ADMIN_ROLES_ROUTE ||
              pathname.startsWith(`${ADMIN_ROLES_ROUTE}/`),
          },
          {
            title: "Status",
            url: ADMIN_STATUS_ROUTE,
            isActive:
              pathname === ADMIN_STATUS_ROUTE ||
              pathname.startsWith(`${ADMIN_STATUS_ROUTE}/`),
          },
          {
            title: "Tipos",
            url: ADMIN_TIPOS_ROUTE,
            isActive:
              pathname === ADMIN_TIPOS_ROUTE ||
              pathname.startsWith(`${ADMIN_TIPOS_ROUTE}/`),
          },
        ],
      },
    ]

    return items
  }, [pathname])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <SidebarBrand />
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
            </div>
            <SidebarTrigger className="shrink-0" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} label="" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
