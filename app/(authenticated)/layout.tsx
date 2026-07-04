import { AuthenticatedAppShell } from "@/components/blocks/sidebar"

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthenticatedAppShell>{children}</AuthenticatedAppShell>
}
