# T04 — Storybook, audits e package candidate

## Objetivo

Fechar catálogo, observabilidade e contrato publicável antes de tocar no Admin.

## Trabalho

- completar stories de ActionMenu e OperationalList;
- adicionar visual-review, layout-boundary, reduced motion e play tests;
- estender layout rules para popup bounds, actions target/overlap e list overflow;
- atualizar README, root exports, duas entries molecule no manifest e API report deliberadamente;
- medir/ajustar bundle budgets somente pelo delta real;
- incluir browser/SSR/package smokes e generic TypeScript consumer;
- gerar tarball candidate sem tag/release.

## Aceite

- coverage continua acima dos thresholds;
- `check:api` reflete somente os novos exports aprovados;
- public type contracts rejeitam quick sem icon, primary danger e accessible names duplicados;
- zero issue em axe/layout e screenshots aprovadas;
- bundle/package/SSR smoke verdes;
- candidate instalável pelo Admin sem dependency extra ou CSS global.

## Validação

- checks focados;
- `pnpm run validate:ui` completo uma vez;
- inspeção dos screenshots 390/1281/2048 e boundaries relevantes;
- checksum do candidate registrado no progress.
