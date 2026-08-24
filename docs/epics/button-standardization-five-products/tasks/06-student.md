# T06 — Migrar Student

## Responsabilidade

Consolidar componentes base, ações canônicas e controles específicos do portal do aluno.

## Subtasks

- [x] atualizar package/lockfile;
- [x] migrar Button/IconButton/AuthSubmit/AuthBack e remover base morta;
- [x] migrar auth, cadastro, planos, checkout e pagamento;
- [x] migrar shell, perfil, notificações e telefone;
- [x] migrar home, aulas, lições e live;
- [x] migrar portal features, quiz, chat, flashcards e shadowing;
- [x] adicionar audit estático;
- [x] adicionar cobertura local para auth/cadastro/choose-plan/checkout;
- [x] rodar checks focados, build e layout gate;
- [x] inspecionar screenshots 390/1281/2048, provar zero ocorrência e revisar diff;
- [x] atualizar progress.

## Conclusão

Todos os buttons de produção usam Button/Pressable e os fluxos públicos/protegidos permanecem
equivalentes.

## Validação focada

- testes de auth, perfil, checkout e portal afetados;
- `pnpm run build`;
- `pnpm run validate:ui`.
