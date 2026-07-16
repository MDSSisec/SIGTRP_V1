"use client"

import type { ChangeEvent } from "react"

import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  GESTAO_IDS,
  GESTAO_LABELS,
  GESTAO_PLACEHOLDERS,
  GESTAO_SUBTITLES,
  GESTAO_TITLE,
} from "@/features/projeto/constants/gestao-projeto"
import { cn } from "@/lib/utils"

import { GESTAO_MAX_LENGTH } from "../constants/form"
import styles from "../descricao-da-gestao-do-projeto.module.css"
import type { DadosGestao } from "../types/gestao-form"

/**
 * Propriedades do componente de campos da seção Gestão do Projeto.
 */
type GestaoFieldsProps = {
  /** Dados atualmente exibidos no formulário. */
  dados: DadosGestao

  /** Indica se os campos devem permanecer bloqueados para edição. */
  isLocked: boolean

  /**
   * Retorna as classes CSS aplicadas ao campo, considerando
   * estados de visualização e revisão.
   */
  fieldClass: (campoKey: string, extra?: string) => string

  /** Manipulador responsável por atualizar o estado do formulário. */
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * Configuração utilizada para renderizar cada campo da seção.
 */
type FieldConfig = {
  /** Identificador HTML do campo. */
  id: string

  /** Nome da propriedade correspondente no formulário. */
  name: keyof DadosGestao

  /** Texto exibido como rótulo do campo. */
  label: string

  /** Texto auxiliar opcional exibido abaixo do rótulo. */
  subtitle?: string

  /** Placeholder apresentado enquanto o campo estiver vazio. */
  placeholder: string

  /** Quantidade de linhas do textarea. */
  rows: number
}

/**
 * Configuração declarativa dos campos da seção Gestão do Projeto.
 */
const FIELDS: FieldConfig[] = [
  {
    id: GESTAO_IDS.ID_EQUIPE,
    name: "dimensionamentoEquipe",
    label: GESTAO_LABELS.LABEL_EQUIPE,
    subtitle: GESTAO_SUBTITLES.SUBTITLE_EQUIPE,
    placeholder: GESTAO_PLACEHOLDERS.PLACEHOLDER_EQUIPE,
    rows: 5,
  },
  {
    id: GESTAO_IDS.ID_CONTRATACOES,
    name: "dimensionamentoContratacoes",
    label: GESTAO_LABELS.LABEL_CONTRATACOES,
    placeholder: GESTAO_PLACEHOLDERS.PLACEHOLDER_CONTRATACOES,
    rows: 5,
  },
]

/**
 * Renderiza os campos da seção Gestão do Projeto.
 *
 * Cada campo possui:
 * - rótulo integrado ao fluxo de revisão;
 * - contador de caracteres;
 * - destaque visual para campos marcados em revisão;
 * - bloqueio automático quando a edição não é permitida.
 */
export function GestaoFields({
  dados,
  isLocked,
  fieldClass,
  onChange,
}: GestaoFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{GESTAO_TITLE.TITLE}</h2>

      <div className={styles.formGrid}>
        {FIELDS.map((field) => {
          const value = dados[field.name]
          const length = value.length
          const isNearLimit = length >= GESTAO_MAX_LENGTH * 0.9

          return (
            <div key={field.name} className={styles.fieldGroup}>
              <CampoReviewLabel
                htmlFor={field.id}
                campoKey={field.name}
                className={styles.label}
              >
                {field.label}
              </CampoReviewLabel>

              {field.subtitle ? (
                <p className={styles.subtitle}>{field.subtitle}</p>
              ) : null}

              <div className={styles.textareaWrap}>
                <textarea
                  id={field.id}
                  name={field.name}
                  value={value}
                  onChange={onChange}
                  rows={field.rows}
                  maxLength={GESTAO_MAX_LENGTH}
                  placeholder={field.placeholder || undefined}
                  className={cn(
                    fieldClass(field.name),
                    styles.textareaWithCounter,
                  )}
                  disabled={isLocked}
                />

                <span
                  className={cn(
                    styles.charCounter,
                    isNearLimit && styles.charCounterWarn,
                    length >= GESTAO_MAX_LENGTH &&
                      styles.charCounterLimit,
                  )}
                  aria-live="polite"
                >
                  {length}/{GESTAO_MAX_LENGTH}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}