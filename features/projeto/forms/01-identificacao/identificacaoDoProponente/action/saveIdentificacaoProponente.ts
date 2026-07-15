import { notifyFormSaveError, notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { saveTedIdentificacaoProponente } from "@/features/projetos/services"
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

    notifyFormSaveSuccess("Proponente salvo com sucesso!")

    return {
      ok: true,
      data,
    }
  } catch (error) {
    return {
      ok: false,
      error: notifyFormSaveError(
        error,
        "Não foi possível salvar o proponente.",
      ),
    }
  }
}