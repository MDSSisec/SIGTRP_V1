"use client"

import { Check, Pencil, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DetalhamentoGastosCurso,
  summarizeEtapaDespesas,
} from "@/features/projeto/components/detalhamentoGastosCurso"
import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projeto/components/formShared/form-section"
import {
  CampoReviewLabel,
  CAMPO_ATENCAO_CLASS,
  campoReviewVisualClasses,
} from "@/features/projeto/components/formShared/secao-review-actions"
import type { CursoDespesaRow } from "@/features/projeto/types/general-project-data"
import type { CatalogoItemEtapa } from "@/features/projeto/constants/catalogo-despesas-etapa-11"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { parseCurrencyInput } from "@/features/projeto/utils/currency"
import { cn } from "@/lib/utils"

import styles from "./CursoDetalhamentoForm.module.css"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground"

const MONTH_YEAR_RE = /^\d{2}\/\d{4}$/

function formatMonthYearInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 6)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export type EtapaDespesasFormValue = {
  inicioEtapa: string
  fimEtapa: string
  despesas: CursoDespesaRow[]
}

function normalizeValue(value: EtapaDespesasFormValue): EtapaDespesasFormValue {
  return {
    inicioEtapa: value?.inicioEtapa ?? "",
    fimEtapa: value?.fimEtapa ?? "",
    despesas: Array.isArray(value?.despesas) ? value.despesas : [],
  }
}

function validateEtapaDespesas(draft: EtapaDespesasFormValue): string | null {
  if (!MONTH_YEAR_RE.test(draft.inicioEtapa.trim())) {
    return "Informe o início da etapa no formato MM/AAAA."
  }
  if (!MONTH_YEAR_RE.test(draft.fimEtapa.trim())) {
    return "Informe o fim da etapa no formato MM/AAAA."
  }

  for (let index = 0; index < draft.despesas.length; index += 1) {
    const row = draft.despesas[index]
    const n = index + 1

    if (!row.itemDespesa) {
      return `Linha ${n}: selecione o item da despesa.`
    }
    if (!row.codigoElementoDespesa) {
      return `Linha ${n}: selecione o elemento.`
    }
    if (!row.unidade) {
      return `Linha ${n}: selecione a unidade.`
    }

    const quantidade = Number(row.quantidadeItens)
    if (!Number.isInteger(quantidade) || quantidade < 1) {
      return `Linha ${n}: informe a quantidade (mínimo 1).`
    }

    const valorUnitario = parseCurrencyInput(row.valorUnitario)
    if (valorUnitario === null || valorUnitario < 0) {
      return `Linha ${n}: informe o valor unitário.`
    }

    if (!row.fonteRecurso?.trim()) {
      return `Linha ${n}: selecione a fonte de recurso.`
    }
    if (!MONTH_YEAR_RE.test(row.inicioEtapa?.trim() ?? "")) {
      return `Linha ${n}: início deve estar no formato MM/AAAA.`
    }
    if (!MONTH_YEAR_RE.test(row.fimEtapa?.trim() ?? "")) {
      return `Linha ${n}: fim deve estar no formato MM/AAAA.`
    }
  }

  return null
}

export type EtapaDespesasFormProps = {
  tableTitle: string
  value: EtapaDespesasFormValue
  onSave: (value: EtapaDespesasFormValue) => void | Promise<void>
  readOnlyView?: boolean
  successMessage?: string
  /** Terceiro card do summary (POC: fonte ou tipo predominante). */
  summaryMeta?: { label: string; value: string }
  catalogoEtapa?: CatalogoItemEtapa[]
  fieldIdPrefix?: string
}

/**
 * Mesmo padrão visual do CursoDetalhamentoForm (card, summary, tabela, ações),
 * focado nas despesas de etapa (POC stage11/12/evento).
 */
