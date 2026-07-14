"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react"

import { PROJETOS_FORM } from "../../constants/project"
import { parseTipoProjetoField } from "../../constants/projeto-tipos"
import type { CreateProjetoInput } from "../../types"
import {
  createInitialForm,
  toCreateProjetoInput,
  validateProjetoForm,
  type ProjetoFormState,
} from "./validateProjetoForm"

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

type UseProjetoFormOptions = {
  open: boolean
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (projeto: CreateProjetoInput) => void | Promise<void>
}

export function useProjetoForm({
  open,
  isSubmitting,
  onClose,
  onSubmit,
}: UseProjetoFormOptions) {
  const [formValues, setFormValues] = useState(createInitialForm)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLElement>(null)

  const handleClose = useCallback(() => {
    if (isSubmitting) return

    setFormValues(createInitialForm())
    setSubmitError(null)
    onClose()
  }, [isSubmitting, onClose])

  const handleOverlayClick = useCallback(
    (_event: MouseEvent<HTMLDivElement>) => {
      handleClose()
    },
    [handleClose],
  )

  const handleChange = useCallback(
    <K extends keyof ProjetoFormState>(field: K, value: ProjetoFormState[K]) => {
      setSubmitError(null)
      setFormValues((current) => ({
        ...current,
        [field]: value,
      }))
    },
    [],
  )

  const handleTipoChange = useCallback((value: string) => {
    handleChange("tipoProjeto", parseTipoProjetoField(value))
  }, [handleChange])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const error = validateProjetoForm(formValues)
      if (error) {
        setSubmitError(error)
        return
      }

      const payload = toCreateProjetoInput(formValues)
      if (!payload) {
        setSubmitError(PROJETOS_FORM.validation.tipoProjeto)
        return
      }

      try {
        await onSubmit(payload)
      } catch (caught) {
        const message =
          caught instanceof Error ? caught.message : PROJETOS_FORM.submitError
        setSubmitError(message)
        return
      }

      setFormValues(createInitialForm())
      onClose()
    },
    [formValues, onClose, onSubmit],
  )

  useEffect(() => {
    if (!open) return

    setFormValues(createInitialForm())
    setSubmitError(null)
  }, [open])

  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusTimer = window.setTimeout(() => {
      dialog
        ?.querySelector<HTMLInputElement>("#projeto-nome")
        ?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key !== "Tab" || !dialog) return

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"))

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener("keydown", handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [open, handleClose])

  return {
    formValues,
    submitError,
    isReadOnly: isSubmitting,
    dialogRef,
    handleChange,
    handleTipoChange,
    handleSubmit,
    handleClose,
    handleOverlayClick,
  }
}
