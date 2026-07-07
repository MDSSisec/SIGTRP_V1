"use client"

import type { ComponentType } from "react"
import { VisaoGeralDoProjeto } from "./visao-geral/visaoGeralDoProjeto"
import { SECTIONS_WITHOUT_VISAO_GERAL } from "./sections-map"

export type { ProjectFormSectionProps } from "./sections-map"

/** Slug padrão quando nenhuma seção é informada (primeira tela) */
export const DEFAULT_FORM_SECTION = "visao-geral"

/** Mapeamento slug (query ?secao=) → componente do formulário TRP */
export const PROJECT_FORM_SECTIONS: Record<string, ComponentType<{ projectId?: string; readOnlyView?: boolean }>> = {
  "visao-geral": VisaoGeralDoProjeto,
  ...SECTIONS_WITHOUT_VISAO_GERAL,
}
