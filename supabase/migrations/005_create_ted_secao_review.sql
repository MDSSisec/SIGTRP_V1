-- ============================================================
-- TED - Review / bloqueio de seções do formulário
-- Uma linha por (projeto, seção)
-- Gestor interno MDS / admin: bloqueia e marca atenção
-- ============================================================

create table if not exists "SIGTRP_TB_TED_SECAO_REVIEW" (
  id              uuid primary key default gen_random_uuid(),

  projeto_id      uuid not null
                    references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- slug da seção (ex.: identificacao-projeto, identificacao-proponente)
  secao_slug      text not null,

  bloqueada       boolean not null default false,

  -- ok | precisa_atencao
  status_revisao  text not null default 'ok'
                    check (status_revisao in ('ok', 'precisa_atencao')),

  comentario      text,

  atualizado_por  uuid,
  atualizado_em   timestamptz not null default now(),

  unique (projeto_id, secao_slug)
);

create index if not exists "idx_ted_secao_review_projeto"
  on "SIGTRP_TB_TED_SECAO_REVIEW" (projeto_id);

create index if not exists "idx_ted_secao_review_status"
  on "SIGTRP_TB_TED_SECAO_REVIEW" (projeto_id, status_revisao);

comment on table "SIGTRP_TB_TED_SECAO_REVIEW" is
  'Controle de bloqueio e revisão (atenção) por seção do formulário TED.';

comment on column "SIGTRP_TB_TED_SECAO_REVIEW".secao_slug is
  'Slug da seção (ex.: identificacao-projeto).';

comment on column "SIGTRP_TB_TED_SECAO_REVIEW".bloqueada is
  'Se true, usuários não gestores não podem editar a seção.';

comment on column "SIGTRP_TB_TED_SECAO_REVIEW".status_revisao is
  'ok = sem pendência; precisa_atencao = gestor pediu correção (aparece em vermelho).';

comment on column "SIGTRP_TB_TED_SECAO_REVIEW".comentario is
  'Orientação do gestor sobre o que precisa ser corrigido.';
