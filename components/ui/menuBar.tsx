"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MenuBarItem<TValue extends string = string> = {
  value: TValue;
  label: string;
  count?: number;
};

type MenuBarProps<TValue extends string = string> = {
  items: MenuBarItem<TValue>[];
  value: TValue;
  onValueChange: (value: TValue) => void;
  className?: string;
  children?: React.ReactNode;
};

export function MenuBar<TValue extends string = string>({
  items,
  value,
  onValueChange,
  className,
  children,
}: MenuBarProps<TValue>) {
  return (
    <nav
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border bg-card p-2 shadow-sm",
        className,
      )}
      aria-label="Menu de filtros"
    >
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => {
          const isActive = item.value === value;

          return (
            <Button
              key={item.value}
              type="button"
              size="sm"
              variant={isActive ? "default" : "ghost"}
              onClick={() => onValueChange(item.value)}
              aria-pressed={isActive}
            >
              {item.label}
              {typeof item.count === "number" && (
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 text-xs",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.count}
                </span>
              )}
            </Button>
          );
        })}
      </div>
      {children ? (
        <div className="ml-auto flex w-full min-w-0 items-center justify-end sm:w-auto sm:min-w-[14rem] sm:max-w-xs">
          {children}
        </div>
      ) : null}
    </nav>
  );
}
