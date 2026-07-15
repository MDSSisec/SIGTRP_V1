"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { AlertTriangle, Check, Lock, Pencil, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import StatusStepper, {
  buildEtapaSteps,
  resolveEtapaStepIndex,
} from "@/components/StatusStepper"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  formatProjetoTipoLabel,
  normalizeProjetoTipo,
  PROJETO_TIPOS,
} from "@/features/projetos/constants/project-types"
import { useProjectData, useUpdateProjectData } from "@/features/projetos/contexts/project-data-context"
import {
  SESSOES_VISAO_GERAL_TITLE,
  TITULO_INFORMACOES_PROJETO,
  DESCRICAO_INFORMACOES_PROJETO,
} from "@/features/projetos/constants/ted/visao-geral"
import {
  fetchProjectStages,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
  fetchTedIdentificacao,
  updateProjetoInformacoes,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { TITLE_KEY_TO_SECAO_SLUG } from "@/features/projetos/constants/ted/secao-review"
import { getItensConcluidosFromTedIdentificacao } from "@/features/projetos/utils/ted-preenchimento"
import type { ProjectModelData } from "@/features/projetos/types/ted"
import type { Projeto, ResponsavelOption } from "@/features/projetos/types"
import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { FORM_CHECKBOX_CLASS, FORM_INPUT_CLASS, FORM_SELECT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { canEditProjetoInformacoes } from "@/features/projetos/domain/projetos.permissions"
import { useTedSecaoReviews } from "@/features/projetos/hooks/use-ted-secao-reviews"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"
import type { ProjectFormSectionProps } from "../sections-map"
import infoStyles from "./informacoesDoProjeto.module.css"

/** Em modo visualização: fundo branco e opacidade plena para o texto se destacar. */
const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

const ITENS_POR_COLUNA = 15

interface DadosInformacoesProjeto {
  etapaId: string
  responsavelInternoId: string
  responsavelExternoId: string
}

function getItensPreenchidos() {
  return Object.entries(SESSOES_VISAO_GERAL_TITLE).filter(
    ([key]) => key !== "TITLE_SESSAO_OBSERVACOES",
  )
}

const VAZIO: DadosInformacoesProjeto = {
  etapaId: "",
  responsavelInternoId: "",
  responsavelExternoId: "",
}

function getDadosIniciais(projectData: ProjectModelData | null): DadosInformacoesProjeto {
  if (!projectData) return VAZIO

  return {
    etapaId: String(projectData.etapaId ?? ""),
    responsavelInternoId: String(projectData.responsavelInternoId ?? ""),
    responsavelExternoId: String(projectData.responsavelExternoId ?? ""),
  }
}

function getTipoProjetoLabel(projectData: ProjectModelData | null): string {
  const tipo =
    normalizeProjetoTipo(String(projectData?.tipo ?? "")) ?? PROJETO_TIPOS.TED
  return formatProjetoTipoLabel(tipo)
}

function mapProjetoToContextPatch(projeto: Projeto): Partial<ProjectModelData> {
  return {
    tipo: projeto.tipoProjeto,
    status: projeto.etapaNome,
    etapaId: projeto.etapaId,
    etapaOrdem: projeto.etapaOrdem,
    responsavel: projeto.responsavelInternoNome,
    responsavelInternoId: projeto.responsavelInternoId,
    responsavelExternoId: projeto.responsavelExternoId,
  }
}

export function InformacoesDoProjeto({ projectId, readOnlyView }: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosInformacoesProjeto>(() =>
    getDadosIniciais(projectData),
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

  const { data: responsaveisInternos } = useAsyncData(fetchResponsaveisInternos, {
    initialData: [] as ResponsavelOption[],
    errorMessage: "Não foi possível carregar os responsáveis internos.",
  })

  const { data: responsaveisExternos } = useAsyncData(fetchResponsaveisExternos, {
    initialData: [] as ResponsavelOption[],
    errorMessage: "Não foi possível carregar os responsáveis externos.",
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload: reloadIdentificacao } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o preenchimento das seções.",
    loadOnMount: Boolean(projectId),
  })

  useEffect(() => {
    if (projectId) void reloadIdentificacao()
  }, [projectId, reloadIdentificacao])

  const { getReview, secaoTemAtencao } = useTedSecaoReviews(projectId)

  useEffect(() => {
    setDados(getDadosIniciais(projectData))
  }, [projectData])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSaveError(null)
    setDados((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId) return

    if (!dados.responsavelInternoId || !dados.responsavelExternoId) {
      setSaveError("Selecione os responsáveis interno e externo.")
      return
    }

    if (canEditInfo && !dados.etapaId) {
      setSaveError("Selecione o status do projeto.")
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      const projeto = await updateProjetoInformacoes(projectId, {
        responsavelInternoId: dados.responsavelInternoId,
        responsavelExternoId: dados.responsavelExternoId,
        ...(canEditInfo ? { etapaId: dados.etapaId } : {}),
      })

      updateProjectData(mapProjetoToContextPatch(projeto))
      setIsEditing(false)
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar as informações do projeto.",
      )
    } finally {
      setIsSaving(false)
    }
  }

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
  const [itensColunaEsquerda, itensColunaDireita] = useMemo(() => {
    const itens = getItensPreenchidos()
    return [itens.slice(0, ITENS_POR_COLUNA), itens.slice(ITENS_POR_COLUNA)]
  }, [])

  const isInfoLocked = readOnlyView || !isEditing || !canEditInfo
  const isResponsaveisLocked = readOnlyView || !isEditing
  const isViewMode = !isEditing

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>{TITULO_INFORMACOES_PROJETO}</h2>
        <p className={formLayoutStyles.subtitle}>{DESCRICAO_INFORMACOES_PROJETO}</p>
      </div>

      {projectId && etapaSteps.length > 0 && (
        <div className={infoStyles.statusCard}>
          <StatusStepper
            steps={etapaSteps}
            currentStep={currentStep}
            collapsible
            collapsibleLabel="Etapa do projeto"
          />
        </div>
      )}

      <FormSectionCard>
        <section className={formLayoutStyles.section}>
          <h2 className={formLayoutStyles.title}>Informações do Projeto</h2>
          {!canEditInfo && !readOnlyView ? (
            <p className="text-sm text-muted-foreground">
              Apenas administradores ou gestores internos do MDS podem alterar o status do projeto.
            </p>
          ) : null}
          <div className={formLayoutStyles.grid2}>
            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="tipoProjeto" className={formLayoutStyles.label}>
                Tipo do projeto
              </Label>
              <input
                id="tipoProjeto"
                type="text"
                value={tipoProjetoLabel}
                readOnly
                tabIndex={-1}
                className={cn(FORM_INPUT_CLASS, VIEW_MODE_FIELD_CLASS)}
              />
            </div>
            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="etapaId" className={formLayoutStyles.label}>
                Status
              </Label>
              <select
                id="etapaId"
                name="etapaId"
                value={dados.etapaId}
                onChange={handleChange}
                className={cn(
                  FORM_SELECT_CLASS,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isInfoLocked}
              >
                <option value="">Selecione...</option>
                {etapas.map((etapa) => (
                  <option key={etapa.id} value={etapa.id}>
                    {etapa.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className={formLayoutStyles.section}>
          <h2 className={formLayoutStyles.title}>Responsáveis</h2>
          <div className={formLayoutStyles.grid2}>
            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="responsavelInternoId" className={formLayoutStyles.label}>
                Usuário interno
              </Label>
              <select
                id="responsavelInternoId"
                name="responsavelInternoId"
                value={dados.responsavelInternoId}
                onChange={handleChange}
                className={cn(
                  FORM_SELECT_CLASS,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isResponsaveisLocked}
              >
                <option value="">Selecione...</option>
                {responsaveisInternos.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="responsavelExternoId" className={formLayoutStyles.label}>
                Usuário externo
              </Label>
              <select
                id="responsavelExternoId"
                name="responsavelExternoId"
                value={dados.responsavelExternoId}
                onChange={handleChange}
                className={cn(
                  FORM_SELECT_CLASS,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isResponsaveisLocked}
              >
                <option value="">Selecione...</option>
                {responsaveisExternos.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className={formLayoutStyles.section}>
          <h2 className={formLayoutStyles.title}>Itens Preenchidos</h2>
          <div className={formLayoutStyles.innerCard}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[itensColunaEsquerda, itensColunaDireita].map((coluna, colunaIndex) => (
                <div key={colunaIndex} className="flex min-w-0 flex-col gap-4">
                  {coluna.map(([key, title]) => {
                    const preenchido = itensConcluidos.has(key)
                    const slug = TITLE_KEY_TO_SECAO_SLUG[key]
                    const review = slug ? getReview(slug) : null
                    const precisaAtencao = slug
                      ? secaoTemAtencao(slug)
                      : false
                    const bloqueada = Boolean(review?.bloqueada)

                    return (
                      <div key={key} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={preenchido}
                          readOnly
                          className={`${FORM_CHECKBOX_CLASS} mt-0.5 shrink-0`}
                        />
                        <span
                          className={cn(
                            "flex min-w-0 flex-1 items-start gap-1.5 text-sm",
                            precisaAtencao
                              ? "font-medium text-destructive"
                              : "text-muted-foreground",
                          )}
                          title={
                            precisaAtencao
                              ? review?.comentario ?? "Precisa de atenção"
                              : bloqueada
                                ? "Seção bloqueada"
                                : undefined
                          }
                        >
                          <span className="min-w-0">{title}</span>
                          {precisaAtencao ? (
                            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                          ) : null}
                          {bloqueada ? (
                            <Lock className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
                          ) : null}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {!readOnlyView && canEditInfo && (
          <div className={formLayoutStyles.actions}>
            {saveError ? (
              <p className="mr-auto text-sm text-destructive">{saveError}</p>
            ) : null}
            {!isEditing ? (
              <GenericButton variant="editar" icon={Pencil} onClick={() => setIsEditing(true)}>
                Editar
              </GenericButton>
            ) : (
              <>
                <GenericButton
                  variant="outline"
                  icon={X}
                  disabled={isSaving}
                  onClick={() => {
                    setDados(getDadosIniciais(projectData))
                    setSaveError(null)
                    setIsEditing(false)
                  }}
                >
                  Cancelar
                </GenericButton>
                <GenericButton
                  variant="salvar"
                  icon={Check}
                  disabled={isSaving}
                  onClick={() => void handleSave()}
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </GenericButton>
              </>
            )}
          </div>
        )}
      </FormSectionCard>
    </div>
  )
}
