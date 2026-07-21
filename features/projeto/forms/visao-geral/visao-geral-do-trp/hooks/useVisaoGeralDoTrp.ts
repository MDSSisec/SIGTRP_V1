"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  buildEtapaSteps,
  resolveEtapaStepIndex,
} from "@/components/StatusStepper"
import { VISAO_GERAL_ASSINATURA } from "@/features/projeto/constants/visao-geral"
import { useProjectData } from "@/features/projeto/contexts/project-data-context"
import {
  fetchEstados,
  fetchMunicipiosByUf,
  fetchProjectStages,
  fetchProjectSession01Identificacao,
} from "@/features/projeto/services"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"

import { exportVisaoGeralToPdf } from "../utils/export-visao-geral-pdf"

type UseVisaoGeralDoTrpOptions = {
  projectId?: string
}

/**
 * Resolve municÃ­pio/UF a partir dos cÃ³digos IBGE do proponente.
 */
async function resolveLocalProponente(
  identificacao: ProjectSession01Identificacao | null,
): Promise<string> {
  const ufIbge = identificacao?.proponenteUfIbge
  const municipioIbge = identificacao?.proponenteMunicipioIbge

  if (ufIbge == null || municipioIbge == null) {
    return VISAO_GERAL_ASSINATURA.LOCAL_VALOR_FALLBACK
  }

  const estados = await fetchEstados()
  const estado = estados.find((item) => item.id === ufIbge)
  if (!estado) {
    return VISAO_GERAL_ASSINATURA.LOCAL_VALOR_FALLBACK
  }

  const municipios = await fetchMunicipiosByUf(estado.sigla)
  const municipio = municipios.find((item) => item.id === municipioIbge)
  if (!municipio) {
    return VISAO_GERAL_ASSINATURA.LOCAL_VALOR_FALLBACK
  }

  return `${municipio.nome}/${estado.sigla}.`
}

/**
 * LÃ³gica da VisÃ£o Geral do TRP.
 *
 * - carrega etapas e resolve o stepper;
 * - carrega dados do representante legal e local do proponente;
 * - controla exportaÃ§Ã£o PDF.
 */
export function useVisaoGeralDoTrp({ projectId }: UseVisaoGeralDoTrpOptions) {
  const projectData = useProjectData()
  const pdfExportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [local, setLocal] = useState<string>(
    VISAO_GERAL_ASSINATURA.LOCAL_VALOR_FALLBACK,
  )

  const { data: etapas } = useAsyncData(fetchProjectStages, {
    initialData: [],
    errorMessage: "NÃ£o foi possÃ­vel carregar as etapas do projeto.",
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession01Identificacao(projectId)
  }, [projectId])

  const { data: identificacao } = useAsyncData(loadIdentificacao, {
    initialData: null as ProjectSession01Identificacao | null,
    errorMessage:
      "NÃ£o foi possÃ­vel carregar os dados do representante legal.",
    loadOnMount: Boolean(projectId),
  })

  useEffect(() => {
    let cancelled = false

    void resolveLocalProponente(identificacao)
      .then((valor) => {
        if (!cancelled) setLocal(valor)
      })
      .catch(() => {
        if (!cancelled) {
          setLocal(VISAO_GERAL_ASSINATURA.LOCAL_VALOR_FALLBACK)
        }
      })

    return () => {
      cancelled = true
    }
  }, [identificacao])

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

  const assinatura = useMemo(
    () => ({
      local,
      nome:
        identificacao?.representanteNome?.trim() ||
        VISAO_GERAL_ASSINATURA.NOME_REPRESENTANTE_FALLBACK,
      cargo:
        identificacao?.representanteCargo?.trim() ||
        VISAO_GERAL_ASSINATURA.CARGO_FUNCAO_FALLBACK,
    }),
    [local, identificacao?.representanteNome, identificacao?.representanteCargo],
  )

  const exportPdf = useCallback(async () => {
    if (!projectId || !pdfExportRef.current) return

    setIsExporting(true)

    try {
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(undefined)),
      )
      await exportVisaoGeralToPdf(
        pdfExportRef.current,
        `TRP_projeto-${projectId}_visao-geral.pdf`,
      )
    } finally {
      setIsExporting(false)
    }
  }, [projectId])

  return {
    meta: {
      projectId,
      etapaSteps,
      currentStep,
      assinatura,
    },
    ui: {
      isExporting,
      canExport: Boolean(projectId) && !isExporting,
      showStepper: Boolean(projectId) && etapaSteps.length > 0,
    },
    refs: {
      pdfExportRef,
    },
    actions: {
      exportPdf,
    },
  }
}
