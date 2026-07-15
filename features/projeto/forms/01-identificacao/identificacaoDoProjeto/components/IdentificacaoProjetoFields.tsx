"use client"

import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projetos/components/project-ted/shared/secao-review-actions"
import {
  IDENTIFICACAO_PROJETO_DESCRIPTIONS,
  IDENTIFICACAO_PROJETO_LABELS,
  IDENTIFICACAO_PROJETO_PLACEHOLDERS,
} from "@/features/projetos/constants/ted/identificacao-projeto"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import { cn } from "@/lib/utils"

import { VIEW_MODE_FIELD_CLASS } from "../constants/form"
import styles from "../identidicacao-do-projeto.module.css"
import type { DadosIdentificacaoProjeto } from "../types/identificacao-form"

type IdentificacaoProjetoFieldsProps = {
  /** Dados exibidos no formulário. */
  dados: DadosIdentificacaoProjeto

  /** Bloqueia edição dos campos. */
  isLocked: boolean

  /** Aplica o estilo de visualização (readonly). */
  isViewMode: boolean

  /** Classes CSS para destacar campos em revisão. */
  attention: {
    localExecucao?: string
    duracao?: string
    resumoProjeto?: string
  }

  /** Callback disparado ao alterar qualquer campo. */
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

/**
 * Renderiza os campos da seção "Identificação do Projeto".
 *
 * Este componente contém apenas a estrutura visual do formulário.
 * Toda a lógica de carregamento, edição, salvamento e revisão
 * permanece isolada no hook `useIdentificacaoProjeto`.
 */
export function IdentificacaoProjetoFields({
  dados,
  isLocked,
  isViewMode,
  attention,
  onChange,
}: IdentificacaoProjetoFieldsProps) {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_PROJETO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="nomeProjeto" className={styles.label}>
              {IDENTIFICACAO_PROJETO_LABELS.LABEL_NOME_PROJETO}
            </CampoReviewLabel>

            <Input
              id="nomeProjeto"
              name="nomeProjeto"
              value={dados.nomeProjeto}
              placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_NOME_PROJETO}
              className={cn(styles.input, VIEW_MODE_FIELD_CLASS)}
              readOnly
              disabled
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel
                htmlFor="localExecucao"
                campoKey="localExecucao"
                className={styles.label}
              >
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_LOCAL_EXECUCAO}
              </CampoReviewLabel>

              <Input
                id="localExecucao"
                name="localExecucao"
                value={dados.localExecucao}
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_LOCAL_EXECUCAO}
                onChange={onChange}
                className={cn(styles.input, isViewMode && VIEW_MODE_FIELD_CLASS, attention.localExecucao)}
                disabled={isLocked}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel
                htmlFor="duracao"
                campoKey="duracao"
                className={styles.label}
              >
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_DURACAO}
              </CampoReviewLabel>

              <Input
                id="duracao"
                name="duracao"
                value={dados.duracao}
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_DURACAO}
                onChange={onChange}
                className={cn(styles.input, isViewMode && VIEW_MODE_FIELD_CLASS, attention.duracao)}
                disabled={isLocked}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          {IDENTIFICACAO_PROJETO_LABELS.LABEL_RESUMO_PROJETO}
        </h2>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor="resumoProjeto"
            campoKey="resumoProjeto"
            className={styles.label}
          >
            {IDENTIFICACAO_PROJETO_DESCRIPTIONS.DESCRIPTION_RESUMO_PROJETO}
          </CampoReviewLabel>

          <textarea
            id="resumoProjeto"
            name="resumoProjeto"
            value={dados.resumoProjeto}
            placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_RESUMO_PROJETO}
            onChange={onChange}
            rows={6}
            className={cn(styles.textarea, isViewMode && VIEW_MODE_FIELD_CLASS, attention.resumoProjeto)}
            disabled={isLocked}
          />
        </div>
      </section>
    </>
  )
}