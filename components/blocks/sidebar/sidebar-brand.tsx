"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { APP_NAME } from "@/features/welcome/constants"
import { Building2Icon } from "lucide-react"

export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none rounded-lg">
          <div className="flex shrink-0 items-center justify-center rounded-lg bg-sidebar-primary p-[10px] text-sidebar-primary-foreground shadow-sm">
            <Building2Icon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-sidebar-foreground">{APP_NAME}</span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              Painel interno
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
