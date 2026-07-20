import type { DadosPublicoBeneficiarioEServicos } from "../types/publico-beneficiario-e-servicos-form"

type SavePublicoBeneficiarioEServicosResult =
  | { ok: true }
  | { ok: false; error: string }

type SavePublicoBeneficiarioEServicosOptions = {
  projectId?: string
  dados: DadosPublicoBeneficiarioEServicos
}

/**
 * Persiste o público beneficiário e serviços.
 * TODO: implementar gravação no banco de dados.
 */
export async function savePublicoBeneficiarioEServicos({
  projectId,
  dados,
}: SavePublicoBeneficiarioEServicosOptions): Promise<SavePublicoBeneficiarioEServicosResult> {
  void projectId
  void dados

  return { ok: true }
}
