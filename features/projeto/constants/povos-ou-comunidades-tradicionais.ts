export const POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE = {
  TITLE:
    "15. Informe se o Público Beneficiário faz Parte de Algum Destes Povos ou Comunidades Tradicionais",
} as const

export const POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES = [
  {
    id: "povos-indigenas",
    label: "Indígenas.",
  },
  {
    id: "povos-comunidades-quilombolas",
    label: "Comunidades quilombolas.",
  },
  {
    id: "povos-comunidades-terreiro",
    label: "Comunidades de terreiro.",
  },
  {
    id: "povos-comunidades-caboclas",
    label: "Comunidades caboclas.",
  },
  {
    id: "povos-extrativistas",
    label: "Extrativistas.",
  },
  {
    id: "povos-ribeirinhos",
    label: "Ribeirinhos (as).",
  },
  {
    id: "povos-pescadores-artesanais",
    label: "Pescadores (as) artesanais.",
  },
  {
    id: "povos-outros",
    label: "Outros povos e comunidades tradicionais. Quais:",
    comEspecificar: true,
    exclusivo: true,
  },
  {
    id: "povos-nao-se-aplica",
    label: "Não se aplica",
    exclusivo: true,
  },
] as const

export type PovosOuComunidadesTradicionaisOpcao =
  (typeof POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES)[number]

export function temEspecificar(
  opcao: PovosOuComunidadesTradicionaisOpcao,
): opcao is PovosOuComunidadesTradicionaisOpcao & { comEspecificar: true } {
  return "comEspecificar" in opcao && opcao.comEspecificar === true
}

export function temExclusivo(
  opcao: PovosOuComunidadesTradicionaisOpcao,
): opcao is PovosOuComunidadesTradicionaisOpcao & { exclusivo: true } {
  return "exclusivo" in opcao && opcao.exclusivo === true
}

const POVOS_IDS_EXCLUSIVOS = new Set<string>(
  POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES.filter(temExclusivo).map(
    (opcao) => opcao.id,
  ),
)

export function isIdExclusivo(id: string): boolean {
  return POVOS_IDS_EXCLUSIVOS.has(id)
}
