# T07 — Migrar Teacher

## Responsabilidade

Consolidar componentes base, ações canônicas e controles específicos do portal da professora.

## Subtasks

- [x] atualizar package/lockfile;
- [x] migrar Button/PillButton/IconButton/AuthSubmit/AuthBack;
- [x] migrar login/cadastro, legal, telefone e disponibilidade pública;
- [x] migrar shell, sidebar, header, notifications e toast;
- [x] migrar calendário, week/month agenda e drawers;
- [x] migrar materiais/apresentação;
- [x] migrar alunos/profile drawer e preview de aprendizagem;
- [x] adicionar audit estático;
- [x] adicionar cobertura local para preview, apresentação e drawers;
- [x] rodar checks focados, build e layout gate;
- [x] inspecionar 390/1281/2048 e 390x667 quando gerado, provar zero ocorrência e revisar diff;
- [x] atualizar progress.

## Conclusão

Todos os buttons de produção usam Button/Pressable, e ações de aula/attendance mantêm regras e
acessibilidade.

## Validação focada

- testes de components base, auth, calendar, class drawer e student preview;
- `pnpm run build`;
- `pnpm run validate:ui`.
