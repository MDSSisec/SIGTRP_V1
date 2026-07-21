"use client"

import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import {
  IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS,
  IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS,
} from "@/features/projeto/constants/identificacao-representante-legal"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projeto/constants/visao-geral"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"

import type { DadosIdentificacaoRepresentanteLegal } from "../types/representante-form"
import styles from "../identificacao-do-representante-legal.module.css"

type Props = {
  dados: DadosIdentificacaoRepresentanteLegal
  isLocked: boolean
  fieldClass: (campoKey: string) => string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function IdentificacaoRepresentanteFields({
  dados,
  isLocked,
  fieldClass,
  onChange,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {
          SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL
        }
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="nome" campoKey="nome" className={styles.label}>
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME}
            </CampoReviewLabel>
            <Input
              id="nome"
              name="nome"
              value={dados.nome}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_NOME
              }
              className={fieldClass("nome")}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="matriculaFuncional"
              campoKey="matriculaFuncional"
              className={styles.label}
            >
              {
                IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_MATRICULA_FUNCIONAL
              }
            </CampoReviewLabel>
            <Input
              id="matriculaFuncional"
              name="matriculaFuncional"
              value={dados.matriculaFuncional}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_MATRICULA_FUNCIONAL
              }
              className={fieldClass("matriculaFuncional")}
              maxLength={7}
              inputMode="numeric"
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="profissao"
              campoKey="profissao"
              className={styles.label}
            >
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_PROFISSAO}
            </CampoReviewLabel>
            <Input
              id="profissao"
              name="profissao"
              value={dados.profissao}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_PROFISSAO
              }
              className={fieldClass("profissao")}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="cargo" campoKey="cargo" className={styles.label}>
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CARGO}
            </CampoReviewLabel>
            <Input
              id="cargo"
              name="cargo"
              value={dados.cargo}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CARGO
              }
              className={fieldClass("cargo")}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="estadoCivil"
              campoKey="estadoCivil"
              className={styles.label}
            >
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_ESTADO_CIVIL}
            </CampoReviewLabel>
            <Input
              id="estadoCivil"
              name="estadoCivil"
              value={dados.estadoCivil}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_ESTADO_CIVIL
              }
              className={fieldClass("estadoCivil")}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="telefone"
              campoKey="telefone"
              className={styles.label}
            >
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_TELEFONE}
            </CampoReviewLabel>
            <Input
              id="telefone"
              name="telefone"
              value={dados.telefone}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_TELEFONE
              }
              className={fieldClass("telefone")}
              maxLength={15}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel htmlFor="email" campoKey="email" className={styles.label}>
            {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_EMAIL}
          </CampoReviewLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={dados.email}
            onChange={onChange}
            placeholder={
              IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_EMAIL
            }
            className={fieldClass("email")}
            disabled={isLocked}
          />
        </div>
      </div>
    </section>
  )
}
