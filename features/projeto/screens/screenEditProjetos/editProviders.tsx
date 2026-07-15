"use client"

import { useMemo, type ReactNode } from "react"

import { CronogramaProvider } from "@/features/projeto/contexts/cronograma/CronogramaContext"
import type { CronogramaData } from "@/features/projeto/contexts/cronograma/types"
import { ProjectDataProvider } from "@/features/projeto/contexts/project-data-context"
import { TedReviewProvider } from "@/features/projeto/contexts/ted-review-context"
import { mapModeloCronogramaToForm } from "@/features/projeto/services/project-ted.service"

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