"use client"

import type { ComponentType } from "react"

import { BlankSecao } from "./blank-secao"
import {
  SECTIONS_WITHOUT_VISAO_GERAL,
  type ProjectFormSectionProps,
} from "./sections-map"
import { VisaoGeralDoProjeto } from "./visao-geral/visao-geral-do-trp/visaa-geral-do-trp"

export type { ProjectFormSectionProps }
export { BlankSecao }

/** Slug padrão da tela de edição (primeiro item do menu). */
export const DEFAULT_FORM_SECTION = "informacoes-projeto"

/** Mapeamento slug (`?secao=`) → componente do formulário (somente novo fluxo). */
export const PROJECT_FORM_SECTIONS: Record<
  string,
  ComponentType<ProjectFormSectionProps>
> = {
  ...SECTIONS_WITHOUT_VISAO_GERAL,
  "visao-geral": VisaoGeralDoProjeto,
}
