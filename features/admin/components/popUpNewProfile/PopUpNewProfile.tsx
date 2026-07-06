"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Profile } from "../../types/profile"
import styles from "./PopUpNewProfile.styles.module.css"

export type NewProfileFormValues = {
  nome: string
  descricao: string
}

export type PopUpNewProfileProps = {
  open: boolean
  onClose: () => void
  onSubmit: (profile: NewProfileFormValues) => void | Promise<void>
  isSubmitting?: boolean
  initialValues?: NewProfileFormValues | Profile | null
  mode?: "create" | "edit" | "view"
}

const INITIAL_FORM: NewProfileFormValues = {
  nome: "",
  descricao: "",
}

function toFormValues(
  values: NewProfileFormValues | Profile | null | undefined,
): NewProfileFormValues {
  if (!values) {
    return { ...INITIAL_FORM }
  }

  return {
    nome: values.nome,
    descricao: values.descricao,
  }
}

export function PopUpNewProfile({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  initialValues = null,
  mode = "create",
}: PopUpNewProfileProps) {
  const [formValues, setFormValues] =
    React.useState<NewProfileFormValues>(INITIAL_FORM)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) return

    setFormValues(toFormValues(initialValues))
    setSubmitError(null)
  }, [initialValues, open])

  if (!open) return null

  const isViewMode = mode === "view"
  const isReadOnly = isSubmitting || isViewMode

  function handleChange(field: keyof NewProfileFormValues, value: string) {
    setSubmitError(null)
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isViewMode) {
      return
    }

    if (!formValues.nome.trim()) {
      setSubmitError("Informe o nome do perfil.")
      return
    }

    if (!formValues.descricao.trim()) {
      setSubmitError("Informe a descrição do perfil.")
      return
    }

    try {
      await onSubmit({
        nome: formValues.nome.trim(),
        descricao: formValues.descricao.trim(),
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o perfil."

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
              <h2 className={styles.title}>
                {mode === "view"
                  ? "Visualizar perfil"
                  : mode === "edit"
                    ? "Editar perfil"
                    : "Criar perfil"}
              </h2>
              <p className={styles.description}>
                {mode === "view"
                  ? "Confira os dados do perfil selecionado."
                  : mode === "edit"
                    ? "Atualize os dados do perfil selecionado."
                    : "Informe os dados para cadastrar um novo perfil."}
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
            <div className={styles.fullField}>
              <label className={styles.label} htmlFor="profile-nome">
                Nome
              </label>
              <Input
                id="profile-nome"
                value={formValues.nome}
                onChange={(event) => handleChange("nome", event.target.value)}
                placeholder="Ex.: administrador"
                disabled={isReadOnly}
                required
              />
            </div>

            <div className={styles.fullField}>
              <label className={styles.label} htmlFor="profile-descricao">
                Descrição
              </label>
              <Textarea
                id="profile-descricao"
                value={formValues.descricao}
                onChange={(event) =>
                  handleChange("descricao", event.target.value)
                }
                placeholder="Descreva as permissões ou o papel deste perfil"
                disabled={isReadOnly}
                required
              />
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
              {isViewMode ? "Fechar" : "Cancelar"}
            </Button>
            {!isViewMode && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : mode === "edit"
                    ? "Salvar alterações"
                    : "Salvar perfil"}
              </Button>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}
