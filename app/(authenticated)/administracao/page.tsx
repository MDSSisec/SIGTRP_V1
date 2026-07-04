import { redirect } from "next/navigation"

import { ADMIN_USUARIOS_ROUTE } from "@/features/admin"

export default function AdministracaoPage() {
  redirect(ADMIN_USUARIOS_ROUTE)
}
