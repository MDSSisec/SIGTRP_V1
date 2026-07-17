import type { ModeloProjetoConfig } from "./types"
import { POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE } from "@/features/projeto/constants/povos-ou-comunidades-tradicionais"
import { JUSTIFICATIVA_TITLE } from "@/features/projeto/constants/justificativa"
import { OBJETIVOS_TITLE } from "@/features/projeto/constants/objetivos"
import { METAS_TITLE } from "@/features/projetos/constants/ted/metas"
import { ETAPAS_CRONOGRAMA_TITLE } from "../../constants/etapas-cronograma"
import { METODOLOGIA_TITLE } from "../../constants/metodologia"
import { GESTAO_TITLE } from "../../constants/gestao-projeto"
import { RESULTADOS_TITLE } from "../../constants/resultados"
import { PUBLICO_BENEFICIARIO_ESERVICOS_TITLE } from "../../constants/publico-beneficiario-e-servico"


/**
 * TED — formulário TRP completo (grupos atuais do sidebar).
 * Ajuste `required` / `review` / `disabled` conforme as regras forem definidas.
 */
export const TED_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "TED",
  label: "TED",
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
        { id: "dados-gerais-projeto",  title: "Dados gerais do projeto",                                           required: true, review: true },
        { id: "detalhamento-cursos",   title: "Detalhamento dos cursos",                                           required: true, review: true },
        { id: "despesas-etapa-1-1",    title: "Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1",   required: true, review: true },
        { id: "despesas-etapa-1-2",    title: "Estruturação e Equipamento dos Espaços — Etapa 1.2",                required: true, review: true },
        { id: "despesas-evento-final", title: "Celebração, Certificação e Encerramento — Etapa Final",             required: true, review: true },
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
        { id: "justificativa",       title: JUSTIFICATIVA_TITLE.TITLE_JUSTIFICATIVA_MOTIVACAO,  required: true, review: true },
        { id: "objetivos",           title: OBJETIVOS_TITLE.TITLE_OBJETIVOS,                    required: true, review: true },
        { id: "metas",               title: METAS_TITLE.TITLE_METAS,                            required: true, review: true },
        { id: "etapas-cronograma",   title: ETAPAS_CRONOGRAMA_TITLE.TITLE,                      required: true, review: true },
        { id: "metodologia",         title: METODOLOGIA_TITLE.TITLE,                            required: true, review: true },
        { id: "resultados-esperados",title: RESULTADOS_TITLE.TITLE,                             required: true, review: true },
        { id: "gestao-projeto",      title: GESTAO_TITLE.TITLE,                                 required: true, review: true },
      ],
    },
    {
      id: "participantes",
      title: "III - Participantes e Abrangência do Projeto",
      sections: [
        { id: "historico-situacao-territorio",  title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada",  required: true, review: true },
        { id: "base-territorial",               title: "13. Detalhamento da base territorial do projeto",                                         required: true, review: true },
        { id: "publico-beneficiario",           title: "14. Público beneficiário do projeto",                                                     required: true, review: true },
        { id: "povos-comunidades-tradicionais", title: POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE.TITLE,                                              required: true, review: true },
        { id: "perfil-socio-ocupacional",       title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário",             required: true, review: true },
        { id: "publico-beneficiario-e-servicos",title: PUBLICO_BENEFICIARIO_ESERVICOS_TITLE.TITLE,                                                required: true, review: true },
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
