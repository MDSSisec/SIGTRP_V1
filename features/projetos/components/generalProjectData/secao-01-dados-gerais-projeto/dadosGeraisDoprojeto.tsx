"use client"

import { Check, Pencil, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  CursoDetalhamentoDados,
  DadosGeraisProjetoState,
} from "@/features/projetos/components/generalProjectData/types"
import { syncCursosByQuantidade } from "@/features/projetos/components/generalProjectData/types"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  FORM_CHECKBOX_CLASS,
  FORM_INPUT_CLASS,
} from "@/features/projetos/components/project-ted/shared/form-fields"
import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projeto/components/formShared/form-section"
import {
  notifyFormSaveError,
  notifyFormSaveSuccess,
} from "@/features/projetos/components/project-ted/shared/form-save-toast"
import type { ProjectFormSectionProps } from "@/features/projetos/components/project-ted/forms/sections-map"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projetos/contexts/project-data-context"
import { SESSOES_VISAO_GERAL_SLUG, SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projetos/utils/currency"
import { cn } from "@/lib/utils"

import { DadosGeraisStatusStepper } from "../shared/DadosGeraisStatusStepper"
import styles from "./dadosGeraisDoprojeto.module.css"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

type DadosGeraisForm = {
  custoTotalProjeto: string
  quantidadeCursos: string
  possuiEventoCertificacao: boolean
}

const VAZIO: DadosGeraisForm = {
  custoTotalProjeto: "",
  quantidadeCursos: "1",
  possuiEventoCertificacao: false,
}

function toForm(data: DadosGeraisProjetoState | null): DadosGeraisForm {
  if (!data) return VAZIO

  return {
    custoTotalProjeto: data.custoTotalProjeto,
    quantidadeCursos: String(data.quantidadeCursos),
    possuiEventoCertificacao: data.possuiEventoCertificacao,
  }
}

function readDadosGerais(
  projectData: Record<string, unknown> | null | undefined,
): DadosGeraisProjetoState | null {
  const raw = projectData?.dadosGeraisProjeto
  if (!raw || typeof raw !== "object") return null

  const data = raw as Partial<DadosGeraisProjetoState>
  const quantidade = Number(data.quantidadeCursos)
  if (!Number.isInteger(quantidade) || quantidade < 1) return null

  return {
    custoTotalProjeto: String(data.custoTotalProjeto ?? ""),
    quantidadeCursos: quantidade,
    possuiEventoCertificacao: Boolean(data.possuiEventoCertificacao),
  }
}

function readCursos(
  projectData: Record<string, unknown> | null | undefined,
): CursoDetalhamentoDados[] {
  const raw = projectData?.detalhamentoCursos
  if (!Array.isArray(raw)) return []
  return raw as CursoDetalhamentoDados[]
}

function validateForm(dados: DadosGeraisForm): string | null {
  const custo = parseCurrencyInput(dados.custoTotalProjeto)
  if (!dados.custoTotalProjeto.trim() || custo === null || custo < 0) {
    return "Informe o custo total do projeto."
  }

  const quantidade = Number(dados.quantidadeCursos)
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return "Informe a quantidade de cursos (mínimo 1)."
  }

  return null
}

