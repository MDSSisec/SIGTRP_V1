"use client"

import React, { useLayoutEffect, useMemo, useRef } from "react"
import { FileDown } from "lucide-react"
import { pdf } from "@react-pdf/renderer"
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
import { VisaoGeralPDF } from "./visaoGeralPDF"

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
    <div ref={ref} className="pointer-events-none select-none">
      {children}
    </div>
  )
}

export function VisaoGeralDoProjeto({ projectId }: ProjectFormSectionProps) {
  const projectData = useProjectData()

  const status = (projectData?.status as StatusProjeto | undefined) ?? "TRP em Elaboração"

  const projetoResumo = useMemo(() => {
    if (!projectData) return null

    return {
      nome: projectData.nome ?? "Projeto",
      responsavel: String(projectData.responsavel ?? ""),
      status,
      tipo: String(projectData.tipo ?? "TED"),
    }
  }, [projectData, status])

  const currentStep = useMemo(
    () => getProjectStepIndex(projectData ?? { status }),
    [projectData, status],
  )

  const handleExportPDF = async () => {
    if (!projetoResumo || !projectId) return

    const blob = await pdf(
      <VisaoGeralPDF
        projectId={projectId}
        nome={projetoResumo.nome}
        responsavel={projetoResumo.responsavel}
        status={projetoResumo.status}
        tipo={projetoResumo.tipo}
        secoes={SECOES_VISAO_GERAL}
      />
    ).toBlob()

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `TRP_projeto-${projectId}_visao-geral.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={formLayoutStyles.page}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={formLayoutStyles.title}>{TITULO_VISAO_GERAL}</h2>
          <GenericButton
            variant="outline"
            size="sm"
            icon={FileDown}
            onClick={handleExportPDF}
          >
            {COMUNS_TITLES.TITLE_EXPORTAR_PDF}
          </GenericButton>
        </div>
        <p className={formLayoutStyles.subtitle}>{DESCRICAO_VISAO_GERAL}</p>
      </div>

      <div className="space-y-4">
        {projectId && (
          <StatusStepper
            steps={STATUS_PROJETO_STEPS}
            currentStep={currentStep}
            collapsible
            collapsibleLabel="Status do projeto"
          />
        )}

        <div className={formLayoutStyles.card}>
          <h1 className="text-center text-base font-semibold text-black dark:text-white">
            {TITULO_DOCUMENTO_TRP}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {SECOES_VISAO_GERAL.map(({ slug }) => {
          const FormSection = getFormSection(slug)
          if (!FormSection) return null

          return (
            <section key={slug} id={`secao-${slug}`}>
              <ReadOnlyWrapper>
                <FormSection projectId={projectId} readOnlyView />
              </ReadOnlyWrapper>
            </section>
          )
        })}
      </div>
    </div>
  )
}