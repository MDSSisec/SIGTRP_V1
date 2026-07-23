"use client"

import {
  METODOLOGIA_ETAPAS_VISUAIS,
  METODOLOGIA_META_VISUAL,
  METODOLOGIA_PLACEHOLDERS,
  METODOLOGIA_TITLE,
} from "@/features/projeto/constants/metodologia"
import { cn } from "@/lib/utils"

import { METODOLOGIA_MAX_LENGTH } from "../constants/form"
import styles from "../descricao-da-metodologia.module.css"

type SlotSize = "sm" | "md" | "lg"

type DbSlotProps = {
  id: string
  size?: SlotSize
  "aria-label": string
}

type TextareaComLimiteProps = {
  id: string
  placeholder: string
  rows: number
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

type MetodologiaFieldsProps = {
  metaTexto: string
  etapasTexto: Record<string, string>
  isLocked: boolean
  onMetaChange: (value: string) => void
  onEtapaChange: (id: string, value: string) => void
}

/**
 * Campo visual utilizado como placeholder para valores
 * que futuramente serão carregados do banco de dados.
 */
function DbSlot({
  id,
  size = "md",
  "aria-label": ariaLabel,
}: DbSlotProps) {
  return (
    <input
      id={id}
      type="text"
      readOnly
      tabIndex={-1}
      maxLength={METODOLOGIA_MAX_LENGTH}
      aria-label={ariaLabel}
      className={cn(
        styles.dbSlot,
        size === "sm" && styles.dbSlotSm,
        size === "md" && styles.dbSlotMd,
        size === "lg" && styles.dbSlotLg,
      )}
    />
  )
}

/**
 * Textarea com contador de caracteres e aviso
 * quando o limite está próximo.
 */
function TextareaComLimite({
  id,
  placeholder,
  rows,
  value,
  disabled,
  onChange,
}: TextareaComLimiteProps) {
  const length = value.length
  const isNearLimit = length >= METODOLOGIA_MAX_LENGTH * 0.9
  const reachedLimit = length >= METODOLOGIA_MAX_LENGTH

  return (
    <div className={styles.textareaWrap}>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={METODOLOGIA_MAX_LENGTH}
        disabled={disabled}
        className={cn(
          styles.textarea,
          styles.textareaWithCounter,
        )}
      />

      <span
        className={cn(
          styles.charCounter,
          isNearLimit && styles.charCounterWarn,
          reachedLimit && styles.charCounterLimit,
        )}
        aria-live="polite"
      >
        {length}/{METODOLOGIA_MAX_LENGTH}
      </span>
    </div>
  )
}

/**
 * Renderiza os campos da seção "Metodologia".
 *
 * Atualmente os campos `DbSlot` representam informações
 * que serão carregadas automaticamente do banco de dados.
 */
export function MetodologiaFields({
  metaTexto,
  etapasTexto,
  isLocked,
  onMetaChange,
  onEtapaChange,
}: MetodologiaFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {METODOLOGIA_TITLE.TITLE}
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <div className={styles.label}>
            <span>{METODOLOGIA_META_VISUAL.ITEM}</span>{" "}
            <span>{METODOLOGIA_META_VISUAL.PREFIX}</span>{" "}

            <DbSlot
              id="metodologia-meta-1-area"
              size="lg"
              aria-label="Área técnica"
            />{" "}

            <span>{METODOLOGIA_META_VISUAL.MIDDLE}</span>{" "}

            <DbSlot
              id="metodologia-meta-1-pessoas"
              size="sm"
              aria-label="Quantidade de pessoas"
            />{" "}

            <span>{METODOLOGIA_META_VISUAL.SUFFIX}</span>
          </div>

          <TextareaComLimite
            id="metodologia-meta-1"
            placeholder={METODOLOGIA_PLACEHOLDERS.METODOLOGIA}
            rows={5}
            value={metaTexto}
            disabled={isLocked}
            onChange={onMetaChange}
          />
        </div>

        {METODOLOGIA_ETAPAS_VISUAIS.map((etapa) => {
          const inputId = `metodologia-${etapa.item.replaceAll(".", "-")}`
          const value = etapasTexto[inputId] ?? ""

          return (
            <div
              key={etapa.item}
              className={styles.fieldGroup}
            >
              <div className={styles.label}>
                <span>
                  {etapa.item} {etapa.etapa} -{" "}
                  {etapa.partes.map((parte, index) => {
                    if (parte.type === "text") {
                      return (
                        <span key={`${etapa.item}-text-${index}`}>
                          {parte.value}
                          {index < etapa.partes.length - 1 ? " " : ""}
                        </span>
                      )
                    }

                    return (
                      <span key={`${etapa.item}-slot-${parte.key}`}>
                        {" "}
                        <DbSlot
                          id={`${inputId}-${parte.key}`}
                          size={parte.size}
                          aria-label={parte.key}
                        />{" "}
                      </span>
                    )
                  })}
                </span>
              </div>

              <TextareaComLimite
                id={inputId}
                placeholder={etapa.placeholder}
                rows={15}
                value={value}
                disabled={isLocked}
                onChange={(value) =>
                  onEtapaChange(inputId, value)
                }
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}