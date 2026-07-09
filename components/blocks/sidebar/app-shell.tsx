"use client"

import type { PublicUser } from "@/features/login/types"
import { AppPageHeader } from "@/components/blocks/sidebar/app-page-header"
import { PageHeaderActionProvider } from "@/components/blocks/sidebar/page-header-action"
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
      <SidebarInset className="min-h-svh min-w-0 overflow-x-hidden">
        <PageHeaderActionProvider>
          <AppPageHeader />
          <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden p-4 pt-2 md:gap-6 md:p-6 md:pt-4">
            {children}
          </div>
        </PageHeaderActionProvider>
      </SidebarInset>
    </SidebarProvider>
  )
}
