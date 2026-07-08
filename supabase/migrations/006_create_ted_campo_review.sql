-- ============================================================
-- TED - Marcação de atenção por campo (inputs em vermelho)
-- ============================================================

create table if not exists "SIGTRP_TB_TED_CAMPO_REVIEW" (
  id              uuid primary key default gen_random_uuid(),

  projeto_id      uuid not null
                    references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  secao_slug      text not null,
  campo_key       text not null,

  precisa_atencao boolean not null default true,
  comentario      text,

  atualizado_por  uuid,
  atualizado_em   timestamptz not null default now(),

  unique (projeto_id, secao_slug, campo_key)
);

create index if not exists "idx_ted_campo_review_projeto_secao"
  on "SIGTRP_TB_TED_CAMPO_REVIEW" (projeto_id, secao_slug);

comment on table "SIGTRP_TB_TED_CAMPO_REVIEW" is
  'Campos marcados pelo gestor como precisando de atenção (borda vermelha no formulário).';

comment on column "SIGTRP_TB_TED_CAMPO_REVIEW".campo_key is
  'Chave do campo no formulário (ex.: localExecucao, proponenteCnpj).';
