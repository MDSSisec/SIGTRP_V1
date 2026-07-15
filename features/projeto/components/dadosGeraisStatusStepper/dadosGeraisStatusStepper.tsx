"use client"

import { useMemo } from "react"

import StatusStepper from "@/components/StatusStepper/statusStepper"
import type { DadosGeraisProjetoState } from "@/features/projeto/types/general-project-data"
import {
  getDadosGeraisStepIndex,
  getDadosGeraisSteps,
} from "@/features/projeto/constants/dados-gerais-steps"
import { useProjectData } from "@/features/projeto/contexts/project-data-context"

import styles from "./dadosGeraisStatusStepper.module.css"

function readPossuiEventoCertificacao(
  projectData: Record<string, unknown> | null | undefined,
): boolean {
  const raw = projectData?.dadosGeraisProjeto
  if (!raw || typeof raw !== "object") return false
  return Boolean(
    (raw as Partial<DadosGeraisProjetoState>).possuiEventoCertificacao,
  )
}

type DadosGeraisStatusStepperProps = {
  activeSlug: string
}

export function DadosGeraisStatusStepper({
  activeSlug,
}: DadosGeraisStatusStepperProps) {
  const projectData = useProjectData()

  const includeEventoFinal = useMemo(
    () =>
      readPossuiEventoCertificacao(
        projectData as Record<string, unknown> | null,
      ),
    [projectData],
  )

  const steps = useMemo(
    () => getDadosGeraisSteps(includeEventoFinal),
    [includeEventoFinal],
  )

  const currentStep = useMemo(
    () => getDadosGeraisStepIndex(activeSlug, includeEventoFinal),
    [activeSlug, includeEventoFinal],
  )

  return (
    <div className={styles.statusCard}>
      <StatusStepper
        steps={steps}
        currentStep={currentStep}
        collapsible
        collapsibleLabel="Etapas dos dados gerais"
      />
    </div>
  )
}
