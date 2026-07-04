"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { PublicUser } from "@/server/auth/auth.types";
import { Loading } from "@/components/ui/loading";
import { fetchSessionUser } from "@/features/login/services";
import { AppShell } from "./app-shell";

type AuthenticatedAppShellProps = {
  children: React.ReactNode;
};

export function AuthenticatedAppShell({ children }: AuthenticatedAppShellProps) {
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchSessionUser()
      .then((sessionUser) => {
        if (cancelled) return;
        setUser(sessionUser);
      })
      .catch(() => {
        if (cancelled) return;
        router.replace("/");
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Loading label="Carregando sessão..." className="w-full max-w-md" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <AppShell user={user}>{children}</AppShell>;
}
