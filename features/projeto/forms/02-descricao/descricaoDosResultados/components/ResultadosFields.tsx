"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  RESULTADOS_LABELS,
  RESULTADOS_PLACEHOLDERS,
  RESULTADOS_TEXT,
  RESULTADOS_TITLE,
} from "@/features/projeto/constants/resultados"

import {
  RESULTADO_MAX_LENGTH,
  resultadoCampoKey,
} from "../constants/form"
import styles from "../resultados-esperados.module.css"
import type { DadosResultados } from "../types/resultados-form"

type ResultadosFieldsProps = {
  dados: DadosResultados
  isLocked: boolean
  canManageList: boolean
  fieldClass: (campoKey: string, baseClass?: string, extra?: string) => string
  onChange: (indice: number, valor: string) => void
  onAdicionar: () => void
  onRemover: (indice: number) => void
}

/**
 * Campos da seção Resultados Esperados.
 */
export function ResultadosFields({
  dados,
  isLocked,
  canManageList,
  fieldClass,
  onChange,
  onAdicionar,
  onRemover,
}: ResultadosFieldsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{RESULTADOS_TITLE.TITLE}</h2>
        {canManageList ? (
          <Button variant="outline" size="sm" onClick={onAdicionar}>
            <Plus className="size-4" />
            {RESULTADOS_TEXT.ADICIONAR}
          </Button>
        ) : null}
      </div>

      <div className={styles.list}>
        {dados.resultados.map((texto, indice) => {
          const campoKey = resultadoCampoKey(indice)

          return (
            <div key={campoKey} className={styles.fieldGroup}>
              <CampoReviewLabel
                htmlFor={campoKey}
                campoKey={campoKey}
                className={styles.label}
              >
                {RESULTADOS_LABELS.LABEL_RESULTADO(indice)}
              </CampoReviewLabel>
              <Input
                id={campoKey}
                value={texto}
                onChange={(e) => onChange(indice, e.target.value)}
                placeholder={RESULTADOS_PLACEHOLDERS.PLACEHOLDER_RESULTADO}
                maxLength={RESULTADO_MAX_LENGTH}
                className={fieldClass(campoKey)}
                disabled={isLocked}
              />
              {canManageList && dados.resultados.length > 1 ? (
                <div className={styles.cardActions}>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemover(indice)}
                  >
                    <Trash2 className="size-4" />
                    {RESULTADOS_TEXT.EXCLUIR}
                  </Button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
