"use client"

import type { ComponentType } from "react"

import { SECTIONS_WITHOUT_VISAO_GERAL as LEGACY_SECTIONS } from "@/features/projetos/components/project-ted/forms/sections-map"
import type { ProjectFormSectionProps } from "@/features/projetos/components/project-ted/forms/sections-map"

import IdentificacaoProjeto from "./01-identificacao/identificacaoDoProjeto/identidicacao-do-projeto"
import { InformacoesDoProjeto } from "./visao-geral/informacoes-do-projeto/informacoes-do-projeto"

export type { ProjectFormSectionProps }

/** Seções já migradas para `features/projeto/forms` (exceto visão geral — evita ciclo). */
const MIGRATED_SECTIONS: Record<string, ComponentType<ProjectFormSectionProps>> = {
  "informacoes-projeto": InformacoesDoProjeto,
  "identificacao-projeto": IdentificacaoProjeto,
}

/**
 * Mapa slug → componente.
 * Prefere forms do novo fluxo; demais seções usam o legado until migradas.
 */
export const SECTIONS_WITHOUT_VISAO_GERAL: Record<
  string,
  ComponentType<ProjectFormSectionProps>
> = {
  ...LEGACY_SECTIONS,
  ...MIGRATED_SECTIONS,
}

export function getFormSection(
  slug: string,
): ComponentType<ProjectFormSectionProps> | undefined {
  return SECTIONS_WITHOUT_VISAO_GERAL[slug]
}
