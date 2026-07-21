import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
import { saveProjectSession01IdentificacaoProponente } from "@/features/projeto/services"
import type { DadosIdentificacaoProponente } from "../types/proponente-form"

type SaveIdentificacaoProponenteResult =
  | {
      ok: true
      data: ProjectSession01Identificacao | null
    }
  | {
      ok: false
      error: string
    }

/**
 * Persiste a seÃ§Ã£o "IdentificaÃ§Ã£o do(a) Proponente".
 *
 * ResponsÃ¡vel por:
 * - converter o formulÃ¡rio para o formato esperado pela API;
 * - executar o salvamento;
 * - exibir feedback de sucesso ou erro;
 * - retornar um resultado padronizado.
 */
export async function saveIdentificacaoProponente(
  projectId: string,
  dados: DadosIdentificacaoProponente,
): Promise<SaveIdentificacaoProponenteResult> {
  try {
    const payload = {
      proponenteNome: dados.nome,
      proponenteCnpj: dados.cnpj,
      proponenteDataFundacao: dados.dataFundacao,
      proponenteRegistroCnpj: dados.registroCnpj,
      proponenteEndereco: dados.enderecoCompleto,
      proponenteBairro: dados.bairro,
      proponenteUfIbge: dados.ufIbge,
      proponenteMunicipioIbge: dados.municipioIbge,
      proponenteCep: dados.cep,
      proponenteTelefone: dados.telefoneFax,
      proponenteEmail: dados.email,
      proponentePaginaWeb: dados.paginaWeb,
    }

    const data = await saveProjectSession01IdentificacaoProponente(
      projectId,
      payload,
    )

    notifySuccess("Proponente salvo com sucesso!")

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "NÃ£o foi possÃ­vel salvar o proponente.",
      ),
    }
  }
}