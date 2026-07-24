import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "@/features/login/server/session"
import { isAdminProfile } from "@/features/login/constants"
import { listProfiles } from "./profiles.repository"
import { listRoles } from "./roles.repository"
import {
  createUsuario,
  deleteUsuario,
  getUsuarioById,
  listUsuarios,
  updateUsuario,
} from "./usuarios.repository"
import { normalizeUsuarioTipo } from "../constants/users"

export async function handleAdminRequest(
  request: NextRequest,
  path: string[],
) {
  const sessionUser = await getSessionUser()
  const isAdmin = Boolean(sessionUser?.isAdmin)
  const isGestorProjeto = Boolean(sessionUser?.isGestorProjeto)
  const canAccessUsuarios = isAdmin || isGestorProjeto

  if (!sessionUser || (!isAdmin && !isGestorProjeto)) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
  }

  const [resource, ...rest] = path

  if (resource === "usuarios" && rest.length === 0 && request.method === "GET") {
    if (!canAccessUsuarios) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const usuarios = await listUsuarios()

      if (isAdmin) {
        return NextResponse.json({ usuarios })
      }

      const profiles = await listProfiles()
      const adminPerfilIds = new Set(
        profiles
          .filter((profile) => isAdminProfile(profile.nome))
          .map((profile) => profile.id),
      )
      const usuariosVisiveis = usuarios.filter(
        (usuario) => !adminPerfilIds.has(usuario.perfilId),
      )

      return NextResponse.json({ usuarios: usuariosVisiveis })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os usuários."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource === "usuarios" && rest.length === 0 && request.method === "POST") {
    if (!canAccessUsuarios) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const body = (await request.json()) as {
        nome?: string
        email?: string
        tipo?: string
        perfilId?: number
        roles?: number[]
        senha?: string
        ativo?: boolean
      }

      const nome = body.nome?.trim() ?? ""
      const email = body.email?.trim().toLowerCase() ?? ""
      const tipo = normalizeUsuarioTipo(body.tipo ?? "")
      const perfilId = body.perfilId
      const roles = isAdmin
        ? Array.isArray(body.roles)
          ? body.roles.filter((role): role is number => typeof role === "number")
          : []
        : []
      const ativo = body.ativo ?? true
      const senha = body.senha?.trim() ?? ""

      if (!nome || !email || !tipo || typeof perfilId !== "number" || !senha) {
        return NextResponse.json(
          { error: "Dados do usuário inválidos. Verifique o tipo (interno ou externo)." },
          { status: 400 },
        )
      }

      const usuario = await createUsuario({
        nome,
        email,
        tipo,
        perfilId,
        roles,
        senha,
        ativo,
      })

      return NextResponse.json({ usuario }, { status: 201 })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível criar o usuário."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource === "usuarios" && rest.length === 1 && request.method === "PATCH") {
    if (!canAccessUsuarios) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const usuarioId = rest[0]?.trim() ?? ""
      const body = (await request.json()) as {
        nome?: string
        email?: string
        tipo?: string
        perfilId?: number
        roles?: number[]
        senha?: string
        ativo?: boolean
      }

      const nome = body.nome?.trim() ?? ""
      const email = body.email?.trim().toLowerCase() ?? ""
      const tipo = normalizeUsuarioTipo(body.tipo ?? "")
      const perfilId = body.perfilId
      const ativo = body.ativo ?? true
      const senha = body.senha?.trim() ?? ""

      if (!usuarioId || !nome || !email || !tipo || typeof perfilId !== "number" || !senha) {
        return NextResponse.json(
          { error: "Dados do usuário inválidos. Verifique o tipo (interno ou externo)." },
          { status: 400 },
        )
      }

      let roles: number[] = []
      if (isAdmin) {
        roles = Array.isArray(body.roles)
          ? body.roles.filter((role): role is number => typeof role === "number")
          : []
      } else {
        const existing = await getUsuarioById(usuarioId)
        if (!existing) {
          return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 })
        }
        roles = existing.roles
      }

      const usuario = await updateUsuario(usuarioId, {
        nome,
        email,
        tipo,
        perfilId,
        roles,
        senha,
        ativo,
      })

      return NextResponse.json({ usuario })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o usuário."

      const status = message === "Usuário não encontrado." ? 404 : 500
      return NextResponse.json({ error: message }, { status })
    }
  }

  if (resource === "usuarios" && rest.length === 1 && request.method === "DELETE") {
    if (!canAccessUsuarios) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const usuarioId = rest[0]?.trim() ?? ""

      if (!usuarioId) {
        return NextResponse.json({ error: "ID do usuário inválido." }, { status: 400 })
      }

      await deleteUsuario(usuarioId)
      return NextResponse.json({ success: true })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o usuário."

      const status = message === "Usuário não encontrado." ? 404 : 500
      return NextResponse.json({ error: message }, { status })
    }
  }

  if (resource === "roles" && rest.length === 0 && request.method === "GET") {
    if (!isAdmin) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const roles = await listRoles()

      return NextResponse.json({ roles })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as roles."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource === "profiles" && rest.length === 0 && request.method === "GET") {
    if (!canAccessUsuarios) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 })
    }

    try {
      const profiles = await listProfiles()

      return NextResponse.json({ profiles })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os perfis."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
