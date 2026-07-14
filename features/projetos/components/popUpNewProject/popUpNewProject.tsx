"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PROJETOS_FORM } from "../../constants/project"
import {
  formatProjetoTipoLabel,
  normalizeProjetoTipo,
  PROJETO_TIPOS,
} from "../../constants/project-types"
import type { NewProjetoFormValues, ResponsavelOption } from "../../types"
import styles from "./popUpNewProject.module.css"

export type PopUpNewProjectProps = {
  open: boolean
  onClose: () => void
  onSubmit: (projeto: NewProjetoFormValues) => void | Promise<void>
  isSubmitting?: boolean
  responsaveisInternos: ResponsavelOption[]
  responsaveisExternos: ResponsavelOption[]
}

type FormState = {
  tipoProjeto: string
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
}

const INITIAL_FORM: FormState = {
  tipoProjeto: "",
  nome: "",
  responsavelInternoId: "",
  responsavelExternoId: "",
}

export function PopUpNewProject({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  responsaveisInternos,
  responsaveisExternos,
}: PopUpNewProjectProps) {
  const [formValues, setFormValues] = React.useState<FormState>(INITIAL_FORM)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) return

    setFormValues(INITIAL_FORM)
    setSubmitError(null)
  }, [open])

  if (!open) return null

  const isReadOnly = isSubmitting

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setSubmitError(null)
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formValues.tipoProjeto) {
      setSubmitError(PROJETOS_FORM.validation.tipoProjeto)
      return
    }

    const tipoProjeto = normalizeProjetoTipo(formValues.tipoProjeto)

    if (!tipoProjeto) {
      setSubmitError(PROJETOS_FORM.validation.tipoProjeto)
      return
    }

    if (!formValues.nome.trim()) {
      setSubmitError(PROJETOS_FORM.validation.nome)
      return
    }

    if (!formValues.responsavelInternoId) {
      setSubmitError(PROJETOS_FORM.validation.responsavelInterno)
      return
    }

    if (!formValues.responsavelExternoId) {
      setSubmitError(PROJETOS_FORM.validation.responsavelExterno)
      return
    }

    try {
      await onSubmit({
        tipoProjeto,
        nome: formValues.nome.trim(),
        responsavelInternoId: formValues.responsavelInternoId,
        responsavelExternoId: formValues.responsavelExternoId,
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : PROJETOS_FORM.submitError

      setSubmitError(message)
      return
    }

    setFormValues(INITIAL_FORM)
    onClose()
  }

  function handleClose() {
    if (isSubmitting) return

    setFormValues(INITIAL_FORM)
    setSubmitError(null)
    onClose()
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={handleClose}
    >
      <section
        aria-modal="true"
        className={styles.container}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h2 className={styles.title}>{PROJETOS_FORM.createTitle}</h2>
              <p className={styles.description}>
                {PROJETOS_FORM.createDescription}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleClose}
              aria-label="Fechar pop-up"
            >
              <XIcon />
            </Button>
          </div>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="projeto-nome">
                {PROJETOS_FORM.fields.nome}
              </label>
              <Input
                id="projeto-nome"
                value={formValues.nome}
                onChange={(event) => handleChange("nome", event.target.value)}
                placeholder={PROJETOS_FORM.placeholders.nome}
                disabled={isReadOnly}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="projeto-tipo">
                {PROJETOS_FORM.fields.tipoProjeto}
              </label>
              <select
                id="projeto-tipo"
                className={styles.select}
                value={formValues.tipoProjeto}
                onChange={(event) =>
                  handleChange("tipoProjeto", event.target.value)
                }
                disabled={isReadOnly}
                required
              >
                <option value="">
                  {PROJETOS_FORM.placeholders.tipoProjeto}
                </option>
                <option value={PROJETO_TIPOS.TED}>
                  {formatProjetoTipoLabel(PROJETO_TIPOS.TED)}
                </option>
                <option value={PROJETO_TIPOS.EMENDA}>
                  {formatProjetoTipoLabel(PROJETO_TIPOS.EMENDA)}
                </option>
              </select>
            </div>

            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="projeto-responsavel-interno">
                  {PROJETOS_FORM.fields.responsavelInterno}
                </label>
                {responsaveisInternos.length === 0 ? (
                  <p className={styles.emptyMessage}>
                    Nenhum responsável interno cadastrado.
                  </p>
                ) : (
                  <select
                    id="projeto-responsavel-interno"
                    className={styles.select}
                    value={formValues.responsavelInternoId}
                    onChange={(event) =>
                      handleChange("responsavelInternoId", event.target.value)
                    }
                    disabled={isReadOnly}
                    required
                  >
                    <option value="">
                      {PROJETOS_FORM.placeholders.responsavelInterno}
                    </option>
                    {responsaveisInternos.map((responsavel) => (
                      <option key={responsavel.id} value={responsavel.id}>
                        {responsavel.nome}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="projeto-responsavel-externo">
                  {PROJETOS_FORM.fields.responsavelExterno}
                </label>
                {responsaveisExternos.length === 0 ? (
                  <p className={styles.emptyMessage}>
                    Nenhum responsável externo cadastrado.
                  </p>
                ) : (
                  <select
                    id="projeto-responsavel-externo"
                    className={styles.select}
                    value={formValues.responsavelExternoId}
                    onChange={(event) =>
                      handleChange("responsavelExternoId", event.target.value)
                    }
                    disabled={isReadOnly}
                    required
                  >
                    <option value="">
                      {PROJETOS_FORM.placeholders.responsavelExterno}
                    </option>
                    {responsaveisExternos.map((responsavel) => (
                      <option key={responsavel.id} value={responsavel.id}>
                        {responsavel.nome}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {submitError && (
            <p className={styles.submitError} role="alert">
              {submitError}
            </p>
          )}

          <div className={styles.footer}>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {PROJETOS_FORM.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? PROJETOS_FORM.saving : PROJETOS_FORM.save}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
