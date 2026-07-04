"use client";

import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadingMoreButtonProps = {
  visibleItems: number;
  totalItems: number;
  onLoadMore: () => void;
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
  className?: string;
};

export function LoadingMoreButton({
  visibleItems,
  totalItems,
  onLoadMore,
  isLoading = false,
  label = "Carregar mais",
  loadingLabel = "Carregando...",
  className,
}: LoadingMoreButtonProps) {
  const hasMoreItems = visibleItems < totalItems;

  if (!hasMoreItems) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        Mostrando {Math.min(visibleItems, totalItems)} de {totalItems}
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading && <LoaderCircleIcon className="animate-spin" />}
        {isLoading ? loadingLabel : label}
      </Button>
    </div>
  );
}
