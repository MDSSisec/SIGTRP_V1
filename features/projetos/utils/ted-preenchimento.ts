import type { TedIdentificacao } from "../types/ted-identificacao"

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim())
}

function hasNumber(value: number | null | undefined): boolean {
  return typeof value === "number" && Number.isFinite(value)
}

function sectionHasAnyFilled(
  values: Array<string | number | null | undefined>,
): boolean {
  return values.some((value) => {
    if (typeof value === "number") return hasNumber(value)
    return hasText(value)
  })
}

/**
 * Retorna as chaves de SESSOES_VISAO_GERAL_TITLE cujas seções já possuem
 * dados salvos no banco. Por enquanto considera apenas SIGTRP_TB_TED_IDENTIFICACAO.
 */
export function getItensConcluidosFromTedIdentificacao(
  identificacao: TedIdentificacao | null,
): Set<string> {
  const concluidos = new Set<string>()

  if (!identificacao) return concluidos

  if (
    sectionHasAnyFilled([
      identificacao.localExecucao,
      identificacao.duracao,
      identificacao.resumoProjeto,
    ])
  ) {
    concluidos.add("TITLE_SESSAO_IDENTIFICACAO_PROJETO")
  }

  if (
    sectionHasAnyFilled([
      identificacao.proponenteNome,
      identificacao.proponenteCnpj,
      identificacao.proponenteDataFundacao,
      identificacao.proponenteRegistroCnpj,
      identificacao.proponenteEndereco,
      identificacao.proponenteBairro,
      identificacao.proponenteUfIbge,
      identificacao.proponenteMunicipioIbge,
      identificacao.proponenteCep,
      identificacao.proponenteTelefone,
      identificacao.proponenteEmail,
      identificacao.proponentePaginaWeb,
    ])
  ) {
    concluidos.add("TITLE_SESSAO_IDENTIFICACAO_PROPOSTA")
  }

  if (
    sectionHasAnyFilled([
      identificacao.representanteNome,
      identificacao.representanteCpf,
      identificacao.representanteProfissao,
      identificacao.representanteCargo,
      identificacao.representanteEstadoCivil,
      identificacao.representanteTelefone,
      identificacao.representanteEmail,
    ])
  ) {
    concluidos.add("TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL")
  }

  if (
    sectionHasAnyFilled([
      identificacao.responsavelTecnicoNome,
      identificacao.responsavelTecnicoCargo,
      identificacao.responsavelTecnicoTelefone,
      identificacao.responsavelTecnicoCelular,
      identificacao.responsavelTecnicoEmail,
    ])
  ) {
    concluidos.add("TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO")
  }

  return concluidos
}
