/**
 * Tela principal de gerenciamento de projetos.
 *
 * Responsável por integrar os hooks de listagem, permissões,
 * responsáveis e ações, delegando a lógica de negócio para
 * camadas específicas.
 */

"use client"

import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { PopUpNewProject } from "../../components/popUpNewProject"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { useProjetoScreen } from "../../hooks/useProjetoScreen"
import { ProjetosTable } from "../../components/projetosTable"
import { PROJETOS_TEXT } from "../../constants/projetos.text"
import { PlusIcon, SearchIcon } from "lucide-react"
import { MenuBar } from "@/components/ui/menuBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import styles from "./screen-projeto.module.css"

export function ScreenProjeto() {
  const screen = useProjetoScreen()

  return (
    <>
      <PageHeader
        title={PROJETOS_TEXT.page.title}
        subtitle={PROJETOS_TEXT.page.subtitle}
        action={
          screen.permissions.canCreate ? (
            <Button type="button" onClick={screen.popup.open}>
              <PlusIcon />
              {PROJETOS_TEXT.actions.create}
            </Button>
          ) : undefined
        }
      />

      <AsyncLoadState
        isLoading={screen.projetos.isLoading}
        error={screen.projetos.error}
        loadingLabel={PROJETOS_TEXT.loading.projetos}
      >
        <div className={styles.content}>
          <MenuBar
            items={screen.projetos.menuItems}
            value={screen.projetos.filter}
            onValueChange={screen.projetos.setFilter}
          >
            <div className={styles.searchField}>
              <SearchIcon className={styles.searchIcon} />

              <Input
                type="search"
                value={screen.projetos.search}
                onChange={(event) =>
                  screen.projetos.setSearch(event.target.value)
                }
                placeholder={PROJETOS_TEXT.search.placeholder}
                className={styles.searchInput}
                aria-label={PROJETOS_TEXT.search.ariaLabel}
              />
            </div>
          </MenuBar>

          <ProjetosTable
            projetos={screen.projetos.filtered}
            emptyMessage={screen.projetos.emptyMessage}
            canDelete={screen.permissions.canDelete}
            onDelete={screen.actions.deleteProjeto}
          />
        </div>
      </AsyncLoadState>

      {screen.permissions.canCreate && (
        <PopUpNewProject
          open={screen.popup.isOpen}
          onClose={screen.popup.close}
          onSubmit={screen.actions.createProjeto}
          isSubmitting={screen.actions.isSubmitting}
          responsaveisInternos={screen.responsaveis.internos}
          responsaveisExternos={screen.responsaveis.externos}
        />
      )}
    </>
  )
}

/** Alias para compatibilidade durante a migração. */
export const ProjetosScreen = ScreenProjeto