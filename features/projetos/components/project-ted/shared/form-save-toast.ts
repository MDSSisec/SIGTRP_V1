import { toast } from "sonner"

export const FORM_SAVE_SUCCESS_MESSAGE = "Alterações salvas com sucesso!"

export function notifyFormSaveSuccess(message = FORM_SAVE_SUCCESS_MESSAGE) {
  toast.success(message)
}

export function notifyFormSaveError(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : fallback
  toast.error(message)
  return message
}
