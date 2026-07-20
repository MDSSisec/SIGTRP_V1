import type { GrupoSecaoConfig, SecaoConfig } from "@/features/projeto/config/modelos/types"

import { ETAPAS_CRONOGRAMA_TITLE } from "./etapas-cronograma"
import { GESTAO_TITLE } from "./gestao-projeto"
import { JUSTIFICATIVA_TITLE } from "./justificativa"
import { METAS_TITLE } from "./metas"
import { METODOLOGIA_TITLE } from "./metodologia"
import { OBJETIVOS_TITLE } from "./objetivos"
import { POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE } from "./povos-ou-comunidades-tradicionais"
import { PUBLICO_BENEFICIARIO_ESERVICOS_TITLE } from "./publico-beneficiario-e-servico"
import { RESULTADOS_TITLE } from "./resultados"

/** Chave estável da seção no catálogo (camelCase). */
export type ProjetoSecaoId = keyof typeof PROJETO_SECOES

export type ProjetoSecaoDef = {
  slug: string
  title: string
  /** Título no menu lateral quando difere do documento TRP. */
  sidebarTitle?: string
  /** Chave do checklist em Informações do Projeto (`TITLE_SESSAO_*`). */
  titleKey?: string
  subtitle?: string
}

/**
 * Catálogo único de seções do formulário de projeto (slug + títulos).
 * Novas seções: adicione aqui e referencie em `TED_MENU_GRUPOS` / `PROJETO_SECOES_TRP_VISAO_GERAL`.
 */
