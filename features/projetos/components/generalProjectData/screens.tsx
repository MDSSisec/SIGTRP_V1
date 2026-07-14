"use client"

import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projetos/components/project-ted/shared/form-section"
import type { ProjectFormSectionProps } from "@/features/projetos/components/project-ted/forms/sections-map"

type BlankGeneralSectionProps = ProjectFormSectionProps & {
  title: string
}

function BlankGeneralSection({ title }: BlankGeneralSectionProps) {
  return (
    <FormSectionCard>
      <h2 className={formLayoutStyles.title}>{title}</h2>
    </FormSectionCard>
  )
}

export function DespesasEtapa11({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1"
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}

export function DespesasEtapa12({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Estruturação e Equipamento dos Espaços — Etapa 1.2"
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}

export function DespesasEventoFinal({ projectId, readOnlyView }: ProjectFormSectionProps) {
  return (
    <BlankGeneralSection
      title="Celebração, Certificação e Encerramento — Etapa Final"
      projectId={projectId}
      readOnlyView={readOnlyView}
    />
  )
}
