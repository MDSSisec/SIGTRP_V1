"use client"

import type { ChangeEvent } from "react"

import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  JUSTIFICATIVA_ID,
  JUSTIFICATIVA_LABELS,
  JUSTIFICATIVA_NOME,
  JUSTIFICATIVA_PLACEHOLDER,
  JUSTIFICATIVA_TITLE,
} from "@/features/projeto/constants/justificativa"

import styles from "../descricao-da-justificativa-e-motivacao.module.css"
import type { DadosJustificativa } from "../types/justificativa-form"

type JustificativaFieldsProps = {
  dados: DadosJustificativa
  isLocked: boolean
  fieldClass: (campoKey: string, extra?: string) => string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * Campos da seção Justificativa e Motivação.
 */
export function JustificativaFields({
  dados,
  isLocked,
  fieldClass,
  onChange,
}: JustificativaFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {JUSTIFICATIVA_TITLE.TITLE_JUSTIFICATIVA_MOTIVACAO}
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={JUSTIFICATIVA_ID.ID_CARACTERIZACAO_INTERESSES}
            campoKey="caracterizacaoInteresses"
            className={styles.label}
          >
            {JUSTIFICATIVA_LABELS.LABEL_CARACTERIZACAO}
          </CampoReviewLabel>
          <textarea
            id={JUSTIFICATIVA_ID.ID_CARACTERIZACAO_INTERESSES}
            name={JUSTIFICATIVA_NOME.NOME_CARACTERIZACAO}
            value={dados.caracterizacaoInteresses}
            onChange={onChange}
            rows={5}
            placeholder={
              JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_INTERESSES_RECIPROCOS
            }
            className={fieldClass("caracterizacaoInteresses")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={JUSTIFICATIVA_ID.ID_PUBLICO_ALVO}
            campoKey="publicoAlvo"
            className={styles.label}
          >
            {JUSTIFICATIVA_LABELS.LABEL_PUBLICO_ALVO}
          </CampoReviewLabel>
          <textarea
            id={JUSTIFICATIVA_ID.ID_PUBLICO_ALVO}
            name={JUSTIFICATIVA_NOME.NOME_PUBLICO_ALVO}
            value={dados.publicoAlvo}
            onChange={onChange}
            rows={4}
            placeholder={JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PUBLICO_ALVO}
            className={fieldClass("publicoAlvo")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={JUSTIFICATIVA_ID.ID_PROBLEMA}
            campoKey="problema"
            className={styles.label}
          >
            {JUSTIFICATIVA_LABELS.LABEL_PROBLEMA}
          </CampoReviewLabel>
          <textarea
            id={JUSTIFICATIVA_ID.ID_PROBLEMA}
            name={JUSTIFICATIVA_NOME.NOME_PROBLEMA}
            value={dados.problema}
            onChange={onChange}
            rows={5}
            placeholder={
              JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PROBLEMA_PROPOSTA
            }
            className={fieldClass("problema")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={JUSTIFICATIVA_ID.ID_RESULTADOS_ESPERADOS}
            campoKey="resultadosEsperados"
            className={styles.label}
          >
            {JUSTIFICATIVA_LABELS.LABEL_RESULTADOS_ESPERADOS}
          </CampoReviewLabel>
          <textarea
            id={JUSTIFICATIVA_ID.ID_RESULTADOS_ESPERADOS}
            name={JUSTIFICATIVA_NOME.NOME_RESULTADOS_ESPERADOS}
            value={dados.resultadosEsperados}
            onChange={onChange}
            rows={4}
            placeholder={
              JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RESULTADOS_ESPERADOS
            }
            className={fieldClass("resultadosEsperados")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor={JUSTIFICATIVA_ID.ID_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
            campoKey="relacaoPrograma"
            className={styles.label}
          >
            {
              JUSTIFICATIVA_LABELS.LABEL_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES
            }
          </CampoReviewLabel>
          <textarea
            id={JUSTIFICATIVA_ID.ID_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
            name={
              JUSTIFICATIVA_NOME.NOME_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES
            }
            value={dados.relacaoPrograma}
            onChange={onChange}
            rows={5}
            placeholder={
              JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES
            }
            className={fieldClass("relacaoPrograma")}
            disabled={isLocked}
          />
        </div>
      </div>
    </section>
  )
}