export function DadosGeraisDoProjeto({
  readOnlyView,
}: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [savedData, setSavedData] = useState<DadosGeraisForm>(VAZIO)
  const [dadosFormulario, setDadosFormulario] = useState<DadosGeraisForm>(VAZIO)

  useEffect(() => {
    const loaded = toForm(
      readDadosGerais(projectData as Record<string, unknown> | null),
    )
    setSavedData(loaded)
    setDadosFormulario(loaded)
    setIsEditing(false)
    setSaveError(null)
  }, [projectData])

  const isLocked = readOnlyView || !isEditing
  const isViewMode = !isEditing

  function handleCurrencyChange(value: string) {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      custoTotalProjeto: formatCurrencyInput(value),
    }))
  }

  function handleQuantidadeChange(value: string) {
    setSaveError(null)
    const digits = value.replace(/\D/g, "")
    setDadosFormulario((prev) => ({
      ...prev,
      quantidadeCursos: digits,
    }))
  }

  function handleCheckboxChange(checked: boolean) {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      possuiEventoCertificacao: checked,
    }))
  }

  function handleCancel() {
    setDadosFormulario(savedData)
    setSaveError(null)
    setIsEditing(false)
  }

  async function handleSave() {
    const validationError = validateForm(dadosFormulario)
    if (validationError) {
      setSaveError(validationError)
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      const quantidadeCursos = Number(dadosFormulario.quantidadeCursos)
      const normalized: DadosGeraisForm = {
        ...dadosFormulario,
        quantidadeCursos: String(quantidadeCursos),
      }

      const dadosGeraisProjeto: DadosGeraisProjetoState = {
        custoTotalProjeto: normalized.custoTotalProjeto,
        quantidadeCursos,
        possuiEventoCertificacao: normalized.possuiEventoCertificacao,
      }

      const detalhamentoCursos = syncCursosByQuantidade(
        readCursos(projectData as Record<string, unknown> | null),
        quantidadeCursos,
      )

      updateProjectData({
        dadosGeraisProjeto,
        detalhamentoCursos,
      })

      setSavedData(normalized)
      setDadosFormulario(normalized)
      setIsEditing(false)
      notifyFormSaveSuccess("Dados gerais do projeto salvos com sucesso!")
    } catch (error) {
      setSaveError(
        notifyFormSaveError(
          error,
          "Não foi possível salvar os dados gerais do projeto.",
        ),
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DADOS_GERAIS_PROJETO}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          Informe o orçamento total, a quantidade de cursos e se haverá evento de
          certificação.
        </p>
      </div>

      <DadosGeraisStatusStepper
        activeSlug={SESSOES_VISAO_GERAL_SLUG.SLUG_SESSAO_DADOS_GERAIS_PROJETO}
      />

      <FormSectionCard>
        <section className={formLayoutStyles.section}>
          <div className={formLayoutStyles.grid2}>
            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="custoTotalProjeto" className={styles.required}>
                Custo total do projeto
              </Label>
              <Input
                id="custoTotalProjeto"
                name="custoTotalProjeto"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="R$ 0,00"
                value={dadosFormulario.custoTotalProjeto}
                onChange={(event) => handleCurrencyChange(event.target.value)}
                className={cn(
                  FORM_INPUT_CLASS,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isLocked}
                required
              />
              <small className={styles.hint}>Formato monetário brasileiro.</small>
            </div>

            <div className={formLayoutStyles.fieldGroup}>
              <Label htmlFor="quantidadeCursos" className={styles.required}>
                Quantidade de cursos
              </Label>
              <Input
                id="quantidadeCursos"
                name="quantidadeCursos"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={dadosFormulario.quantidadeCursos}
                onChange={(event) => handleQuantidadeChange(event.target.value)}
                className={cn(
                  FORM_INPUT_CLASS,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isLocked}
                required
              />
              <small className={styles.hint}>
                A seção de cursos será criada conforme esta quantidade.
              </small>
            </div>
          </div>

          <div className={styles.checkCard}>
            <input
              id="possuiEventoCertificacao"
              name="possuiEventoCertificacao"
              type="checkbox"
              className={cn(FORM_CHECKBOX_CLASS, "mt-0.5")}
              checked={dadosFormulario.possuiEventoCertificacao}
              onChange={(event) => handleCheckboxChange(event.target.checked)}
              disabled={isLocked}
            />
            <Label htmlFor="possuiEventoCertificacao" className={styles.checkLabel}>
              Projeto irá possuir evento de entrega de certificado?
              <small>
                Ao marcar, a etapa de despesas do evento final será exibida e
                passará a ser validada.
              </small>
            </Label>
          </div>
        </section>

        {!readOnlyView && (
          <div className={formLayoutStyles.actions}>
            {saveError ? (
              <p className="mr-auto text-sm text-destructive">{saveError}</p>
            ) : null}
            {!isEditing ? (
              <GenericButton
                variant="editar"
                icon={Pencil}
                onClick={() => setIsEditing(true)}
              >
                Editar
              </GenericButton>
            ) : (
              <>
                <GenericButton
                  variant="outline"
                  icon={X}
                  disabled={isSaving}
                  onClick={handleCancel}
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

export default DadosGeraisDoProjeto
