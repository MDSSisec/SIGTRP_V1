-- ============================================================
-- Etapas (status) do projeto - catálogo + histórico
-- Rodar no SQL Editor do Supabase
-- ============================================================

-- Necessário para gen_random_uuid() (já habilitado por padrão no Supabase)
create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1) Catálogo de etapas do projeto
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_STAGES" (
  id            uuid primary key default gen_random_uuid(),
  ordem         smallint    not null unique,
  nome          text        not null unique,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Seed das 10 etapas na ordem do StatusStepper
insert into "SIGTRP_TB_PROJECT_STAGES" (ordem, nome) values
  (1,  'TRP em Elaboração'),
  (2,  'TRP Submetido à SISEC'),
  (3,  'TRP Aprovado'),
  (4,  'Instrumento Celebrado'),
  (5,  'Projeto em Execução'),
  (6,  'Projeto Concluído'),
  (7,  'Prestação de Contas em Análise'),
  (8,  'Prestação de Contas Aprovada'),
  (9,  'Prestação de Contas com Glosa'),
  (10, 'Projeto Encerrado')
on conflict (nome) do nothing;

-- ------------------------------------------------------------
-- 2) Etapa atual de cada projeto (coluna FK em PROJECTS)
--    Novos projetos começam em "TRP em Elaboração".
-- ------------------------------------------------------------
alter table "SIGTRP_TB_PROJECTS"
  add column if not exists etapa_id uuid
    references "SIGTRP_TB_PROJECT_STAGES" (id);

-- Define a etapa inicial para projetos que ainda não têm etapa
update "SIGTRP_TB_PROJECTS" p
set etapa_id = s.id
from "SIGTRP_TB_PROJECT_STAGES" s
where s.ordem = 1
  and p.etapa_id is null;

-- ------------------------------------------------------------
-- 3) Histórico de mudanças de etapa (linha do tempo)
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_STAGE_HISTORY" (
  id            uuid primary key default gen_random_uuid(),
  projeto_id    uuid        not null
                  references "SIGTRP_TB_PROJECTS" (id) on delete cascade,
  etapa_id      uuid        not null
                  references "SIGTRP_TB_PROJECT_STAGES" (id),
  observacao    text,
  alterado_por_id uuid      references "SIGTRP_TB_USERS" (id),
  criado_em     timestamptz not null default now()
);

create index if not exists "idx_project_stage_history_projeto"
  on "SIGTRP_TB_PROJECT_STAGE_HISTORY" (projeto_id);

create index if not exists "idx_project_stage_history_etapa"
  on "SIGTRP_TB_PROJECT_STAGE_HISTORY" (etapa_id);
