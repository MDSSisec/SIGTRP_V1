import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  ProjectSession03BaseTerritorialInput,
  ProjectSession03HistoricoInput,
  ProjectSession03Participants,
  ProjectSession03PerfilInput,
  ProjectSession03PovosInput,
  ProjectSession03PublicoBeneficiarioInput,
  ProjectSession03ServicosInput,
} from "@/features/projeto/types/project-session-03-participants"

type ProjectSession03ParticipantsResponse = {
  participantes: ProjectSession03Participants | null
}

async function patchParticipantesBloco(
  projetoId: string,
  bloco: string,
  data: unknown,
) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/participantes/${bloco}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  )

  const result =
    await parseApiResponse<ProjectSession03ParticipantsResponse>(response)
  return result.participantes
}

export async function fetchProjectSession03Participants(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/participantes`)
  const data =
    await parseApiResponse<ProjectSession03ParticipantsResponse>(response)
  return data.participantes
}

export async function saveProjectSession03Historico(
  projetoId: string,
  data: ProjectSession03HistoricoInput,
) {
  return patchParticipantesBloco(projetoId, "historico", data)
}

export async function saveProjectSession03BaseTerritorial(
  projetoId: string,
  data: ProjectSession03BaseTerritorialInput,
) {
  return patchParticipantesBloco(projetoId, "base-territorial", data)
}

export async function saveProjectSession03PublicoBeneficiario(
  projetoId: string,
  data: ProjectSession03PublicoBeneficiarioInput,
) {
  return patchParticipantesBloco(projetoId, "publico-beneficiario", data)
}

export async function saveProjectSession03Povos(
  projetoId: string,
  data: ProjectSession03PovosInput,
) {
  return patchParticipantesBloco(projetoId, "povos", data)
}

export async function saveProjectSession03Perfil(
  projetoId: string,
  data: ProjectSession03PerfilInput,
) {
  return patchParticipantesBloco(projetoId, "perfil", data)
}

export async function saveProjectSession03Servicos(
  projetoId: string,
  data: ProjectSession03ServicosInput,
) {
  return patchParticipantesBloco(projetoId, "servicos", data)
}
