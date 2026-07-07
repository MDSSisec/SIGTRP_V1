"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useCronograma } from "../CronogramaContext/CronogramaContext"
import type { QuadroConteudoProgramatico } from "../etapas-cronograma/types"
import styles from "./Metodologia.module.css"
import { METODOLOGIA_PLACE_HOLDER, METODOLOGIA_TITLE } from "@/features/projetos/constants/ted/metodologia"

const linhaConteudoVazia = (): QuadroConteudoProgramatico => ({
  curso: "",
  cargaHoraria: "",
  quantidadeAlunosTurmas: "",
  conteudosBasicos: "",
  conteudosEspecificos: "",
  aulasPraticas: "",
})

export function Metodologia({ projectId: _projectId }: { projectId?: string }) {
  const { data, updateMeta } = useCronograma()
  const metas = data.metas

  const footer = (
    <div className={styles.actions}>
      <GenericButton variant="editar" onClick={() => {}} />
      <GenericButton variant="salvar" onClick={() => {}} />
    </div>
  )

  if (metas.length === 0) {
    return (
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.title}>{METODOLOGIA_TITLE.TITLE_METODOLOGIA}</h2>
          <p className={styles.emptyText}>
            Adicione metas na seção 7 ou 8 para preencher a metodologia aqui.
          </p>
        </section>
        {footer}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>{METODOLOGIA_TITLE.TITLE_METODOLOGIA}</h2>

        <div className={styles.metaList}>
          {metas.map((meta, metaIndex) => (
            <section key={metaIndex} className={styles.metaSection}>
              <div className={styles.fieldGroup}>
                <Label htmlFor={`metodologia-meta-${metaIndex}`} className={styles.label}>
                  9.{metaIndex + 1}. Metodologia da Meta {metaIndex + 1}
                </Label>
                <textarea
                  id={`metodologia-meta-${metaIndex}`}
                  value={meta.titulo}
                  onChange={(e) => updateMeta(metaIndex, { ...meta, titulo: e.target.value })}
                  placeholder={METODOLOGIA_PLACE_HOLDER.PLACE_HOLDER_REALIZAR_CAPACITACAO}
                  rows={3}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.etapasContainer}>
                {meta.etapas.length > 0 ? (
                  meta.etapas.map((etapa, etapaIndex) => (
                    <div key={etapaIndex} className={styles.fieldGroup}>
                      <Label className={styles.labelSmall}>
                        9.{metaIndex + 1}.{etapaIndex + 1}. Etapa {metaIndex + 1}.{etapaIndex + 1}
                      </Label>
                      <textarea
                        value={etapa.descricao}
                        onChange={(e) => {
                          const novasEtapas = [...meta.etapas]
                          novasEtapas[etapaIndex] = { ...etapa, descricao: e.target.value }
                          updateMeta(metaIndex, { ...meta, etapas: novasEtapas })
                        }}
                        className={styles.textareaEtapa}
                        rows={2}
                      />
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyText}>Nenhuma etapa nesta meta.</p>
                )}
              </div>

              <div className={styles.quadroContainer}>
                <h3 className={styles.quadroTitle}>{METODOLOGIA_TITLE.TITLE_QUADRO_CONTEUDOS}</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Curso</th>
                        <th>Carga horária</th>
                        <th>Quantidade Alunos/Turmas</th>
                        <th>Conteúdos básicos</th>
                        <th>Conteúdos específicos</th>
                        <th>Aulas práticas</th>
                        <th style={{ width: "32px" }} />
                      </tr>
                    </thead>
                    <tbody>
                      {(meta.quadrosConteudosProgramaticos ?? []).map((linha, rowIndex) => (
                        <tr key={rowIndex}>
                          {(
                            [
                              "curso",
                              "cargaHoraria",
                              "quantidadeAlunosTurmas",
                              "conteudosBasicos",
                              "conteudosEspecificos",
                              "aulasPraticas",
                            ] as const
                          ).map((campo) => (
                            <td key={campo}>
                              <Input
                                value={linha[campo]}
                                onChange={(e) => {
                                  const novas = [...(meta.quadrosConteudosProgramaticos ?? [])]
                                  novas[rowIndex] = { ...linha, [campo]: e.target.value }
                                  updateMeta(metaIndex, {
                                    ...meta,
                                    quadrosConteudosProgramaticos: novas,
                                  })
                                }}
                                className={styles.tableInput}
                              />
                            </td>
                          ))}
                          <td>
                            <GenericButton
                              variant="ghost"
                              size="icon-xs"
                              className="text-destructive"
                              onClick={() => {
                                const novas = (meta.quadrosConteudosProgramaticos ?? []).filter(
                                  (_, i) => i !== rowIndex
                                )
                                updateMeta(metaIndex, {
                                  ...meta,
                                  quadrosConteudosProgramaticos: novas,
                                })
                              }}
                            >
                              ✕
                            </GenericButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <GenericButton
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateMeta(metaIndex, {
                      ...meta,
                      quadrosConteudosProgramaticos: [
                        ...(meta.quadrosConteudosProgramaticos ?? []),
                        linhaConteudoVazia(),
                      ],
                    })
                  }
                >
                  + Linha (conteúdos)
                </GenericButton>
              </div>
            </section>
          ))}
        </div>
      </section>
      {footer}
    </div>
  )
}
