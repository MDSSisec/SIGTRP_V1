"use client"

import { useMemo, useState } from "react"
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfirmeModal } from "@/components/ui/confirmeModal"
import { SuccessModal } from "@/components/ui/successModal"
import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { Input } from "@/components/ui/input"
import { MenuBar } from "@/components/ui/menuBar"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { useAsyncData } from "@/hooks/use-async-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PopUpNewUser } from "../../components/popUpNewUser"
import { fetchProfiles } from "../../services/profiles.service"
import { fetchRoles } from "../../services/roles.service"
import {
  createUsuario,
  deleteUsuario,
  fetchUsuarios,
  updateUsuario,
} from "../../services/usuarios.service"
import type { Profile } from "../../types/profile"
import type { Role } from "../../types/role"
import type { Usuario, UsuarioFilter } from "../../types/usuario"
import {
  buildUsuarioMenuItems,
  filterUsuarios,
} from "../../utils/usuario-filter"

export function AdminUsuariosScreen() {
  const [filter, setFilter] = useState<UsuarioFilter>("todos")
  const [search, setSearch] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
  const [popupMode, setPopupMode] = useState<"create" | "edit" | "view">("create")
  const [usuarioToDelete, setUsuarioToDelete] = useState<Usuario | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [successFeedback, setSuccessFeedback] = useState<{
    title: string
    description: string
  } | null>(null)

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

  const { data: roles } = useAsyncData(fetchRoles, {
    initialData: [] as Role[],
    errorMessage: "Não foi possível carregar as permissões.",
  })

  const menuItems = useMemo(() => buildUsuarioMenuItems(usuarios), [usuarios])
  const items = useMemo(
    () => filterUsuarios(usuarios, filter, search),
    [usuarios, filter, search],
  )

  async function handleCreateUsuario(
    data: Parameters<typeof createUsuario>[0],
  ) {
    setIsSubmitting(true)

    try {
      await createUsuario(data)
      await loadUsuarios()
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleEditUsuario(
    data: Parameters<typeof updateUsuario>[1],
  ) {
    if (!selectedUsuario) return

    setIsSubmitting(true)

    try {
      await updateUsuario(selectedUsuario.id, data)
      await loadUsuarios()
      setSuccessFeedback({
        title: "Usuário atualizado",
        description: "As alterações do usuário foram salvas com sucesso.",
      })
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
      setSuccessFeedback({
        title: "Usuário excluído",
        description: `O usuário "${nomeExcluido}" foi removido com sucesso.`,
      })
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o usuário.",
      )
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

  function openViewPopup(usuario: Usuario) {
    setSelectedUsuario(usuario)
    setPopupMode("view")
    setIsPopupOpen(true)
  }

  const pageHeader = (
    <PageHeader
      title="Usuários"
      subtitle="Gerencie os usuários do sistema."
      action={
        <Button type="button" onClick={openCreatePopup}>
          <PlusIcon />
          Criar Usuário
        </Button>
      }
    />
  )

  return (
    <>
      {pageHeader}
      <AsyncLoadState
        isLoading={isLoading}
        error={error}
        loadingLabel="Carregando usuários..."
      >
        <div className="space-y-4">
          <MenuBar items={menuItems} value={filter} onValueChange={setFilter}>
            <div className="relative w-full">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar usuário..."
                className="bg-background pl-8"
                aria-label="Buscar usuário"
              />
            </div>
          </MenuBar>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Senha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell className="capitalize">{usuario.tipo}</TableCell>
                  <TableCell className="font-mono">{usuario.senha}</TableCell>
                  <TableCell>{usuario.ativo ? "Ativo" : "Inativo"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Editar ${usuario.nome}`}
                        onClick={() => openEditPopup(usuario)}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        size="icon-sm"
                        className="border-0 bg-destructive/10 text-destructive hover:bg-destructive/20"
                        aria-label={`Excluir ${usuario.nome}`}
                        onClick={() => {
                          setDeleteError(null)
                          setUsuarioToDelete(usuario)
                        }}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AsyncLoadState>

      <ConfirmeModal
        open={Boolean(usuarioToDelete)}
        title="Excluir usuário?"
        description={
          deleteError
            ? deleteError
            : `Tem certeza que deseja excluir o usuário "${usuarioToDelete?.nome}"? Esta ação não pode ser desfeita.`
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        isLoading={isDeleting}
        onConfirm={handleConfirmDeleteUsuario}
        onCancel={() => {
          if (isDeleting) return
          setUsuarioToDelete(null)
          setDeleteError(null)
        }}
      />

      <SuccessModal
        open={Boolean(successFeedback)}
        title={successFeedback?.title ?? ""}
        description={successFeedback?.description ?? ""}
        onConfirm={() => setSuccessFeedback(null)}
      />

      <PopUpNewUser
        open={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false)
          setSelectedUsuario(null)
          setPopupMode("create")
        }}
        onSubmit={popupMode === "edit" ? handleEditUsuario : handleCreateUsuario}
        isSubmitting={isSubmitting}
        initialValues={selectedUsuario}
        mode={popupMode}
        profiles={profiles}
        roles={roles}
      />
    </>
  )
}
