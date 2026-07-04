"use client"

import { usePathname } from "next/navigation"

import { APP_NAME, WELCOME_TAGLINE } from "@/features/welcome/constants"

const PAGE_TITLES: Record<string, string> = {
  "/inicio": "Início",
  "/projetos": "Projetos",
  "/configuracoes": "Configurações",
  "/administracao/usuarios": "Usuários",
  "/administracao/roles": "Roles",
  "/administracao/status": "Status",
  "/administracao/tipos": "Tipos",
}

const PAGE_SUBTITLES: Record<string, string> = {
  "/inicio": `Bem-vindo ao ${APP_NAME}. ${WELCOME_TAGLINE}`,
  "/projetos": "Todos os projetos do sistema.",
  "/configuracoes": "Preferências do sistema.",
  "/administracao/usuarios": "Gerencie os usuários do sistema.",
  "/administracao/roles": "Configure roles e permissões de acesso.",
  "/administracao/status": "Gerencie os status dos projetos.",
  "/administracao/tipos": "Gerencie os tipos de projeto.",
}

export function AppPageHeader() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? ""
  const subtitle = PAGE_SUBTITLES[pathname]

  return (
    <header className="shrink-0 px-4 pt-4 md:px-6 md:pt-6">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </header>
  )
}
