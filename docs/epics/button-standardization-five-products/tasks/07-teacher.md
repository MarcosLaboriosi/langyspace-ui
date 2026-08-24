# T07 — Migrar Teacher

## Responsabilidade

Consolidar componentes base, ações canônicas e controles específicos do portal da professora.

## Subtasks

- [ ] atualizar package/lockfile;
- [ ] migrar Button/PillButton/IconButton/AuthSubmit/AuthBack;
- [ ] migrar login/cadastro, legal, telefone e disponibilidade pública;
- [ ] migrar shell, sidebar, header, notifications e toast;
- [ ] migrar calendário, week/month agenda e drawers;
- [ ] migrar materiais/apresentação;
- [ ] migrar alunos/profile drawer e preview de aprendizagem;
- [ ] adicionar audit estático;
- [ ] adicionar cobertura local para preview, apresentação e drawers;
- [ ] rodar checks focados, build e layout gate;
- [ ] inspecionar 390/1281/2048 e 390x667 quando gerado, provar zero ocorrência e revisar diff;
- [ ] atualizar progress.

## Conclusão

Todos os buttons de produção usam Button/Pressable, e ações de aula/attendance mantêm regras e
acessibilidade.

## Validação focada

- testes de components base, auth, calendar, class drawer e student preview;
- `pnpm run build`;
- `pnpm run validate:ui`.
