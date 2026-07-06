"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MenuBar } from "@/components/ui/menuBar"
import type { Profile } from "../../types/profile"
import { useMemo, useState } from "react"
import styles from "./admin-profiles-screen.module.css"
import { fetchProfiles } from "../../services/profiles.service"
import { useAsyncData } from "@/hooks/use-async-data"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  buildProfileMenuItems,
  filterProfiles,
} from "../../utils/profile-filter"
import { 
  ADMIN_PROFILES_BUTTONS, 
  ADMIN_PROFILES_LOADING, 
  ADMIN_PROFILES_PLACEHOLDERS, 
  ADMIN_PROFILES_SUBTITLES, 
  ADMIN_PROFILES_TABLE, 
  ADMIN_PROFILES_TITLES 
} from "../../constants/profile"


export function AdminProfilesScreen() {
  const [search, setSearch] = useState("")

  const {
    data: profiles,
    isLoading,
    error,
    reload: loadProfiles,
  } = useAsyncData(fetchProfiles, {
    initialData: [] as Profile[],
    errorMessage: ADMIN_PROFILES_LOADING.loadingErrorMessage,
  })

  const menuItems = useMemo(() => buildProfileMenuItems(profiles), [profiles])
  const items = useMemo(
    () => filterProfiles(profiles, search),
    [profiles, search],
  )

  const pageHeader = (
    <PageHeader
      title={ADMIN_PROFILES_TITLES.pageTitle}
      subtitle={ADMIN_PROFILES_SUBTITLES.pageSubtitle}
      action={
        <Button type="button">
          <PlusIcon />
          {ADMIN_PROFILES_BUTTONS.buttonCreateProfile}
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
        loadingLabel={ADMIN_PROFILES_LOADING.loadingProfiles}
        errorClassName={styles.error}
      >
      <div className={styles.page}>
      <MenuBar items={menuItems} value="todos" onValueChange={() => undefined}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={ADMIN_PROFILES_PLACEHOLDERS.searchPlaceholder}
            className={styles.searchInput}
            aria-label={ADMIN_PROFILES_PLACEHOLDERS.searchPlaceholder}
          />
        </div>
      </MenuBar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{ADMIN_PROFILES_TABLE.tableColumProfile}</TableHead>
            <TableHead>{ADMIN_PROFILES_TABLE.tableColumnDescription}</TableHead>
            <TableHead className={styles.actionsHead}>{ADMIN_PROFILES_TABLE.tableColumnActions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell className={styles.profileName}>
                {profile.nome}
              </TableCell>
              <TableCell className={styles.profileDescription}>
                {profile.descricao}
              </TableCell>
              <TableCell>
                <div className={styles.actions}>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className={styles.actionButton}
                    aria-label={ADMIN_PROFILES_BUTTONS.buttonEditProfile}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    size="icon-sm"
                    className={styles.deleteButton}
                    aria-label={ADMIN_PROFILES_BUTTONS.buttonDeleteProfile}
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
    </>
  )
}
