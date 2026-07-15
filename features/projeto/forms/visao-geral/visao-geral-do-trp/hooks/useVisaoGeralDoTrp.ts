"use client"

import { useCallback, useMemo, useRef, useState } from "react"

import {
  buildEtapaSteps,
  resolveEtapaStepIndex,
} from "@/components/StatusStepper"
import { useProjectData } from "@/features/projeto/contexts/project-data-context"
import { fetchProjectStages } from "@/features/projeto/services"
import { useAsyncData } from "@/hooks/use-async-data"

import { exportVisaoGeralToPdf } from "../utils/export-visao-geral-pdf"

type UseVisaoGeralDoTrpOptions = {
  projectId?: string
}

/**
 * Lógica da Visão Geral do TRP.
 *
 * - carrega etapas e resolve o stepper;
 * - controla exportação PDF.
 */
export function useVisaoGeralDoTrp({ projectId }: UseVisaoGeralDoTrpOptions) {
  const projectData = useProjectData()
  const pdfExportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const { data: etapas } = useAsyncData(fetchProjectStages, {
    initialData: [],
    errorMessage: "Não foi possível carregar as etapas do projeto.",
  })

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
