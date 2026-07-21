export {
  createProjeto,
  deleteProjeto,
  fetchProjetos,
  fetchProjectStages,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
  updateProjetoInformacoes,
} from "./projeto.service"

export {
  buildProjetoEditNavItems,
  getModeloNavLabel,
  getProjetoEditSectionUrl,
  getProjetoTedSectionUrl,
  getSidebarConfig,
  parseProjetoTedPath,
  type SidebarConfig,
} from "./sidebar.service"

export {
  fetchEstados,
  fetchMunicipiosByUf,
  type IbgeEstado,
  type IbgeMunicipio,
} from "./ibge.service"

export {
  fetchProjectSession01Identificacao,
  saveProjectSession01IdentificacaoProjeto,
  saveProjectSession01IdentificacaoProponente,
  saveProjectSession01IdentificacaoRepresentante,
  saveProjectSession01IdentificacaoResponsavelTecnico,
} from "./project-session-01-identificacao.service"

export {
  fetchProjectSession02Description,
  saveProjectSession02DescriptionJustificativa,
  saveProjectSession02DescriptionMetodologia,
} from "./project-session-02-description.service"

export {
  fetchProjectSession03Participants,
  saveProjectSession03Historico,
  saveProjectSession03BaseTerritorial,
  saveProjectSession03PublicoBeneficiario,
  saveProjectSession03Povos,
  saveProjectSession03Perfil,
  saveProjectSession03Servicos,
} from "./project-session-03-participants.service"

export {
  fetchProjectSession04Characterization,
  saveProjectSession04OutrasInformacoes,
} from "./project-session-04-characterization.service"

export {
  fetchProjectSession05Financial,
  saveProjectSession05ValorTotal,
  saveProjectSession05CronogramaDesembolso,
  saveProjectSession05ResumoPlanoAplicacao,
} from "./project-session-05-financial.service"

export {
  fetchSecaoReviews,
  saveSecaoReview,
  syncCampoReviews,
} from "./secao-review.service"

export { mapModeloCronogramaToForm } from "./project-ted.service"
