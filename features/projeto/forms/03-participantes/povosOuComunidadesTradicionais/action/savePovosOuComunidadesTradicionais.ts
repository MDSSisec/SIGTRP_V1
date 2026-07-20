import type { DadosPovosOuComunidadesTradicionais } from "../types/povos-ou-comunidades-tradicionais-form"

type SavePovosOuComunidadesTradicionaisResult =
  | { ok: true }
  | { ok: false; error: string }

type SavePovosOuComunidadesTradicionaisOptions = {
  projectId?: string
  dados: DadosPovosOuComunidadesTradicionais
}

/**
 * Persiste povos ou comunidades tradicionais.
 * TODO: implementar gravação no banco de dados.
 */
export async function savePovosOuComunidadesTradicionais({
  projectId,
  dados,
}: SavePovosOuComunidadesTradicionaisOptions): Promise<SavePovosOuComunidadesTradicionaisResult> {
  void projectId
  void dados

  return { ok: true }
}
