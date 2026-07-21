import {
    notifyError,
    notifySuccess,
  } from "@/features/projeto/utils/notify"
  import { saveProjectSession01IdentificacaoProjeto } from "@/features/projeto/services"
  import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
  
  import type { DadosIdentificacaoProjeto } from "../types/identificacao-form"
  
  /**
   * Dados enviados para persistÃªncia da IdentificaÃ§Ã£o do Projeto.
   */
  type SaveIdentificacaoProjetoInput = Pick<
    DadosIdentificacaoProjeto,
    "localExecucao" | "duracao" | "resumoProjeto"
  >
  
  /**
   * Resultado da operaÃ§Ã£o de salvamento.
   */
  type SaveIdentificacaoProjetoResult =
    | {
        ok: true
        data: ProjectSession01Identificacao | null
      }
    | {
        ok: false
        error: string
      }
  
  /**
   * Salva os dados da seÃ§Ã£o "IdentificaÃ§Ã£o do Projeto".
   *
   * Responsabilidades:
   * - enviar os dados para a API;
   * - exibir notificaÃ§Ãµes de sucesso/erro;
   * - padronizar o retorno para consumo pelos hooks.
   */
  export async function saveIdentificacaoProjeto(
    projectId: string,
    formData: SaveIdentificacaoProjetoInput,
  ): Promise<SaveIdentificacaoProjetoResult> {
    try {
      const data = await saveProjectSession01IdentificacaoProjeto(projectId, formData)
  
      notifySuccess(
        "IdentificaÃ§Ã£o do projeto salva com sucesso!",
      )
  
      return {
        ok: true,
        data,
      }
    } catch (error) {
      const message = notifyError(
        error,
        "NÃ£o foi possÃ­vel salvar a identificaÃ§Ã£o do projeto.",
      )
  
      return {
        ok: false,
        error: message,
      }
    }
  }