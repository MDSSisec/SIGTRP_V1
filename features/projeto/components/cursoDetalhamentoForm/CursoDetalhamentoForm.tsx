"use client"

import { Check, Pencil, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DetalhamentoGastosCurso,
  summarizeCursoDespesas,
} from "@/features/projeto/components/detalhamentoGastosCurso"
import type {
  CursoDespesaRow,
  CursoDetalhamentoDados,
} from "@/features/projetos/components/generalProjectData/types"
import { createDefaultCursoDespesas } from "@/features/projetos/components/generalProjectData/types"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { FORM_INPUT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import {
  notifyFormSaveError,
  notifyFormSaveSuccess,
} from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { parseCurrencyInput } from "@/features/projetos/utils/currency"
import { cn } from "@/lib/utils"

import styles from "./CursoDetalhamentoForm.module.css"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

type CourseFieldKey = Exclude<keyof CursoDetalhamentoDados, "id" | "despesas">

type CourseFieldConfig = {
  key: CourseFieldKey
  label: string
  type?: "text" | "number"
  min?: number
  max?: number
  maxLength?: number
  suffix?: string
  full?: boolean
}

const COURSE_FIELDS: CourseFieldConfig[] = [
  {
    key: "nomeCurso",
    label: "Nome do Curso",
    type: "text",
    maxLength: 255,
    full: true,
  },
  {
    key: "cargaHoraria",
    label: "Carga horária",
    type: "number",
    min: 1,
    suffix: "horas",
  },
  {
    key: "quantidadeParticipantes",
    label: "Quantidade de participantes",
    type: "number",
    min: 1,
  },
  {
    key: "cargaHorariaDiaria",
    label: "Carga horária diária",
    type: "number",
    min: 2,
    max: 8,
    suffix: "horas",
  },
  {
    key: "quantidadeDiasSemanais",
    label: "Quantidade de dias semanais",
    type: "number",
    min: 1,
    max: 5,
  },
  {
    key: "quantidadeTurmas",
    label: "Quantidade de turmas",
    type: "number",
    min: 1,
  },
  {
    key: "participantesPorTurma",
    label: "Quantidade de participantes por turma",
    type: "number",
    min: 1,
    max: 30,
  },
]

function normalizeCurso(value: CursoDetalhamentoDados): CursoDetalhamentoDados {
  return {
    ...value,
    despesas: Array.isArray(value.despesas)
      ? value.despesas
      : createDefaultCursoDespesas(),
  }
}

function validateDespesas(
  despesas: CursoDespesaRow[],
  courseNumber: number,
): string | null {
  for (let index = 0; index < despesas.length; index += 1) {
    const row = despesas[index]
    const rowNumber = index + 1

    if (!row.tipoItemDespesa) {
      return `Curso ${courseNumber}: selecione o tipo do item na despesa ${rowNumber}.`
    }
    if (!row.itemDespesa) {
      return `Curso ${courseNumber}: selecione o item na despesa ${rowNumber}.`
    }
    if (!row.codigoElementoDespesa) {
      return `Curso ${courseNumber}: selecione o elemento na despesa ${rowNumber}.`
    }
    if (!row.unidade) {
      return `Curso ${courseNumber}: selecione a unidade na despesa ${rowNumber}.`
    }

    const quantidade = Number(row.quantidadeItens)
    if (!Number.isInteger(quantidade) || quantidade < 1) {
      return `Curso ${courseNumber}: informe a quantidade na despesa ${rowNumber}.`
    }

    const valorUnitario = parseCurrencyInput(row.valorUnitario)
    if (valorUnitario === null || valorUnitario < 0) {
      return `Curso ${courseNumber}: informe o valor unitário na despesa ${rowNumber}.`
    }
  }

  return null
}

function validateCurso(
  curso: CursoDetalhamentoDados,
  courseNumber: number,
): string | null {
  if (!curso.nomeCurso.trim()) {
    return `Informe o nome do Curso ${courseNumber}.`
  }

  const numericFields: Array<[CourseFieldKey, string, number, number?]> = [
    ["cargaHoraria", "carga horária", 1],
    ["quantidadeParticipantes", "quantidade de participantes", 1],
    ["cargaHorariaDiaria", "carga horária diária", 2, 8],
    ["quantidadeDiasSemanais", "quantidade de dias semanais", 1, 5],
    ["quantidadeTurmas", "quantidade de turmas", 1],
    ["participantesPorTurma", "quantidade de participantes por turma", 1, 30],
  ]

  for (const [key, label, min, max] of numericFields) {
    const value = Number(curso[key])
    if (!Number.isInteger(value) || value < min || (max != null && value > max)) {
      return `Informe a ${label} válida do Curso ${courseNumber}.`
    }
  }

  return validateDespesas(curso.despesas, courseNumber)
}

export type CursoDetalhamentoFormProps = {
  courseNumber: number
  value: CursoDetalhamentoDados
  onSave: (value: CursoDetalhamentoDados) => void | Promise<void>
  readOnlyView?: boolean
}

export function CursoDetalhamentoForm({
  courseNumber,
  value,
  onSave,
  readOnlyView = false,
}: CursoDetalhamentoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [draft, setDraft] = useState<CursoDetalhamentoDados>(() =>
    normalizeCurso(value),
  )

  useEffect(() => {
    if (!isEditing) {
      setDraft(normalizeCurso(value))
      setSaveError(null)
    }
  }, [value, isEditing])

  const isLocked = readOnlyView || !isEditing
  const isViewMode = !isEditing

  const summary = useMemo(
    () =>
      summarizeCursoDespesas(
        draft.despesas,
        Number(draft.quantidadeParticipantes) || 0,
      ),
    [draft.despesas, draft.quantidadeParticipantes],
  )

  function handleFieldChange(key: CourseFieldKey, nextValue: string) {
    setSaveError(null)
    setDraft((current) => ({
      ...current,
      [key]: nextValue,
    }))
  }

  function handleDespesasChange(despesas: CursoDespesaRow[]) {
    setSaveError(null)
    setDraft((current) => ({
      ...current,
      despesas,
    }))
  }

  function handleCancel() {
    setDraft(normalizeCurso(value))
    setSaveError(null)
    setIsEditing(false)
  }

  async function handleSave() {
    const validationError = validateCurso(draft, courseNumber)
    if (validationError) {
      setSaveError(validationError)
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      await onSave(draft)
      setIsEditing(false)
      notifyFormSaveSuccess(`Curso ${courseNumber} salvo com sucesso!`)
    } catch (error) {
      setSaveError(
        notifyFormSaveError(
          error,
          `Não foi possível salvar o Curso ${courseNumber}.`,
        ),
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h3 className={styles.courseTitle}>Curso {courseNumber}</h3>
          <span className={styles.hint}>Campos obrigatórios marcados com *</span>
        </div>
      </header>

      <div className={styles.body}>
        <h4 className={styles.subsectionTitle}>2.1 — Dados gerais do curso</h4>

        <div className={styles.fieldsGrid}>
          {COURSE_FIELDS.map((field) => {
            const fieldId = `curso-${courseNumber}-${field.key}`
            const input = (
              <Input
                id={fieldId}
                name={fieldId}
                type={field.type ?? "text"}
                inputMode={field.type === "number" ? "numeric" : undefined}
                min={field.min}
                max={field.max}
                maxLength={field.maxLength}
                value={draft[field.key]}
                onChange={(event) =>
                  handleFieldChange(field.key, event.target.value)
                }
                className={cn(
                  FORM_INPUT_CLASS,
                  field.suffix && styles.inputWithSuffix,
                  isViewMode && VIEW_MODE_FIELD_CLASS,
                )}
                disabled={isLocked}
                required
              />
            )

            return (
              <div
                key={field.key}
                className={cn(
                  formLayoutStyles.fieldGroup,
                  field.full ? styles.fieldFull : undefined,
                )}
              >
                <Label htmlFor={fieldId} className={styles.required}>
                  {field.label}
                </Label>
                {field.suffix ? (
                  <div className={styles.suffixWrap}>
                    {input}
                    <span className={styles.suffix}>{field.suffix}</span>
                  </div>
                ) : (
                  input
                )}
              </div>
            )
          })}
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryStrip}>
          <div className={styles.summaryCard}>
            <span>Total de itens</span>
            <strong>{summary.totalItens}</strong>
          </div>
          <div className={styles.summaryCard}>
            <span>Valor total</span>
            <strong>{summary.valorTotalFormatado}</strong>
          </div>
          <div className={styles.summaryCard}>
            <span>Valor Kit Participante por Aluno</span>
            <strong>{summary.kitParticipantePorAluno}</strong>
          </div>
          {summary.temEpi ? (
            <div className={styles.summaryCard}>
              <span>Valor EPI por Aluno</span>
              <strong>{summary.epiPorAluno}</strong>
            </div>
          ) : null}
          {summary.temInsumos ? (
            <div className={styles.summaryCard}>
              <span>Valor Insumo por Aluno</span>
              <strong>{summary.insumosPorAluno}</strong>
            </div>
          ) : null}
          {summary.temKitTrabalho ? (
            <div className={styles.summaryCard}>
              <span>Valor Kit Trabalho por Aluno</span>
              <strong>{summary.kitTrabalhoPorAluno}</strong>
            </div>
          ) : null}
        </div>

        <DetalhamentoGastosCurso
          despesas={draft.despesas}
          onChange={handleDespesasChange}
          disabled={isLocked}
          isViewMode={isViewMode}
        />

        {!readOnlyView && (
          <div className={styles.actions}>
            {saveError ? (
              <p className={styles.saveError} role="alert">
                {saveError}
              </p>
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
      </div>
    </article>
  )
}
