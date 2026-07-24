"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { useAsyncData } from "@/hooks/use-async-data"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { fetchProfiles } from "@/features/admin/services/profiles.service"
import { fetchRoles } from "@/features/admin/services/roles.service"
import type { Profile } from "@/features/admin/types/profile"
import type { Role } from "@/features/admin/types/role"
import {
  createUsuario,
  deleteUsuario,
  fetchUsuarios,
  updateUsuario,
} from "../action"
import type { NewUsuarioFormValues } from "../components"
import type { Usuario, UsuarioFilter } from "../types"
import { buildUsuarioMenuItems, filterUsuarios } from "../utils"

export function useAdminUsuariosScreen() {
  const [filter, setFilter] = useState<UsuarioFilter>("todos")
  const [search, setSearch] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [popupMode, setPopupMode] = useState<"create" | "edit" | "view">(
    "create",
  )
  const [usuarioToDelete, setUsuarioToDelete] = useState<Usuario | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [sessionUser, setSessionUser] = useState<PublicUser | null>(null)

  const canManageRoles = Boolean(sessionUser?.isAdmin)

  useEffect(() => {
    let cancelled = false

    fetchSessionUser()
      .then((user) => {
        if (!cancelled) setSessionUser(user)
      })
      .catch(() => {
        if (!cancelled) setSessionUser(null)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const {
    data: usuarios,
    isLoading,
    error,
    reload: loadUsuarios,
  } = useAsyncData(fetchUsuarios, {
    initialData: [] as Usuario[],
    errorMessage: "Não foi possível carregar os usuários.",
  })

  const { data: profiles } = useAsyncData(fetchProfiles, {
    initialData: [] as Profile[],
    errorMessage: "Não foi possível carregar os perfis.",
  })

  const loadRoles = useCallback(async () => {
    if (!canManageRoles) return [] as Role[]
    return fetchRoles()
  }, [canManageRoles])

  const { data: roles } = useAsyncData(loadRoles, {
    initialData: [] as Role[],
    errorMessage: "Não foi possível carregar as permissões.",
    loadOnMount: canManageRoles,
  })

  const menuItems = useMemo(() => buildUsuarioMenuItems(usuarios), [usuarios])
  const items = useMemo(
    () => filterUsuarios(usuarios, filter, search),
    [usuarios, filter, search],
  )
  const perfilNomeById = useMemo(() => {
    const map = new Map<number, string>()
    for (const profile of profiles) {
      map.set(profile.id, profile.nome)
    }
    return map
  }, [profiles])

  async function handleCreateUsuario(data: NewUsuarioFormValues) {
    setIsSubmitting(true)

    try {
      await createUsuario(data)
      await loadUsuarios()
      toast.success("Usuário criado com sucesso!")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível criar o usuário.",
      )
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleEditUsuario(data: NewUsuarioFormValues) {
    if (!selectedUsuario) return

    setIsSubmitting(true)

    try {
      await updateUsuario(selectedUsuario.id, data)
      await loadUsuarios()
      toast.success("Usuário atualizado com sucesso!")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o usuário.",
      )
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleConfirmDeleteUsuario() {
    if (!usuarioToDelete) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      const nomeExcluido = usuarioToDelete.nome
      await deleteUsuario(usuarioToDelete.id)
      setUsuarioToDelete(null)
      await loadUsuarios()
      toast.success(`O usuário "${nomeExcluido}" foi excluído com sucesso.`)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o usuário."

      setDeleteError(message)
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  function openCreatePopup() {
    setSelectedUsuario(null)
    setPopupMode("create")
    setIsPopupOpen(true)
  }

  function openEditPopup(usuario: Usuario) {
    setSelectedUsuario(usuario)
    setPopupMode("edit")
    setIsPopupOpen(true)
  }

  function closePopup() {
    setIsPopupOpen(false)
    setSelectedUsuario(null)
    setPopupMode("create")
  }

  function requestDeleteUsuario(usuario: Usuario) {
    setDeleteError(null)
    setUsuarioToDelete(usuario)
  }

  function cancelDeleteUsuario() {
    if (isDeleting) return
    setUsuarioToDelete(null)
    setDeleteError(null)
  }

  return {
    filter,
    setFilter,
    search,
    setSearch,
    isPopupOpen,
    isSubmitting,
    selectedUsuario,
    popupMode,
    usuarioToDelete,
    isDeleting,
    deleteError,
    canManageRoles,
    isLoading,
    error,
    profiles,
    roles,
    menuItems,
    items,
    perfilNomeById,
    handleCreateUsuario,
    handleEditUsuario,
    handleConfirmDeleteUsuario,
    openCreatePopup,
    openEditPopup,
    closePopup,
    requestDeleteUsuario,
    cancelDeleteUsuario,
  }
}
