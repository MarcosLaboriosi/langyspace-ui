# T10 — Integrar mains e verificar produção

## Responsabilidade

Entregar commits restritos, atualizar os mains e provar os cinco Hostings.

## Subtasks

- [x] stage explícito e commit Conventional por consumidor;
- [x] fetch e ancestry check de cada origin/main;
- [x] integrar/push sem force, preservando avanços concorrentes;
- [x] monitorar os cinco workflows até conclusão;
- [x] verificar HTTP, asset/version marker e ausência de CSS legado;
- [x] confirmar mains locais/remote e worktrees originais intactos;
- [x] fechar docs com SHAs, runs, assets e rollback;
- [x] atualizar tasks/progress para complete.

## Conclusão

Os cinco mains e produções servem a migração; nenhum trabalho alheio foi incluído ou removido.

Os workflows verdes são `32728550211`, `32729256309`, `32729256502`, `32729257191` e
`32729256850`. Os assets de produção coincidem com os builds desses workflows e os cinco canais
`live` retornam HTTP 200.

## Validação focada

- `git diff --cached --check` por commit;
- GitHub Actions conclusion `success` por repo;
- probes HTTP e inspeção dos bundles públicos.
