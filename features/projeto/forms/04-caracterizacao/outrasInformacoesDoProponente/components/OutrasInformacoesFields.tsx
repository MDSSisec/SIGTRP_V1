"use client"

import type { ChangeEvent } from "react"

import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"
import { cn } from "@/lib/utils"

import {
  OUTRAS_INFORMACOES_IDS,
  OUTRAS_INFORMACOES_LABELS,
  OUTRAS_INFORMACOES_MAX_LENGTH,
  OUTRAS_INFORMACOES_PLACEHOLDERS,
} from "../constants/form"
import type { DadosOutrasInformacoes } from "../types/outras-informacoes-form"
import styles from "../outras-informacoes-do-proponente.module.css"

const TITULO_SECAO = PROJETO_SECOES.outrasInformacoesProponente.title

type OutrasInformacoesFieldsProps = {
  dados: DadosOutrasInformacoes
  isLocked: boolean
  fieldClass: (campoKey: string, extra?: string) => string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export function OutrasInformacoesFields({
  dados,
  isLocked,
  fieldClass,
  onChange,
}: OutrasInformacoesFieldsProps) {
  const length = dados.texto.length
  const isNearLimit = length >= OUTRAS_INFORMACOES_MAX_LENGTH * 0.9

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{TITULO_SECAO}</h2>

      <div className={styles.fieldGroup}>
        <CampoReviewLabel
          htmlFor={OUTRAS_INFORMACOES_IDS.ID_TEXTO}
          campoKey="texto"
          className={styles.label}
        >
          {OUTRAS_INFORMACOES_LABELS.LABEL_CAMPO}
        </CampoReviewLabel>

        <div className={styles.textareaWrap}>
          <textarea
            id={OUTRAS_INFORMACOES_IDS.ID_TEXTO}
            name="texto"
            value={dados.texto}
            onChange={onChange}
            rows={8}
            maxLength={OUTRAS_INFORMACOES_MAX_LENGTH}
            placeholder={OUTRAS_INFORMACOES_PLACEHOLDERS.PLACEHOLDER_CAMPO}
            className={cn(fieldClass("texto"), styles.textareaWithCounter)}
            disabled={isLocked}
            aria-describedby="outras-informacoes-contador"
          />

          <span
            id="outras-informacoes-contador"
            className={cn(
              styles.charCounter,
              isNearLimit && styles.charCounterWarn,
              length >= OUTRAS_INFORMACOES_MAX_LENGTH &&
                styles.charCounterLimit,
            )}
            aria-live="polite"
          >
            {length}/{OUTRAS_INFORMACOES_MAX_LENGTH}
          </span>
        </div>
      </div>
    </section>
  )
}
