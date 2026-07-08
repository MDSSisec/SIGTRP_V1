"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { useAsyncData } from "@/hooks/use-async-data"
import { CronogramaProvider } from "@/features/projetos/components/project-ted/forms/secao-2-descricao/CronogramaContext/CronogramaContext"
import type { CronogramaData } from "@/features/projetos/components/project-ted/forms/secao-2-descricao/etapas-cronograma/types"
import {
  DEFAULT_FORM_SECTION,
  PROJECT_FORM_SECTIONS,
} from "@/features/projetos/components/project-ted/forms"
import { PROJETO_TIPOS } from "@/features/projetos/constants/project-types"
import { useBreadcrumb } from "@/features/projetos/contexts/breadcrumb-context"
import { ProjectDataProvider } from "@/features/projetos/contexts/project-data-context"
import { fetchProjetos } from "@/features/projetos/services"
import {
  mapModeloCronogramaToForm,
  type ProjectModelData,
} from "@/features/projetos/services/project-ted.service"
import type { Projeto } from "@/features/projetos/types"

import styles from "./ProjectTEDEdit.module.css"

function buildProjectDataFromProjeto(projeto: Projeto): ProjectModelData {
  return {
    id: projeto.id as unknown as number,
    nome: projeto.nome,
    tipo: projeto.tipoProjeto,
    status: projeto.etapaNome ?? "TRP em Elaboração",
    etapaId: projeto.etapaId,
    etapaOrdem: projeto.etapaOrdem,
    responsavel: projeto.responsavelInternoNome,
    responsavelInternoId: projeto.responsavelInternoId,
    responsavelExternoId: projeto.responsavelExternoId,
    identificacao: {
      projeto: {
        nome: projeto.nome,
      },
    },
  }
}

export function ProjectTEDEditContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = (params?.id as string) ?? ""
  const secao = searchParams.get("secao") ?? DEFAULT_FORM_SECTION
  const { setProjectName } = useBreadcrumb()

  const {
    data: projetos,
    isLoading,
    error,
  } = useAsyncData(fetchProjetos, {
    initialData: [] as Projeto[],
    errorMessage: "Não foi possível carregar o projeto.",
  })

  const projeto = useMemo(
    () => projetos.find((item) => item.id === projectId),
    [projetos, projectId],
  )

  const FormSection = useMemo(
    () =>
      PROJECT_FORM_SECTIONS[secao] ??
      PROJECT_FORM_SECTIONS[DEFAULT_FORM_SECTION],
    [secao],
  )

  useEffect(() => {
    if (projeto?.nome) setProjectName(projeto.nome)
    return () => setProjectName(null)
  }, [projeto?.nome, setProjectName])

  const projectData = useMemo(() => {
    if (projeto?.tipoProjeto === PROJETO_TIPOS.TED) {
      return buildProjectDataFromProjeto(projeto)
    }

    return null
  }, [projeto])

  const initialCronograma: CronogramaData | undefined = projectData?.etapas_cronograma
    ? (mapModeloCronogramaToForm(projectData.etapas_cronograma) as CronogramaData)
    : undefined

  return (
    <AsyncLoadState
      isLoading={isLoading}
      error={error}
      loadingLabel="Carregando projeto..."
    >
      {!projeto && !isLoading ? (
        <p className="p-6 text-sm text-muted-foreground">
          Projeto não encontrado.
        </p>
      ) : (
        <ProjectDataProvider projectId={projectId} projectData={projectData}>
          <div className={styles.pageWrapper}>
            <div className="mb-4">
              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                className="bg-background"
                render={<Link href="/projetos" />}
              >
                <ArrowLeftIcon />
                Voltar para projetos
              </Button>
            </div>
            <div className={styles.formContainer}>
              <CronogramaProvider initialData={initialCronograma}>
                <FormSection projectId={projectId} />
              </CronogramaProvider>
            </div>
          </div>
        </ProjectDataProvider>
      )}
    </AsyncLoadState>
  )
}