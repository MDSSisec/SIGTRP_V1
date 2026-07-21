-- ============================================================
-- Rename Session 01 identification table
-- SIGTRP_TB_TED_IDENTIFICACAO → SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO
-- ============================================================

alter table if exists "SIGTRP_TB_TED_IDENTIFICACAO"
  rename to "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO";

alter index if exists "idx_ted_identificacao_projeto"
  rename to "idx_project_session_01_identificacao_projeto";

alter index if exists "idx_ted_identificacao_municipio_ibge"
  rename to "idx_project_session_01_identificacao_municipio_ibge";

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'SIGTRP_TB_TED_IDENTIFICACAO_pkey'
  ) then
    alter table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO"
      rename constraint "SIGTRP_TB_TED_IDENTIFICACAO_pkey"
      to "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO_pkey";
  end if;

  if exists (
    select 1
    from pg_constraint
    where conname = 'SIGTRP_TB_TED_IDENTIFICACAO_projeto_id_key'
  ) then
    alter table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO"
      rename constraint "SIGTRP_TB_TED_IDENTIFICACAO_projeto_id_key"
      to "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO_projeto_id_key";
  end if;

  if exists (
    select 1
    from pg_constraint
    where conname = 'SIGTRP_TB_TED_IDENTIFICACAO_projeto_id_fkey'
  ) then
    alter table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO"
      rename constraint "SIGTRP_TB_TED_IDENTIFICACAO_projeto_id_fkey"
      to "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO_projeto_id_fkey";
  end if;
end $$;

comment on table "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO" is
  'Project session 01 (Identification) data. Optional fields for incremental saves.';
