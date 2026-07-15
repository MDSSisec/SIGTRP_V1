import {
    notifyFormSaveError,
    notifyFormSaveSuccess,
  } from "@/features/projetos/components/project-ted/shared/form-save-toast"
  import { saveTedIdentificacaoProjeto } from "@/features/projetos/services"
  import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
  
  import type { DadosIdentificacaoProjeto } from "../types/identificacao-form"
  
  /**
   * Dados enviados para persistência da Identificação do Projeto.
   */
  type SaveIdentificacaoProjetoInput = Pick<
    DadosIdentificacaoProjeto,
    "localExecucao" | "duracao" | "resumoProjeto"
  >
  
  /**
   * Resultado da operação de salvamento.
   */
  type SaveIdentificacaoProjetoResult =
    | {
        ok: true
        data: TedIdentificacao | null
      }
    | {
        ok: false
        error: string
      }
  
  /**
   * Salva os dados da seção "Identificação do Projeto".
   *
   * Responsabilidades:
   * - enviar os dados para a API;
   * - exibir notificações de sucesso/erro;
   * - padronizar o retorno para consumo pelos hooks.
   */
  export async function saveIdentificacaoProjeto(
    projectId: string,
    formData: SaveIdentificacaoProjetoInput,
  ): Promise<SaveIdentificacaoProjetoResult> {
    try {
      const data = await saveTedIdentificacaoProjeto(projectId, formData)
  
      notifyFormSaveSuccess(
        "Identificação do projeto salva com sucesso!",
      )
  
      return {
        ok: true,
        data,
      }
    } catch (error) {
      const message = notifyFormSaveError(
        error,
        "Não foi possível salvar a identificação do projeto.",
      )
  
      return {
        ok: false,
        error: message,
      }
    }
  }