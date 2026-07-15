"use client"

import type { ComponentType } from "react"

import IdentificacaoProjeto from "./01-identificacao/identificacaoDoProjeto/identidicacao-do-projeto"
import IdentificacaoProponente from "./01-identificacao/identificacaoDoProponente/identificacao-do-proponente"
import IdentificacaoRepresentanteLegal from "./01-identificacao/identificacaoDoRepresentanteLegal/identificacao-do-representante-legal"
import IdentificacaoResponsavelTecnico from "./01-identificacao/identificacaoDoResponsavelTecnico/identificacao-do-responsavel-tecnico"
import { DadosGeraisDoProjeto } from "./dados-gerais-do-projeto/dados-gerais"
import { DetalhamentoCursos } from "./dados-gerais-do-projeto/detalhamento-dos-cursos"
import type { ProjectFormSectionProps } from "./types"
import { InformacoesDoProjeto } from "./visao-geral/informacoes-do-projeto/informacoes-do-projeto"

export type { ProjectFormSectionProps }

/**
 * Seções com componente em `features/projeto/forms`.
 * (Visão geral fica só em `index.tsx` para evitar ciclo com `getFormSection`.)
 */
export const SECTIONS_WITHOUT_VISAO_GERAL: Record<
  string,
  ComponentType<ProjectFormSectionProps>
> = {
  "informacoes-projeto": InformacoesDoProjeto,
  "dados-gerais-projeto": DadosGeraisDoProjeto,
  "detalhamento-cursos": DetalhamentoCursos,
  "identificacao-projeto": IdentificacaoProjeto,
  "identificacao-proponente": IdentificacaoProponente,
  "identificacao-representante-legal": IdentificacaoRepresentanteLegal,
  "identificacao-responsavel-tecnico": IdentificacaoResponsavelTecnico,
}

export function getFormSection(
  slug: string,
): ComponentType<ProjectFormSectionProps> | undefined {
  return SECTIONS_WITHOUT_VISAO_GERAL[slug]
}