export function EtapaDespesasForm({
  tableTitle,
  value,
  onSave,
  readOnlyView = false,
  successMessage = "Despesas da etapa salvas com sucesso!",
  summaryMeta = {
    label: "Fonte disponível",
    value: "SISEC / Contrapartida",
  },
  catalogoEtapa,
  fieldIdPrefix = "etapa",
}: EtapaDespesasFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [draft, setDraft] = useState<EtapaDespesasFormValue>(() =>
    normalizeValue(value),
  )

  useEffect(() => {
    if (!isEditing) {
      setDraft(normalizeValue(value))
      setSaveError(null)
    }
  }, [value, isEditing])

  const lock = useSecaoFormLock({ readOnlyView, isEditing })
  /** Bloqueio da seção não impede editar a tabela de despesas. */
  const canStartEditing = !readOnlyView && !lock.isMarkingAtencao
  const isTableLocked = Boolean(readOnlyView) || !isEditing
  const isTableViewMode = !isEditing

  function fieldClass(campoKey: string, baseClass?: string) {
    return cn(
      baseClass,
      campoReviewVisualClasses(
        {
          isCampoOkMuted: lock.isCampoOkMuted,
          isCampoViewMode: lock.isCampoViewMode,
          isCampoAtencao: (key) =>
            Boolean(lock.reviewContext?.isCampoAtencao(key)),
          viewModeClass: VIEW_MODE_FIELD_CLASS,
          attentionClass: CAMPO_ATENCAO_CLASS,
        },
        campoKey,
      ),
    )
  }

  const summary = useMemo(
    () => summarizeEtapaDespesas(draft.despesas),
    [draft.despesas],
  )

  function handlePeriodChange(
    key: "inicioEtapa" | "fimEtapa",
    rawValue: string,
  ) {
    const formatted = formatMonthYearInput(rawValue)
    setSaveError(null)
    setDraft((prev) => ({
      ...prev,
      [key]: formatted,
      despesas: prev.despesas.map((row) => ({
        ...row,
        [key]: formatted,
      })),
    }))
  }

  function handleDespesasChange(despesas: CursoDespesaRow[]) {
    setSaveError(null)
    setDraft((prev) => {
      const withPeriod = despesas.map((row) => ({
        ...row,
        inicioEtapa: row.inicioEtapa || prev.inicioEtapa,
        fimEtapa: row.fimEtapa || prev.fimEtapa,
      }))
      return { ...prev, despesas: withPeriod }
    })
  }

  function handleCancel() {
    setDraft(normalizeValue(value))
    setSaveError(null)
    setIsEditing(false)
  }

  async function handleSave() {
    const validationError = validateEtapaDespesas(draft)
    if (validationError) {
      setSaveError(validationError)
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      await onSave(draft)
      setIsEditing(false)
      notifySuccess(successMessage)
    } catch (error) {
      setSaveError(
        notifyError(error, "Não foi possível salvar as despesas da etapa."),
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <FormSectionCard className={styles.courseCard}>
      <h4 className={styles.subsectionTitle}>Período da etapa</h4>

      <div className={styles.fieldsGrid}>
        <div className={formLayoutStyles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={`${fieldIdPrefix}-inicio`}
            campoKey="inicioEtapa"
            className={styles.required}
          >
            Início da etapa
          </CampoReviewLabel>
          <Input
            id={`${fieldIdPrefix}-inicio`}
            type="text"
            inputMode="numeric"
            maxLength={7}
            placeholder="MM/AAAA"
            value={draft.inicioEtapa}
            disabled={lock.isCampoLocked("inicioEtapa")}
            className={fieldClass("inicioEtapa")}
            onChange={(event) =>
              handlePeriodChange("inicioEtapa", event.target.value)
            }
          />
        </div>
        <div className={formLayoutStyles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={`${fieldIdPrefix}-fim`}
            campoKey="fimEtapa"
            className={styles.required}
          >
            Fim da etapa
          </CampoReviewLabel>
          <Input
            id={`${fieldIdPrefix}-fim`}
            type="text"
            inputMode="numeric"
            maxLength={7}
            placeholder="MM/AAAA"
            value={draft.fimEtapa}
            disabled={lock.isCampoLocked("fimEtapa")}
            className={fieldClass("fimEtapa")}
            onChange={(event) =>
              handlePeriodChange("fimEtapa", event.target.value)
            }
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.summaryStrip}>
        <div className={styles.summaryCard}>
          <span>Itens adicionados</span>
          <strong>{summary.totalItens}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>Total da etapa</span>
          <strong>{summary.valorTotalFormatado}</strong>
        </div>
        <div className={styles.summaryCard}>
          <span>{summaryMeta.label}</span>
          <strong>{summaryMeta.value}</strong>
        </div>
      </div>

      <DetalhamentoGastosCurso
        variant="etapa"
        title={tableTitle}
        despesas={draft.despesas}
        onChange={handleDespesasChange}
        disabled={isTableLocked}
        isViewMode={isTableViewMode}
        catalogoEtapa={catalogoEtapa}
      />

      {!readOnlyView && (
        <div className={styles.actions}>
          {saveError ? (
            <p className={styles.saveError} role="alert">
              {saveError}
            </p>
          ) : null}
          {!isEditing ? (
            <Button
              variant="outline"
              disabled={!canStartEditing}
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="size-4" />
              Editar
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={isSaving}
                onClick={handleCancel}
              >
                <X className="size-4" />
                Cancelar
              </Button>
              <Button disabled={isSaving} onClick={() => void handleSave()}>
                <Check className="size-4" />
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </>
          )}
        </div>
      )}
    </FormSectionCard>
  )
}
