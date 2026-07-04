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
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <div className="flex shrink-0 items-center justify-center rounded-[4px] bg-sidebar-primary p-[10px] text-sidebar-primary-foreground">
            <Building2Icon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{APP_NAME}</span>
            <span className="truncate text-xs text-muted-foreground">
              Painel interno
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
