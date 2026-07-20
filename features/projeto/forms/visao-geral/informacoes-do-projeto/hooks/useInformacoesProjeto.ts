"use client"

import { getTipoProjetoLabel, mapProjectDataToInformacoesForm, mapProjetoToContextPatch, VAZIO_INFORMACOES_PROJETO, type DadosInformacoesProjeto } from "../types/informacoes-form"
import { fetchProjectStages, fetchResponsaveisExternos, fetchResponsaveisInternos, fetchTedIdentificacao } from "@/features/projeto/services"
import { useProjectData, useUpdateProjectData } from "@/features/projeto/contexts/project-data-context"
import { saveInformacoesProjeto, validateInformacoesProjeto } from "../action/saveInformacoesProjeto"
import { getItensConcluidosFromTedIdentificacao } from "@/features/projeto/utils/ted-preenchimento"
import { canEditProjetoInformacoes } from "@/features/projeto/domain/projeto.permissions"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projeto/constants/visao-geral"
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react"
import { buildEtapaSteps, resolveEtapaStepIndex } from "@/components/StatusStepper"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"
import { useTedSecaoReviews } from "@/features/projeto/hooks/useTedSecaoReviews"
import type { ResponsavelOption } from "@/features/projeto/types"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { useAsyncData } from "@/hooks/use-async-data"
import { ITENS_DADOS_GERAIS_TITLE_KEYS } from "../constants/form"

type UseInformacoesProjetoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function getItensPreenchidos() {
  return Object.entries(SESSOES_VISAO_GERAL_TITLE).filter(
    ([key]) => key !== "TITLE_SESSAO_OBSERVACOES",
  )
}

/**
 * Lógica do formulário de Informações do Projeto.
 *
 * - carrega etapas, responsáveis e identificação;
 * - controla edição/salvamento;
 * - resolve o stepper de etapas.
 */
export function useInformacoesProjeto({
  projectId,
  readOnlyView,
}: UseInformacoesProjetoOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosInformacoesProjeto>(
    VAZIO_INFORMACOES_PROJETO,
  )

  const { data: sessionUser } = useAsyncData(fetchSessionUser, {
    initialData: null as PublicUser | null,
    errorMessage: "Não foi possível carregar o usuário.",
  })

  const canEditInfo = useMemo(
    () => Boolean(sessionUser && canEditProjetoInformacoes(sessionUser)),
    [sessionUser],
  )

  const { data: etapas } = useAsyncData(fetchProjectStages, {
    initialData: [],
    errorMessage: "Não foi possível carregar as etapas do projeto.",
  })

  const { data: responsaveisInternos } = useAsyncData(
    fetchResponsaveisInternos,
    {
      initialData: [] as ResponsavelOption[],
      errorMessage: "Não foi possível carregar os responsáveis internos.",
    },
  )

  const { data: responsaveisExternos } = useAsyncData(
    fetchResponsaveisExternos,
    {
      initialData: [] as ResponsavelOption[],
      errorMessage: "Não foi possível carregar os responsáveis externos.",
    },
  )

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload: reloadIdentificacao } = useAsyncData(
    loadIdentificacao,
    {
      initialData: null as TedIdentificacao | null,
      errorMessage: "Não foi possível carregar o preenchimento das seções.",
      loadOnMount: Boolean(projectId),
    },
  )

  useEffect(() => {
    if (projectId) void reloadIdentificacao()
  }, [projectId, reloadIdentificacao])

  const { getReview, secaoTemAtencao } = useTedSecaoReviews(projectId)

  useEffect(() => {
    setDados(mapProjectDataToInformacoesForm(projectData))
  }, [projectData])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target
      setSaveError(null)
      setDados((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

  const cancel = useCallback(() => {
    setDados(mapProjectDataToInformacoesForm(projectData))
    setSaveError(null)
    setIsEditing(false)
  }, [projectData])

  const save = useCallback(async () => {
    if (!projectId) return

    const validationError = validateInformacoesProjeto(dados, canEditInfo)
    if (validationError) {
      setSaveError(validationError)
      return
    }

    setIsSaving(true)
    setSaveError(null)

    const result = await saveInformacoesProjeto(projectId, {
      responsavelInternoId: dados.responsavelInternoId,
      responsavelExternoId: dados.responsavelExternoId,
      ...(canEditInfo ? { etapaId: dados.etapaId } : {}),
    })

    if (!result.ok) {
      setSaveError(result.error)
      setIsSaving(false)
      return
    }

    updateProjectData(mapProjetoToContextPatch(result.data))
    setIsEditing(false)
    setIsSaving(false)
  }, [projectId, dados, canEditInfo, updateProjectData])

  const etapaSteps = useMemo(() => buildEtapaSteps(etapas), [etapas])

  const currentStep = useMemo(
    () =>
      resolveEtapaStepIndex(etapas, {
        etapaOrdem: projectData?.etapaOrdem,
        etapaNome: projectData?.status,
        status: projectData?.status,
      }),
    [etapas, projectData?.etapaOrdem, projectData?.status],
  )

  const tipoProjetoLabel = useMemo(
    () => getTipoProjetoLabel(projectData),
    [projectData],
  )

  const itensConcluidos = useMemo(
    () => getItensConcluidosFromTedIdentificacao(identificacao),
    [identificacao],
  )

  const { itensDadosGerais, itensDadosTrp } = useMemo(() => {
    const itens = getItensPreenchidos()
    const dadosGeraisKeys = new Set<string>(ITENS_DADOS_GERAIS_TITLE_KEYS)

    return {
      itensDadosGerais: itens.filter(([key]) => dadosGeraisKeys.has(key)),
      itensDadosTrp: itens.filter(([key]) => !dadosGeraisKeys.has(key)),
    }
  }, [])

  return {
    form: dados,
    meta: {
      projectId,
      etapas,
      etapaSteps,
      currentStep,
      tipoProjetoLabel,
      responsaveisInternos,
      responsaveisExternos,
      itensDadosGerais,
      itensDadosTrp,
      itensConcluidos,
      getReview,
      secaoTemAtencao,
    },
    ui: {
      isEditing,
      isSaving,
      saveError,
      canEditInfo,
      canStartEditing: canEditInfo && !readOnlyView,
      isInfoLocked: Boolean(readOnlyView) || !isEditing || !canEditInfo,
      isResponsaveisLocked: Boolean(readOnlyView) || !isEditing,
      isViewMode: !isEditing,
      showActions: !readOnlyView && canEditInfo,
    },
    actions: {
      handleChange,
      startEditing,
      cancel,
      save,
    },
  }
}
