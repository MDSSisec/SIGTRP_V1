-- Remove valor_total de SIGTRP_TB_PROJECTS (valor passa a vir das planilhas)

alter table "SIGTRP_TB_PROJECTS"
  drop column if exists valor_total;
