/** Linha editável do resumo do plano de aplicação. */
export type LinhaResumoPlanoAplicacao = {
  id: string
  elementoDespesa: string
  codigo: string
  mds: string
  contrapartida: string
}

/** Estado editável do resumo do plano de aplicação. */
export type DadosResumoPlanoAplicacao = {
  linhas: LinhaResumoPlanoAplicacao[]
}

/** Totais derivados por linha e no rodapé. */
export type ValoresResumoPlanoAplicacao = {
  totaisLinha: number[]
  totalMds: number
  totalContrapartida: number
  totalGeral: number
}

export type CampoLinhaResumo =
  | "elementoDespesa"
  | "codigo"
  | "mds"
  | "contrapartida"

export function criarLinhaVazia(): LinhaResumoPlanoAplicacao {
  return {
    id: crypto.randomUUID(),
    elementoDespesa: "",
    codigo: "",
    mds: "",
    contrapartida: "",
  }
}

export const VAZIO_RESUMO_PLANO_APLICACAO: DadosResumoPlanoAplicacao = {
  linhas: [criarLinhaVazia()],
}
