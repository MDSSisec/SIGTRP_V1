import {
  notifyFormSaveError,
  notifyFormSaveSuccess,
} from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { saveTedIdentificacaoResponsavelTecnico } from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"

import type { DadosIdentificacaoResponsavelTecnico } from "../types/responsavel-tecnico-form"

type SaveResult =
  | { ok: true; data: TedIdentificacao | null }
  | { ok: false; error: string }

export async function saveIdentificacaoResponsavelTecnico(
  projectId: string,
  dados: DadosIdentificacaoResponsavelTecnico,
): Promise<SaveResult> {
  try {
    const data = await saveTedIdentificacaoResponsavelTecnico(projectId, {
      responsavelTecnicoNome: dados.nome,
      responsavelTecnicoCargo: dados.cargo,
      responsavelTecnicoTelefone: dados.telefone,
      responsavelTecnicoCelular: dados.celular,
      responsavelTecnicoEmail: dados.email,
    })

    notifyFormSaveSuccess("Responsável técnico salvo com sucesso!")
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyFormSaveError(
        error,
        "Não foi possível salvar o responsável técnico.",
      ),
    }
  }
}
