"use client"

import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { ConfirmeModal } from "@/components/ui/confirmeModal"
import { PopUpNewUser, UsuariosTable } from "./components"
import styles from "./admin-users-screen.module.css"
import { PlusIcon, SearchIcon } from "lucide-react"
import { MenuBar } from "@/components/ui/menuBar"
import { Spinner } from "@/components/ui/spinner"
import { useAdminUsuariosScreen } from "./hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminUsuariosScreen() {
  const {
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
  } = useAdminUsuariosScreen()

  return (
    <>
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
      <AsyncLoadState
        isLoading={isLoading}
        error={error}
        loadingLabel="Carregando usuários..."
        loadingIcon={<Spinner className={styles.loadingIcon} />}
      >
        <div className={styles.page}>
          <MenuBar items={menuItems} value={filter} onValueChange={setFilter}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <Input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar usuário..."
                className={styles.searchInput}
                aria-label="Buscar usuário"
              />
            </div>
          </MenuBar>
          <UsuariosTable
            items={items}
            perfilNomeById={perfilNomeById}
            onEdit={openEditPopup}
            onDelete={requestDeleteUsuario}
          />
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
        onCancel={cancelDeleteUsuario}
      />

      <PopUpNewUser
        open={isPopupOpen}
        onClose={closePopup}
        onSubmit={popupMode === "edit" ? handleEditUsuario : handleCreateUsuario}
        isSubmitting={isSubmitting}
        initialValues={selectedUsuario}
        mode={popupMode}
        profiles={profiles}
        roles={roles}
        canManageRoles={canManageRoles}
      />
    </>
  )
}
