# T02 — Fundação ModalLayer e molecules

## Responsabilidade

Implementar comportamento, recipe e API pública isolados do package.

## Subtasks

- [x] adicionar tokens mínimos;
- [x] implementar stack e ModalLayer interno;
- [x] implementar Dialog e Drawer públicos;
- [x] criar unit owners com foco, dismissal, SSR e stack;
- [x] criar stories/play/axe com conteúdo extremo;
- [x] rodar checks focados e revisar diff.

## Done

- requirements RF01–RF05 cobertos;
- nenhuma dependência de produto/theme externo;
- screenshots da family aprovadas nas quatro larguras.

## Validação

- `pnpm test:unit -- ModalLayer Dialog Drawer` ou filtro equivalente;
- `pnpm run test:storybook` focado;
- `pnpm run test:layout` focado;
- `pnpm run typecheck` e `pnpm run lint`.
