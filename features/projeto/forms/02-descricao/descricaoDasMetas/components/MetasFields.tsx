"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  METAS_LABELS,
  METAS_PLACEHOLDERS,
  METAS_TEXT,
  METAS_TITLE,
} from "@/features/projeto/constants/metas"

import { metaCampoKey } from "../constants/form"
import styles from "../descricao-das-metas.module.css"
import type { DadosMetas } from "../types/metas-form"

type MetasFieldsProps = {
  dados: DadosMetas
  isLocked: boolean
  canManageList: boolean
  fieldClass: (campoKey: string, extra?: string) => string
  onTituloChange: (indice: number, valor: string) => void
  onAdicionar: () => void
  onRemover: (indice: number) => void
}

/**
 * Campos da seção Metas.
 */
export function MetasFields({
  dados,
  isLocked,
  canManageList,
  fieldClass,
  onTituloChange,
  onAdicionar,
  onRemover,
}: MetasFieldsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{METAS_TITLE.TITLE_METAS}</h2>
        {canManageList ? (
          <Button variant="outline" size="sm" onClick={onAdicionar}>
            <Plus className="size-4" />
            {METAS_TEXT.ADICIONAR}
          </Button>
        ) : null}
      </div>

      {dados.metas.length === 0 ? (
        <p className={styles.emptyText}>{METAS_TEXT.EMPTY}</p>
      ) : (
        <div className={styles.list}>
          {dados.metas.map((meta, indice) => {
            const campoKey = metaCampoKey(indice)

            return (
              <div key={campoKey} className={styles.itemCard}>
                <CampoReviewLabel
                  htmlFor={`meta-${indice}`}
                  campoKey={campoKey}
                  className={styles.label}
                >
                  {METAS_LABELS.LABEL_META(indice)}
                </CampoReviewLabel>
                <Input
                  id={`meta-${indice}`}
                  value={meta.titulo}
                  onChange={(event) =>
                    onTituloChange(indice, event.target.value)
                  }
                  placeholder={METAS_PLACEHOLDERS.PLACEHOLDER_META}
                  className={fieldClass(campoKey)}
                  disabled={isLocked}
                />
                {canManageList && dados.metas.length > 1 ? (
                  <div className={styles.cardActions}>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemover(indice)}
                    >
                      <Trash2 className="size-4" />
                      {METAS_TEXT.EXCLUIR}
                    </Button>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
