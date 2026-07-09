"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { REMEMBERED_LOGIN_EMAIL_KEY, REMEMBERED_LOGIN_PASSWORD_KEY } from "../constants"
import { loginRequest } from "../services"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberUser, setRememberUser] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_LOGIN_EMAIL_KEY)
    const rememberedPassword = localStorage.getItem(REMEMBERED_LOGIN_PASSWORD_KEY)

    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberUser(true)
    }

    if (rememberedPassword) {
      setPassword(rememberedPassword)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const submittedEmail = String(formData.get("email") ?? email)
    const submittedPassword = String(formData.get("password") ?? password)

    setIsSubmitting(true)
    setError(null)

    try {
      const user = await loginRequest(submittedEmail, submittedPassword)

      if (rememberUser) {
        localStorage.setItem(REMEMBERED_LOGIN_EMAIL_KEY, submittedEmail.trim())
        localStorage.setItem(REMEMBERED_LOGIN_PASSWORD_KEY, submittedPassword)
      } else {
        localStorage.removeItem(REMEMBERED_LOGIN_EMAIL_KEY)
        localStorage.removeItem(REMEMBERED_LOGIN_PASSWORD_KEY)
      }

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
        <CardHeader className="px-4 pt-5 pb-2 sm:px-6 sm:pt-6 md:px-8 md:pt-8">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#032a59]/8 text-[#032a59] sm:size-12 md:size-14">
              <ShieldCheck className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0 space-y-1 sm:space-y-2">
              <CardTitle className="text-lg leading-tight font-semibold text-[#032a59] sm:text-xl md:text-2xl">
                Acesso ao sistema
              </CardTitle>
              <CardDescription className="text-sm leading-5 text-slate-500 sm:text-base sm:leading-6">
                Entre com suas credenciais institucionais
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4 sm:space-y-5">
            <div className="space-y-0">
              <label htmlFor="email" className="mb-2 block text-sm font-medium sm:mb-2.5 sm:text-base">
                E-mail institucional
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground sm:left-3.5 sm:size-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu.email@exemplo.com.br"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="h-10 bg-white pl-10 text-sm sm:h-11 sm:pl-11 sm:text-base md:h-12"
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="password" className="mb-2 block text-sm font-medium sm:mb-2.5 sm:text-base">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground sm:left-3.5 sm:size-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="h-10 bg-white pr-11 pl-10 text-sm sm:h-11 sm:pr-12 sm:pl-11 sm:text-base md:h-12"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition hover:text-[#032a59]"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <input
                id="remember-user"
                name="remember-user"
                type="checkbox"
                checked={rememberUser}
                onChange={(event) => setRememberUser(event.target.checked)}
                disabled={isSubmitting}
                className="size-4 rounded border border-input accent-[#032a59]"
              />
              <label
                htmlFor="remember-user"
                className="cursor-pointer text-sm text-slate-600"
              >
                Lembrar meu acesso
              </label>
            </div>
            {error ? (
              <p className="text-sm text-destructive sm:text-base">{error}</p>
            ) : null}
            <Button
              type="submit"
              className="h-10 w-full gap-2 rounded-lg bg-[#032a59] text-sm font-semibold text-white shadow-sm hover:bg-[#032a59]/95 sm:h-11 sm:text-base md:h-12"
              disabled={isSubmitting}
            >
              <LogIn className="size-4 sm:size-5" />
              {isSubmitting ? "Entrando..." : "Entrar no sistema"}
            </Button>
          </form>
        </CardContent>
        <div className="border-t border-[#032a59]/10 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#032a59]/10 text-[#032a59] sm:size-12">
              <Headphones className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground sm:text-base">
                Problemas para acessar?
              </p>
              <p className="text-sm text-muted-foreground sm:text-base">
                Entre em contato com o gestor do seu projeto.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
