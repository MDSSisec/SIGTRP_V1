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
        <CardHeader className="px-8 pt-8 pb-2">
          <div className="flex items-start gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#032a59]/8 text-[#032a59]">
              <ShieldCheck className="size-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl leading-tight font-semibold text-[#032a59]">
                Acesso ao sistema
              </CardTitle>
              <CardDescription className="text-base leading-6 text-slate-500">
                Entre com suas credenciais institucionais
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-5">
            <div className="space-y-0">
              <label htmlFor="email" className="mb-2.5 block text-base font-medium">
                E-mail institucional
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu.email@exemplo.com.br"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="h-12 bg-white pl-11 text-base"
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="password" className="mb-2.5 block text-base font-medium">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="h-12 bg-white pr-12 pl-11 text-base"
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
              <p className="text-base text-destructive">{error}</p>
            ) : null}
            <Button
              type="submit"
              className="h-12 w-full gap-2 rounded-lg bg-[#032a59] text-base font-semibold text-white shadow-sm hover:bg-[#032a59]/95"
              disabled={isSubmitting}
            >
              <LogIn className="size-5" />
              {isSubmitting ? "Entrando..." : "Entrar no sistema"}
            </Button>
          </form>
        </CardContent>
        <div className="border-t border-[#032a59]/10 px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#032a59]/10 text-[#032a59]">
              <Headphones className="size-5" />
            </div>
            <div>
              <p className="text-base font-medium text-foreground">
                Problemas para acessar?
              </p>
              <p className="text-base text-muted-foreground">
                Entre em contato com o gestor do seu projeto.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
