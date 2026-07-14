import type { ReactNode } from "react"
import {
  BarChart3Icon,
  Building2Icon,
  CalculatorIcon,
  ClipboardListIcon,
  FileTextIcon,
  FingerprintIcon,
  HomeIcon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react"

import { DEFAULT_FORM_SECTION } from "@/features/projetos/components/project-ted/forms"
import { TED_SIDEBAR_MENU_GROUPS } from "@/features/projetos/constants/ted/sidebar-menu"
import { PROJETOS_ROUTE } from "@/features/projetos/constants"

import type { NavMainItem } from "./nav-main"

const GROUP_ICONS: Record<string, ReactNode> = {
  "Visão Geral do Projeto": <HomeIcon />,
  "Dados Gerais do Projeto": <ClipboardListIcon />,
  Observações: <MessageCircleIcon />,
  "I - Identificação": <FingerprintIcon />,
  "II - Descrição do Projeto": <FileTextIcon />,
  "III - Participantes e Abrangência do Projeto": <UsersIcon />,
  "IV - Caracterização do(a) proponente": <Building2Icon />,
  "V - Dados Financeiros": <CalculatorIcon />,
  "VI - Monitoramento e Avaliação": <BarChart3Icon />,
}

export function parseProjetoTedPath(pathname: string): { projectId: string } | null {
  const match = pathname.match(new RegExp(`^${PROJETOS_ROUTE}/([^/]+)/ted/?$`))
  if (!match?.[1]) return null
  return { projectId: match[1] }
}

export function getProjetoTedSectionUrl(projectId: string, slug: string): string {
  return `${PROJETOS_ROUTE}/${projectId}/ted?secao=${encodeURIComponent(slug)}`
}

export function buildProjectTedNavItems(
  projectId: string,
  activeSecao: string = DEFAULT_FORM_SECTION,
): NavMainItem[] {
  const secao = activeSecao || DEFAULT_FORM_SECTION

  return TED_SIDEBAR_MENU_GROUPS.map((group) => {
    const groupDisabled = Boolean(group.disabled)

    const items = group.items.map((item) => {
      const itemDisabled = groupDisabled || Boolean(item.disabled)

      return {
        title: item.title,
        url: getProjetoTedSectionUrl(projectId, item.slug),
        isActive: !itemDisabled && secao === item.slug,
        disabled: itemDisabled,
      }
    })

    const isActive = !groupDisabled && items.some((item) => item.isActive)

    return {
      title: group.title,
      url: items[0]?.url ?? getProjetoTedSectionUrl(projectId, DEFAULT_FORM_SECTION),
      icon: GROUP_ICONS[group.title] ?? <FileTextIcon />,
      isActive,
      disabled: groupDisabled,
      items,
    }
  })
}
