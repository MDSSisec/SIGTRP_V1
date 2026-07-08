"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
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
import type { ProjectFormSectionProps } from "../../sections-map"

/** Em modo visualização: fundo branco e opacidade plena para o texto se destacar. */
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

function formatCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14)
}

function formatTelefone(value: string) {
  return value
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
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o representante legal.",
      )
    } finally {
      setIsSaving(false)
    }
  }

  const isLocked = readOnlyView || !isEditing
  const isViewMode = !isEditing
  const fieldClassName = cn(styles.input, isViewMode && VIEW_MODE_FIELD_CLASS)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="nome" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME}
              </Label>
              <Input
                id="nome"
                name="nome"
                value={dadosFormulario.nome}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_NOME}
                className={fieldClassName}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="cpf" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CPF}
              </Label>
              <Input
                id="cpf"
                name="cpf"
                value={dadosFormulario.cpf}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CPF}
                className={fieldClassName}
                maxLength={14}
                disabled={isLocked}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="profissao" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_PROFISSAO}
              </Label>
              <Input
                id="profissao"
                name="profissao"
                value={dadosFormulario.profissao}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_PROFISSAO}
                className={fieldClassName}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="cargo" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CARGO}
              </Label>
              <Input
                id="cargo"
                name="cargo"
                value={dadosFormulario.cargo}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CARGO}
                className={fieldClassName}
                disabled={isLocked}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="estadoCivil" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_ESTADO_CIVIL}
              </Label>
              <Input
                id="estadoCivil"
                name="estadoCivil"
                value={dadosFormulario.estadoCivil}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_ESTADO_CIVIL}
                className={fieldClassName}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="telefone" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_TELEFONE}
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={fieldClassName}
                maxLength={15}
                disabled={isLocked}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="email" className={styles.label}>
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_EMAIL}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={fieldClassName}
              disabled={isLocked}
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

export default FormularioIdentificacaoRepresentanteLegal
