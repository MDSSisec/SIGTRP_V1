import { CRONOGRAMA_DESEMBOLSO_PARCELAS } from "../constants"

/** Linha editável de uma parcela. */
export type LinhaParcelaDesembolso = {
  mesAno: string
  mds: string
  contrapartida: string
}

/** Estado editável do cronograma de desembolso. */
export type DadosCronogramaDesembolso = {
  parcelas: LinhaParcelaDesembolso[]
}

/** Totais derivados por linha e no rodapé. */
export type ValoresCronogramaDesembolso = {
  totaisLinha: number[]
  totalMds: number
  totalContrapartida: number
  totalGeral: number
}

export type CampoParcela = keyof LinhaParcelaDesembolso

function criarLinhaVazia(): LinhaParcelaDesembolso {
  return { mesAno: "", mds: "", contrapartida: "" }
}

export const VAZIO_CRONOGRAMA_DESEMBOLSO: DadosCronogramaDesembolso = {
  parcelas: CRONOGRAMA_DESEMBOLSO_PARCELAS.map(() => criarLinhaVazia()),
}
