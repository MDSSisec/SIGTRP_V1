"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getDefaultAuthenticatedRoute } from "@/components/blocks/sidebar/sidebar-nav-rules"
import { loginRequest } from "../services"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    setIsSubmitting(true)
    setError(null)

    try {
      const user = await loginRequest(email, password)
      router.push(getDefaultAuthenticatedRoute(user))
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível entrar."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Acesso ao sistema</CardTitle>
          <CardDescription>
            Entre com suas credenciais institucionais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail institucional
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@org.gov.br"
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
