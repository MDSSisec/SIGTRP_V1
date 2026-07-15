"use client"

import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projeto/components/formShared/form-section"
import type { ProjectFormSectionProps } from "@/features/projetos/components/project-ted/forms/sections-map"
import { SESSOES_VISAO_GERAL_SLUG } from "@/features/projetos/constants/ted/visao-geral"

import { DadosGeraisStatusStepper } from "./shared/DadosGeraisStatusStepper"

type BlankGeneralSectionProps = ProjectFormSectionProps & {
  title: string
  activeSlug: string
}

function BlankGeneralSection({ title, activeSlug }: BlankGeneralSectionProps) {
  return (
    <div className={formLayoutStyles.page}>
      <DadosGeraisStatusStepper activeSlug={activeSlug} />
      <FormSectionCard>
        <h2 className={formLayoutStyles.title}>{title}</h2>
      </FormSectionCard>
    </div>
  )
}

export function DespesasEtapa11({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1"
      activeSlug={SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_ETAPA_1_1}
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}

export function DespesasEtapa12({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Estruturação e Equipamento dos Espaços — Etapa 1.2"
      activeSlug={SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_ETAPA_1_2}
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}

export function DespesasEventoFinal({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Celebração, Certificação e Encerramento — Etapa Final"
      activeSlug={SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DESPESAS_EVENTO_FINAL}
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}
