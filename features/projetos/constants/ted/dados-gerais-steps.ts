import type { LucideIcon } from "lucide-react"
import {
  Award,
  Building2,
  ClipboardList,
  GraduationCap,
  Route,
} from "lucide-react"

import { SESSOES_VISAO_GERAL_SLUG, SESSOES_VISAO_GERAL_TITLE } from "./visao-geral"

export type DadosGeraisStep = {
  slug: string
  title: string
  shortTitle: string
  icon: LucideIcon
}

/** Etapas do fluxo de Dados Gerais (ícones + rótulos curtos para o StatusStepper). */
export const DADOS_GERAIS_STEPS: DadosGeraisStep[] = [
  {
    slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DADOS_GERAIS_PROJETO,
    title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DADOS_GERAIS_PROJETO,
    shortTitle: "Dados gerais",
    icon: ClipboardList,
  },
  {
    slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DETALHAMENTO_CURSOS,
    title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DETALHAMENTO_CURSOS,
    shortTitle: "Cursos",
    icon: GraduationCap,
  },
  {
    slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_ETAPA_1_1,
    title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_ETAPA_1_1,
    shortTitle: "Etapa 1.1",
    icon: Route,
  },
  {
    slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_ETAPA_1_2,
    title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_ETAPA_1_2,
    shortTitle: "Etapa 1.2",
    icon: Building2,
  },
  {
    slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_EVENTO_FINAL,
    title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_EVENTO_FINAL,
    shortTitle: "Evento final",
    icon: Award,
  },
]

export function getDadosGeraisSteps(
  includeEventoFinal = true,
): DadosGeraisStep[] {
  if (includeEventoFinal) return DADOS_GERAIS_STEPS

  return DADOS_GERAIS_STEPS.filter(
    (step) =>
      step.slug !== SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_EVENTO_FINAL,
  )
}

export function getDadosGeraisStepIndex(
  slug: string | null | undefined,
  includeEventoFinal = true,
): number {
  const steps = getDadosGeraisSteps(includeEventoFinal)
  const index = steps.findIndex((step) => step.slug === slug)
  return index >= 0 ? index : 0
}
