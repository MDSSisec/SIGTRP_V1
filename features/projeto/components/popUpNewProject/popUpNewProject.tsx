"use client"

import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PROJETOS_FORM } from "../../constants/project"
import {
  formatProjetoTipoLabel,
  PROJETO_TIPO_OPTIONS,
} from "../../constants/projeto-tipos"
import type { CreateProjetoInput, ResponsavelOption } from "../../types"
import styles from "./popUpNewProject.module.css"
import { SelectResponsavel } from "./selectResponsavel"
import { useProjetoForm } from "./useProjetoForm"

export type PopUpNewProjectProps = {
  open: boolean
  onClose: () => void
  onSubmit: (projeto: CreateProjetoInput) => void | Promise<void>
  isSubmitting?: boolean
  responsaveisInternos: ResponsavelOption[]
  responsaveisExternos: ResponsavelOption[]
}

export function PopUpNewProject({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  responsaveisInternos,
  responsaveisExternos,
}: PopUpNewProjectProps) {
  const form = useProjetoForm({
    open,
    isSubmitting,
    onClose,
    onSubmit,
  })

  if (!open) return null

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={form.handleOverlayClick}
    >
      <section
        ref={form.dialogRef}
        aria-modal="true"
        aria-labelledby="projeto-popup-title"
        className={styles.container}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h2 id="projeto-popup-title" className={styles.title}>
                {PROJETOS_FORM.createTitle}
              </h2>
              <p className={styles.description}>
                {PROJETOS_FORM.createDescription}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={form.handleClose}
              aria-label="Fechar pop-up"
            >
              <XIcon />
            </Button>
          </div>
        </header>

        <form
          className={styles.form}
          noValidate
          onSubmit={form.handleSubmit}
        >
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="projeto-nome">
                {PROJETOS_FORM.fields.nome}
              </label>
              <Input
                id="projeto-nome"
                value={form.formValues.nome}
                onChange={(event) =>
                  form.handleChange("nome", event.target.value)
                }
                placeholder={PROJETOS_FORM.placeholders.nome}
                disabled={form.isReadOnly}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="projeto-tipo">
                {PROJETOS_FORM.fields.tipoProjeto}
              </label>
              <select
                id="projeto-tipo"
                className={styles.select}
                value={form.formValues.tipoProjeto}
                onChange={(event) => form.handleTipoChange(event.target.value)}
                disabled={form.isReadOnly}
              >
                <option value="">
                  {PROJETOS_FORM.placeholders.tipoProjeto}
                </option>
                {PROJETO_TIPO_OPTIONS.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {formatProjetoTipoLabel(tipo)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.gridTwoColumns}>
              <SelectResponsavel
                id="projeto-responsavel-interno"
                label={PROJETOS_FORM.fields.responsavelInterno}
                placeholder={PROJETOS_FORM.placeholders.responsavelInterno}
                emptyMessage={PROJETOS_FORM.emptyResponsavelInterno}
                options={responsaveisInternos}
                value={form.formValues.responsavelInternoId}
                disabled={form.isReadOnly}
                onChange={(value) =>
                  form.handleChange("responsavelInternoId", value)
                }
              />
              <SelectResponsavel
                id="projeto-responsavel-externo"
                label={PROJETOS_FORM.fields.responsavelExterno}
                placeholder={PROJETOS_FORM.placeholders.responsavelExterno}
                emptyMessage={PROJETOS_FORM.emptyResponsavelExterno}
                options={responsaveisExternos}
                value={form.formValues.responsavelExternoId}
                disabled={form.isReadOnly}
                onChange={(value) =>
                  form.handleChange("responsavelExternoId", value)
                }
              />
            </div>
          </div>

          {form.submitError && (
            <p className={styles.submitError} role="alert">
              {form.submitError}
            </p>
          )}

          <div className={styles.footer}>
            <Button
              type="button"
              variant="outline"
              onClick={form.handleClose}
              disabled={form.isReadOnly}
            >
              {PROJETOS_FORM.cancel}
            </Button>
            <Button type="submit" disabled={form.isReadOnly}>
              {form.isReadOnly ? PROJETOS_FORM.saving : PROJETOS_FORM.save}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
