"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { PublicUser } from "@/features/login/types";
import { Loading } from "@/components/ui/loading";
import { fetchSessionUser } from "@/features/login/services";
import {
  canAccessRoute,
  getDefaultAuthenticatedRoute,
} from "./sidebar-nav-rules";
import { AppShell } from "./app-shell";

type AuthenticatedAppShellProps = {
  children: React.ReactNode;
};

export function AuthenticatedAppShell({ children }: AuthenticatedAppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    if (!user || isLoading) return;

    if (!canAccessRoute(user, pathname)) {
      router.replace(getDefaultAuthenticatedRoute(user));
    }
  }, [isLoading, pathname, router, user]);

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
