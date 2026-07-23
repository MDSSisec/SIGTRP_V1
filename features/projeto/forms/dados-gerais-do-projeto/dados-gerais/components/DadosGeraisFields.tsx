"use client"

import { Input } from "@/components/ui/input"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import { cn } from "@/lib/utils"

import type { DadosGeraisForm } from "../types/dados-gerais-form"
import styles from "../dadosGeraisDoprojeto.module.css"

type Props = {
  dados: DadosGeraisForm
  isCampoLocked: (campoKey: string) => boolean
  fieldClass: (campoKey: string, baseClass?: string) => string
  onCurrencyChange: (value: string) => void
  onQuantidadeChange: (value: string) => void
  onCheckboxChange: (checked: boolean) => void
}

export function DadosGeraisFields({
  dados,
  isCampoLocked,
  fieldClass,
  onCurrencyChange,
  onQuantidadeChange,
  onCheckboxChange,
}: Props) {
  return (
    <section className={formLayoutStyles.section}>
      <div className={formLayoutStyles.grid2}>
        <div className={formLayoutStyles.fieldGroup}>
          <CampoReviewLabel
            htmlFor="custoTotalProjeto"
            campoKey="custoTotalProjeto"
            className={styles.required}
          >
            Custo total do projeto
          </CampoReviewLabel>
          <Input
            id="custoTotalProjeto"
            name="custoTotalProjeto"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="R$ 0,00"
            value={dados.custoTotalProjeto}
            onChange={(event) => onCurrencyChange(event.target.value)}
            className={fieldClass("custoTotalProjeto")}
            disabled={isCampoLocked("custoTotalProjeto")}
            required
          />
          <small className={styles.hint}>Formato monetário brasileiro.</small>
        </div>

        <div className={formLayoutStyles.fieldGroup}>
          <CampoReviewLabel
            htmlFor="quantidadeCursos"
            campoKey="quantidadeCursos"
            className={styles.required}
          >
            Quantidade de cursos
          </CampoReviewLabel>
          <Input
            id="quantidadeCursos"
            name="quantidadeCursos"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={dados.quantidadeCursos}
            onChange={(event) => onQuantidadeChange(event.target.value)}
            className={fieldClass("quantidadeCursos")}
            disabled={isCampoLocked("quantidadeCursos")}
            required
          />
          <small className={styles.hint}>
            A seção de cursos será criada conforme esta quantidade.
          </small>
        </div>
      </div>

      <div className={cn(styles.checkCard, fieldClass("possuiEventoCertificacao"))}>
        <input
          id="possuiEventoCertificacao"
          name="possuiEventoCertificacao"
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 rounded-sm border border-input accent-[var(--primary)]"
          checked={dados.possuiEventoCertificacao}
          onChange={(event) => onCheckboxChange(event.target.checked)}
          disabled={isCampoLocked("possuiEventoCertificacao")}
        />
        <div className="min-w-0 flex-1">
          <CampoReviewLabel
            htmlFor="possuiEventoCertificacao"
            campoKey="possuiEventoCertificacao"
            className={styles.checkLabel}
          >
            Projeto irá possuir evento de entrega de certificado?
          </CampoReviewLabel>
          <small className={styles.hint}>
            Ao marcar, a etapa de despesas do evento final será exibida e
            passará a ser validada.
          </small>
        </div>
      </div>
    </section>
  )
}
