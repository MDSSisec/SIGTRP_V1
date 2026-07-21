-- ============================================================
-- Add Methodology columns to Project Session 02 Description
-- (for databases that already ran 009 without these columns)
-- ============================================================

alter table "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION"
  add column if not exists metodologia_meta text,
  add column if not exists metodologia_etapa_1_1 text,
  add column if not exists metodologia_etapa_1_2 text,
  add column if not exists metodologia_etapa_1_3 text,
  add column if not exists metodologia_etapa_1_4 text;

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
