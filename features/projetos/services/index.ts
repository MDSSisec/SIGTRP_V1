export {
  createProjeto,
  deleteProjeto,
  fetchProjetos,
  fetchProjectStages,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
  updateProjetoInformacoes,
} from "./projetos.service"
export {
  etapaOrdemToStepIndex,
  getProjectStepIndex,
  mapModeloCronogramaToForm,
  statusToStepIndex,
  STATUS_PROJETO_STEPS,
} from "./project-ted.service"
export { getSidebarConfig } from "./sidebar.service"
export {
  fetchEstados,
  fetchMunicipiosByUf,
  type IbgeEstado,
  type IbgeMunicipio,
} from "./ibge.service"
export {
  fetchTedIdentificacao,
  saveTedIdentificacaoProjeto,
  saveTedIdentificacaoProponente,
  saveTedIdentificacaoRepresentante,
  saveTedIdentificacaoResponsavelTecnico,
} from "./ted-identificacao.service"
export {
  fetchTedSecaoReviews,
  saveTedSecaoReview,
  syncTedCampoReviews,
} from "./ted-secao-review.service"
