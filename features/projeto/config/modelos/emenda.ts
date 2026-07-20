import type { ModeloProjetoConfig } from "./types"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"

/**
 * Emenda — recorte inicial (identificação, descrição, planilhas).
 * Refine as seções concretas conforme o formulário oficial for fechado.
 */
export const EMENDA_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "EMENDA",
  label: "Emenda",
  defaultSecao: "informacoes-projeto",
  groups: [
    {
      id: "visao-geral",
      title: "Visão Geral do Projeto",
      sections: [
        { id: "informacoes-projeto", title: "Informações do Projeto",    required: true,  review: false },
        { id: "visao-geral"        , title: "Visão Geral do Projeto",    required: false, review: false },
      ],
    },
    {
      id: "dados-gerais",
      title: "Dados Gerais do Projeto",
      sections: [
        {
          id: PROJETO_SECOES.dadosGeraisProjeto.slug,
          title: PROJETO_SECOES.dadosGeraisProjeto.title,
          required: true,
          review: true,
        },
        {
          id: PROJETO_SECOES.detalhamentoCursos.slug,
          title: PROJETO_SECOES.detalhamentoCursos.title,
          required: true,
          review: true,
        },
        {
          id: PROJETO_SECOES.despesasEtapa11.slug,
          title: PROJETO_SECOES.despesasEtapa11.title,
          required: true,
          review: true,
        },
        {
          id: PROJETO_SECOES.despesasEtapa12.slug,
          title: PROJETO_SECOES.despesasEtapa12.title,
          required: true,
          review: true,
        },
        {
          id: PROJETO_SECOES.despesasEventoFinal.slug,
          title: PROJETO_SECOES.despesasEventoFinal.title,
          required: true,
          review: true,
        },
      ],
    },
    {
      id: "identificacao",
      title: "I - Identificação",
      sections: [
        { id: "identificacao-projeto",               title: "1. Identificação do Projeto",                                  required: true, review: true },
        { id: "identificacao-proponente",            title: "2. Identificação do(a) proponente",                            required: true, review: true },
        { id: "identificacao-representante-legal",   title: "3. Identificação do representante legal do(a) proponente",     required: true, review: true },
        { id: "identificacao-responsavel-tecnico",   title: "4. Identificação do responsável técnico",                      required: true, review: true },
      ],
    },
    {
      id: "descricao",
      title: "II - Descrição do Projeto",
      sections: [
        { id: "justificativa",       title: "5. Justificativa e Motivação para celebração do instrumento",  required: true, review: true },
        { id: "objetivos",           title: "6. Objetivos",                                                 required: true, review: true },
        { id: "metas",               title: "7. Metas",                                                     required: true, review: true },
        { id: "etapas-cronograma",   title: "8. Etapas e cronograma de execução",                           required: true, review: true },
        { id: "metodologia",         title: "9. Metodologia",                                               required: true, review: true },
        { id: "resultados-esperados",title: "10. Resultados Esperados",                                     required: true, review: true },
        { id: "gestao-projeto",      title: "11. Gestão do Projeto",                                        required: true, review: true },
      ],
    },
    {
      id: "participantes",
      title: "III - Participantes e Abrangência do Projeto",
      sections: [
        { id: "historico-situacao-territorio",  title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada",  required: true, review: true },
        { id: "base-territorial",               title: "13. Detalhamento da base territorial do projeto",                                         required: true, review: true },
        { id: "publico-beneficiario",           title: "14. Público beneficiário do projeto",                                                     required: true, review: true },
        { id: "povos-comunidades-tradicionais", title: "15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais",    required: true, review: true },
        { id: "perfil-socio-ocupacional",       title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário",             required: true, review: true },
        {
          id: PROJETO_SECOES.publicoBeneficiarioEServicos.slug,
          title: PROJETO_SECOES.publicoBeneficiarioEServicos.title,
          required: true,
          review: true,
        },
      ],
    },
    {
      id: "caracterizacao",
      title: "IV - Caracterização do(a) proponente",
      sections: [
        { id: "outras-informacoes-proponente", title: "18. Outras informações julgadas apropriadas sobre o(a) proponente", required: false, review: true },
      ],
    },
    {
      id: "planilhas",
      title: "V - Dados Financeiros",
      sections: [
        { id: "valor-total",            title: "19. Valor total do projeto",                                                                                required: true, review: true },
        { id: "cronograma-desembolso",  title: "20. Cronograma de desembolso",                                                                              required: true, review: true },
        { id: "detalhamento-orcamento", title: "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa", required: true, review: true },
        { id: "resumo-plano-aplicacao", title: "22. Resumo do plano de aplicação por elemento de despesa",                                                  required: true, review: true },
      ],
    },
    {
      id: "monitoramento",
      title: "VI - Monitoramento e Avaliação",
      sections: [
        { id: "procedimentos-monitoramento", title: "23. Procedimentos de monitoramento e avaliação da execução e resultados",  required: true, review: true },
        { id: "indicadores-eficiencia",      title: "24. Indicadores de eficiência e eficácia",                                 required: true, review: true },
      ],
    },
    {
      id: "observacoes",
      title: "Observações",
      sections: [
        { id: "observacoes",        title: "Observações",           required: false, review: true },
        { id: "andamento-projeto",  title: "Andamento do Projeto",  required: false, review: true },
      ],
    },
  ],
}
