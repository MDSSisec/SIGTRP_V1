import { parseApiResponse } from "@/lib/parse-api-response"
import type { NewUsuarioFormValues } from "../components/popUpNewUser"
import type { Usuario } from "../types/usuario"

type UsuariosResponse = {
  usuarios: Usuario[]
}

type CreateUsuarioResponse = {
  usuario: Usuario
}

export async function fetchUsuarios() {
  const response = await fetch("/api/admin/usuarios")
  const data = await parseApiResponse<UsuariosResponse>(response)
  return data.usuarios
}

export async function createUsuario(data: NewUsuarioFormValues) {
  const response = await fetch("/api/admin/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await parseApiResponse<CreateUsuarioResponse>(response)
  return result.usuario
}
