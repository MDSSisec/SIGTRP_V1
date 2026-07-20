import type { DadosPerfilSocioOcupacional } from "../types/perfil-socio-ocupacional-form"

type SavePerfilSocioOcupacionalResult =
  | { ok: true }
  | { ok: false; error: string }

type SavePerfilSocioOcupacionalOptions = {
  projectId?: string
  dados: DadosPerfilSocioOcupacional
}

/**
 * Persiste o perfil sócio-ocupacional.
 * TODO: implementar gravação no banco de dados.
 */
export async function savePerfilSocioOcupacional({
  projectId,
  dados,
}: SavePerfilSocioOcupacionalOptions): Promise<SavePerfilSocioOcupacionalResult> {
  void projectId
  void dados

  return { ok: true }
}
