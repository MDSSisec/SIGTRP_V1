"use client"

import React, { useLayoutEffect, useMemo, useRef, useState } from "react"
import { FileDown } from "lucide-react"
import StatusStepper from "@/components/StatusStepper/statusStepper"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  DESCRICAO_VISAO_GERAL,
  SESSOES_VISAO_GERAL_SLUG,
  SESSOES_VISAO_GERAL_TITLE,
  TITULO_DOCUMENTO_TRP,
  TITULO_VISAO_GERAL,
} from "@/features/projetos/constants/ted/visao-geral"
import { getFormSection } from "../sections-map"
import type { ProjectFormSectionProps } from "../sections-map"
import { COMUNS_TITLES } from "@/features/projetos/constants/ted/communs"
import type { StatusProjeto } from "@/features/projetos/constants/ted/project"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { STATUS_PROJETO_STEPS, getProjectStepIndex } from "@/features/projetos/services/project-ted.service"
import { formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import { exportVisaoGeralToPdf } from "./export-visao-geral-pdf"
import styles from "./visaoGeralDoProjeto.module.css"

const SECOES_VISAO_GERAL: { slug: string; title: string }[] = [
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_IDENTIFICACAO_PROJETO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_PROJETO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_IDENTIFICACAO_PROPOSTA, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_PROPOSTA },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_JUSTIFICATIVA_MOTIVACAO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_JUSTIFICATIVA_MOTIVACAO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_OBJETIVOS, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_OBJETIVOS },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_METAS, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_METAS },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_ETAPAS_CRONOGRAMA, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_ETAPAS_CRONOGRAMA },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_METODOLOGIA, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_METODOLOGIA },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_RESULTADOS_ESPERADOS, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_RESULTADOS_ESPERADOS },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_GESTAO_PROJETO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_GESTAO_PROJETO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_HISTORICO_SITUACAO_TERRITORIO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_HISTORICO_SITUACAO_TERRITORIO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_BASE_TERRITORIAL, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_BASE_TERRITORIAL },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_PUBLICO_BENEFICIARIO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_PUBLICO_BENEFICIARIO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_POVOS_COMUNIDADES_TRADICIONAIS, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_POVOS_COMUNIDADES_TRADICIONAIS },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_PERFIL_SOCIO_OCUPACIONAL, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_PERFIL_SOCIO_OCUPACIONAL },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_SERVICOS_ACESSADOS, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_SERVICOS_ACESSADOS },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_OUTRAS_INFORMACOES_PROPOSTA, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_OUTRAS_INFORMACOES_PROPOSTA },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_VALOR_TOTAL, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_VALOR_TOTAL },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_CRONOGRAMA_DESENBOLSO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_CRONOGRAMA_DESENBOLSO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DETALHAMENTO_ORCAMENTO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DETALHAMENTO_ORCAMENTO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_RESUMO_PLANO_APLICACAO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_RESUMO_PLANO_APLICACAO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_PROCEDIMENTOS_MONITORAMENTO, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_PROCEDIMENTOS_MONITORAMENTO },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_INDICADORES_EFICIENCIA, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_INDICADORES_EFICIENCIA },
  { slug: SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_OBSERVACOES, title: SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_OBSERVACOES },
]

function applyReadOnly(el: HTMLElement) {
  el.querySelectorAll("input, textarea, select").forEach((node) => {
    const n = node as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    n.setAttribute("readonly", "")
    n.setAttribute("disabled", "")
    n.setAttribute("tabIndex", "-1")
  })
  el.querySelectorAll("button").forEach((node) => {
    const btn = node as HTMLButtonElement
    btn.style.display = "none"
  })
  el.querySelectorAll("[contenteditable]").forEach((node) => {
    (node as HTMLElement).setAttribute("contenteditable", "false")
  })
}

function ReadOnlyWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    applyReadOnly(el)
    const observer = new MutationObserver(() => applyReadOnly(el))
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.readOnlyWrapper}>
      {children}
    </div>
  )
}

export function VisaoGeralDoProjeto({ projectId }: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const pdfExportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const status = (projectData?.status as StatusProjeto | undefined) ?? "TRP em Elaboração"

  const currentStep = useMemo(
    () => getProjectStepIndex(projectData ?? { status }),
    [projectData, status],
  )

  const handleExportPDF = async () => {
    if (!projectId || !pdfExportRef.current) return

    setIsExporting(true)

    try {
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
      await exportVisaoGeralToPdf(
        pdfExportRef.current,
        `TRP_projeto-${projectId}_visao-geral.pdf`,
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className={formLayoutStyles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>{TITULO_VISAO_GERAL}</h2>
          <GenericButton
            variant="outline"
            size="sm"
            icon={FileDown}
            onClick={handleExportPDF}
            disabled={isExporting || !projectId}
          >
            {isExporting ? "Exportando..." : COMUNS_TITLES.TITLE_EXPORTAR_PDF}
          </GenericButton>
        </div>
        <p className={styles.description}>{DESCRICAO_VISAO_GERAL}</p>
      </div>

      <div
        ref={pdfExportRef}
        data-visao-geral-pdf-root
        className={styles.pdfExportRoot}
      >
        <div className={styles.statusCard}>
          {projectId && (
            <StatusStepper
              steps={STATUS_PROJETO_STEPS}
              currentStep={currentStep}
              collapsible
              collapsibleLabel="Status do projeto"
              forceExpanded={isExporting}
            />
          )}
        </div>

        <div className={styles.documentHeader}>
          <h1 className={styles.documentTitle}>{TITULO_DOCUMENTO_TRP}</h1>
        </div>

        <div className={styles.sectionsWrapper}>
          {SECOES_VISAO_GERAL.map(({ slug }) => {
            const FormSection = getFormSection(slug)
            if (!FormSection) return null

            return (
              <section key={slug} id={`secao-${slug}`} className={styles.section}>
                <div className={styles.sectionContent}>
                  <ReadOnlyWrapper>
                    <FormSection projectId={projectId} readOnlyView />
                  </ReadOnlyWrapper>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
