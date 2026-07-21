import { getDbPool } from "@/lib/db"
import {
  toProjectSession03Participants,
  type ProjectSession03ParticipantsRow,
} from "../mappers/project-session-03-participants.mapper"
import type {
  ProjectSession03BaseTerritorialInput,
  ProjectSession03BaseTerritorialLinha,
  ProjectSession03HistoricoInput,
  ProjectSession03Participants,
  ProjectSession03PerfilInput,
  ProjectSession03PovosInput,
  ProjectSession03PublicoBeneficiarioInput,
  ProjectSession03ServicosInput,
} from "../types/project-session-03-participants"

const PARTICIPANTS_SELECT = `
  SELECT *
  FROM "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS"
`

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

function toNullableInt(value: number | null | undefined): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  return value
}

function toSelecoesJson(value: string[] | undefined): string {
  return JSON.stringify(value ?? [])
}

function toBaseTerritorialJson(
  linhas: ProjectSession03BaseTerritorialLinha[] | undefined,
): string | null {
  if (!linhas) return null

  const filtradas = linhas
    .map((linha) => ({
      territorio: linha.territorio?.trim() ?? "",
      municipio: linha.municipio?.trim() ?? "",
    }))
    .filter((linha) => linha.territorio || linha.municipio)

  return filtradas.length > 0 ? JSON.stringify(filtradas) : null
}

export async function getProjectSession03ParticipantsByProjetoId(
  projetoId: string,
): Promise<ProjectSession03Participants | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectSession03ParticipantsRow>(
    `
      ${PARTICIPANTS_SELECT}
      WHERE projeto_id = $1
      LIMIT 1
    `,
    [projetoId],
  )

  const row = result.rows[0]
  return row ? toProjectSession03Participants(row) : null
}

async function reloadParticipantesOrThrow(
  projetoId: string,
  errorMessage: string,
): Promise<ProjectSession03Participants> {
  const participantes = await getProjectSession03ParticipantsByProjetoId(
    projetoId,
  )

  if (!participantes) {
    throw new Error(errorMessage)
  }

  return participantes
}

export async function upsertProjectSession03Historico(
  projetoId: string,
  data: ProjectSession03HistoricoInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const texto = emptyToNull(data.historicoSituacaoTexto)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        historico_situacao_texto,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        historico_situacao_texto = EXCLUDED.historico_situacao_texto,
        atualizado_em = NOW()
    `,
    [projetoId, texto],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar o histórico e situação do território.",
  )
}

export async function upsertProjectSession03BaseTerritorial(
  projetoId: string,
  data: ProjectSession03BaseTerritorialInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const linhas = toBaseTerritorialJson(data.baseTerritorialLinhas)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        base_territorial_linhas,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        base_territorial_linhas = EXCLUDED.base_territorial_linhas,
        atualizado_em = NOW()
    `,
    [projetoId, linhas],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar o detalhamento da base territorial.",
  )
}

export async function upsertProjectSession03PublicoBeneficiario(
  projetoId: string,
  data: ProjectSession03PublicoBeneficiarioInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const homens = toNullableInt(data.publicoHomensDiretos)
  const mulheres = toNullableInt(data.publicoMulheresDiretos)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        publico_homens_diretos,
        publico_mulheres_diretos,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        publico_homens_diretos = EXCLUDED.publico_homens_diretos,
        publico_mulheres_diretos = EXCLUDED.publico_mulheres_diretos,
        atualizado_em = NOW()
    `,
    [projetoId, homens, mulheres],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar o público beneficiário do projeto.",
  )
}

export async function upsertProjectSession03Povos(
  projetoId: string,
  data: ProjectSession03PovosInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const selecoes = toSelecoesJson(data.povosSelecoes)
  const outros = emptyToNull(data.povosOutrosEspecificar)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        povos_selecoes,
        povos_outros_especificar,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, $3, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        povos_selecoes = EXCLUDED.povos_selecoes,
        povos_outros_especificar = EXCLUDED.povos_outros_especificar,
        atualizado_em = NOW()
    `,
    [projetoId, selecoes, outros],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar os povos ou comunidades tradicionais.",
  )
}

export async function upsertProjectSession03Perfil(
  projetoId: string,
  data: ProjectSession03PerfilInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const selecoes = toSelecoesJson(data.perfilSelecoes)
  const outros = emptyToNull(data.perfilOutrosEspecificar)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        perfil_selecoes,
        perfil_outros_especificar,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, $3, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        perfil_selecoes = EXCLUDED.perfil_selecoes,
        perfil_outros_especificar = EXCLUDED.perfil_outros_especificar,
        atualizado_em = NOW()
    `,
    [projetoId, selecoes, outros],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar o perfil sócio-ocupacional.",
  )
}

export async function upsertProjectSession03Servicos(
  projetoId: string,
  data: ProjectSession03ServicosInput,
): Promise<ProjectSession03Participants> {
  const pool = getDbPool()

  const selecoes = toSelecoesJson(data.servicosSelecoes)
  const outros = emptyToNull(data.servicosOutrosEspecificar)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
        projeto_id,
        servicos_selecoes,
        servicos_outros_especificar,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, $3, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        servicos_selecoes = EXCLUDED.servicos_selecoes,
        servicos_outros_especificar = EXCLUDED.servicos_outros_especificar,
        atualizado_em = NOW()
    `,
    [projetoId, selecoes, outros],
  )

  return reloadParticipantesOrThrow(
    projetoId,
    "Não foi possível salvar os serviços acessados pelo público beneficiário.",
  )
}
