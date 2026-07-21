"use client"

import type { ChangeEvent } from "react"

import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  IDENTIFICACAO_PROJETO_DESCRIPTIONS,
  IDENTIFICACAO_PROJETO_LABELS,
  IDENTIFICACAO_PROJETO_PLACEHOLDERS,
} from "@/features/projeto/constants/identificacao-projeto"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projeto/constants/visao-geral"
import { cn } from "@/lib/utils"

import { VIEW_MODE_FIELD_CLASS } from "../constants/form"
import styles from "../identidicacao-do-projeto.module.css"
import type { DadosIdentificacaoProjeto } from "../types/identificacao-form"

type IdentificacaoProjetoFieldsProps = {
  /** Dados exibidos no formulário. */
  dados: DadosIdentificacaoProjeto

  /** Bloqueio por campo quando há atenção parcial. */
  isCampoLocked: (campoKey: string) => boolean

  /** Classes CSS por campo (atenção / OK muteado / visualização). */
  fieldClass: (campoKey: string, baseClass?: string) => string

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
  isCampoLocked,
  fieldClass,
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
                className={fieldClass("localExecucao")}
                disabled={isCampoLocked("localExecucao")}
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
                className={fieldClass("duracao")}
                disabled={isCampoLocked("duracao")}
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
            className={fieldClass("resumoProjeto", styles.textarea)}
            disabled={isCampoLocked("resumoProjeto")}
          />
        </div>
      </section>
    </>
  )
}
