"use client"

import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useCallback, useEffect, useState } from "react"
import styles from "./IdentificacaoProjeto.module.css"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projetos/contexts/project-data-context"
import {
  IDENTIFICACAO_PROJETO_DESCRIPTIONS,
  IDENTIFICACAO_PROJETO_LABELS,
  IDENTIFICACAO_PROJETO_PLACEHOLDERS,
} from "@/features/projetos/constants/ted/identificacao-projeto"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  fetchTedIdentificacao,
  saveTedIdentificacaoProjeto,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"
import type { ProjectFormSectionProps } from "../../sections-map"

/** Em modo visualização: fundo branco e opacidade plena para o texto se destacar. */
const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

interface DadosIdentificacaoProjeto {
  nomeProjeto: string
  localExecucao: string
  duracao: string
  resumoProjeto: string
}

const VAZIO: DadosIdentificacaoProjeto = {
  nomeProjeto: "",
  localExecucao: "",
  duracao: "",
  resumoProjeto: "",
}

function mapIdentificacaoToForm(
  identificacao: TedIdentificacao | null,
  nomeProjeto: string,
): DadosIdentificacaoProjeto {
  if (!identificacao) return { ...VAZIO, nomeProjeto }

  return {
    nomeProjeto,
    localExecucao: identificacao.localExecucao ?? "",
    duracao: identificacao.duracao ?? "",
    resumoProjeto: identificacao.resumoProjeto ?? "",
  }
}

function FormularioIdentificacaoProjeto({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()
  const nomeProjeto = projectData?.nome ?? ""

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProjeto>(VAZIO)

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar a identificação do projeto.",
    loadOnMount: Boolean(projectId),
  })

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    setDadosFormulario(mapIdentificacaoToForm(identificacao, nomeProjeto))
  }, [identificacao, nomeProjeto])

  const aoAlterar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setSaveError(null)
    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const salvo = await saveTedIdentificacaoProjeto(projectId, {
        localExecucao: dadosFormulario.localExecucao,
        duracao: dadosFormulario.duracao,
        resumoProjeto: dadosFormulario.resumoProjeto,
      })

      if (salvo) {
        setDadosFormulario(mapIdentificacaoToForm(salvo, nomeProjeto))
        updateProjectData({
          identificacao: {
            ...projectData?.identificacao,
            projeto: {
              nome: nomeProjeto,
              local_execucao: salvo.localExecucao ?? "",
              duracao: salvo.duracao ?? "",
              resumo: salvo.resumoProjeto ?? "",
            },
          },
        })
      }

      setIsEditing(false)
      await reload()
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a identificação do projeto.",
      )
    } finally {
      setIsSaving(false)
    }
  }

  const isLocked = readOnlyView || !isEditing
  const isViewMode = !isEditing

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_PROJETO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nomeProjeto" className={styles.label}>
              {IDENTIFICACAO_PROJETO_LABELS.LABEL_NOME_PROJETO}
            </Label>
            <Input
              id="nomeProjeto"
              name="nomeProjeto"
              placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_NOME_PROJETO}
              value={dadosFormulario.nomeProjeto}
              className={cn(styles.input, VIEW_MODE_FIELD_CLASS)}
              readOnly
              disabled
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="localExecucao" className={styles.label}>
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_LOCAL_EXECUCAO}
              </Label>
              <Input
                id="localExecucao"
                name="localExecucao"
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_LOCAL_EXECUCAO}
                value={dadosFormulario.localExecucao}
                onChange={aoAlterar}
                className={cn(styles.input, isViewMode && VIEW_MODE_FIELD_CLASS)}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="duracao" className={styles.label}>
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_DURACAO}
              </Label>
              <Input
                id="duracao"
                name="duracao"
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_DURACAO}
                value={dadosFormulario.duracao}
                onChange={aoAlterar}
                className={cn(styles.input, isViewMode && VIEW_MODE_FIELD_CLASS)}
                disabled={isLocked}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          {IDENTIFICACAO_PROJETO_LABELS.LABEL_RESUMO_PROJETO}
        </h2>

        <div className={styles.fieldGroup}>
          <Label htmlFor="resumoProjeto" className={styles.label}>
            {IDENTIFICACAO_PROJETO_DESCRIPTIONS.DESCRIPTION_RESUMO_PROJETO}
          </Label>
          <textarea
            id="resumoProjeto"
            name="resumoProjeto"
            placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_RESUMO_PROJETO}
            value={dadosFormulario.resumoProjeto}
            onChange={aoAlterar}
            rows={6}
            className={cn(styles.textarea, isViewMode && VIEW_MODE_FIELD_CLASS)}
            disabled={isLocked}
          />
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
                  setDadosFormulario(mapIdentificacaoToForm(identificacao, nomeProjeto))
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

export default FormularioIdentificacaoProjeto
