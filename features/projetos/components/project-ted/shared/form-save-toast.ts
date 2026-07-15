import {
  notifySuccess,
  notifyError,
} from "@/features/projeto/utils/notify"

export const FORM_SAVE_SUCCESS_MESSAGE =
  "Alterações salvas com sucesso!"

export function notifyFormSaveSuccess(
  message = FORM_SAVE_SUCCESS_MESSAGE,
): void {
  notifySuccess(message)
}

export function notifyFormSaveError(
  error: unknown,
  fallback: string,
): string {
  return notifyError(error, fallback)
}
