"use client"

import { useMemo, type ReactNode } from "react"

import { CronogramaProvider } from "@/features/projetos/components/project-ted/forms/secao-2-descricao/CronogramaContext/CronogramaContext"
import type { CronogramaData } from "@/features/projetos/components/project-ted/forms/secao-2-descricao/etapas-cronograma/types"
import { ProjectDataProvider } from "@/features/projetos/contexts/project-data-context"
import { TedReviewProvider } from "@/features/projetos/contexts/ted-review-context"
import { mapModeloCronogramaToForm } from "@/features/projetos/services/project-ted.service"

import { PROJETO_TIPOS } from "../../constants/projeto-tipos"
import type { Projeto } from "../../types"
import { mapProjetoToProjectModel } from "./projeto-to-project-model"

type EditProvidersProps = {
  projeto: Projeto
  projectId: string
  secaoId: string
  children: ReactNode
}

/**
 * Agrupa todos os providers necessários para a tela de edição de projetos.
 *
 * Todos os projetos compartilham o `ProjectDataProvider` e o
 * `CronogramaProvider`. Projetos do tipo TED também recebem o
 * `TedReviewProvider`, responsável pelo fluxo de revisão das seções.
 */
export function EditProviders({
  projeto,
  projectId,
  secaoId,
  children,
}: EditProvidersProps) {
  const isTed = projeto.tipoProjeto === PROJETO_TIPOS.TED

  const projectData = useMemo(
    () => mapProjetoToProjectModel(projeto),
    [projeto],
  )

  const initialCronograma = useMemo(() => {
    if (!projectData.etapas_cronograma) {
      return undefined
    }

    return mapModeloCronogramaToForm(
      projectData.etapas_cronograma,
    ) as CronogramaData
  }, [projectData])

  const content = (
    <CronogramaProvider initialData={initialCronograma}>
      {children}
    </CronogramaProvider>
  )

  return (
    <ProjectDataProvider
      projectId={projectId}
      projectData={projectData}
    >
      {isTed ? (
        <TedReviewProvider
          projetoId={projectId}
          secaoSlug={secaoId}
        >
          {content}
        </TedReviewProvider>
      ) : (
        content
      )}
    </ProjectDataProvider>
  )
}