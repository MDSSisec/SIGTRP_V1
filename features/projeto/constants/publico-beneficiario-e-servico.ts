export const PUBLICO_BENEFICIARIO_ESERVICOS_TITLE = {
  TITLE:
    "17. Informe se o público beneficiário está acessando alguns dos seguintes serviços",
} as const

/** Opções desta seção — textos provisórios até definição final. */
export const PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES = [
  {
    id: "servico-item-01",
    label:
      "Centros de Referência Especializado para População em Situação de Rua (Centros POP)",
  },
  {
    id: "servico-item-02",
    label: "Centros de Atenção Psicossocial (CAPS)",
  },
  {
    id: "servico-item-03",
    label: "Bolsa Família",
  },
  {
    id: "servico-item-04",
    label: "Previdência Social ou Benefício de Prestação Continuada",
  },
  {
    id: "servico-item-05",
    label: "Outros (Especificar)",
    comEspecificar: true,
  },
] as const

export type PublicoBeneficiarioEServicosOpcao =
  (typeof PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES)[number]

export function temEspecificar(
  opcao: PublicoBeneficiarioEServicosOpcao,
): opcao is PublicoBeneficiarioEServicosOpcao & { comEspecificar: true } {
  return "comEspecificar" in opcao && opcao.comEspecificar === true
}

export const PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID =
  PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES.find(temEspecificar)!.id
