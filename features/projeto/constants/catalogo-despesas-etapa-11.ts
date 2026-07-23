export type CatalogoItemEtapa = {
  id: string
  label: string
  codigo: string
  codigos: string[]
  unidades: string[]
  tipo: "Gestao" | "Finalistica" | "Estruturacao" | "Kit"
}

export const FONTES_RECURSO_ETAPA = ["SISEC", "Contrapartida"] as const

export type FonteRecursoEtapa = (typeof FONTES_RECURSO_ETAPA)[number]

/**
 * Catálogo da Etapa 1.1 (categoria `stage11` da prova de conceito).
 */
export const CATALOGO_DESPESAS_ETAPA_11: CatalogoItemEtapa[] = [
  {
    id: "servicos_de_consultoria_tecnica",
    label: "Serviços de consultoria técnica",
    codigo: "33.90.35",
    codigos: ["33.90.35"],
    unidades: ["mês", "unidade"],
    tipo: "Gestao",
  },
  {
    id: "servicos_de_publicidade_e_propaganda",
    label: "Serviços de publicidade e propaganda",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "mês"],
    tipo: "Gestao",
  },
  {
    id: "material_de_divulgacao",
    label: "Material de divulgação",
    codigo: "33.90.30",
    codigos: ["33.90.30"],
    unidades: ["unidade", "pacote"],
    tipo: "Gestao",
  },
  {
    id: "despesas_com_deslocamento",
    label: "Despesas com deslocamento",
    codigo: "33.90.33",
    codigos: ["33.90.33"],
    unidades: ["unidade", "passagem"],
    tipo: "Gestao",
  },
  {
    id: "diarias_de_colaboradores",
    label: "Diárias de colaboradores",
    codigo: "33.90.14",
    codigos: ["33.90.14"],
    unidades: ["diária"],
    tipo: "Gestao",
  },
  {
    id: "servicos_de_apoio_administrativo",
    label: "Serviços de apoio administrativo",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["mês", "hora"],
    tipo: "Gestao",
  },
  {
    id: "material_de_consumo_escritorio",
    label: "Material de consumo / escritório",
    codigo: "33.90.30",
    codigos: ["33.90.30"],
    unidades: ["unidade", "pacote", "caixa"],
    tipo: "Gestao",
  },
  {
    id: "servicos_de_licitacao_e_contratacao",
    label: "Serviços de licitação e contratação",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "mês"],
    tipo: "Gestao",
  },
  {
    id: "aquisicao_de_bens_e_insumos",
    label: "Aquisição de bens e insumos",
    codigo: "33.90.30",
    codigos: ["33.90.30", "44.90.52"],
    unidades: ["unidade", "kit", "lote"],
    tipo: "Finalistica",
  },
  {
    id: "servicos_de_monitoramento_e_avaliacao",
    label: "Serviços de monitoramento e avaliação",
    codigo: "33.90.35",
    codigos: ["33.90.35"],
    unidades: ["mês", "unidade"],
    tipo: "Gestao",
  },
].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))

export function findItemEtapa11(itemId: string): CatalogoItemEtapa | undefined {
  return CATALOGO_DESPESAS_ETAPA_11.find((item) => item.id === itemId)
}
