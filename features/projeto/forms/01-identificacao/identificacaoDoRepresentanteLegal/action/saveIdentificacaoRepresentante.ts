import {
  notifyError,
  notifySuccess,
} from "@/features/projeto/utils/notify"
import { saveTedIdentificacaoRepresentante } from "@/features/projeto/services"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"

import type { DadosIdentificacaoRepresentanteLegal } from "../types/representante-form"

type SaveResult =
  | { ok: true; data: TedIdentificacao | null }
  | { ok: false; error: string }

export async function saveIdentificacaoRepresentante(
  projectId: string,
  dados: DadosIdentificacaoRepresentanteLegal,
): Promise<SaveResult> {
  try {
    const data = await saveTedIdentificacaoRepresentante(projectId, {
      representanteNome: dados.nome,
      representanteCpf: dados.cpf,
      representanteProfissao: dados.profissao,
      representanteCargo: dados.cargo,
      representanteEstadoCivil: dados.estadoCivil,
      representanteTelefone: dados.telefone,
      representanteEmail: dados.email,
    })

    notifySuccess("Representante legal salvo com sucesso!")
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o representante legal.",
      ),
    }
  }
}
