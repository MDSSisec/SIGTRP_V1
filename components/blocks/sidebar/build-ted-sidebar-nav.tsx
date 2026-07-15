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
  ScaleIcon,
  UsersIcon,
} from "lucide-react"

import {
  getModeloConfig,
  type ModeloProjetoConfig,
} from "@/features/projeto/config/modelos"
import { PROJETOS_ROUTE } from "@/features/projeto/constants"
import type { ProjetoTipo } from "@/features/projeto/constants/projeto-tipos"
import {
  getProjetoEditSectionPath,
  parseProjetoEditPath,
} from "@/features/projeto/utils/projeto-routes"

import type { NavMainItem } from "./nav-main"

const GROUP_ICONS: Record<string, ReactNode> = {
  "Visão Geral do Projeto": <HomeIcon />,
  "Dados Gerais do Projeto": <ClipboardListIcon />,
  "I - Identificação": <FingerprintIcon />,
  Identificação: <FingerprintIcon />,
  "II - Descrição do Projeto": <FileTextIcon />,
  "Descrição do Projeto": <FileTextIcon />,
  "III - Participantes e Abrangência do Projeto": <UsersIcon />,
  Participantes: <UsersIcon />,
  "IV - Caracterização do(a) proponente": <Building2Icon />,
  "V - Dados Financeiros": <CalculatorIcon />,
  Planilhas: <CalculatorIcon />,
  "VI - Monitoramento e Avaliação": <BarChart3Icon />,
  Monitoramento: <BarChart3Icon />,
  "Prestação de Contas": <ScaleIcon />,
  Observações: <MessageCircleIcon />,
}

export { parseProjetoEditPath }

/** Compatível com `/editar` e com a rota antiga `/ted`. */
export function parseProjetoTedPath(
  pathname: string,
): { projectId: string } | null {
  const edit = parseProjetoEditPath(pathname)
  if (edit) return edit

  const match = pathname.match(
    new RegExp(`^${PROJETOS_ROUTE}/([^/]+)/ted/?$`),
  )
  if (!match?.[1]) return null
  return { projectId: match[1] }
}

/**
 * Monta o menu de edição a partir de `features/projeto/config/modelos`
 * (mesma árvore de `features/projeto/forms`). Conteúdo vazio → página em branco.
 */
export function buildProjetoEditNavItems(
  projectId: string,
  tipoProjeto: ProjetoTipo,
  activeSecao?: string | null,
): NavMainItem[] {
  const config = getModeloConfig(tipoProjeto)
  const secao = activeSecao || config.defaultSecao

  return config.groups.map((group) => {
    const groupDisabled = Boolean(group.disabled)

    const items = group.sections.map((item) => {
      const itemDisabled = groupDisabled || Boolean(item.disabled)

      return {
        title: item.title,
        url: getProjetoEditSectionPath(projectId, item.id),
        isActive: !itemDisabled && secao === item.id,
        disabled: itemDisabled,
      }
    })

    const isActive = !groupDisabled && items.some((item) => item.isActive)

    return {
      title: group.title,
      url:
        items[0]?.url ??
        getProjetoEditSectionPath(projectId, config.defaultSecao),
      icon: GROUP_ICONS[group.title] ?? <FileTextIcon />,
      isActive,
      disabled: groupDisabled,
      items,
    }
  })
}

/** @deprecated Use buildProjetoEditNavItems */
export function buildProjectTedNavItems(
  projectId: string,
  activeSecao?: string,
): NavMainItem[] {
  return buildProjetoEditNavItems(projectId, "TED", activeSecao)
}

export function getModeloNavLabel(config: ModeloProjetoConfig): string {
  return `Formulário ${config.label}`
}
