-- ============================================================
-- Ajusta proponente_registro_cnpj para date (data do registro CNPJ)
-- ============================================================

alter table "SIGTRP_TB_TED_IDENTIFICACAO"
  alter column proponente_registro_cnpj type date
  using null;

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".proponente_registro_cnpj is
  'Data do registro do CNPJ da entidade proponente.';
