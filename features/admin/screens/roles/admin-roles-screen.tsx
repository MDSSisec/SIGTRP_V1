"use client"

import { useEffect, useMemo, useState } from "react"
import { PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"
import styles from "./admin-roles-screen.module.css"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { Input } from "@/components/ui/input"
import { Loading } from "@/components/ui/loading"
import { MenuBar } from "@/components/ui/menuBar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchRoles } from "../../services/roles.service"
import type { Role } from "../../types/role"
import { buildRoleMenuItems, filterRoles } from "../../utils/role-filter"
import { ADMIN_ROLES_BUTTONS, ADMIN_ROLES_LOADING, ADMIN_ROLES_PLACEHOLDERS, ADMIN_ROLES_SUBTITLES, ADMIN_ROLES_TABLE, ADMIN_ROLES_TITLES } from "../../constants/roles"

export function AdminRolesScreen() {
  const [roles, setRoles] = useState<Role[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchRoles()
      .then((data) => {
        if (cancelled) return
        setRoles(data)
      })
      .catch((fetchError) => {
        if (cancelled) return
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : ADMIN_ROLES_LOADING.loadingErrorMessage,
        )
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const menuItems = useMemo(() => buildRoleMenuItems(roles), [roles])
  const items = useMemo(() => filterRoles(roles, search), [roles, search])

  const pageHeader = (
    <PageHeader
      title={ADMIN_ROLES_TITLES.pageTitle}
      subtitle={ADMIN_ROLES_SUBTITLES.pageSubtitle}
      action={
        <Button type="button">
          <PlusIcon />
          {ADMIN_ROLES_BUTTONS.buttonCreateRole}
        </Button>
      }
    />
  )

  if (isLoading) {
    return (
      <>
        {pageHeader}
        <Loading label={ADMIN_ROLES_LOADING.loadingRoles} />
      </>
    )
  }

  if (error) {
    return (
      <>
        {pageHeader}
        <div className={styles.error}>{error}</div>
      </>
    )
  }

  return (
    <>
      {pageHeader}
      <div className={styles.page}>
      <MenuBar items={menuItems} value="todos" onValueChange={() => undefined}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={ADMIN_ROLES_PLACEHOLDERS.searchPlaceholder}
            className={styles.searchInput}
            aria-label={ADMIN_ROLES_PLACEHOLDERS.searchPlaceholder}
          />
        </div>
      </MenuBar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{ADMIN_ROLES_TABLE.tableColumRole}</TableHead>
            <TableHead>{ADMIN_ROLES_TABLE.tableColumnDescription}</TableHead>
            <TableHead className={styles.actionsHead}>{ADMIN_ROLES_TABLE.tableColumnActions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((role) => (
            <TableRow key={role.id}>
              <TableCell className={styles.roleName}>{role.nome}</TableCell>
              <TableCell className={styles.roleDescription}>{role.descricao}</TableCell>
              <TableCell>
                <div className={styles.actions}>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className={styles.actionButton}
                    aria-label={ADMIN_ROLES_BUTTONS.buttonEditRole}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    size="icon-sm"
                    className={styles.deleteButton}
                    aria-label={ADMIN_ROLES_BUTTONS.buttonDeleteRole}
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
    </>
  )
}