export const PROJETO_SECOES = {
  informacoesProjeto: {
    slug: "informacoes-projeto",
    title: "Informações do Projeto",
  },
  visaoGeral: {
    slug: "visao-geral",
    title: "Visão Geral do Projeto",
  },
  dadosGeraisProjeto: {
    titleKey: "TITLE_SESSAO_DADOS_GERAIS_PROJETO",
    slug: "dados-gerais-projeto",
    title: "1. Dados gerais do projeto",
    subtitle:
      "Informe o orçamento total, a quantidade de cursos e se haverá evento de certificação.",
  },
  detalhamentoCursos: {
    titleKey: "TITLE_SESSAO_DETALHAMENTO_CURSOS",
    slug: "detalhamento-cursos",
    title: "2. Detalhamento dos cursos",
    subtitle: "Detalhe os cursos que serão oferecidos no projeto.",
  },
  despesasEtapa11: {
    titleKey: "TITLE_SESSAO_DESPESAS_ETAPA_1_1",
    slug: "despesas-etapa-1-1",
    title:
      "3. Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1",
    subtitle:
      "Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1",
  },
  despesasEtapa12: {
    titleKey: "TITLE_SESSAO_DESPESAS_ETAPA_1_2",
    slug: "despesas-etapa-1-2",
    title: "4. Estruturação e Equipamento dos Espaços — Etapa 1.2",
    subtitle: "Estruturação e Equipamento dos Espaços — Etapa 1.2",
  },
  despesasEventoFinal: {
    titleKey: "TITLE_SESSAO_DESPESAS_EVENTO_FINAL",
    slug: "despesas-evento-final",
    title: "5. Celebração, Certificação e Encerramento — Etapa Final",
    subtitle: "Celebração, Certificação e Encerramento — Etapa Final",
  },
  identificacaoProjeto: {
    titleKey: "TITLE_SESSAO_IDENTIFICACAO_PROJETO",
    slug: "identificacao-projeto",
    title: "1. Identificação do Projeto",
    subtitle: "1. Identificação do Projeto",
  },
  identificacaoProponente: {
    titleKey: "TITLE_SESSAO_IDENTIFICACAO_PROPOSTA",
    slug: "identificacao-proponente",
    title: "2. Identificação do(a) Proponente",
    sidebarTitle: "2. Identificação do(a) proponente",
    subtitle: "2. Identificação do(a) Proponente",
  },
  identificacaoRepresentanteLegal: {
    titleKey: "TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL",
    slug: "identificacao-representante-legal",
    title: "3. Identificação do Representante Legal do(a) Proponente",
    sidebarTitle:
      "3. Identificação do representante legal do(a) proponente",
    subtitle: "3. Identificação do Representante Legal do(a) Proponente",
  },
  identificacaoResponsavelTecnico: {
    titleKey: "TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO",
    slug: "identificacao-responsavel-tecnico",
    title: "4. Identificação do Responsável Técnico pelo Projeto",
    sidebarTitle: "4. Identificação do responsável técnico",
  },
  justificativa: {
    titleKey: "TITLE_SESSAO_JUSTIFICATIVA_MOTIVACAO",
    slug: "justificativa",
    title: JUSTIFICATIVA_TITLE.TITLE_JUSTIFICATIVA_MOTIVACAO,
  },
  objetivos: {
    titleKey: "TITLE_SESSAO_OBJETIVOS",
    slug: "objetivos",
    title: OBJETIVOS_TITLE.TITLE_OBJETIVOS,
  },
  metas: {
    titleKey: "TITLE_SESSAO_METAS",
    slug: "metas",
    title: METAS_TITLE.TITLE_METAS,
  },
  etapasCronograma: {
    titleKey: "TITLE_SESSAO_ETAPAS_CRONOGRAMA",
    slug: "etapas-cronograma",
    title: ETAPAS_CRONOGRAMA_TITLE.TITLE,
  },
  metodologia: {
    titleKey: "TITLE_SESSAO_METODOLOGIA",
    slug: "metodologia",
    title: METODOLOGIA_TITLE.TITLE,
  },
  resultadosEsperados: {
    titleKey: "TITLE_SESSAO_RESULTADOS_ESPERADOS",
    slug: "resultados-esperados",
    title: RESULTADOS_TITLE.TITLE,
  },
  gestaoProjeto: {
    titleKey: "TITLE_SESSAO_GESTAO_PROJETO",
    slug: "gestao-projeto",
    title: GESTAO_TITLE.TITLE,
  },
  historicoSituacaoTerritorio: {
    titleKey: "TITLE_SESSAO_HISTORICO_SITUACAO_TERRITORIO",
    slug: "historico-situacao-territorio",
    title: "12. Histórico e situação socioeconômica do território",
    sidebarTitle:
      "12. Histórico e situação socioeconômica do território e da população a ser beneficiada",
  },
  baseTerritorial: {
    titleKey: "TITLE_SESSAO_BASE_TERRITORIAL",
    slug: "base-territorial",
    title: "13. Detalhamento da base territorial do projeto",
  },
  publicoBeneficiario: {
    titleKey: "TITLE_SESSAO_PUBLICO_BENEFICIARIO",
    slug: "publico-beneficiario",
    title: "14. Público beneficiário do projeto",
  },
  povosComunidadesTradicionais: {
    titleKey: "TITLE_SESSAO_POVOS_COMUNIDADES_TRADICIONAIS",
    slug: "povos-comunidades-tradicionais",
    title: "15. Povos ou comunidades tradicionais",
    sidebarTitle: POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE.TITLE,
  },
  perfilSocioOcupacional: {
    titleKey: "TITLE_SESSAO_PERFIL_SOCIO_OCUPACIONAL",
    slug: "perfil-socio-ocupacional",
    title: "16. Perfil sócio-ocupacional do público beneficiário",
    sidebarTitle:
      "16. Informe o perfil sócio-ocupacional predominante do público beneficiário",
  },
  publicoBeneficiarioEServicos: {
    titleKey: "TITLE_SESSAO_PUBLICO_BENEFICIARIO_E_SERVICOS",
    slug: "publico-beneficiario-e-servicos",
    title: PUBLICO_BENEFICIARIO_ESERVICOS_TITLE.TITLE,
  },
  outrasInformacoesProponente: {
    titleKey: "TITLE_SESSAO_OUTRAS_INFORMACOES_PROPOSTA",
    slug: "outras-informacoes-proponente",
    title: "18. Outras informações julgadas apropriadas sobre o(a) proponente",
  },
  valorTotal: {
    titleKey: "TITLE_SESSAO_VALOR_TOTAL",
    slug: "valor-total",
    title: "19. Valor total do projeto",
  },
  cronogramaDesembolso: {
    titleKey: "TITLE_SESSAO_CRONOGRAMA_DESENBOLSO",
    slug: "cronograma-desembolso",
    title: "20. Cronograma de desembolso",
  },
  detalhamentoOrcamento: {
    titleKey: "TITLE_SESSAO_DETALHAMENTO_ORCAMENTO",
    slug: "detalhamento-orcamento",
    title: "21. Detalhamento do orçamento",
    sidebarTitle:
      "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa",
  },
  resumoPlanoAplicacao: {
    titleKey: "TITLE_SESSAO_RESUMO_PLANO_APLICACAO",
    slug: "resumo-plano-aplicacao",
    title: "22. Resumo do plano de aplicação",
    sidebarTitle: "22. Resumo do plano de aplicação por elemento de despesa",
  },
  procedimentosMonitoramento: {
    titleKey: "TITLE_SESSAO_PROCEDIMENTOS_MONITORAMENTO",
    slug: "procedimentos-monitoramento",
    title: "23. Procedimentos de monitoramento e avaliação",
    sidebarTitle:
      "23. Procedimentos de monitoramento e avaliação da execução e resultados",
  },
  indicadoresEficiencia: {
    titleKey: "TITLE_SESSAO_INDICADORES_EFICIENCIA",
    slug: "indicadores-eficiencia",
    title: "24. Indicadores de eficiência e eficácia",
  },
  observacoes: {
    titleKey: "TITLE_SESSAO_OBSERVACOES",
    slug: "observacoes",
    title: "Observações",
  },
  andamentoProjeto: {
    slug: "andamento-projeto",
    title: "Andamento do Projeto",
  },
} as const satisfies Record<string, ProjetoSecaoDef>

