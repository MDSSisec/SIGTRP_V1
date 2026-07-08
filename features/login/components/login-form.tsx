"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Eye,
  EyeOff,
  Headphones,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)

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
      <Card className="border border-[#032a59]/10 bg-white/95 py-0 shadow-[0_24px_80px_-32px_rgba(3,42,89,0.35)] backdrop-blur">
        <CardHeader className="px-7 pt-7">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#032a59]/8 text-[#032a59]">
              <ShieldCheck className="size-5" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-[18px] leading-none font-semibold text-[#032a59]">
                Acesso ao sistema
              </CardTitle>
              <CardDescription className="text-[15px] leading-5 text-slate-500">
                Entre com suas credenciais institucionais
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-7 pb-6">
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div className="space-y-0">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                E-mail institucional
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com.br"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="h-11 bg-white pl-9"
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="h-11 bg-white pr-11 pl-9"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-[#032a59]"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <Button
              type="submit"
              className="h-11 w-full gap-2 rounded-lg bg-[#032a59] text-sm font-semibold text-white shadow-sm hover:bg-[#032a59]/95"
              disabled={isSubmitting}
            >
              <LogIn className="size-4" />
              {isSubmitting ? "Entrando..." : "Entrar no sistema"}
            </Button>
          </form>
        </CardContent>
        <div className="border-t border-[#032a59]/10 px-7 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#032a59]/10 text-[#032a59]">
              <Headphones className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Problemas para acessar?
              </p>
              <p className="text-sm text-muted-foreground">
                Entre em contato com o gestor do seu projeto.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
