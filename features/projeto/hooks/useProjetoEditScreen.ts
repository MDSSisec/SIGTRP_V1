"use client"

import { useEffect, useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"

import { useAsyncData } from "@/hooks/use-async-data"
import { useBreadcrumb } from "@/features/projeto/contexts/breadcrumb-context"
import {
  getModeloConfig,
  resolveModeloSecao,
} from "../config/modelos"
import { resolveSecaoComponent } from "../config/secoes/registry"
import { fetchProjetos } from "../services"
import type { Projeto } from "../types"

const LOAD_PROJECT_ERROR = "Não foi possível carregar o projeto."

export function useProjetoEditScreen() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = (params?.id as string) ?? ""
  const secaoParam = searchParams.get("secao")
  const { setProjectName } = useBreadcrumb()

  const {
    data: projetos,
    isLoading,
    error,
  } = useAsyncData(fetchProjetos, {
    initialData: [] as Projeto[],
    errorMessage: LOAD_PROJECT_ERROR,
  })

  const projeto = useMemo(
    () => projetos.find((item) => item.id === projectId) ?? null,
    [projetos, projectId],
  )

  const modelo = useMemo(
    () => (projeto ? getModeloConfig(projeto.tipoProjeto) : null),
    [projeto],
  )

  const secao = useMemo(() => {
    if (!projeto || !modelo) return null
    return resolveModeloSecao(projeto.tipoProjeto, secaoParam)
  }, [projeto, modelo, secaoParam])

  const FormSection = useMemo(() => {
    if (!secao || !modelo) return null
    return resolveSecaoComponent(secao, { modeloLabel: modelo.label })
  }, [secao, modelo])

  useEffect(() => {
    if (projeto?.nome) setProjectName(projeto.nome)
    return () => setProjectName(null)
  }, [projeto?.nome, setProjectName])

  return {
    projectId,
    projeto,
    modelo,
    secao,
    FormSection,
    isLoading,
    error,
  }
}