/** Ordem das seções no PDF / visão geral consolidada (itens 1–24 + observações). */
export const PROJETO_SECOES_TRP_VISAO_GERAL = [
  "identificacaoProjeto",
  "identificacaoProponente",
  "identificacaoRepresentanteLegal",
  "identificacaoResponsavelTecnico",
  "justificativa",
  "objetivos",
  "metas",
  "etapasCronograma",
  "metodologia",
  "resultadosEsperados",
  "gestaoProjeto",
  "historicoSituacaoTerritorio",
  "baseTerritorial",
  "publicoBeneficiario",
  "povosComunidadesTradicionais",
  "perfilSocioOcupacional",
  "publicoBeneficiarioEServicos",
  "outrasInformacoesProponente",
  "valorTotal",
  "cronogramaDesembolso",
  "detalhamentoOrcamento",
  "resumoPlanoAplicacao",
  "procedimentosMonitoramento",
  "indicadoresEficiencia",
  "observacoes",
] as const satisfies readonly ProjetoSecaoId[]

type MenuSecaoRef = {
  secao: ProjetoSecaoId
  required?: boolean
  review?: boolean
  disabled?: boolean
}

type MenuGrupoDef = {
  id: string
  title: string
  disabled?: boolean
  sections: MenuSecaoRef[]
}

/** Menu lateral TED — referencia apenas chaves de `PROJETO_SECOES`. */
export const TED_MENU_GRUPOS: MenuGrupoDef[] = [
  {
    id: "visao-geral",
    title: "Visão Geral do Projeto",
    sections: [
      { secao: "informacoesProjeto", required: true, review: false },
      { secao: "visaoGeral", required: false, review: false },
    ],
  },
  {
    id: "dados-gerais",
    title: "Dados Gerais do Projeto",
    sections: [
      { secao: "dadosGeraisProjeto", required: true, review: true },
      { secao: "detalhamentoCursos", required: true, review: true },
      { secao: "despesasEtapa11", required: true, review: true },
      { secao: "despesasEtapa12", required: true, review: true },
      { secao: "despesasEventoFinal", required: true, review: true },
    ],
  },
  {
    id: "identificacao",
    title: "I - Identificação",
    sections: [
      { secao: "identificacaoProjeto", required: true, review: true },
      { secao: "identificacaoProponente", required: true, review: true },
      { secao: "identificacaoRepresentanteLegal", required: true, review: true },
      { secao: "identificacaoResponsavelTecnico", required: true, review: true },
    ],
  },
  {
    id: "descricao",
    title: "II - Descrição do Projeto",
    sections: [
      { secao: "justificativa", required: true, review: true },
      { secao: "objetivos", required: true, review: true },
      { secao: "metas", required: true, review: true },
      { secao: "etapasCronograma", required: true, review: true },
      { secao: "metodologia", required: true, review: true },
      { secao: "resultadosEsperados", required: true, review: true },
      { secao: "gestaoProjeto", required: true, review: true },
    ],
  },
  {
    id: "participantes",
    title: "III - Participantes e Abrangência do Projeto",
    sections: [
      { secao: "historicoSituacaoTerritorio", required: true, review: true },
      { secao: "baseTerritorial", required: true, review: true },
      { secao: "publicoBeneficiario", required: true, review: true },
      { secao: "povosComunidadesTradicionais", required: true, review: true },
      { secao: "perfilSocioOcupacional", required: true, review: true },
      { secao: "publicoBeneficiarioEServicos", required: true, review: true },
    ],
  },
  {
    id: "caracterizacao",
    title: "IV - Caracterização do(a) proponente",
    sections: [
      { secao: "outrasInformacoesProponente", required: false, review: true },
    ],
  },
  {
    id: "planilhas",
    title: "V - Dados Financeiros",
    sections: [
      { secao: "valorTotal", required: true, review: true },
      { secao: "cronogramaDesembolso", required: true, review: true },
      { secao: "detalhamentoOrcamento", required: true, review: true },
      { secao: "resumoPlanoAplicacao", required: true, review: true },
    ],
  },
  {
    id: "monitoramento",
    title: "VI - Monitoramento e Avaliação",
    sections: [
      { secao: "procedimentosMonitoramento", required: true, review: true },
      { secao: "indicadoresEficiencia", required: true, review: true },
    ],
  },
  {
    id: "observacoes",
    title: "Observações",
    sections: [
      { secao: "observacoes", required: false, review: true },
      { secao: "andamentoProjeto", required: false, review: true },
    ],
  },
]

