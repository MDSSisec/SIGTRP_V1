"use client"

import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { COMUNS_LABELS } from "@/features/projeto/constants/ted/communs"
import {
  IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS,
  IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS,
} from "@/features/projeto/constants/ted/identificacao-responsavel-tecnico"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projeto/constants/ted/visao-geral"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"

import type { DadosIdentificacaoResponsavelTecnico } from "../types/responsavel-tecnico-form"
import styles from "../identificacao-do-responsavel-tecnico.module.css"

type Props = {
  dados: DadosIdentificacaoResponsavelTecnico
  isLocked: boolean
  emailInvalido: boolean
  fieldClass: (campoKey: string, extra?: string) => string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onEmailBlur: () => void
}

export function IdentificacaoResponsavelTecnicoFields({
  dados,
  isLocked,
  emailInvalido,
  fieldClass,
  onChange,
  onEmailBlur,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {
          SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO
        }
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <CampoReviewLabel htmlFor="nome" campoKey="nome" className={styles.label}>
            {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_NOME}
          </CampoReviewLabel>
          <Input
            id="nome"
            name="nome"
            value={dados.nome}
            onChange={onChange}
            placeholder={
              IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_NOME
            }
            className={fieldClass("nome")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel htmlFor="cargo" campoKey="cargo" className={styles.label}>
            {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_CARGO}
          </CampoReviewLabel>
          <Input
            id="cargo"
            name="cargo"
            value={dados.cargo}
            onChange={onChange}
            placeholder={
              IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CARGO
            }
            className={fieldClass("cargo")}
            disabled={isLocked}
          />
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="telefone"
              campoKey="telefone"
              className={styles.label}
            >
              {COMUNS_LABELS.LABEL_NUMERO_DE_TELEFONE}
            </CampoReviewLabel>
            <Input
              id="telefone"
              name="telefone"
              value={dados.telefone}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_TELEFONE
              }
              className={fieldClass("telefone")}
              maxLength={14}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="celular"
              campoKey="celular"
              className={styles.label}
            >
              {COMUNS_LABELS.LABEL_NUMERO_DE_CELULAR}
            </CampoReviewLabel>
            <Input
              id="celular"
              name="celular"
              value={dados.celular}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CELULAR
              }
              className={fieldClass("celular")}
              maxLength={15}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel htmlFor="email" campoKey="email" className={styles.label}>
            {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_EMAIL}
          </CampoReviewLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={dados.email}
            onChange={onChange}
            onBlur={onEmailBlur}
            placeholder={
              IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_EMAIL
            }
            className={fieldClass(
              "email",
              emailInvalido ? styles.inputError : "",
            )}
            disabled={isLocked}
          />
          {emailInvalido ? (
            <span className={styles.errorMessage}>
              Insira um e-mail válido contendo &quot;@&quot; e domínio.
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
