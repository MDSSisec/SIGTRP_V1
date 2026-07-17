import { PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE } from "@/features/projeto/constants/publico-beneficiario-do-projeto"

import type {
  DadosPublicoBeneficiario,
  ValoresPublicoBeneficiario,
} from "../types/publico-beneficiario-form"

const { MULTIPLICADOR_INDIRETOS } = PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE

/** Converte string em número inteiro (só dígitos). */
export function parseQuantidade(value: string): number {
  const digits = value.replace(/\D/g, "")
  if (!digits) return 0
  return Number(digits)
}

/** Formata número para exibição; zero vira vazio. */
export function formatQuantidade(value: number): string {
  if (value === 0) return ""
  return String(value)
}

/** Mantém apenas dígitos no input. */
export function sanitizeQuantidadeInput(value: string): string {
  return value.replace(/\D/g, "")
}

/** Calcula indiretos (×3) e totais a partir dos diretos. */
export function calcularValores(
  dados: DadosPublicoBeneficiario,
): ValoresPublicoBeneficiario {
  const homens = parseQuantidade(dados.homensDiretos)
  const mulheres = parseQuantidade(dados.mulheresDiretos)

  return {
    homensIndiretos: homens * MULTIPLICADOR_INDIRETOS,
    mulheresIndiretos: mulheres * MULTIPLICADOR_INDIRETOS,
    totalDiretos: homens + mulheres,
    totalIndiretos:
      homens * MULTIPLICADOR_INDIRETOS + mulheres * MULTIPLICADOR_INDIRETOS,
  }
}
