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
import { cn } from "@/lib/utils"

import { JUSTIFICATIVA_MAX_LENGTH } from "../constants/form"
import styles from "../descricao-da-justificativa-e-motivacao.module.css"
import type { DadosJustificativa } from "../types/justificativa-form"

/** Propriedades do componente de campos da Justificativa. */
type JustificativaFieldsProps = {
  /** Dados atuais do formulário. */
  dados: DadosJustificativa

  /** Indica se os campos estão bloqueados para edição. */
  isLocked: boolean

  /** Retorna as classes CSS aplicadas conforme as regras de revisão. */
  fieldClass: (campoKey: string, extra?: string) => string

  /** Manipulador de alteração dos campos. */
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/** Configuração de um campo da seção de Justificativa. */
type FieldConfig = {
  /** Id utilizado pelo textarea. */
  id: string

  /** Nome enviado pelo formulário. */
  name: string

  /** Campo correspondente no estado do formulário. */
  campoKey: keyof DadosJustificativa

  /** Texto exibido no label. */
  label: string

  /** Placeholder do campo. */
  placeholder: string

  /** Quantidade inicial de linhas do textarea. */
  rows: number
}

/**
 * Configuração dos campos renderizados na seção.
 *
 * Centralizar essas informações evita repetição de JSX e
 * facilita futuras alterações ou inclusão de novos campos.
 */
const FIELDS: FieldConfig[] = [
  {
    id: JUSTIFICATIVA_ID.ID_CARACTERIZACAO_INTERESSES,
    name: JUSTIFICATIVA_NOME.NOME_CARACTERIZACAO,
    campoKey: "caracterizacaoInteresses",
    label: JUSTIFICATIVA_LABELS.LABEL_CARACTERIZACAO,
    placeholder: JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_INTERESSES_RECIPROCOS,
    rows: 15,
  },
  {
    id: JUSTIFICATIVA_ID.ID_PUBLICO_ALVO,
    name: JUSTIFICATIVA_NOME.NOME_PUBLICO_ALVO,
    campoKey: "publicoAlvo",
    label: JUSTIFICATIVA_LABELS.LABEL_PUBLICO_ALVO,
    placeholder: JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PUBLICO_ALVO,
    rows: 5,
  },
  {
    id: JUSTIFICATIVA_ID.ID_PROBLEMA,
    name: JUSTIFICATIVA_NOME.NOME_PROBLEMA,
    campoKey: "problema",
    label: JUSTIFICATIVA_LABELS.LABEL_PROBLEMA,
    placeholder: JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PROBLEMA_PROPOSTA,
    rows: 5,
  },
  {
    id: JUSTIFICATIVA_ID.ID_RESULTADOS_ESPERADOS,
    name: JUSTIFICATIVA_NOME.NOME_RESULTADOS_ESPERADOS,
    campoKey: "resultadosEsperados",
    label: JUSTIFICATIVA_LABELS.LABEL_RESULTADOS_ESPERADOS,
    placeholder: JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RESULTADOS_ESPERADOS,
    rows: 5,
  },
  {
    id: JUSTIFICATIVA_ID.ID_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES,
    name: JUSTIFICATIVA_NOME.NOME_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES,
    campoKey: "relacaoPrograma",
    label: JUSTIFICATIVA_LABELS.LABEL_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES,
    placeholder:
      JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES,
    rows: 5,
  },
]

/**
 * Renderiza os campos da seção
 * "Descrição da Justificativa e Motivação".
 *
 * Todos os campos são gerados dinamicamente a partir da constante
 * `FIELDS`, permitindo manter a estrutura do componente simples e
 * evitando duplicação de código.
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
        {FIELDS.map((field) => {
          const value = dados[field.campoKey]
          const length = value.length

          /** Destaca o contador quando o usuário se aproxima do limite. */
          const isNearLimit =
            length >= JUSTIFICATIVA_MAX_LENGTH * 0.9

          return (
            <div key={field.campoKey} className={styles.fieldGroup}>
              <CampoReviewLabel
                htmlFor={field.id}
                campoKey={field.campoKey}
                className={styles.label}
              >
                {field.label}
              </CampoReviewLabel>

              <div className={styles.textareaWrap}>
                <textarea
                  id={field.id}
                  name={field.name}
                  value={value}
                  onChange={onChange}
                  rows={field.rows}
                  maxLength={JUSTIFICATIVA_MAX_LENGTH}
                  placeholder={field.placeholder}
                  className={cn(
                    fieldClass(field.campoKey),
                    styles.textareaWithCounter,
                  )}
                  disabled={isLocked}
                />

                <span
                  className={cn(
                    styles.charCounter,
                    isNearLimit && styles.charCounterWarn,
                    length >= JUSTIFICATIVA_MAX_LENGTH &&
                      styles.charCounterLimit,
                  )}
                  aria-live="polite"
                >
                  {length}/{JUSTIFICATIVA_MAX_LENGTH}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}