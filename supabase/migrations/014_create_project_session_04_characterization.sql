-- ============================================================
-- Project Session 04: Characterization (Caracterização)
-- One row per project (1:1 with SIGTRP_TB_PROJECTS)
-- Run in the Supabase SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Characterization of the proponent (session 04)
-- Subforms (incremental):
--   18. Other appropriate information about the proponent
--
-- All form fields are optional (nullable) to allow
-- partial/incremental saves by the user.
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION" (
  id                          uuid primary key default gen_random_uuid(),

  projeto_id                  uuid not null unique
                                references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- 18) Outras informações julgadas apropriadas sobre o(a) proponente
  outras_informacoes_texto    text,

  criado_em                   timestamptz not null default now(),
  atualizado_em               timestamptz not null default now()
);

create index if not exists "idx_project_session_04_characterization_projeto"
  on "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION" (projeto_id);

comment on table "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION" is
  'Project session 04 (Characterization) data. Optional fields for incremental saves.';

comment on column "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION".projeto_id is
  'Reference to SIGTRP_TB_PROJECTS (1:1).';

comment on column "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION".outras_informacoes_texto is
  'Item 18 — Other appropriate information about the proponent (max 2000 chars in app).';
