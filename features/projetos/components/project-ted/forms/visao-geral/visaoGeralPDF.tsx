// visaoGeralPDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

import type { StatusProjeto } from "@/features/projetos/constants/ted/project"

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 24,
    borderBottom: "2px solid #2563eb",
    paddingBottom: 12,
  },
  documentTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  projectName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    gap: 4,
  },
  metaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 9,
    color: "#374151",
  },
  statusBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 9,
    color: "#1e40af",
    fontFamily: "Helvetica-Bold",
  },
  sectionContainer: {
    marginBottom: 16,
    borderLeft: "3px solid #2563eb",
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  sectionPlaceholder: {
    fontSize: 9,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
  pageNumber: {
    fontSize: 8,
    color: "#9ca3af",
  },
})

interface VisaoGeralPDFProps {
  projectId: string
  nome: string
  responsavel: string
  status: StatusProjeto | string
  tipo: string
  secoes: { slug: string; title: string }[]
}

export function VisaoGeralPDF({
  projectId,
  nome,
  responsavel,
  status,
  tipo,
  secoes,
}: VisaoGeralPDFProps) {
  const dataGeracao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <Document
      title={`TRP - ${nome}`}
      author="Sistema SISEC"
      subject="Visão Geral do Projeto"
    >
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.documentTitle}>
            Termo de Repasse de Parceria — TRP
          </Text>
          <Text style={styles.projectName}>{nome}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>ID: </Text>
              <Text style={styles.metaValue}>#{projectId}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Tipo: </Text>
              <Text style={styles.metaValue}>{tipo}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Responsável: </Text>
              <Text style={styles.metaValue}>{responsavel}</Text>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        {/* Seções */}
        {secoes.map(({ slug, title }) => (
          <View key={slug} style={styles.sectionContainer} wrap={false}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionPlaceholder}>
              Consulte o sistema para visualizar os dados completos desta seção.
            </Text>
          </View>
        ))}

        {/* Rodapé */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Gerado em {dataGeracao} — Sistema SISEC
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}