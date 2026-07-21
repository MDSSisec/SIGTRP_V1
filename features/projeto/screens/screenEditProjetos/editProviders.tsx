"use client"

import { useMemo, type ReactNode } from "react"

import { CronogramaProvider } from "@/features/projeto/contexts/cronograma/CronogramaContext"
import type { CronogramaData } from "@/features/projeto/contexts/cronograma/types"
import { ProjectDataProvider } from "@/features/projeto/contexts/project-data-context"
import { TedReviewProvider } from "@/features/projeto/contexts/ted-review-context"
import { mapModeloCronogramaToForm } from "@/features/projeto/services/project-ted.service"

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
 * Todos os projetos compartilham o `ProjectDataProvider`, o
 * `CronogramaProvider` e o `TedReviewProvider` (bloquear / marcar atenção).
 */
export function EditProviders({
  projeto,
  projectId,
  secaoId,
  children,
}: EditProvidersProps) {
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

  return (
    <ProjectDataProvider
      projectId={projectId}
      projectData={projectData}
    >
      <TedReviewProvider projetoId={projectId} secaoSlug={secaoId}>
        <CronogramaProvider initialData={initialCronograma}>
          {children}
        </CronogramaProvider>
      </TedReviewProvider>
    </ProjectDataProvider>
  )
}