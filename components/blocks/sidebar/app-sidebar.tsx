"use client"

import * as React from "react"
import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import type { PublicUser } from "@/features/login/types"
import { DEFAULT_FORM_SECTION } from "@/features/projetos/components/project-ted/forms"
import { NavMain } from "@/components/blocks/sidebar/nav-main"
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
import { buildSidebarNavItems } from "./build-sidebar-nav-items"
import {
  buildProjectTedNavItems,
  parseProjetoTedPath,
} from "./build-ted-sidebar-nav"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: PublicUser
}

function AppSidebarNavigation({ user }: { user: PublicUser }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeSecao = searchParams.get("secao") ?? DEFAULT_FORM_SECTION

  const tedContext = React.useMemo(
    () => parseProjetoTedPath(pathname),
    [pathname],
  )

  const tedNavItems = React.useMemo(
    () =>
      tedContext
        ? buildProjectTedNavItems(tedContext.projectId, activeSecao)
        : null,
    [tedContext, activeSecao],
  )

  const navMainItems = React.useMemo(
    () => buildSidebarNavItems(user, pathname),
    [pathname, user],
  )

  if (tedNavItems) {
    return <NavMain items={tedNavItems} label="Formulário TRP" sectionSpacing />
  }

  return <NavMain items={navMainItems} label="" />
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
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
        <Suspense
          fallback={
            <div className="px-2 py-3 text-sm text-sidebar-foreground/70">
              Carregando menu...
            </div>
          }
        >
          <AppSidebarNavigation user={user} />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
