export const PERFIL_SOCIO_OCUPACIONAL_TITLE = {
  TITLE:
    "16. Informe o perfil sócio-ocupacional predominante do público beneficiário",
} as const

/** Opções desta seção — textos provisórios até definição final. */
export const PERFIL_SOCIO_OCUPACIONAL_OPCOES = [
  {
    id: "perfil-artesaos",
    label: "Artesãos (ãs).",
  },
  {
    id: "perfil-catadores-materiais-reciclaveis",
    label: "Catadores (as) de materiais recicláveis.",
  },
  {
    id: "perfil-garimpeiros-mineiros",
    label: "Garimpeiros (as), mineiros (as).",
  },
  {
    id: "perfil-pescadores-extrativistas",
    label: "Pescadores (as), extrativistas.",
  },
  {
    id: "perfil-trabalhadores-empresa-recuperada",
    label: "Trabalhadores (as) de empresa recuperada.",
  },
  {
    id: "perfil-usuarios-saude-mental",
    label: "Usuários do sistema de saúde mental.",
  },
  {
    id: "perfil-cadunico",
    label: "CadÚnico.",
  },
  {
    id: "perfil-outros",
    label: "Outros (Especificar)",
    comEspecificar: true,
    exclusivo: true,
  },
  {
    id: "perfil-nao-se-aplica",
    label: "Não se aplica.",
    exclusivo: true,
  },
] as const

export type PerfilSocioOcupacionalOpcao =
  (typeof PERFIL_SOCIO_OCUPACIONAL_OPCOES)[number]

export function temEspecificar(
  opcao: PerfilSocioOcupacionalOpcao,
): opcao is PerfilSocioOcupacionalOpcao & { comEspecificar: true } {
  return "comEspecificar" in opcao && opcao.comEspecificar === true
}

export function temExclusivo(
  opcao: PerfilSocioOcupacionalOpcao,
): opcao is PerfilSocioOcupacionalOpcao & { exclusivo: true } {
  return "exclusivo" in opcao && opcao.exclusivo === true
}

const PERFIL_SOCIO_OCUPACIONAL_IDS_EXCLUSIVOS = new Set<string>(
  PERFIL_SOCIO_OCUPACIONAL_OPCOES.filter(temExclusivo).map((opcao) => opcao.id),
)

export function isIdExclusivo(id: string): boolean {
  return PERFIL_SOCIO_OCUPACIONAL_IDS_EXCLUSIVOS.has(id)
}
