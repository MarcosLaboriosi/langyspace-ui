# T02 — Implementar o contrato compartilhado

## Responsabilidade

Adicionar Pressable e evoluir Button sem dependência de consumidor.

## Subtasks

- [x] implementar Pressable em arquivos separados com tipos/ref/type default;
- [x] compor Button sobre Pressable;
- [x] adicionar danger, success e brand com tipos restritos;
- [x] atualizar unit tests e type assertions;
- [x] atualizar showcase/layout audit e README;
- [x] rodar testes focados, build/package smoke e full package gate;
- [x] revisar diff e atualizar progress.

## Conclusão

API pública, estilos, tipos, docs e audit concordam e o gate do pacote passa.

## Validação focada

- `pnpm test -- src/Pressable src/Button`;
- `pnpm run typecheck`;
- `pnpm run build`;
- `pnpm run test:package`;
- `pnpm run validate:ui`.
