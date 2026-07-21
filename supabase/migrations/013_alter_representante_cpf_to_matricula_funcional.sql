-- ============================================================
-- Representante legal: CPF → Matrícula Funcional
-- Tabela: SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO
-- ============================================================

alter table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO"
  drop column if exists representante_cpf;

alter table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO"
  add column if not exists representante_matricula_funcional text;

comment on column "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO".representante_matricula_funcional is
  'Matrícula funcional do representante legal (7 dígitos).';
