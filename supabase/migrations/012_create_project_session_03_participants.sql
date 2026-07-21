-- ============================================================
-- Project Session 03: Participants
-- One row per project (1:1 with SIGTRP_TB_PROJECTS)
-- Run in the Supabase SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Participants and project coverage (session 03)
-- Subforms (incremental):
--   12. Territory history and socioeconomic situation
--   13. Territorial base detail
--   14. Project beneficiary public
--   15. Traditional peoples or communities
--   16. Socio-occupational profile
--   17. Services accessed by the beneficiary public
--
-- All form fields are optional (nullable) to allow
-- partial/incremental saves by the user.
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (
  id                                          uuid primary key default gen_random_uuid(),

  projeto_id                                  uuid not null unique
                                                references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- 12) Histórico e situação socioeconômica do território
  historico_situacao_texto                    text,

  -- 13) Detalhamento da base territorial
  -- shape: [{ "territorio": string, "municipio": string }, ...]
  base_territorial_linhas                     jsonb,

  -- 14) Público beneficiário (apenas diretos; indiretos = ×3 na app)
  publico_homens_diretos                      integer,
  publico_mulheres_diretos                    integer,

  -- 15) Povos ou comunidades tradicionais
  -- shape: string[] (option ids)
  povos_selecoes                              jsonb,
  povos_outros_especificar                    text,

  -- 16) Perfil sócio-ocupacional
  -- shape: string[] (option ids)
  perfil_selecoes                             jsonb,
  perfil_outros_especificar                   text,

  -- 17) Serviços acessados
  -- shape: string[] (option ids)
  servicos_selecoes                           jsonb,
  servicos_outros_especificar                 text,

  criado_em                                   timestamptz not null default now(),
  atualizado_em                               timestamptz not null default now()
);

create index if not exists "idx_project_session_03_participants_projeto"
  on "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" (projeto_id);

comment on table "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS" is
  'Project session 03 (Participants) data. Optional fields for incremental saves.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".projeto_id is
  'Reference to SIGTRP_TB_PROJECTS (1:1).';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".historico_situacao_texto is
  'Item 12 — Territory history and socioeconomic situation text.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".base_territorial_linhas is
  'Item 13 — Territorial base rows as JSON array [{territorio, municipio}].';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".publico_homens_diretos is
  'Item 14 — Direct male beneficiaries count.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".publico_mulheres_diretos is
  'Item 14 — Direct female beneficiaries count.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".povos_selecoes is
  'Item 15 — Selected traditional peoples/communities option ids (JSON array).';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".povos_outros_especificar is
  'Item 15 — Free text when "Outros" is selected.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".perfil_selecoes is
  'Item 16 — Selected socio-occupational profile option ids (JSON array).';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".perfil_outros_especificar is
  'Item 16 — Free text when "Outros" is selected.';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".servicos_selecoes is
  'Item 17 — Selected services option ids (JSON array).';

comment on column "SIGTRP_TB_PROJECT_SESSION_03_PARTICIPANTS".servicos_outros_especificar is
  'Item 17 — Free text when "Outros" is selected.';
