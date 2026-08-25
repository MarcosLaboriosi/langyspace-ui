# T02 — Naming e ownership dos testes

## Objetivo

Fazer cada falha apontar diretamente para o component owner e retirar setup repetido.

## Passos

1. configurar setup do Vitest com jest-dom e cleanup;
2. renomear `index.test.tsx` para `Component.test.tsx` com `git mv` durante a execução;
3. separar suites atualmente agrupadas sem duplicar assertions;
4. distinguir local unit import de public contract import;
5. adicionar suites mínimas para wrappers públicos;
6. atualizar manifesto/audit de naming;
7. comparar lista de invariants antes/depois.

## Checks focados

- `pnpm test`
- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run format:check`

## Done

- zero `index.test.tsx`;
- 19 owners de test no manifesto;
- pelo menos os 46 invariants atuais continuam presentes;
- nenhum runtime/source diff fora de test config.

## Rollback

Reverter renames/setup no mesmo commit; não misturar com Storybook.
