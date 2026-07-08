import { getDbPool } from "@/lib/db"
import {
  toTedIdentificacao,
  type TedIdentificacao,
  type TedIdentificacaoProjetoInput,
  type TedIdentificacaoProponenteInput,
  type TedIdentificacaoRepresentanteInput,
  type TedIdentificacaoResponsavelTecnicoInput,
  type TedIdentificacaoRow,
} from "../types/ted-identificacao"

const TED_IDENTIFICACAO_SELECT = `
  SELECT *
  FROM "SIGTRP_TB_TED_IDENTIFICACAO"
`

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

/** Mantém apenas dígitos; retorna null se vazio. Para colunas numeric/bigint. */
function digitsToNull(value: string | undefined): string | null {
  const digits = value?.replace(/\D/g, "") ?? ""
  return digits ? digits : null
}

function numberToNull(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

export async function getTedIdentificacaoByProjetoId(
  projetoId: string,
): Promise<TedIdentificacao | null> {
  const pool = getDbPool()

  const result = await pool.query<TedIdentificacaoRow>(
    `
      ${TED_IDENTIFICACAO_SELECT}
      WHERE projeto_id = $1
      LIMIT 1
    `,
    [projetoId],
  )

  const row = result.rows[0]
  return row ? toTedIdentificacao(row) : null
}

export async function upsertTedIdentificacaoProjeto(
  projetoId: string,
  data: TedIdentificacaoProjetoInput,
): Promise<TedIdentificacao> {
  const pool = getDbPool()

  const nomeProjeto = emptyToNull(data.nomeProjeto)
  const localExecucao = emptyToNull(data.localExecucao)
  const duracao = emptyToNull(data.duracao)
  const resumoProjeto = emptyToNull(data.resumoProjeto)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_TED_IDENTIFICACAO" (
        projeto_id,
        nome_projeto,
        local_execucao,
        duracao,
        resumo_projeto,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        nome_projeto = EXCLUDED.nome_projeto,
        local_execucao = EXCLUDED.local_execucao,
        duracao = EXCLUDED.duracao,
        resumo_projeto = EXCLUDED.resumo_projeto,
        atualizado_em = NOW()
    `,
    [projetoId, nomeProjeto, localExecucao, duracao, resumoProjeto],
  )

  const identificacao = await getTedIdentificacaoByProjetoId(projetoId)

  if (!identificacao) {
    throw new Error("Não foi possível salvar a identificação do projeto.")
  }

  return identificacao
}

async function refetchIdentificacao(projetoId: string): Promise<TedIdentificacao> {
  const identificacao = await getTedIdentificacaoByProjetoId(projetoId)

  if (!identificacao) {
    throw new Error("Não foi possível salvar a identificação do projeto.")
  }

  return identificacao
}

export async function upsertTedIdentificacaoProponente(
  projetoId: string,
  data: TedIdentificacaoProponenteInput,
): Promise<TedIdentificacao> {
  const pool = getDbPool()

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_TED_IDENTIFICACAO" (
        projeto_id,
        proponente_nome,
        proponente_cnpj,
        proponente_data_fundacao,
        proponente_registro_cnpj,
        proponente_endereco,
        proponente_bairro,
        proponente_uf_ibge,
        proponente_municipio_ibge,
        proponente_cep,
        proponente_telefone,
        proponente_email,
        proponente_pagina_web,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        proponente_nome = EXCLUDED.proponente_nome,
        proponente_cnpj = EXCLUDED.proponente_cnpj,
        proponente_data_fundacao = EXCLUDED.proponente_data_fundacao,
        proponente_registro_cnpj = EXCLUDED.proponente_registro_cnpj,
        proponente_endereco = EXCLUDED.proponente_endereco,
        proponente_bairro = EXCLUDED.proponente_bairro,
        proponente_uf_ibge = EXCLUDED.proponente_uf_ibge,
        proponente_municipio_ibge = EXCLUDED.proponente_municipio_ibge,
        proponente_cep = EXCLUDED.proponente_cep,
        proponente_telefone = EXCLUDED.proponente_telefone,
        proponente_email = EXCLUDED.proponente_email,
        proponente_pagina_web = EXCLUDED.proponente_pagina_web,
        atualizado_em = NOW()
    `,
    [
      projetoId,
      emptyToNull(data.proponenteNome),
      digitsToNull(data.proponenteCnpj),
      emptyToNull(data.proponenteDataFundacao),
      emptyToNull(data.proponenteRegistroCnpj),
      emptyToNull(data.proponenteEndereco),
      emptyToNull(data.proponenteBairro),
      numberToNull(data.proponenteUfIbge),
      numberToNull(data.proponenteMunicipioIbge),
      digitsToNull(data.proponenteCep),
      digitsToNull(data.proponenteTelefone),
      emptyToNull(data.proponenteEmail),
      emptyToNull(data.proponentePaginaWeb),
    ],
  )

  return refetchIdentificacao(projetoId)
}

export async function upsertTedIdentificacaoRepresentante(
  projetoId: string,
  data: TedIdentificacaoRepresentanteInput,
): Promise<TedIdentificacao> {
  const pool = getDbPool()

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_TED_IDENTIFICACAO" (
        projeto_id,
        representante_nome,
        representante_cpf,
        representante_profissao,
        representante_cargo,
        representante_estado_civil,
        representante_telefone,
        representante_email,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        representante_nome = EXCLUDED.representante_nome,
        representante_cpf = EXCLUDED.representante_cpf,
        representante_profissao = EXCLUDED.representante_profissao,
        representante_cargo = EXCLUDED.representante_cargo,
        representante_estado_civil = EXCLUDED.representante_estado_civil,
        representante_telefone = EXCLUDED.representante_telefone,
        representante_email = EXCLUDED.representante_email,
        atualizado_em = NOW()
    `,
    [
      projetoId,
      emptyToNull(data.representanteNome),
      digitsToNull(data.representanteCpf),
      emptyToNull(data.representanteProfissao),
      emptyToNull(data.representanteCargo),
      emptyToNull(data.representanteEstadoCivil),
      digitsToNull(data.representanteTelefone),
      emptyToNull(data.representanteEmail),
    ],
  )

  return refetchIdentificacao(projetoId)
}

export async function upsertTedIdentificacaoResponsavelTecnico(
  projetoId: string,
  data: TedIdentificacaoResponsavelTecnicoInput,
): Promise<TedIdentificacao> {
  const pool = getDbPool()

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_TED_IDENTIFICACAO" (
        projeto_id,
        responsavel_tecnico_nome,
        responsavel_tecnico_cargo,
        responsavel_tecnico_telefone,
        responsavel_tecnico_celular,
        responsavel_tecnico_email,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        responsavel_tecnico_nome = EXCLUDED.responsavel_tecnico_nome,
        responsavel_tecnico_cargo = EXCLUDED.responsavel_tecnico_cargo,
        responsavel_tecnico_telefone = EXCLUDED.responsavel_tecnico_telefone,
        responsavel_tecnico_celular = EXCLUDED.responsavel_tecnico_celular,
        responsavel_tecnico_email = EXCLUDED.responsavel_tecnico_email,
        atualizado_em = NOW()
    `,
    [
      projetoId,
      emptyToNull(data.responsavelTecnicoNome),
      emptyToNull(data.responsavelTecnicoCargo),
      digitsToNull(data.responsavelTecnicoTelefone),
      digitsToNull(data.responsavelTecnicoCelular),
      emptyToNull(data.responsavelTecnicoEmail),
    ],
  )

  return refetchIdentificacao(projetoId)
}
