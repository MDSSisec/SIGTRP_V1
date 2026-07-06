"use client"

import { usePathname } from "next/navigation"

import { APP_NAME, WELCOME_TAGLINE } from "@/features/welcome/constants"
import { usePageHeaderSlot } from "./page-header-action"

const PAGE_TITLES: Record<string, string> = {
  "/inicio": "Início",
  "/projetos": "Projetos",
  "/configuracoes": "Configurações",
}

const PAGE_SUBTITLES: Record<string, string> = {
  "/inicio": `Bem-vindo ao ${APP_NAME}. ${WELCOME_TAGLINE}`,
  "/projetos": "Todos os projetos do sistema.",
  "/configuracoes": "Preferências do sistema.",
}

export function AppPageHeader() {
  const pathname = usePathname()
  const screenHeader = usePageHeaderSlot()
  const title = screenHeader?.title ?? PAGE_TITLES[pathname] ?? ""
  const subtitle = screenHeader?.subtitle ?? PAGE_SUBTITLES[pathname]
  const action = screenHeader?.action

  return (
    <header className="shrink-0 px-4 pt-4 md:px-6 md:pt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  )
}
