export type CatalogoItemCurso = {
  id: string
  label: string
  codigo: string
  unidades: string[]
}

export type CatalogoTipoItemCurso = {
  id: string
  label: string
  itens: CatalogoItemCurso[]
}

/** Catálogo de tipos/itens do detalhamento de gastos do curso (fonte: form_manoel). */
export const TIPOS_ITEM_CURSO: CatalogoTipoItemCurso[] = [
  {
    id: "kit_participante",
    label: "Kit participante",
    itens: [
      { id: "estojo_escolar_simples_nylon_preto", label: "Estojo Escolar Simples Nylon Preto", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "caderno_a4_100_paginas", label: "Caderno a4 100 paginas", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "lapis_preto_hb2", label: "Lápis preto HB2", codigo: "33.90.39", unidades: ["kit 4 unidades"] },
      { id: "apontador_de_lapis_de_grafiti", label: "Apontador de lapis de grafiti", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "borracha_para_lapis_grafiti", label: "Borracha para lápis grafiti", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "caneta_esferografica_azul", label: "Caneta esferográfica azul", codigo: "33.90.39", unidades: ["kit 3 unidades"] },
      { id: "mochila_poliester_42cm_x_48cm_x_33cm", label: "Mochila poliester 42cm x 48cm x 33cm", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "ecobag_tecido", label: "Ecobag de tecido 22cm x 28cm x 13cm", codigo: "33.90.39", unidades: ["unidade"] },
    ],
  },
  {
    id: "insumos_gerais",
    label: "Insumos gerais",
    itens: [
      { id: "material_escritorio", label: "Material de escritório", codigo: "33.90.30", unidades: ["pacote", "unidade"] },
      { id: "material_consumo", label: "Material de consumo", codigo: "33.90.30", unidades: ["unidade", "litro", "metro"] },
      { id: "cimento_50kg", label: "Cimento (50 kg)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "areia_media_m3", label: "Areia média (m³)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "blocos_tijolos", label: "Blocos/tijolos", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "brita_fina_m3", label: "Brita fina (m³)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "cal_hidratada_saco_padrao", label: "Cal hidratada (saco padrão)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "colher_de_pedreiro", label: "Colher de pedreiro", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "desempenadeira_lisa", label: "Desempenadeira lisa", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "desempenadeira_dentada", label: "Desempenadeira dentada", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "prumo", label: "Prumo", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "nivel", label: "Nível", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "trena", label: "Trena", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "esquadro", label: "Esquadro", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "regua_de_aluminio", label: "Régua de alumínio", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "enxada", label: "Enxada", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "pa", label: "Pá", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "balde_reforcado", label: "Balde reforçado", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "martelo", label: "Martelo", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "serra_manual", label: "Serra manual", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "serrote", label: "Serrote", codigo: "33.90.40", unidades: ["unidade"] },
      { id: "formao_kit_c_4", label: "Formão (kit c/ 4)", codigo: "33.90.41", unidades: ["unidade"] },
      { id: "plaina_manual", label: "Plaina manual", codigo: "33.90.42", unidades: ["unidade"] },
      { id: "esquadro_carpinteiro", label: "Esquadro carpinteiro", codigo: "33.90.43", unidades: ["unidade"] },
      { id: "grampo_sargento", label: "Grampo/sargento", codigo: "33.90.44", unidades: ["unidade"] },
      { id: "furadeira_eletrica", label: "Furadeira elétrica", codigo: "33.90.45", unidades: ["unidade"] },
      { id: "brocas_para_madeira_kit_c_5", label: "Brocas para madeira (kit c/ 5)", codigo: "33.90.46", unidades: ["unidade"] },
      { id: "bancada_de_trabalho", label: "Bancada de trabalho", codigo: "33.90.46", unidades: ["unidade"] },
      { id: "are_de_pratica", label: "Áre de prática", codigo: "33.90.46", unidades: ["unidade"] },
      { id: "masseira", label: "Masseira", codigo: "33.90.46", unidades: ["unidade"] },
      { id: "formas_de_madeira", label: "Formas de madeira", codigo: "33.90.46", unidades: ["unidade"] },
      { id: "tabuas_de_madeira", label: "Tábuas de madeira", codigo: "33.90.47", unidades: ["unidade"] },
      { id: "sarrafos", label: "Sarrafos", codigo: "33.90.48", unidades: ["unidade"] },
      { id: "compensado_chapa", label: "Compensado (chapa)", codigo: "33.90.49", unidades: ["unidade"] },
      { id: "pregos_kg", label: "Pregos (Kg)", codigo: "33.90.50", unidades: ["unidade"] },
      { id: "parafusos_kg", label: "Parafusos (Kg)", codigo: "33.90.51", unidades: ["unidade"] },
      { id: "buchas_caixa", label: "Buchas (caixa)", codigo: "33.90.52", unidades: ["unidade"] },
      { id: "cola_para_madeira_litro", label: "Cola para madeira (litro)", codigo: "33.90.53", unidades: ["unidade"] },
      { id: "desempenadeira_acabamento", label: "Desempenadeira acabamento", codigo: "33.90.54", unidades: ["unidade"] },
      { id: "lixas_kit", label: "Lixas (kit)", codigo: "33.90.55", unidades: ["unidade"] },
      { id: "espatula", label: "Espátula", codigo: "33.90.56", unidades: ["unidade"] },
      { id: "rolo_de_pintura", label: "Rolo de pintura", codigo: "33.90.57", unidades: ["unidade"] },
      { id: "bandeja_de_pintura", label: "Bandeja de pintura", codigo: "33.90.58", unidades: ["unidade"] },
      { id: "massa_corrida_kg", label: "Massa corrida (kg)", codigo: "33.90.59", unidades: ["unidade"] },
      { id: "baldes", label: "Baldes", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "carrinho_de_mao", label: "Carrinho de mão", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "mangueira_20_m", label: "Mangueira (20 m)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "lona_plastica", label: "Lona plástica", codigo: "33.90.40", unidades: ["unidade"] },
      { id: "pregos_adicionais", label: "Pregos adicionais", codigo: "33.90.41", unidades: ["unidade"] },
    ],
  },
  {
    id: "epi",
    label: "EPI",
    itens: [
      { id: "luva_protecao", label: "Luva de proteção", codigo: "33.90.30", unidades: ["unidade", "par"] },
      { id: "oculos_protecao", label: "Óculos de proteção", codigo: "33.90.30", unidades: ["unidade"] },
      { id: "capacete_seguranca", label: "Capacete de segurança", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "oculos_seguranca", label: "Óculos de segurança", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "luvas_protecao_tabela", label: "Luvas de proteção (Tabela)", codigo: "33.90.39", unidades: ["unidade", "par"] },
      { id: "botina_seguranca", label: "Botina de segurança", codigo: "33.90.40", unidades: ["unidade"] },
      { id: "mascara_respiratoria_pf2", label: "Máscara respiratória (PF2)", codigo: "33.90.41", unidades: ["unidade", "kit"] },
      { id: "protetor_auricular", label: "Protetor auricular", codigo: "33.90.42", unidades: ["unidade", "kit"] },
    ],
  },
  {
    id: "kit_trabalho",
    label: "Kit Trabalho",
    itens: [
      { id: "ferramentas_basicas", label: "Ferramentas básicas", codigo: "33.90.30", unidades: ["kit"] },
      { id: "uniforme_trabalho", label: "Uniforme de trabalho", codigo: "33.90.30", unidades: ["kit", "unidade"] },
    ],
  },
  {
    id: "Outros",
    label: "Outros",
    itens: [
      { id: "apostila_impressa", label: "Apostila impressa", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "uniforme_camiseta", label: "Uniforme (camiseta)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "certificados", label: "Certificados", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "epis_memoria_calculo", label: "EPIs (memória de cálculo anexo)", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "instrutor", label: "Instrutor", codigo: "33.90.39", unidades: ["hora"] },
      { id: "monitor", label: "Monitor", codigo: "33.90.39", unidades: ["hora"] },
      { id: "lanche_participantes", label: "Lanche para os participantes do curso", codigo: "33.90.39", unidades: ["unidade"] },
      { id: "transporte_participantes", label: "Transporte para os participantes do curso", codigo: "33.90.39", unidades: ["unidade"] },
    ],
  },
]

export const DEFAULT_CURSO_DESPESA_PRESETS: Array<{ tipoId: string; itemId: string }> = [
  { tipoId: "kit_participante", itemId: "estojo_escolar_simples_nylon_preto" },
  { tipoId: "kit_participante", itemId: "caderno_a4_100_paginas" },
  { tipoId: "kit_participante", itemId: "lapis_preto_hb2" },
  { tipoId: "kit_participante", itemId: "apontador_de_lapis_de_grafiti" },
  { tipoId: "kit_participante", itemId: "borracha_para_lapis_grafiti" },
  { tipoId: "kit_participante", itemId: "caneta_esferografica_azul" },
  { tipoId: "kit_participante", itemId: "mochila_poliester_42cm_x_48cm_x_33cm" },
  { tipoId: "kit_participante", itemId: "ecobag_tecido" },
  { tipoId: "Outros", itemId: "apostila_impressa" },
  { tipoId: "Outros", itemId: "uniforme_camiseta" },
  { tipoId: "Outros", itemId: "certificados" },
  { tipoId: "Outros", itemId: "epis_memoria_calculo" },
  { tipoId: "Outros", itemId: "instrutor" },
  { tipoId: "Outros", itemId: "monitor" },
  { tipoId: "Outros", itemId: "lanche_participantes" },
  { tipoId: "Outros", itemId: "transporte_participantes" },
]

export function findTipoItemCurso(tipoId: string) {
  return TIPOS_ITEM_CURSO.find((tipo) => tipo.id === tipoId) ?? null
}

export function findItemCurso(tipoId: string, itemId: string) {
  return findTipoItemCurso(tipoId)?.itens.find((item) => item.id === itemId) ?? null
}
