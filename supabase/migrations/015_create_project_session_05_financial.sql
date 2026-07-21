-- ============================================================
-- Project Session 05: Financial data (partial — items 19, 20, 22)
-- One row per project (1:1 with SIGTRP_TB_PROJECTS)
-- Run in the Supabase SQL Editor
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Financial session 05 (incremental saves)
--   19. Valor total do projeto
--   20. Cronograma de desembolso
--   22. Resumo do plano de aplicação
-- (Item 21 — detalhamento do orçamento — not in this migration)
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" (
  id                                    uuid primary key default gen_random_uuid(),

  projeto_id                            uuid not null unique
                                          references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- 19) Valor total do projeto (R$)
  valor_repasse_mds_custeio             numeric(15, 2),
  valor_repasse_mds_investimento        numeric(15, 2),
  valor_contrapartida_custeio           numeric(15, 2),
  valor_contrapartida_investimento      numeric(15, 2),

  -- 20) Cronograma de desembolso
  -- shape: [{ "mes_ano": string, "mds": number|null, "contrapartida": number|null }, ...]
  cronograma_desembolso_parcelas        jsonb,

  -- 22) Resumo do plano de aplicação
  -- shape: [{ "elemento_despesa", "codigo", "mds", "contrapartida" }, ...]
  resumo_plano_aplicacao_linhas         jsonb,

  criado_em                             timestamptz not null default now(),
  atualizado_em                         timestamptz not null default now()
);

create index if not exists "idx_project_session_05_financial_projeto"
  on "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" (projeto_id);

comment on table "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" is
  'Project session 05 (Financial). Partial: valor total, cronograma, resumo plano.';

comment on column "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL".valor_repasse_mds_custeio is
  'Item 19 — MDS custeio (R$).';

comment on column "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL".cronograma_desembolso_parcelas is
  'Item 20 — Disbursement schedule parcels (JSON array).';

comment on column "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL".resumo_plano_aplicacao_linhas is
  'Item 22 — Application plan summary lines (JSON array).';
