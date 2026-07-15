"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { cn } from "@/lib/utils"

import { VIEW_MODE_FIELD_CLASS } from "../constants/form"
import type { DadosGeraisForm } from "../types/dados-gerais-form"
import styles from "../dadosGeraisDoprojeto.module.css"

type Props = {
  dados: DadosGeraisForm
  isLocked: boolean
  isViewMode: boolean
  onCurrencyChange: (value: string) => void
  onQuantidadeChange: (value: string) => void
  onCheckboxChange: (checked: boolean) => void
}

export function DadosGeraisFields({
  dados,
  isLocked,
  isViewMode,
  onCurrencyChange,
  onQuantidadeChange,
  onCheckboxChange,
}: Props) {
  return (
    <section className={formLayoutStyles.section}>
      <div className={formLayoutStyles.grid2}>
        <div className={formLayoutStyles.fieldGroup}>
          <Label htmlFor="custoTotalProjeto" className={styles.required}>
            Custo total do projeto
          </Label>
          <Input
            id="custoTotalProjeto"
            name="custoTotalProjeto"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="R$ 0,00"
            value={dados.custoTotalProjeto}
            onChange={(event) => onCurrencyChange(event.target.value)}
            className={cn(isViewMode && VIEW_MODE_FIELD_CLASS)}
            disabled={isLocked}
            required
          />
          <small className={styles.hint}>Formato monetário brasileiro.</small>
        </div>

        <div className={formLayoutStyles.fieldGroup}>
          <Label htmlFor="quantidadeCursos" className={styles.required}>
            Quantidade de cursos
          </Label>
          <Input
            id="quantidadeCursos"
            name="quantidadeCursos"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={dados.quantidadeCursos}
            onChange={(event) => onQuantidadeChange(event.target.value)}
            className={cn(isViewMode && VIEW_MODE_FIELD_CLASS)}
            disabled={isLocked}
            required
          />
          <small className={styles.hint}>
            A seção de cursos será criada conforme esta quantidade.
          </small>
        </div>
      </div>

      <div className={styles.checkCard}>
        <input
          id="possuiEventoCertificacao"
          name="possuiEventoCertificacao"
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 rounded-sm border border-input accent-[var(--primary)]"
          checked={dados.possuiEventoCertificacao}
          onChange={(event) => onCheckboxChange(event.target.checked)}
          disabled={isLocked}
        />
        <Label htmlFor="possuiEventoCertificacao" className={styles.checkLabel}>
          Projeto irá possuir evento de entrega de certificado?
          <small>
            Ao marcar, a etapa de despesas do evento final será exibida e
            passará a ser validada.
          </small>
        </Label>
      </div>
    </section>
  )
}
