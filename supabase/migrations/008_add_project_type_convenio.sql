-- Adiciona CONVENIO ao enum de tipos de projeto

alter type public."SIGTRP_ENUM_PROJECT_TYPE" add value if not exists 'CONVENIO';
