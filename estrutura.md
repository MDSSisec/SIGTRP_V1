# File Tree: SIGTRP_V1

**Generated:** 7/14/2026, 10:31:52 AM
**Root Path:** `c:\Users\lucas.fontes\Documents\Lucas_Fontoura\03_desenvolvimento\SIGTRP_V1`

```
├── app
│   ├── (authenticated)
│   │   ├── administracao
│   │   │   ├── permissoes
│   │   │   │   └── page.tsx
│   │   │   ├── profiles
│   │   │   │   └── page.tsx
│   │   │   ├── roles
│   │   │   │   └── page.tsx
│   │   │   ├── status
│   │   │   │   └── page.tsx
│   │   │   ├── tipos
│   │   │   ├── usuarios
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── configuracoes
│   │   │   └── page.tsx
│   │   ├── inicio
│   │   │   └── page.tsx
│   │   ├── projetos
│   │   │   ├── [id]
│   │   │   │   └── ted
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api
│   │   └── [[...path]]
│   │       └── route.ts
│   ├── login
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ChartBarInteractive
│   │   ├── chart-bar-interactive.tsx
│   │   └── index.ts
│   ├── StatusStepper
│   │   ├── statusStepper.module.css
│   │   └── statusStepper.tsx
│   ├── blocks
│   │   └── sidebar
│   │       ├── app-page-header.tsx
│   │       ├── app-shell.tsx
│   │       ├── app-sidebar.tsx
│   │       ├── authenticated-app-shell.tsx
│   │       ├── index.ts
│   │       ├── nav-main.tsx
│   │       ├── nav-projects.tsx
│   │       ├── nav-user.tsx
│   │       ├── page-header-action.tsx
│   │       ├── sidebar-brand.tsx
│   │       └── sidebar-nav-rules.ts
│   ├── map
│   │   ├── BrazilEntidadesMap.tsx
│   │   ├── BrazilUfDistributionMap.module.css
│   │   ├── BrazilUfDistributionMap.tsx
│   │   ├── BrazilUfMap.tsx
│   │   ├── brazil-ufs.ts
│   │   ├── brazilEntidadesMap.utils.ts
│   │   ├── constants.ts
│   │   ├── d3-geo.d.ts
│   │   ├── index.ts
│   │   └── react-simple-maps.d.ts
│   ├── ui
│   │   ├── async-load-state.tsx
│   │   ├── avatar.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart-line-dote-label.tsx
│   │   ├── chart.tsx
│   │   ├── collapsible.tsx
│   │   ├── comboBox.tsx
│   │   ├── confirmeModal.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input-group.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── loading.tsx
│   │   ├── loadingMoreButton.tsx
│   │   ├── menuBar.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── spinner.tsx
│   │   ├── successModal.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── tooltip.tsx
│   │   └── total.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── features
│   ├── _template
│   │   ├── components
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   └── index.ts
│   │   ├── services
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── admin
│   │   ├── components
│   │   │   ├── popUpNewProfile
│   │   │   │   ├── PopUpNewProfile.styles.module.css
│   │   │   │   ├── PopUpNewProfile.tsx
│   │   │   │   └── index.ts
│   │   │   ├── popUpNewRole
│   │   │   ├── popUpNewStatus
│   │   │   ├── popUpNewUser
│   │   │   │   ├── PopUpNewUser.styles.module.css
│   │   │   │   ├── PopUpNewUser.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   ├── index.ts
│   │   │   ├── mock-admin-entities.ts
│   │   │   ├── profile.ts
│   │   │   ├── roles.ts
│   │   │   ├── status.ts
│   │   │   └── users.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   ├── profiles
│   │   │   │   ├── admin-profiles-screen.module.css
│   │   │   │   └── admin-profiles-screen.tsx
│   │   │   ├── roles
│   │   │   │   ├── admin-roles-screen.module.css
│   │   │   │   └── admin-roles-screen.tsx
│   │   │   ├── status
│   │   │   │   ├── admin-status-screen.module.css
│   │   │   │   └── admin-status-screen.tsx
│   │   │   ├── users
│   │   │   │   ├── admin-users-screen.module.css
│   │   │   │   └── admin-users-screen.tsx
│   │   │   └── index.ts
│   │   ├── server
│   │   │   ├── index.ts
│   │   │   ├── profiles.repository.ts
│   │   │   ├── roles.repository.ts
│   │   │   └── usuarios.repository.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   ├── profiles.service.ts
│   │   │   ├── roles.service.ts
│   │   │   └── usuarios.service.ts
│   │   ├── types
│   │   │   ├── admin-entity.ts
│   │   │   ├── index.ts
│   │   │   ├── profile.ts
│   │   │   ├── role.ts
│   │   │   └── usuario.ts
│   │   ├── utils
│   │   │   ├── admin-entity-filter.ts
│   │   │   ├── profile-filter.ts
│   │   │   ├── role-filter.ts
│   │   │   └── usuario-filter.ts
│   │   └── index.ts
│   ├── configuracoes
│   │   ├── constants
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── dashboard
│   │   ├── components
│   │   │   ├── dashboard-totals.tsx
│   │   │   ├── dashboard-uf-section.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   ├── dashboard-uf-data.ts
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   ├── dashboard-screen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── footer
│   │   ├── components
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   └── index.ts
│   │   ├── services
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── login
│   │   ├── components
│   │   │   ├── index.ts
│   │   │   └── login-form.tsx
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   └── index.ts
│   │   ├── server
│   │   │   ├── auth.service.ts
│   │   │   ├── index.ts
│   │   │   ├── session.ts
│   │   │   └── users.repository.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── login.service.ts
│   │   ├── types
│   │   │   ├── index.ts
│   │   │   └── public-user.ts
│   │   └── index.ts
│   ├── projetos
│   │   ├── components
│   │   │   ├── generalProjectData
│   │   │   │   ├── secao-01-dados-gerais-projeto
│   │   │   │   │   ├── dadosGeraisDoprojeto.module.css
│   │   │   │   │   ├── dadosGeraisDoprojeto.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── secao-02-detalhamento-dos-cursos
│   │   │   │   │   ├── detalhamentoDosCursos.module.css
│   │   │   │   │   ├── detalhamentoDosCursos.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── secao-03-etapa-evento-1-1
│   │   │   │   ├── secao-04-etapa-evento-1-2
│   │   │   │   ├── secap-05-evento-final
│   │   │   │   ├── shared
│   │   │   │   │   ├── CursoDetalhamentoForm
│   │   │   │   │   │   ├── CursoDetalhamentoForm.module.css
│   │   │   │   │   │   ├── CursoDetalhamentoForm.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── DetalhamentoGastosCurso
│   │   │   │   │       ├── DetalhamentoGastosCurso.module.css
│   │   │   │   │       ├── DetalhamentoGastosCurso.tsx
│   │   │   │   │       └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── screens.tsx
│   │   │   │   └── types.ts
│   │   │   ├── popUpNewProject
│   │   │   │   ├── index.ts
│   │   │   │   ├── popUpNewProject.module.css
│   │   │   │   └── popUpNewProject.tsx
│   │   │   ├── project-ted
│   │   │   │   ├── edit
│   │   │   │   │   ├── ProjectTEDEdit.module.css
│   │   │   │   │   └── ProjectTEDEdit.tsx
│   │   │   │   ├── forms
│   │   │   │   │   ├── andamentoDoProjeto
│   │   │   │   │   │   ├── andamentoDoProjeto.module.css
│   │   │   │   │   │   └── andamentoDoProjeto.tsx
│   │   │   │   │   ├── informacoesDoProjeto
│   │   │   │   │   │   ├── informacoesDoProjeto.module.css
│   │   │   │   │   │   └── informacoesDoProjeto.tsx
│   │   │   │   │   ├── observacoes
│   │   │   │   │   │   └── Observacoes.tsx
│   │   │   │   │   ├── secao-1-identificacao
│   │   │   │   │   │   ├── IdentificacaoResponsavelTecnico
│   │   │   │   │   │   │   ├── IdentificacaoResponsavelTecnico.module.css
│   │   │   │   │   │   │   └── IdentificacaoResponsavelTecnico.tsx
│   │   │   │   │   │   ├── identificacaoDoProjeto
│   │   │   │   │   │   │   ├── IdentificacaoProjeto.module.css
│   │   │   │   │   │   │   └── IdentificacaoProjeto.tsx
│   │   │   │   │   │   ├── identificacaoProponente
│   │   │   │   │   │   │   ├── IdentificacaoProponente.module.css
│   │   │   │   │   │   │   └── IdentificacaoProponente.tsx
│   │   │   │   │   │   └── identificacaoRepresentanteLegal
│   │   │   │   │   │       ├── IdentificacaoRepresentanteLegal.module.css
│   │   │   │   │   │       └── IdentificacaoRepresentanteLegal.tsx
│   │   │   │   │   ├── secao-2-descricao
│   │   │   │   │   │   ├── CronogramaContext
│   │   │   │   │   │   │   └── CronogramaContext.tsx
│   │   │   │   │   │   ├── GestaoProjeto
│   │   │   │   │   │   │   └── GestaoProjeto.tsx
│   │   │   │   │   │   ├── Justificativa
│   │   │   │   │   │   │   ├── Justificativa.module.css
│   │   │   │   │   │   │   └── Justificativa.tsx
│   │   │   │   │   │   ├── Metas
│   │   │   │   │   │   │   ├── Metas.module.css
│   │   │   │   │   │   │   └── Metas.tsx
│   │   │   │   │   │   ├── Metodologia
│   │   │   │   │   │   │   ├── Metodologia.module.css
│   │   │   │   │   │   │   └── Metodologia.tsx
│   │   │   │   │   │   ├── Objetivos
│   │   │   │   │   │   │   ├── Objetivos.module.css
│   │   │   │   │   │   │   └── Objetivos.tsx
│   │   │   │   │   │   ├── Resultados
│   │   │   │   │   │   │   └── ResultadosEsperados.tsx
│   │   │   │   │   │   └── etapas-cronograma
│   │   │   │   │   │       ├── EtapaItem.tsx
│   │   │   │   │   │       ├── MetaCronogramaCard.tsx
│   │   │   │   │   │       ├── etapas-cronograma.module.css
│   │   │   │   │   │       ├── index.tsx
│   │   │   │   │   │       └── types.ts
│   │   │   │   │   ├── secao-3-participantes
│   │   │   │   │   │   ├── BaseTerritorial.tsx
│   │   │   │   │   │   ├── HistoricoSituacaoTerritorio.tsx
│   │   │   │   │   │   ├── PerfilSocioOcupacional.tsx
│   │   │   │   │   │   ├── PovosComunidadesTradicionais.tsx
│   │   │   │   │   │   ├── PublicoBeneficiario.tsx
│   │   │   │   │   │   └── ServicosAcessados.tsx
│   │   │   │   │   ├── secao-4-caracterizacao
│   │   │   │   │   │   └── OutrasInformacoesProponente.tsx
│   │   │   │   │   ├── secao-5-planilhas
│   │   │   │   │   │   ├── CronogramaDesembolso.tsx
│   │   │   │   │   │   ├── DetalhamentoOrcamento.tsx
│   │   │   │   │   │   ├── ResumoPlanoAplicacao.tsx
│   │   │   │   │   │   └── ValorTotal.tsx
│   │   │   │   │   ├── secao-6-monitoramento
│   │   │   │   │   │   ├── IndicadoresEficiencia.tsx
│   │   │   │   │   │   └── ProcedimentosMonitoramento.tsx
│   │   │   │   │   ├── visao-geral
│   │   │   │   │   │   ├── export-visao-geral-pdf.ts
│   │   │   │   │   │   ├── visaoGeralDoProjeto.module.css
│   │   │   │   │   │   └── visaoGeralDoProjeto.tsx
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── sections-map.tsx
│   │   │   │   ├── shared
│   │   │   │   │   ├── data-table.module.css
│   │   │   │   │   ├── data-table.tsx
│   │   │   │   │   ├── form-fields.ts
│   │   │   │   │   ├── form-layout.module.css
│   │   │   │   │   ├── form-save-toast.ts
│   │   │   │   │   ├── form-section.tsx
│   │   │   │   │   ├── generic-button.tsx
│   │   │   │   │   ├── secao-review-actions.tsx
│   │   │   │   │   ├── status-stepper.tsx
│   │   │   │   │   └── ted-form-placeholder.tsx
│   │   │   │   └── index.ts
│   │   │   ├── statusBadge
│   │   │   │   ├── status-badge.module.css
│   │   │   │   └── status-badge.tsx
│   │   │   ├── index.ts
│   │   │   └── projetos-table.tsx
│   │   ├── constants
│   │   │   ├── ted
│   │   │   │   ├── catalogo-despesas-curso.ts
│   │   │   │   ├── communs.ts
│   │   │   │   ├── identificacao-projeto.ts
│   │   │   │   ├── identificacao-proponente.ts
│   │   │   │   ├── identificacao-representante-legal.ts
│   │   │   │   ├── identificacao-responsavel-tecnico.ts
│   │   │   │   ├── justificativa.ts
│   │   │   │   ├── metas.ts
│   │   │   │   ├── metodologia.ts
│   │   │   │   ├── project.ts
│   │   │   │   ├── sidebar-menu.ts
│   │   │   │   └── visao-geral.ts
│   │   │   ├── index.ts
│   │   │   ├── project-types.ts
│   │   │   └── project.ts
│   │   ├── contexts
│   │   │   ├── breadcrumb-context.tsx
│   │   │   ├── project-data-context.tsx
│   │   │   └── ted-review-context.tsx
│   │   ├── hooks
│   │   │   └── use-ted-secao-reviews.ts
│   │   ├── model
│   │   │   └── ted
│   │   ├── screens
│   │   │   ├── index.ts
│   │   │   ├── project-ted-edit-screen.tsx
│   │   │   └── projetos-screen.tsx
│   │   ├── server
│   │   │   ├── index.ts
│   │   │   ├── project-stages.repository.ts
│   │   │   ├── projects.repository.ts
│   │   │   ├── responsaveis.repository.ts
│   │   │   ├── ted-campo-review.repository.ts
│   │   │   ├── ted-identificacao.repository.ts
│   │   │   └── ted-secao-review.repository.ts
│   │   ├── services
│   │   │   ├── ibge.service.ts
│   │   │   ├── index.ts
│   │   │   ├── project-ted.service.ts
│   │   │   ├── projetos.service.ts
│   │   │   ├── sidebar.service.ts
│   │   │   ├── ted-identificacao.service.ts
│   │   │   └── ted-secao-review.service.ts
│   │   ├── types
│   │   │   ├── index.ts
│   │   │   ├── projeto.ts
│   │   │   ├── ted-campo-review.ts
│   │   │   ├── ted-identificacao.ts
│   │   │   ├── ted-secao-review.ts
│   │   │   └── ted.ts
│   │   ├── utils
│   │   │   ├── currency.ts
│   │   │   ├── projeto-routes.ts
│   │   │   ├── projetos-permissions.ts
│   │   │   ├── ted-model.ts
│   │   │   └── ted-preenchimento.ts
│   │   └── index.ts
│   └── welcome
│       ├── components
│       │   ├── index.ts
│       │   └── welcome-hero.tsx
│       ├── constants
│       │   └── index.ts
│       ├── hooks
│       │   └── index.ts
│       ├── screens
│       │   ├── index.ts
│       │   └── welcome-screen.tsx
│       ├── services
│       │   └── index.ts
│       ├── types
│       │   └── index.ts
│       └── index.ts
├── hooks
│   ├── index.ts
│   ├── use-async-data.ts
│   └── use-mobile.ts
├── lib
│   ├── api.ts
│   ├── db.ts
│   ├── parse-api-response.ts
│   └── utils.ts
├── supabase
│   └── migrations
│       ├── 001_create_project_stages.sql
│       ├── 002_create_ted_identificacao.sql
│       ├── 003_alter_proponente_registro_cnpj_to_date.sql
│       ├── 004_alter_representante_matricula_to_cpf.sql
│       ├── 005_create_ted_secao_review.sql
│       ├── 006_create_ted_campo_review.sql
│       └── 007_drop_projects_valor_total.sql
├── .gitignore
├── .npmrc
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── components.json
├── eslint.config.mjs
├── estrutura.md
├── form_manoel.html
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---
*Generated by FileTree Pro Extension*