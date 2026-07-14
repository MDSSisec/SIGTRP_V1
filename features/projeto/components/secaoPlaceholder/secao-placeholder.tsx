"use client"

type SecaoPlaceholderProps = {
  title: string
  projectId?: string
  modeloLabel?: string
}

export function SecaoPlaceholder({
  title,
  projectId,
  modeloLabel,
}: SecaoPlaceholderProps) {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">
        Seção em preparação
        {modeloLabel ? ` para o modelo ${modeloLabel}` : ""}.
        {projectId ? ` Projeto #${projectId}.` : ""}
      </p>
    </div>
  )
}
