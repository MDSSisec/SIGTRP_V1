"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import styles from "./IdentificacaoResponsavelTecnico.module.css"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import {
  IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS,
  IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS,
} from "@/features/projetos/constants/ted/identificacao-responsavel-tecnico"
import { COMUNS_LABELS } from "@/features/projetos/constants/ted/communs"
import {
  fetchTedIdentificacao,
  saveTedIdentificacaoResponsavelTecnico,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"
import { useTedReview } from "@/features/projetos/contexts/ted-review-context"
import {
  CampoReviewLabel,
  SecaoReviewBanner,
} from "@/features/projetos/components/project-ted/shared/secao-review-actions"
import type { ProjectFormSectionProps } from "../../sections-map"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

interface DadosIdentificacaoResponsavelTecnico {
  nome: string
  cargo: string
  telefone: string
  celular: string
  email: string
}

const VAZIO_RT: DadosIdentificacaoResponsavelTecnico = {
  nome: "",
  cargo: "",
  telefone: "",
  celular: "",
  email: "",
}

function formatTelefone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function formatTelefoneFixo(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 14)
}

function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function mapIdentificacaoToForm(
  identificacao: TedIdentificacao | null,
): DadosIdentificacaoResponsavelTecnico {
  if (!identificacao) return VAZIO_RT

  return {
    nome: identificacao.responsavelTecnicoNome ?? "",
    cargo: identificacao.responsavelTecnicoCargo ?? "",
    telefone: identificacao.responsavelTecnicoTelefone
      ? formatTelefoneFixo(identificacao.responsavelTecnicoTelefone)
      : "",
    celular: identificacao.responsavelTecnicoCelular
      ? formatTelefone(identificacao.responsavelTecnicoCelular)
      : "",
    email: identificacao.responsavelTecnicoEmail ?? "",
  }
}

function FormularioIdentificacaoResponsavelTecnico({
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
    useState<DadosIdentificacaoResponsavelTecnico>(VAZIO_RT)
  const [emailTocado, setEmailTocado] = useState(false)

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o responsável técnico.",
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

    if (name === COMUNS_LABELS.LABEL_CELULAR || name === "celular") {
      value = formatTelefone(value)
      name = "celular"
    } else if (name === "telefone") {
      value = formatTelefoneFixo(value)
    } else if (name === COMUNS_LABELS.LABEL_EMAIL || name === "email") {
      name = "email"
    }

    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const salvo = await saveTedIdentificacaoResponsavelTecnico(projectId, {
        responsavelTecnicoNome: dadosFormulario.nome,
        responsavelTecnicoCargo: dadosFormulario.cargo,
        responsavelTecnicoTelefone: dadosFormulario.telefone,
        responsavelTecnicoCelular: dadosFormulario.celular,
        responsavelTecnicoEmail: dadosFormulario.email,
      })

      setDadosFormulario(mapIdentificacaoToForm(salvo))
      setIsEditing(false)
      await reload()
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o responsável técnico.",
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
  const emailInvalido =
    emailTocado &&
    dadosFormulario.email.length > 0 &&
    !emailValido(dadosFormulario.email)

  const fieldClass = (campoKey: string, extra = "") =>
    cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewCtx?.isCampoAtencao(campoKey) &&
        "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5",
      extra,
    )

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="nome" campoKey="nome" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_NOME}
            </CampoReviewLabel>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={fieldClass("nome")}
              disabled={fieldDisabled}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="cargo" campoKey="cargo" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_CARGO}
            </CampoReviewLabel>
            <Input
              id="cargo"
              name="cargo"
              value={dadosFormulario.cargo}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CARGO}
              className={fieldClass("cargo")}
              disabled={fieldDisabled}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="telefone" campoKey="telefone" className={styles.label}>
                {COMUNS_LABELS.LABEL_NUMERO_DE_TELEFONE}
              </CampoReviewLabel>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={fieldClass("telefone")}
                maxLength={14}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="celular" campoKey="celular" className={styles.label}>
                {COMUNS_LABELS.LABEL_NUMERO_DE_CELULAR}
              </CampoReviewLabel>
              <Input
                id="celular"
                name="celular"
                value={dadosFormulario.celular}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CELULAR}
                className={fieldClass("celular")}
                maxLength={15}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="email" campoKey="email" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_EMAIL}
            </CampoReviewLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              onBlur={() => setEmailTocado(true)}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={fieldClass(
                "email",
                emailInvalido ? styles.inputError : "",
              )}
              disabled={fieldDisabled}
            />
            {emailInvalido && (
              <span className={styles.errorMessage}>
                Insira um e-mail válido contendo &quot;@&quot; e domínio.
              </span>
            )}
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

export default FormularioIdentificacaoResponsavelTecnico
