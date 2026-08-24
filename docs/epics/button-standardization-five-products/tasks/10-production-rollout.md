# T10 — Integrar mains e verificar produção

## Responsabilidade

Entregar commits restritos, atualizar os mains e provar os cinco Hostings.

## Subtasks

- [ ] stage explícito e commit Conventional por consumidor;
- [ ] fetch e ancestry check de cada origin/main;
- [ ] integrar/push sem force, preservando avanços concorrentes;
- [ ] monitorar os cinco workflows até conclusão;
- [ ] verificar HTTP, asset/version marker e ausência de CSS legado;
- [ ] confirmar mains locais/remote e worktrees originais intactos;
- [ ] fechar docs com SHAs, runs, assets e rollback;
- [ ] atualizar tasks/progress para complete.

## Conclusão

Os cinco mains e produções servem a migração; nenhum trabalho alheio foi incluído ou removido.

## Validação focada

- `git diff --cached --check` por commit;
- GitHub Actions conclusion `success` por repo;
- probes HTTP e inspeção dos bundles públicos.
