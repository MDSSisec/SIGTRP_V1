"use client"

import type { ChangeEvent } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  OBJETIVOS_LABELS,
  OBJETIVOS_PLACEHOLDERS,
  OBJETIVOS_TEXT,
  OBJETIVOS_TITLE,
} from "@/features/projeto/constants/objetivos"

import { objetivoEspecificoCampoKey } from "../constants/form"
import styles from "../descricao-dos-objetivos.module.css"
import type { DadosObjetivos } from "../types/objetivos-form"

type ObjetivosFieldsProps = {
  dados: DadosObjetivos
  isLocked: boolean
  canManageList: boolean
  fieldClass: (campoKey: string, baseClass?: string, extra?: string) => string
  onObjetivoGeralChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onEspecificoChange: (indice: number, valor: string) => void
  onAdicionar: () => void
  onRemover: (indice: number) => void
}

/**
 * Campos da seção Objetivos.
 */
export function ObjetivosFields({
  dados,
  isLocked,
  canManageList,
  fieldClass,
  onObjetivoGeralChange,
  onEspecificoChange,
  onAdicionar,
  onRemover,
}: ObjetivosFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{OBJETIVOS_TITLE.TITLE_OBJETIVOS}</h2>

      <div className={styles.fieldGroup}>
        <CampoReviewLabel
          htmlFor="objetivoGeral"
          campoKey="objetivoGeral"
          className={styles.label}
        >
          {OBJETIVOS_LABELS.LABEL_OBJETIVO_GERAL}
        </CampoReviewLabel>
        <textarea
          id="objetivoGeral"
          name="objetivoGeral"
          value={dados.objetivoGeral}
          onChange={onObjetivoGeralChange}
          rows={4}
          placeholder={OBJETIVOS_PLACEHOLDERS.PLACEHOLDER_OBJETIVO_GERAL}
          className={fieldClass("objetivoGeral")}
          disabled={isLocked}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.subsectionHeader}>
          <span className={styles.label}>
            {OBJETIVOS_LABELS.LABEL_OBJETIVOS_ESPECIFICOS}
          </span>
          {canManageList ? (
            <Button variant="outline" size="sm" onClick={onAdicionar}>
              <Plus className="size-4" />
              {OBJETIVOS_TEXT.ADICIONAR}
            </Button>
          ) : null}
        </div>

        <div className={styles.list}>
          {dados.objetivosEspecificos.map((objetivo, indice) => {
            const campoKey = objetivoEspecificoCampoKey(indice)

            return (
              <div key={campoKey} className={styles.itemCard}>
                <CampoReviewLabel
                  htmlFor={`especifico-${indice}`}
                  campoKey={campoKey}
                  className={styles.label}
                >
                  {OBJETIVOS_LABELS.LABEL_OBJETIVO_ESPECIFICO(indice)}
                </CampoReviewLabel>
                <Input
                  id={`especifico-${indice}`}
                  value={objetivo}
                  onChange={(event) =>
                    onEspecificoChange(indice, event.target.value)
                  }
                  placeholder={
                    OBJETIVOS_PLACEHOLDERS.PLACEHOLDER_OBJETIVO_ESPECIFICO
                  }
                  className={fieldClass(campoKey, styles.input)}
                  disabled={isLocked}
                />
                {canManageList && dados.objetivosEspecificos.length > 1 ? (
                  <div className={styles.cardActions}>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemover(indice)}
                    >
                      <Trash2 className="size-4" />
                      {OBJETIVOS_TEXT.EXCLUIR}
                    </Button>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
