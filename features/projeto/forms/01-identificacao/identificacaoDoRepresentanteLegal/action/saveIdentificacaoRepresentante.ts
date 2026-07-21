import {
  notifyError,
  notifySuccess,
} from "@/features/projeto/utils/notify"
import { saveProjectSession01IdentificacaoRepresentante } from "@/features/projeto/services"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

import type { DadosIdentificacaoRepresentanteLegal } from "../types/representante-form"

type SaveResult =
  | { ok: true; data: ProjectSession01Identificacao | null }
  | { ok: false; error: string }

export async function saveIdentificacaoRepresentante(
  projectId: string,
  dados: DadosIdentificacaoRepresentanteLegal,
): Promise<SaveResult> {
  try {
    const data = await saveProjectSession01IdentificacaoRepresentante(projectId, {
      representanteNome: dados.nome,
      representanteMatriculaFuncional: dados.matriculaFuncional,
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
        "NÃ£o foi possÃ­vel salvar o representante legal.",
      ),
    }
  }
}
