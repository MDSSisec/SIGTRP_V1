"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  notifyFormSaveError,
  notifyFormSaveSuccess,
} from "@/features/projetos/components/project-ted/shared/form-save-toast"
import styles from "./IdentificacaoRepresentanteLegal.module.css"
import {
  IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS,
  IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS,
} from "@/features/projetos/constants/ted/identificacao-representante-legal"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import {
  fetchTedIdentificacao,
  saveTedIdentificacaoRepresentante,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"
import { useTedReview } from "@/features/projetos/contexts/ted-review-context"
import {
  CampoReviewLabel,
  SecaoReviewBanner,
} from "@/features/projeto/components/formShared/secao-review-actions"
import type { ProjectFormSectionProps } from "../../sections-map"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

interface DadosIdentificacaoRepresentanteLegal {
  nome: string
  cpf: string
  profissao: string
  cargo: string
  estadoCivil: string
  telefone: string
  email: string
}

const VAZIO_REP: DadosIdentificacaoRepresentanteLegal = {
  nome: "",
  cpf: "",
  profissao: "",
  cargo: "",
  estadoCivil: "",
  telefone: "",
  email: "",
}

function formatCpf(value: string | number) {
  return String(value)
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14)
}

function formatTelefone(value: string | number) {
  return String(value)
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function mapIdentificacaoToForm(
  identificacao: TedIdentificacao | null,
): DadosIdentificacaoRepresentanteLegal {
  if (!identificacao) return VAZIO_REP

  return {
    nome: identificacao.representanteNome ?? "",
    cpf: identificacao.representanteCpf
      ? formatCpf(identificacao.representanteCpf)
      : "",
    profissao: identificacao.representanteProfissao ?? "",
    cargo: identificacao.representanteCargo ?? "",
    estadoCivil: identificacao.representanteEstadoCivil ?? "",
    telefone: identificacao.representanteTelefone
      ? formatTelefone(identificacao.representanteTelefone)
      : "",
    email: identificacao.representanteEmail ?? "",
  }
}

function FormularioIdentificacaoRepresentanteLegal({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const reviewCtx = useTedReview()
  const canManageReview = Boolean(reviewCtx?.canManage)
  const review = reviewCtx?.review ?? null

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoRepresentanteLegal>(VAZIO_REP)

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o representante legal.",
    loadOnMount: Boolean(projectId),
  })

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    setDadosFormulario(mapIdentificacaoToForm(identificacao))
  }, [identificacao])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setSaveError(null)

    if (name === "cpf") {
      value = formatCpf(value)
    } else if (name === "telefone") {
      value = formatTelefone(value)
    } else if (
      name === "nome" ||
      name === "profissao" ||
      name === "cargo" ||
      name === "estadoCivil"
    ) {
      if (/\d/.test(value)) {
        alert(
          `O campo ${
            name === "profissao"
              ? "Profissão"
              : name === "cargo"
                ? "Cargo"
                : name === "estadoCivil"
                  ? "Estado Civil"
                  : "Nome"
          } não aceita números.`,
        )
        return
      }
    }

    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const salvo = await saveTedIdentificacaoRepresentante(projectId, {
        representanteNome: dadosFormulario.nome,
        representanteCpf: dadosFormulario.cpf,
        representanteProfissao: dadosFormulario.profissao,
        representanteCargo: dadosFormulario.cargo,
        representanteEstadoCivil: dadosFormulario.estadoCivil,
        representanteTelefone: dadosFormulario.telefone,
        representanteEmail: dadosFormulario.email,
      })

      setDadosFormulario(mapIdentificacaoToForm(salvo))
      setIsEditing(false)
      await reload()
      notifyFormSaveSuccess("Representante legal salvo com sucesso!")
    } catch (error) {
      setSaveError(
        notifyFormSaveError(
          error,
          "Não foi possível salvar o representante legal.",
        ),
      )
    } finally {
      setIsSaving(false)
    }
  }

  const isBlockedForUser = Boolean(review?.bloqueada) && !canManageReview
  const isLocked = readOnlyView || !isEditing || isBlockedForUser
  const isViewMode = !isEditing || isBlockedForUser
  const marking = Boolean(reviewCtx?.isMarkingAtencao)
  const canStartEditing =
    !readOnlyView && !isBlockedForUser && !marking
  const fieldDisabled = isLocked

  const fieldClass = (campoKey: string) =>
    cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewCtx?.isCampoAtencao(campoKey) &&
        "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5",
    )

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="nome" campoKey="nome" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME}
              </CampoReviewLabel>
              <Input
                id="nome"
                name="nome"
                value={dadosFormulario.nome}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_NOME}
                className={fieldClass("nome")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="cpf" campoKey="cpf" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CPF}
              </CampoReviewLabel>
              <Input
                id="cpf"
                name="cpf"
                value={dadosFormulario.cpf}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CPF}
                className={fieldClass("cpf")}
                maxLength={14}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="profissao" campoKey="profissao" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_PROFISSAO}
              </CampoReviewLabel>
              <Input
                id="profissao"
                name="profissao"
                value={dadosFormulario.profissao}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_PROFISSAO}
                className={fieldClass("profissao")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="cargo" campoKey="cargo" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CARGO}
              </CampoReviewLabel>
              <Input
                id="cargo"
                name="cargo"
                value={dadosFormulario.cargo}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CARGO}
                className={fieldClass("cargo")}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="estadoCivil" campoKey="estadoCivil" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_ESTADO_CIVIL}
              </CampoReviewLabel>
              <Input
                id="estadoCivil"
                name="estadoCivil"
                value={dadosFormulario.estadoCivil}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_ESTADO_CIVIL}
                className={fieldClass("estadoCivil")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="telefone" campoKey="telefone" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_TELEFONE}
              </CampoReviewLabel>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={fieldClass("telefone")}
                maxLength={15}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="email" campoKey="email" className={styles.label}>
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_EMAIL}
            </CampoReviewLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={fieldClass("email")}
              disabled={fieldDisabled}
            />
          </div>
        </div>
      </section>

      {!readOnlyView && (
        <div className={styles.actions}>
          {saveError ? (
            <p className="mr-auto text-sm text-destructive">{saveError}</p>
          ) : null}
          {!isEditing ? (
            canStartEditing ? (
              <GenericButton variant="editar" icon={Pencil} onClick={() => setIsEditing(true)}>
                Editar
              </GenericButton>
            ) : null
          ) : (
            <>
              <GenericButton
                variant="outline"
                icon={X}
                disabled={isSaving}
                onClick={() => {
                  setDadosFormulario(mapIdentificacaoToForm(identificacao))
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
    </div>
  )
}

export default FormularioIdentificacaoRepresentanteLegal
