"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import styles from "./IdentificacaoResponsavelTecnico.module.css"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import { IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS, IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS } from "@/features/projetos/constants/ted/identificacao-responsavel-tecnico"
import { COMUNS_LABELS } from "@/features/projetos/constants/ted/communs"
import {
  fetchTedIdentificacao,
  saveTedIdentificacaoResponsavelTecnico,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"
import type { ProjectFormSectionProps } from "../../sections-map"

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
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoResponsavelTecnico>(VAZIO_RT)

  // Controla se o campo email já foi tocado (para só mostrar erro após interação)
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

    if (name === COMUNS_LABELS.LABEL_CELULAR) {
      value = formatTelefone(value)
    } else if (name === "telefone") {
      value = formatTelefoneFixo(value)
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

  const isLocked = readOnlyView || !isEditing
  const emailInvalido = emailTocado && dadosFormulario.email.length > 0 && !emailValido(dadosFormulario.email)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_NOME}
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="cargo" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_CARGO}
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={dadosFormulario.cargo}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CARGO}
              className={styles.input}
              disabled={isLocked}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefone" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_TELEFONE}</Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={styles.input}
                maxLength={14}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="celular" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_CELULAR}</Label>
              <Input
                id="celular"
                name={COMUNS_LABELS.LABEL_CELULAR}
                value={dadosFormulario.celular}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CELULAR}
                className={styles.input}
                maxLength={15}
                disabled={isLocked}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="email" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_EMAIL}
            </Label>
            <Input
              id="email"
              name={IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_EMAIL}
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              onBlur={() => setEmailTocado(true)}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={`${styles.input} ${emailInvalido ? styles.inputError : ""}`}
              disabled={isLocked}
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