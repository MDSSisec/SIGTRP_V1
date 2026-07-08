"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import styles from "./Objetivos.module.css"

interface DadosObjetivos {
  objetivoGeral: string
  objetivosEspecificos: string[]
}

interface PropsFormularioObjetivos {
  onChange?: (dados: DadosObjetivos) => void
  projectId?: string
}

function getInicialObjetivos(projectData: ReturnType<typeof useProjectData>): DadosObjetivos {
  const o = projectData?.objetivos
  if (!o) return { objetivoGeral: "", objetivosEspecificos: [""] }
  const especificos = o.objetivos_especificos?.length ? o.objetivos_especificos : [""]
  return {
    objetivoGeral: o.objetivo_geral ?? "",
    objetivosEspecificos: especificos,
  }
}

function FormularioObjetivos({ onChange, projectId }: PropsFormularioObjetivos) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosObjetivos>({
    objetivoGeral: "",
    objetivosEspecificos: [""],
  })

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialObjetivos(projectData))
    }
  }, [projectId, projectData])

  const atualizarEstado = (novosDados: DadosObjetivos) => {
    setDadosFormulario(novosDados)
    onChange?.(novosDados)
  }

  const aoAlterarGeral = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    atualizarEstado({ ...dadosFormulario, objetivoGeral: e.target.value })
  }

  const aoAlterarEspecifico = (indice: number, valor: string) => {
    const novosEspecificos = [...dadosFormulario.objetivosEspecificos]
    novosEspecificos[indice] = valor
    atualizarEstado({ ...dadosFormulario, objetivosEspecificos: novosEspecificos })
  }

  const adicionarObjetivo = () => {
    setDadosFormulario({
      ...dadosFormulario,
      objetivosEspecificos: [...dadosFormulario.objetivosEspecificos, ""],
    })
  }

  const removerObjetivo = (indice: number) => {
    const filtrados = dadosFormulario.objetivosEspecificos.filter((_, i) => i !== indice)
    atualizarEstado({ ...dadosFormulario, objetivosEspecificos: filtrados })
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>6. Objetivos</h2>

        <div className={styles.fieldGroup}>
          <Label htmlFor="objetivoGeral" className={styles.label}>
            6.1. Objetivo Geral
          </Label>
          <textarea
            id="objetivoGeral"
            value={dadosFormulario.objetivoGeral}
            onChange={aoAlterarGeral}
            rows={4}
            placeholder="Descreva o objetivo geral do projeto."
            className={styles.textarea}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.subsectionHeader}>
            <Label className={styles.label}>6.2. Objetivos Específicos</Label>
            <GenericButton variant="outline" size="sm" onClick={adicionarObjetivo}>
              Adicionar objetivo
            </GenericButton>
          </div>

          <div className={styles.list}>
            {dadosFormulario.objetivosEspecificos.map((objetivo, indice) => (
              <div key={indice} className={styles.itemCard}>
                <Label htmlFor={`especifico-${indice}`} className={styles.label}>
                  Objetivo específico {indice + 1}
                </Label>
                <Input
                  id={`especifico-${indice}`}
                  value={objetivo}
                  onChange={(e) => aoAlterarEspecifico(indice, e.target.value)}
                  placeholder="Ex: Realizar 10 oficinas de capacitação"
                  className={styles.input}
                />
                <div className={styles.cardActions}>
                  {dadosFormulario.objetivosEspecificos.length > 1 && (
                    <GenericButton
                      variant="destructive"
                      size="sm"
                      onClick={() => removerObjetivo(indice)}
                    >
                      Excluir
                    </GenericButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioObjetivos
