import {
  notifyError,
  notifySuccess,
} from "@/features/projeto/utils/notify"
import { saveProjectSession01IdentificacaoResponsavelTecnico } from "@/features/projeto/services"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

import type { DadosIdentificacaoResponsavelTecnico } from "../types/responsavel-tecnico-form"

type SaveResult =
  | { ok: true; data: ProjectSession01Identificacao | null }
  | { ok: false; error: string }

export async function saveIdentificacaoResponsavelTecnico(
  projectId: string,
  dados: DadosIdentificacaoResponsavelTecnico,
): Promise<SaveResult> {
  try {
    const data = await saveProjectSession01IdentificacaoResponsavelTecnico(projectId, {
      responsavelTecnicoNome: dados.nome,
      responsavelTecnicoCargo: dados.cargo,
      responsavelTecnicoTelefone: dados.telefone,
      responsavelTecnicoCelular: dados.celular,
      responsavelTecnicoEmail: dados.email,
    })

    notifySuccess("ResponsÃ¡vel tÃ©cnico salvo com sucesso!")
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "NÃ£o foi possÃ­vel salvar o responsÃ¡vel tÃ©cnico.",
      ),
    }
  }
}
