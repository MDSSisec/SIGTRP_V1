-- ============================================================
-- Representante legal: troca matricula SIAPE por CPF
-- ============================================================

alter table "SIGTRP_TB_TED_IDENTIFICACAO"
  drop column if exists representante_matricula_siape;

alter table "SIGTRP_TB_TED_IDENTIFICACAO"
  add column if not exists representante_cpf numeric(11, 0);

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".representante_cpf is
  'CPF do representante legal (apenas dígitos, 11 posições).';
