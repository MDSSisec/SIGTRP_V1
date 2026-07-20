"use client"

import { cn } from "@/lib/utils"
import {
  HISTORICO_SITUACAO_FIELD,
  HISTORICO_SITUACAO_MAX_LENGTH,
  HISTORICO_SITUACAO_TITLE,
} from "@/features/projeto/constants/historico-situacao"

import type { DadosHistoricoSituacao } from "../types"
import styles from "../historico-e-situacao.module.css"

type HistoricoSituacaoFieldsProps = {
  dados: DadosHistoricoSituacao
  isLocked: boolean
  onChange: (value: string) => void
}

/**
 * Campo único de texto (máx. 1000 caracteres).
 */
export function HistoricoSituacaoFields({
  dados,
  isLocked,
  onChange,
}: HistoricoSituacaoFieldsProps) {
  const length = dados.texto.length
  const isNearLimit = length >= HISTORICO_SITUACAO_MAX_LENGTH * 0.9

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{HISTORICO_SITUACAO_TITLE.TITLE}</h2>

      <div className={styles.textareaWrap}>
        <textarea
          id={HISTORICO_SITUACAO_FIELD.ID}
          value={dados.texto}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          maxLength={HISTORICO_SITUACAO_MAX_LENGTH}
          placeholder={HISTORICO_SITUACAO_FIELD.PLACEHOLDER}
          className={cn(styles.textarea, styles.textareaWithCounter)}
          disabled={isLocked}
          aria-describedby="historico-situacao-contador"
          aria-label={HISTORICO_SITUACAO_TITLE.TITLE}
        />

        <span
          id="historico-situacao-contador"
          className={cn(
            styles.charCounter,
            isNearLimit && styles.charCounterWarn,
            length >= HISTORICO_SITUACAO_MAX_LENGTH && styles.charCounterLimit,
          )}
          aria-live="polite"
        >
          {length}/{HISTORICO_SITUACAO_MAX_LENGTH}
        </span>
      </div>
    </section>
  )
}
