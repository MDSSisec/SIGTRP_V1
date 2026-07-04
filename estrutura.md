# File Tree: sgi-essential

**Generated:** 7/3/2026, 8:53:22 PM
**Root Path:** `/Users/lucasfontoura/Documents/lucas/Projetos_React/sgi-essential`

```
├── app
│   ├── (authenticated)
│   │   ├── dashboard
│   │   │   ├── controle-instrumento-parceria
│   │   │   │   ├── instrumentos
│   │   │   │   │   └── [id]
│   │   │   │   │       └── editar
│   │   │   │   │           └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── documentos
│   │   │   │   ├── organograma-sisec
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── gerador-de-qr-code
│   │   │   │   └── page.tsx
│   │   │   ├── relatorio-equipe-ti
│   │   │   │   └── page.tsx
│   │   │   └── relatorio-semanal
│   │   │       ├── [id]
│   │   │       │   ├── preencher
│   │   │       │   │   └── [userEmail]
│   │   │       │   │       └── page.tsx
│   │   │       │   ├── visualizar
│   │   │       │   │   └── page.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   ├── ferias
│   │   │   └── page.tsx
│   │   ├── gerador-de-qr-code
│   │   ├── inicio
│   │   │   └── page.tsx
│   │   ├── sala-de-reuniao
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api
│   │   ├── [[...path]]
│   │   │   └── route.ts
│   │   └── documentos
│   │       └── arquivo
│   │           └── [nome]
│   │               └── route.ts
│   ├── dashboard
│   ├── relatorio_semanal
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── blocks
│   │   └── sidebar
│   │       ├── app-shell.tsx
│   │       ├── app-sidebar.tsx
│   │       ├── authenticated-app-shell.tsx
│   │       ├── index.ts
│   │       ├── nav-main.tsx
│   │       ├── nav-projects.tsx
│   │       ├── nav-user.tsx
│   │       ├── sidebar-brand.tsx
│   │       └── team-switcher.tsx
│   ├── map
│   │   ├── BrazilEntidadesMap.tsx
│   │   ├── BrazilUfDistributionMap.module.css
│   │   ├── BrazilUfDistributionMap.tsx
│   │   ├── brazilEntidadesMap.utils.ts
│   │   ├── constants.ts
│   │   ├── d3-geo.d.ts
│   │   ├── index.ts
│   │   └── react-simple-maps.d.ts
│   └── ui
│       ├── avatar.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart-line-dote-label.tsx
│       ├── chart.tsx
│       ├── collapsible.tsx
│       ├── comboBox.tsx
│       ├── confirmeModal.tsx
│       ├── dropdown-menu.tsx
│       ├── input-group.tsx
│       ├── input.tsx
│       ├── loading.tsx
│       ├── loadingMoreButton.tsx
│       ├── menuBar.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── successModal.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       ├── tooltip.tsx
│       └── total.tsx
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
│   ├── controle_instrumento_parceria
│   │   ├── components
│   │   │   ├── addContato
│   │   │   │   ├── AddContato.module.css
│   │   │   │   └── AddContato.tsx
│   │   │   ├── contagemDeUnidades
│   │   │   │   ├── ContagemDeUnidades.module.css
│   │   │   │   ├── ContagemDeUnidades.tsx
│   │   │   │   └── index.ts
│   │   │   ├── editarInstrumento
│   │   │   │   ├── EditarInstrumento.module.css
│   │   │   │   ├── EditarInstrumento.tsx
│   │   │   │   └── index.ts
│   │   │   ├── entidadeIndicadores
│   │   │   │   ├── EntidadeIndicadores.module.css
│   │   │   │   └── EntidadeIndicadores.tsx
│   │   │   ├── popUpNovaEntidade
│   │   │   │   ├── PopUpNovaEntidade.module.css
│   │   │   │   └── PopUpNovaEntidade.tsx
│   │   │   ├── popUpNovoInstrumento
│   │   │   │   ├── PopUpNovoInstrumento.module.css
│   │   │   │   └── PopUpNovoInstrumento.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   ├── ScreenControleDeInstrumentoDeParceria.ts
│   │   │   ├── addContato.ts
│   │   │   ├── contagemDeUnidades.ts
│   │   │   ├── contagemDeUnidadesEmpresasMeta.ts
│   │   │   ├── editarInstrumento.ts
│   │   │   ├── entidadeIndicadores.ts
│   │   │   ├── index.ts
│   │   │   ├── localidade.ts
│   │   │   ├── popUpNovaEntidade.ts
│   │   │   ├── popUpNovoInstrumento.ts
│   │   │   └── tipoEntidade.ts
│   │   ├── data
│   │   │   └── data.sql
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useEditarInstrumento.ts
│   │   │   ├── useEntidadeContatos.ts
│   │   │   ├── useEntidadeTipoOptions.ts
│   │   │   ├── useEntidades.ts
│   │   │   ├── useEntidadesFilters.ts
│   │   │   ├── useIbgeLocalidades.ts
│   │   │   ├── useInstrumentoParceriaOptions.ts
│   │   │   ├── useInstrumentos.ts
│   │   │   ├── useInstrumentosFilters.ts
│   │   │   ├── useNovaEntidadeForm.ts
│   │   │   └── useNovoInstrumentoForm.ts
│   │   ├── screens
│   │   │   ├── ControleDeInstrumentoDeParceria.module.css
│   │   │   ├── ControleDeInstrumentoDeParceria.tsx
│   │   │   ├── EditarInstrumentoScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── contagemDeUnidades.service.ts
│   │   │   ├── entidades.service.ts
│   │   │   ├── ibge.service.ts
│   │   │   ├── index.ts
│   │   │   └── instrumentoParceria.service.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── contagemDeUnidades.ts
│   │   │   ├── contato.ts
│   │   │   ├── editarInstrumento.ts
│   │   │   ├── entidade.ts
│   │   │   ├── index.ts
│   │   │   └── instrumento.ts
│   │   └── index.ts
│   ├── documentos
│   │   ├── components
│   │   │   ├── DocumentoAreaBadge.tsx
│   │   │   ├── DocumentoArquivoActions.tsx
│   │   │   ├── DocumentoCard.tsx
│   │   │   ├── DocumentoCategoriaBadge.tsx
│   │   │   ├── DocumentoDestaqueCard.tsx
│   │   │   ├── DocumentoFileIcon.tsx
│   │   │   ├── DocumentosDestaques.tsx
│   │   │   ├── DocumentosFilters.tsx
│   │   │   ├── DocumentosList.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── data
│   │   │   ├── documentos.json
│   │   │   └── organograma_sisec.pdf
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useDocumentosFilters.ts
│   │   ├── screens
│   │   │   ├── DocumentosScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── documentos.service.ts
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── ferias
│   │   ├── components
│   │   │   ├── popUpAgendarFerias
│   │   │   │   ├── PopUpAgendarFerias.styles.module.css
│   │   │   │   └── PopUpAgendarFerias.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useFerias.ts
│   │   │   ├── useFeriasActions.ts
│   │   │   └── useFeriasFilters.ts
│   │   ├── screens
│   │   │   ├── FeriasScreen.style.css
│   │   │   ├── FeriasScreens.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── ferias.service.ts
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── fluxogramas
│   │   ├── components
│   │   │   ├── OrganogramaEstatisticas.tsx
│   │   │   ├── OrganogramaFitView.tsx
│   │   │   ├── OrganogramaFlow.tsx
│   │   │   ├── OrganogramaLateralEdge.tsx
│   │   │   ├── OrganogramaLegenda.tsx
│   │   │   ├── OrganogramaNodeCard.tsx
│   │   │   ├── OrganogramaRamoEsquerdoEdge.tsx
│   │   │   ├── OrganogramaTroncoInferiorEdge.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── data
│   │   │   └── organograma-sisec.ts
│   │   ├── screens
│   │   │   ├── OrganogramaSisecScreen.tsx
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── organograma-cores.ts
│   │   │   ├── organograma-edges.ts
│   │   │   ├── organograma-layout.ts
│   │   │   ├── organograma-viewport.ts
│   │   │   └── organograma.ts
│   │   └── index.ts
│   ├── home
│   │   ├── components
│   │   │   ├── hero
│   │   │   │   ├── HomeHero.styles.css
│   │   │   │   └── HomeHero.tsx
│   │   │   ├── statusCard
│   │   │   │   ├── HomeStatusCard.styles.css
│   │   │   │   └── HomeStatusCard.tsx
│   │   │   ├── home-entry.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useHome.ts
│   │   ├── screens
│   │   │   ├── HomeScreen.styles.css
│   │   │   ├── HomeScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── home.service.ts
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── login
│   │   ├── components
│   │   │   ├── LoginCard.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useLogin.ts
│   │   ├── screens
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── login.service.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── qrcode
│   │   ├── components
│   │   │   ├── QrCodePreviewCard.tsx
│   │   │   ├── QrCodeSettingsCard.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   ├── QrCodeScreen.ts
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useGerarQrCode.ts
│   │   ├── screens
│   │   │   ├── GerarQrCodeScreen.style.css
│   │   │   ├── GerarQrCodeScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── qr-code.service.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── relatorio_equipe_ti
│   │   ├── components
│   │   │   ├── charts
│   │   │   │   ├── CategoriasDoughnutChart.tsx
│   │   │   │   ├── SetoresBarChart.tsx
│   │   │   │   ├── SetoresDoughnutChart.tsx
│   │   │   │   ├── StatusPieChart.tsx
│   │   │   │   └── chart-config.ts
│   │   │   ├── CategoriasRecorrentesTable.tsx
│   │   │   ├── RelatorioEquipeTiReport.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   └── index.ts
│   │   ├── screens
│   │   │   ├── RelatorioEquipeTiScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── relatorio_semanal
│   │   ├── components
│   │   │   ├── RelatorioSemanalTable.tsx
│   │   │   ├── UsuariosDaitTable.tsx
│   │   │   ├── index.ts
│   │   │   └── relatorio-semanal-access-gate.tsx
│   │   ├── constants
│   │   │   ├── conteudoConsolidado.ts
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   └── useRelatorioSemanal.ts
│   │   ├── screens
│   │   │   ├── RelatorioSemanalEditScreen.tsx
│   │   │   ├── RelatorioSemanalPreencherScreen.tsx
│   │   │   ├── RelatorioSemanalScreen.tsx
│   │   │   ├── RelatorioSemanalVisualizarScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── relatorioSemanal.service.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── index.ts
│   │   │   └── relatorioRoles.ts
│   │   ├── index.ts
│   │   └── permissions.ts
│   ├── reserva_sala_de_reuniao
│   │   ├── components
│   │   │   ├── calendar
│   │   │   │   ├── Calendar.styles.css
│   │   │   │   └── calendar.tsx
│   │   │   ├── popUpNovaReserva
│   │   │   │   ├── PopUpNovaReserva.styles.css
│   │   │   │   └── PopUpNovaReserva.tsx
│   │   │   ├── ReservaSalaReuniaoTable.tsx
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   ├── calendar.ts
│   │   │   ├── constScreenSalaReuniao.ts
│   │   │   ├── index.ts
│   │   │   ├── popUpCancelarReserva.ts
│   │   │   ├── popUpNovaReserva.ts
│   │   │   └── reservaScreen.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── useNovaReservaForm.ts
│   │   │   ├── useReservaActions.ts
│   │   │   ├── useReservaFilters.ts
│   │   │   ├── useReservas.ts
│   │   │   └── useSolicitantes.ts
│   │   ├── screens
│   │   │   ├── reserva-sala-reuniao
│   │   │   │   ├── ReservaSalaReuniao.styles.css
│   │   │   │   └── ReservaSalaReuniaoScreen.tsx
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   └── reservaSalaReuniao.service.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── index.ts
│   │   │   ├── reservaHelpers.ts
│   │   │   └── reservaStatus.ts
│   │   └── index.ts
│   └── welcome
│       ├── components
│       │   ├── welcomeCard
│       │   │   ├── WelcomeCard.module.css
│       │   │   └── WelcomeCard.tsx
│       │   ├── welcomeCardIcon
│       │   │   ├── WelcomeCardIcon.module.css
│       │   │   └── WelcomeCardIcon.tsx
│       │   ├── welcomeCardLink
│       │   │   ├── WelcomeCardLink.module.css
│       │   │   └── WelcomeCardLink.tsx
│       │   ├── welcomeChart
│       │   │   ├── WelcomeChart.module.css
│       │   │   └── WelcomeChart.tsx
│       │   ├── welcomeItems
│       │   │   ├── WelcomeItems.module.css
│       │   │   └── WelcomeItems.tsx
│       │   ├── welcomeMetrics
│       │   │   ├── WelcomeMetrics.module.css
│       │   │   └── WelcomeMetrics.tsx
│       │   └── index.ts
│       ├── constants
│       │   └── index.ts
│       ├── hooks
│       │   ├── index.ts
│       │   └── useWelcomeMetrics.ts
│       ├── screens
│       │   ├── WelcomeScreen.module.css
│       │   ├── WelcomeScreen.tsx
│       │   └── index.ts
│       ├── services
│       │   ├── index.ts
│       │   └── welcome.service.ts
│       ├── types
│       │   └── index.ts
│       └── index.ts
├── hooks
│   └── use-mobile.ts
├── lib
│   ├── api-route-error.ts
│   ├── parse-api-response.ts
│   └── utils.ts
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── server
│   ├── _template
│   │   └── index.ts
│   ├── auth
│   │   ├── auth.service.ts
│   │   ├── auth.types.ts
│   │   ├── dait-users.ts
│   │   ├── index.ts
│   │   ├── profiles.ts
│   │   ├── roles.ts
│   │   ├── session-token.ts
│   │   ├── session.ts
│   │   ├── supabase.ts
│   │   └── users.ts
│   ├── controle-instrumento-parceria
│   │   ├── diretorio-brasil.ts
│   │   ├── store.ts
│   │   └── supabase.ts
│   ├── documentos
│   │   ├── mime.ts
│   │   └── store.ts
│   ├── ferias
│   │   ├── store.ts
│   │   └── supabase.ts
│   ├── health
│   │   ├── health.service.ts
│   │   ├── health.types.ts
│   │   └── index.ts
│   ├── lib
│   │   ├── http.ts
│   │   └── supabase.ts
│   ├── relatorio-semanal
│   │   ├── data
│   │   ├── access.ts
│   │   ├── store.ts
│   │   ├── supabase.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── reserva-sala-reuniao
│   │   ├── store.ts
│   │   └── supabase.ts
│   ├── welcome
│   │   └── metrics.ts
│   └── index.ts
├── .gitignore
├── .npmrc
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---
*Generated by FileTree Pro Extension*