import { redirect } from "next/navigation"

import { ADMIN_PERMISSOES_ROUTE } from "@/features/admin/constants"

export default function AdminRolesPage() {
  redirect(ADMIN_PERMISSOES_ROUTE)
}
