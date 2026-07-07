"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import styles from "./Justificativa.module.css"
import {
  JUSTIFICATIVA_ID,
  JUSTIFICATIVA_LABELS,
  JUSTIFICATIVA_NOME,
  JUSTIFICATIVA_PLACEHOLDER,
  JUSTIFICATIVA_TITLE,
} from "@/features/projetos/constants/ted/justificativa"

interface DadosJustificativa {
  caracterizacaoInteresses: string
  publicoAlvo: string
  problema: string
  resultadosEsperados: string
  relacaoPrograma: string
}

interface PropsFormularioJustificativa {
  onChange?: (dados: DadosJustificativa) => void
  projectId?: string
}

const VAZIO: DadosJustificativa = {
  caracterizacaoInteresses: "",
  publicoAlvo: "",
  problema: "",
  resultadosEsperados: "",
  relacaoPrograma: "",
}

function getInicialJustificativa(projectData: any): DadosJustificativa {
  const d = projectData?.descricao_projeto
  const j = d?.justificativa_motivacao
  if (!d && !j) return VAZIO
  return {
    caracterizacaoInteresses: j?.caracterizacao_interesses_reciprocos ?? "",
    publicoAlvo: d?.publico_alvo ?? j?.publico_alvo ?? "",
    problema: d?.problema ?? j?.problema ?? "",
    resultadosEsperados: d?.resultados_esperados ?? j?.resultados_esperados ?? "",
    relacaoPrograma: d?.relacao_proposta_programa ?? j?.relacao_proposta_programa ?? "",
  }
}

export default function FormularioJustificativa({
  onChange,
  projectId,
}: PropsFormularioJustificativa) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosJustificativa>(VAZIO)

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialJustificativa(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {JUSTIFICATIVA_TITLE.TITLE_JUSTIFICATIVA_MOTIVACAO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label
              htmlFor={JUSTIFICATIVA_ID.ID_CARACTERIZACAO_INTERESSES}
              className={styles.label}
            >
              {JUSTIFICATIVA_LABELS.LABEL_CARACTERIZACAO}
            </Label>
            <textarea
              id={JUSTIFICATIVA_ID.ID_CARACTERIZACAO_INTERESSES}
              name={JUSTIFICATIVA_NOME.NOME_CARACTERIZACAO}
              value={dadosFormulario.caracterizacaoInteresses}
              onChange={aoAlterar}
              rows={5}
              placeholder={JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_INTERESSES_RECIPROCOS}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor={JUSTIFICATIVA_ID.ID_PUBLICO_ALVO} className={styles.label}>
              {JUSTIFICATIVA_LABELS.LABEL_PUBLICO_ALVO}
            </Label>
            <textarea
              id={JUSTIFICATIVA_ID.ID_PUBLICO_ALVO}
              name={JUSTIFICATIVA_NOME.NOME_PUBLICO_ALVO}
              value={dadosFormulario.publicoAlvo}
              onChange={aoAlterar}
              rows={4}
              placeholder={JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PUBLICO_ALVO}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor={JUSTIFICATIVA_ID.ID_PROBLEMA} className={styles.label}>
              {JUSTIFICATIVA_LABELS.LABEL_PROBLEMA}
            </Label>
            <textarea
              id={JUSTIFICATIVA_ID.ID_PROBLEMA}
              name={JUSTIFICATIVA_NOME.NOME_PROBLEMA}
              value={dadosFormulario.problema}
              onChange={aoAlterar}
              rows={5}
              placeholder={JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_PROBLEMA_PROPOSTA}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label
              htmlFor={JUSTIFICATIVA_ID.ID_RESULTADOS_ESPERADOS}
              className={styles.label}
            >
              {JUSTIFICATIVA_LABELS.LABEL_RESULTADOS_ESPERADOS}
            </Label>
            <textarea
              id={JUSTIFICATIVA_ID.ID_RESULTADOS_ESPERADOS}
              name={JUSTIFICATIVA_NOME.NOME_RESULTADOS_ESPERADOS}
              value={dadosFormulario.resultadosEsperados}
              onChange={aoAlterar}
              rows={4}
              placeholder={JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RESULTADOS_ESPERADOS}
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label
              htmlFor={JUSTIFICATIVA_ID.ID_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
              className={styles.label}
            >
              {JUSTIFICATIVA_LABELS.LABEL_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
            </Label>
            <textarea
              id={JUSTIFICATIVA_ID.ID_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
              name={JUSTIFICATIVA_NOME.NOME_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES}
              value={dadosFormulario.relacaoPrograma}
              onChange={aoAlterar}
              rows={5}
              placeholder={
                JUSTIFICATIVA_PLACEHOLDER.PLACE_HOLDER_RELACAO_PROPOSTA_OBJETIVOS_DIRETRIZES
              }
              className={styles.textarea}
            />
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
