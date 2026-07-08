-- ============================================================
-- TED - Seção 1: Identificação
-- Uma linha por projeto (1:1 com SIGTRP_TB_PROJECTS)
-- Rodar no SQL Editor do Supabase
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Identificação do projeto TED (seção 1 completa)
-- Subformulários:
--   1. Identificação do Projeto
--   2. Identificação do(a) Proponente
--   3. Identificação do Representante Legal
--   4. Identificação do Responsável Técnico
--
-- Campos numéricos armazenam apenas dígitos (sem máscara).
-- CNPJ/CEP usam numeric para preservar zeros à esquerda.
-- Todos os campos do formulário são opcionais (nullable) para
-- permitir salvamento parcial/incremental pelo usuário.
-- ------------------------------------------------------------
create table if not exists "SIGTRP_TB_TED_IDENTIFICACAO" (
  id                              uuid primary key default gen_random_uuid(),

  projeto_id                      uuid not null unique
                                    references "SIGTRP_TB_PROJECTS" (id) on delete cascade,

  -- 1) Identificação do Projeto
  nome_projeto                    text,
  local_execucao                  text,
  duracao                         text,
  resumo_projeto                  text,

  -- 2) Identificação do(a) Proponente
  proponente_nome                 text,
  proponente_cnpj                 numeric(14, 0),
  proponente_data_fundacao        date,
  proponente_registro_cnpj        date,
  proponente_endereco             text,
  proponente_bairro               text,
  proponente_uf_ibge              smallint,
  proponente_municipio_ibge       integer,
  proponente_cep                  numeric(8, 0),
  proponente_telefone             bigint,
  proponente_email                text,
  proponente_pagina_web           text,

  -- 3) Identificação do Representante Legal
  representante_nome              text,
  representante_cpf               numeric(11, 0),
  representante_profissao         text,
  representante_cargo             text,
  representante_estado_civil      text,
  representante_telefone          bigint,
  representante_email             text,

  -- 4) Identificação do Responsável Técnico
  responsavel_tecnico_nome        text,
  responsavel_tecnico_cargo       text,
  responsavel_tecnico_telefone    bigint,
  responsavel_tecnico_celular     bigint,
  responsavel_tecnico_email       text,

  criado_em                       timestamptz not null default now(),
  atualizado_em                   timestamptz not null default now()
);

create index if not exists "idx_ted_identificacao_projeto"
  on "SIGTRP_TB_TED_IDENTIFICACAO" (projeto_id);

create index if not exists "idx_ted_identificacao_municipio_ibge"
  on "SIGTRP_TB_TED_IDENTIFICACAO" (proponente_municipio_ibge);

comment on table "SIGTRP_TB_TED_IDENTIFICACAO" is
  'Dados da seção 1 (Identificação) do formulário TED. Todos os campos são opcionais para salvamento incremental.';

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".projeto_id is
  'Referência ao projeto em SIGTRP_TB_PROJECTS (relação 1:1).';

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".proponente_uf_ibge is
  'Código IBGE do estado (ex.: 35 para SP).';

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".proponente_municipio_ibge is
  'Código IBGE do município (ex.: 3550308 para São Paulo/SP).';

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".proponente_cnpj is
  'CNPJ apenas com dígitos (14 posições, sem pontuação).';

comment on column "SIGTRP_TB_TED_IDENTIFICACAO".proponente_telefone is
  'Telefone apenas com dígitos (DDD + número, sem máscara).';
