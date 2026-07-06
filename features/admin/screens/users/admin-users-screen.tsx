"use client"

import { useMemo, useState } from "react"
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { createUsuario, fetchUsuarios } from "../../services/usuarios.service"
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

  const pageHeader = (
    <PageHeader
      title="Usuários"
      subtitle="Gerencie os usuários do sistema."
      action={
        <Button type="button" onClick={() => setIsPopupOpen(true)}>
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
                        aria-label={`Ver ${usuario.nome}`}
                      >
                        <EyeIcon />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Editar ${usuario.nome}`}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        size="icon-sm"
                        className="border-0 bg-destructive/10 text-destructive hover:bg-destructive/20"
                        aria-label={`Excluir ${usuario.nome}`}
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

      <PopUpNewUser
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleCreateUsuario}
        isSubmitting={isSubmitting}
        profiles={profiles}
        roles={roles}
      />
    </>
  )
}
