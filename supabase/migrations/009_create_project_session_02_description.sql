-- ============================================================
-- Project Session 02: Description
-- One row per project (1:1 with SIGTRP_TB_PROJECTS)
-- Run in the Supabase SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Project description (session 02)
-- Subforms (incremental):
--   5. Justification and Motivation for Instrument Celebration
--   9. Methodology
--   (other items will be added in future migrations)
--
-- All form fields are optional (nullable) to allow
-- partial/incremental saves by the user.
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION" (
  id                                          uuid primary key default gen_random_uuid(),

  projeto_id                                  uuid not null unique
                                                references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- 5) Justification and Motivation for Instrument Celebration
  justificativa_caracterizacao_interesses     text,
  justificativa_publico_alvo                  text,
  justificativa_problema                      text,
  justificativa_resultados_esperados          text,
  justificativa_relacao_programa              text,

  -- 9) Methodology
  metodologia_meta                            text,
  metodologia_etapa_1_1                       text,
  metodologia_etapa_1_2                       text,
  metodologia_etapa_1_3                       text,
  metodologia_etapa_1_4                       text,

  criado_em                                   timestamptz not null default now(),
  atualizado_em                               timestamptz not null default now()
);

create index if not exists "idx_project_session_02_description_projeto"
  on "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION" (projeto_id);

comment on table "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION" is
  'Project session 02 (Description) data. Optional fields for incremental saves.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".projeto_id is
  'Reference to SIGTRP_TB_PROJECTS (1:1).';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".justificativa_caracterizacao_interesses is
  'Item 5 — Characterization of reciprocal interests.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".justificativa_publico_alvo is
  'Item 5 — Target audience.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".justificativa_problema is
  'Item 5 — Problem to be solved.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".justificativa_resultados_esperados is
  'Item 5 — Expected results (justification).';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".justificativa_relacao_programa is
  'Item 5 — Relation of the proposal to the program.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".metodologia_meta is
  'Item 9 — Methodology description for Meta 1.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".metodologia_etapa_1_1 is
  'Item 9 — Methodology for stage 1.1.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".metodologia_etapa_1_2 is
  'Item 9 — Methodology for stage 1.2.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".metodologia_etapa_1_3 is
  'Item 9 — Methodology for stage 1.3.';

comment on column "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION".metodologia_etapa_1_4 is
  'Item 9 — Methodology for stage 1.4.';
