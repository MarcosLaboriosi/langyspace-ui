# T04 — Migrar Landing

## Responsabilidade

Remover os styled/native buttons restantes sem mudar layout/fluxo da Landing.

## Subtasks

- [x] atualizar package/lockfile para `v0.5.0`;
- [x] migrar ChipButton, BottomNavItem e Option para Pressable;
- [x] migrar o SpeedOption descoberto pelo audit para Pressable;
- [x] adicionar audit estático ao gate;
- [x] rodar lint, build SSR/prerender e audit focado;
- [x] revisar screenshots 390/1281/2048;
- [x] provar zero ocorrência e revisar diff;
- [x] atualizar progress.

## Conclusão

Landing usa somente Button/Pressable do release e preserva todas as rotas públicas.

## Validação focada

- `pnpm run lint`;
- `pnpm run build`;
- `pnpm run validate:ui`.
