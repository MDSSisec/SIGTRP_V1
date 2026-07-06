"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import type { PublicUser } from "@/features/login/types"
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

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname()

  const navMainItems = React.useMemo(
    () => buildSidebarNavItems(user, pathname),
    [pathname, user],
  )

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
