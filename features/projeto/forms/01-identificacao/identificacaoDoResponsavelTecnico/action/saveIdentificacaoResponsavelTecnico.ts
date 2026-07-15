import {
  notifyError,
  notifySuccess,
} from "@/features/projeto/utils/notify"
import { saveTedIdentificacaoResponsavelTecnico } from "@/features/projeto/services"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"

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

    notifySuccess("Responsável técnico salvo com sucesso!")
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o responsável técnico.",
      ),
    }
  }
}
