# T06 — Migrar Student

## Responsabilidade

Consolidar componentes base, ações canônicas e controles específicos do portal do aluno.

## Subtasks

- [ ] atualizar package/lockfile;
- [ ] migrar Button/IconButton/AuthSubmit/AuthBack e remover base morta;
- [ ] migrar auth, cadastro, planos, checkout e pagamento;
- [ ] migrar shell, perfil, notificações e telefone;
- [ ] migrar home, aulas, lições e live;
- [ ] migrar portal features, quiz, chat, flashcards e shadowing;
- [ ] adicionar audit estático;
- [ ] adicionar cobertura local para auth/cadastro/choose-plan/checkout;
- [ ] rodar checks focados, build e layout gate;
- [ ] inspecionar screenshots 390/1281/2048, provar zero ocorrência e revisar diff;
- [ ] atualizar progress.

## Conclusão

Todos os buttons de produção usam Button/Pressable e os fluxos públicos/protegidos permanecem
equivalentes.

## Validação focada

- testes de auth, perfil, checkout e portal afetados;
- `pnpm run build`;
- `pnpm run validate:ui`.
