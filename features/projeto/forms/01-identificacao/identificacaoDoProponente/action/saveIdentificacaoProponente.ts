import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"
import { saveTedIdentificacaoProponente } from "@/features/projeto/services"
import type { DadosIdentificacaoProponente } from "../types/proponente-form"

type SaveIdentificacaoProponenteResult =
  | {
      ok: true
      data: TedIdentificacao | null
    }
  | {
      ok: false
      error: string
    }

/**
 * Persiste a seção "Identificação do(a) Proponente".
 *
 * Responsável por:
 * - converter o formulário para o formato esperado pela API;
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

    const data = await saveTedIdentificacaoProponente(
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
        "Não foi possível salvar o proponente.",
      ),
    }
  }
}