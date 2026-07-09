"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { ADMIN_USERS_FORM, normalizeUsuarioTipo, USUARIO_TIPOS } from "../../constants/users"
import type { Profile } from "../../types/profile"
import type { Role } from "../../types/role"
import type { Usuario } from "../../types/usuario"
import styles from "./PopUpNewUser.styles.module.css"

export type NewUsuarioFormValues = {
  nome: string
  email: string
  tipo: string
  perfilId: number | null
  roles: number[]
  senha: string
  ativo: boolean
}

export type PopUpNewUserProps = {
  open: boolean
  onClose: () => void
  onSubmit: (usuario: NewUsuarioFormValues) => void | Promise<void>
  isSubmitting?: boolean
  initialValues?: NewUsuarioFormValues | Usuario | null
  mode?: "create" | "edit" | "view"
  profiles: Profile[]
  roles: Role[]
}

const INITIAL_FORM: NewUsuarioFormValues = {
  nome: "",
  email: "",
  tipo: "",
  perfilId: null,
  roles: [],
  senha: "",
  ativo: true,
}

function toFormValues(
  values: NewUsuarioFormValues | Usuario | null | undefined,
): NewUsuarioFormValues {
  if (!values) {
    return { ...INITIAL_FORM, roles: [] }
  }

  return {
    nome: values.nome,
    email: values.email,
    tipo: values.tipo,
    perfilId: values.perfilId,
    roles: [...values.roles],
    senha: values.senha,
    ativo: values.ativo,
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function PopUpNewUser({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  initialValues = null,
  mode = "create",
  profiles,
  roles,
}: PopUpNewUserProps) {
  const [formValues, setFormValues] =
    React.useState<NewUsuarioFormValues>(INITIAL_FORM)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) return

    setFormValues(toFormValues(initialValues))
    setSubmitError(null)
  }, [initialValues, open])

  if (!open) return null

  const isViewMode = mode === "view"
  const isReadOnly = isSubmitting || isViewMode

  function handleChange<K extends keyof NewUsuarioFormValues>(
    field: K,
    value: NewUsuarioFormValues[K],
  ) {
    setSubmitError(null)
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  function generateSenha12Digitos() {
    // Gera um número com 12 dígitos, permitindo zeros à esquerda.
    return Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10),
    ).join("")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isViewMode) {
      return
    }

    if (!formValues.nome.trim()) {
      setSubmitError(ADMIN_USERS_FORM.validation.nome)
      return
    }

    if (!formValues.email.trim()) {
      setSubmitError(ADMIN_USERS_FORM.validation.email)
      return
    }

    if (!isValidEmail(formValues.email.trim())) {
      setSubmitError(ADMIN_USERS_FORM.validation.emailInvalid)
      return
    }

    if (!formValues.tipo.trim()) {
      setSubmitError(ADMIN_USERS_FORM.validation.tipo)
      return
    }

    const tipo = normalizeUsuarioTipo(formValues.tipo)

    if (!tipo) {
      setSubmitError(ADMIN_USERS_FORM.validation.tipo)
      return
    }

    if (formValues.perfilId === null) {
      setSubmitError(ADMIN_USERS_FORM.validation.perfil)
      return
    }

    try {
      const senha =
        mode === "create"
          ? generateSenha12Digitos()
          : formValues.senha.trim() || generateSenha12Digitos()

      await onSubmit({
        nome: formValues.nome.trim(),
        email: formValues.email.trim().toLowerCase(),
        tipo,
        perfilId: formValues.perfilId,
        roles: formValues.roles,
        senha,
        ativo: formValues.ativo,
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : ADMIN_USERS_FORM.submitError

      setSubmitError(message)
      return
    }

    setFormValues({ ...INITIAL_FORM, roles: [] })
    onClose()
  }

  function handleClose() {
    if (isSubmitting) return

    setFormValues({ ...INITIAL_FORM, roles: [] })
    setSubmitError(null)
    onClose()
  }

  const title =
    mode === "view"
      ? ADMIN_USERS_FORM.viewTitle
      : mode === "edit"
        ? ADMIN_USERS_FORM.editTitle
        : ADMIN_USERS_FORM.createTitle

  const description =
    mode === "view"
      ? ADMIN_USERS_FORM.viewDescription
      : mode === "edit"
        ? ADMIN_USERS_FORM.editDescription
        : ADMIN_USERS_FORM.createDescription

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
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
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
            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="usuario-nome">
                  {ADMIN_USERS_FORM.fields.nome}
                </label>
                <Input
                  id="usuario-nome"
                  value={formValues.nome}
                  onChange={(event) => handleChange("nome", event.target.value)}
                  placeholder={ADMIN_USERS_FORM.placeholders.nome}
                  disabled={isReadOnly}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="usuario-email">
                  {ADMIN_USERS_FORM.fields.email}
                </label>
                <Input
                  id="usuario-email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  placeholder={ADMIN_USERS_FORM.placeholders.email}
                  disabled={isReadOnly}
                  required
                />
              </div>
            </div>

            <div className={styles.gridTwoColumns}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="usuario-tipo">
                  {ADMIN_USERS_FORM.fields.tipo}
                </label>
                <select
                  id="usuario-tipo"
                  className={styles.select}
                  value={formValues.tipo}
                  onChange={(event) =>
                    handleChange("tipo", event.target.value)
                  }
                  disabled={isReadOnly}
                  required
                >
                  <option value="">{ADMIN_USERS_FORM.placeholders.tipo}</option>
                  <option value={USUARIO_TIPOS.INTERNO}>Interno</option>
                  <option value={USUARIO_TIPOS.EXTERNO}>Externo</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="usuario-perfil">
                  {ADMIN_USERS_FORM.fields.perfil}
                </label>
                <select
                  id="usuario-perfil"
                  className={styles.select}
                  value={formValues.perfilId ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "perfilId",
                      event.target.value ? Number(event.target.value) : null,
                    )
                  }
                  disabled={isReadOnly}
                  required
                >
                  <option value="">{ADMIN_USERS_FORM.placeholders.perfil}</option>
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.fullField}>
              <label className={styles.label} htmlFor="usuario-permissoes">
                {ADMIN_USERS_FORM.fields.roles}
              </label>

              {roles.length === 0 ? (
                <p className={styles.roleDescription}>
                  Nenhuma permissão cadastrada.
                </p>
              ) : (
                <select
                  id="usuario-permissoes"
                  className={styles.select}
                  value={formValues.roles[0]?.toString() ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "roles",
                      event.target.value
                        ? [Number(event.target.value)]
                        : [],
                    )
                  }
                  disabled={isReadOnly}
                >
                  <option value="">{ADMIN_USERS_FORM.placeholders.roles}</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.descricao}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                checked={formValues.ativo}
                onChange={(event) => handleChange("ativo", event.target.checked)}
                disabled={isReadOnly}
              />
              <span>{ADMIN_USERS_FORM.fields.ativo}</span>
            </label>
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
              {isViewMode ? ADMIN_USERS_FORM.close : ADMIN_USERS_FORM.cancel}
            </Button>
            {!isViewMode && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner />
                    {ADMIN_USERS_FORM.saving}
                  </>
                ) : mode === "edit" ? (
                  ADMIN_USERS_FORM.saveChanges
                ) : (
                  ADMIN_USERS_FORM.save
                )}
              </Button>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}
