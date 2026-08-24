# T04 — Migrar Landing

## Responsabilidade

Remover os três styled buttons nativos restantes sem mudar layout/fluxo da Landing.

## Subtasks

- [ ] atualizar package/lockfile para `v0.5.0`;
- [ ] migrar ChipButton, BottomNavItem e Option para Pressable;
- [ ] adicionar audit estático ao gate;
- [ ] rodar lint, build SSR/prerender e audit focado;
- [ ] revisar screenshots 390/1281/2048;
- [ ] provar zero ocorrência e revisar diff;
- [ ] atualizar progress.

## Conclusão

Landing usa somente Button/Pressable do release e preserva todas as rotas públicas.

## Validação focada

- `pnpm run lint`;
- `pnpm run build`;
- `pnpm run validate:ui`.
