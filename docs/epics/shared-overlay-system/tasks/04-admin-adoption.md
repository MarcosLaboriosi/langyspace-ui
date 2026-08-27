# T04 — Adoção Admin

## Responsabilidade

Substituir infraestrutura local e shells modais qualificados pelo package sem mover domínio.

## Subtasks

- [ ] instalar candidate;
- [ ] migrar consumers dos wrappers base e remover cópias locais;
- [ ] migrar dialogs e drawers legados em fatias pequenas;
- [ ] remover recipes externos sem consumer;
- [ ] atualizar audit arquitetural e visual para markers públicos;
- [ ] rodar focused tests/build/a11y/design-system/layout;
- [ ] rodar `validate:ui` completo e revisar screenshots.

## Done

- zero infraestrutura modal própria qualificada;
- conteúdo, comandos e URL state preservados;
- todos os fluxos Admin e nested stack verdes.

## Validação

- `pnpm run test`, `pnpm run build`, `pnpm run test:a11y`;
- `pnpm run test:design-system`;
- focused overlay shards e `pnpm run validate:ui`.
