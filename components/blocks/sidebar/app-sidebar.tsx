"use client"

import * as React from "react"
import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import type { PublicUser } from "@/features/login/types"
import {
  fetchProjetos,
  getSidebarConfig,
} from "@/features/projeto/services"
import type { Projeto } from "@/features/projeto/types"
import { useAsyncData } from "@/hooks/use-async-data"
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

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: PublicUser
}

function AppSidebarNavigation({ user }: { user: PublicUser }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeSecao = searchParams.get("secao")

  const editPathMatch = pathname.match(/^\/projetos\/[^/]+\/(editar|ted)\/?$/)

  const { data: projetos } = useAsyncData(fetchProjetos, {
    initialData: [] as Projeto[],
    errorMessage: "Não foi possível carregar os projetos.",
    loadOnMount: Boolean(editPathMatch),
  })

  const projeto = React.useMemo(() => {
    if (!editPathMatch) return null
    const projectId = pathname.split("/")[2]
    return projetos.find((item) => item.id === projectId) ?? null
  }, [editPathMatch, pathname, projetos])

  const sidebarConfig = React.useMemo(
    () =>
      getSidebarConfig(pathname, {
        activeSecao,
        tipoProjeto: projeto?.tipoProjeto,
      }),
    [pathname, activeSecao, projeto?.tipoProjeto],
  )

  const navMainItems = React.useMemo(
    () => buildSidebarNavItems(user, pathname),
    [pathname, user],
  )

  if (sidebarConfig.mode === "projeto-edit") {
    if (!sidebarConfig.navMain) {
      return (
        <div className="px-2 py-3 text-sm text-sidebar-foreground/70">
          {projetos.length === 0
            ? "Carregando menu..."
            : "Projeto não encontrado."}
        </div>
      )
    }

    return (
      <NavMain
        items={sidebarConfig.navMain}
        label={sidebarConfig.label}
        sectionSpacing
      />
    )
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