export function projetoSecaoToMenuConfig(ref: MenuSecaoRef): SecaoConfig {
  const def = PROJETO_SECOES[ref.secao]
  const menuTitle =
    "sidebarTitle" in def && def.sidebarTitle ? def.sidebarTitle : def.title
  return {
    id: def.slug,
    title: menuTitle,
    required: ref.required,
    review: ref.review,
    disabled: ref.disabled,
  }
}

export function buildTedMenuGroups(): GrupoSecaoConfig[] {
  return TED_MENU_GRUPOS.map((group) => ({
    id: group.id,
    title: group.title,
    disabled: group.disabled,
    sections: group.sections.map(projetoSecaoToMenuConfig),
  }))
}

export function getProjetoSecao(slug: string): ProjetoSecaoDef | undefined {
  return Object.values(PROJETO_SECOES).find((secao) => secao.slug === slug)
}

function titleKeyToSlugKey(titleKey: string): string {
  return titleKey.replace(/^TITLE_/, "SLUG_")
}

function buildSlugConstants(): Record<string, string> {
  const slugs: Record<string, string> = {}

  for (const def of Object.values(PROJETO_SECOES)) {
    if (!("titleKey" in def) || !def.titleKey) continue
    slugs[titleKeyToSlugKey(def.titleKey)] = def.slug
  }

  const item17 = PROJETO_SECOES.publicoBeneficiarioEServicos
  slugs.SLUG_SESSAO_SERVICOS_ACESSADOS = item17.slug
  slugs.SLUG_SESSAO_PUBLICOS_BENEFICIARIOS_E_SERVICOS = item17.slug

  return slugs
}

function buildTitleConstants(): Record<string, string> {
  const titles: Record<string, string> = {}

  for (const def of Object.values(PROJETO_SECOES)) {
    if (!("titleKey" in def) || !def.titleKey) continue
    titles[def.titleKey] = def.title
  }

  return titles
}

function buildSubtitleConstants(): Record<string, string> {
  const subtitles: Record<string, string> = {}

  for (const def of Object.values(PROJETO_SECOES)) {
    if (!("titleKey" in def) || !def.titleKey || !("subtitle" in def) || !def.subtitle)
      continue
    subtitles[def.titleKey.replace(/^TITLE_/, "SUBTITLE_")] = def.subtitle
  }

  return subtitles
}

export const SESSOES_VISAO_GERAL_SLUG = buildSlugConstants()

export const SESSOES_VISAO_GERAL_TITLE = buildTitleConstants() as Record<
  string,
  string
>

export const SESSOES_VISAO_GERAL_SUBTITLE = buildSubtitleConstants()

export const SECOES_VISAO_GERAL = PROJETO_SECOES_TRP_VISAO_GERAL.map((id) => {
  const def = PROJETO_SECOES[id]
  return { slug: def.slug, title: def.title }
})

export const SECAO_SLUG_TO_TITLE: Record<string, string> = Object.fromEntries(
  Object.values(PROJETO_SECOES).map((def) => [def.slug, def.title]),
)

function buildTitleKeyToSecaoSlug(): Record<string, string> {
  const map: Record<string, string> = {}

  for (const def of Object.values(PROJETO_SECOES)) {
    if (!("titleKey" in def) || !def.titleKey) continue
    map[def.titleKey] = def.slug
  }

  map.TITLE_SESSAO_SERVICOS_ACESSADOS =
    PROJETO_SECOES.publicoBeneficiarioEServicos.slug

  return map
}

export const TITLE_KEY_TO_SECAO_SLUG = buildTitleKeyToSecaoSlug()
