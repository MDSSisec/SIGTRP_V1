"use client"

import type { PublicUser } from "@/server/auth/auth.types"
import { AppPageHeader } from "@/components/blocks/sidebar/app-page-header"
import { AppSidebar } from "@/components/blocks/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type AppShellProps = {
  user: PublicUser
  children: React.ReactNode
}

export function AppShell({ user, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="h-svh max-h-svh overflow-hidden">
        <AppPageHeader />
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 pt-2 md:gap-6 md:p-6 md:pt-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
