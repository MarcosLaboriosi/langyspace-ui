# T07 — Foundations e contracts compartilhados

## Objetivo

Colocar types/recipes compartilhados no layer correto e remover duplications estruturais.

## Passos

1. criar accessibility foundation com AccessibleName XOR e IDREF helper;
2. mover field family/recipe para foundations;
3. mover choice contracts para selection foundation;
4. preservar public types via re-export;
5. atualizar layer audit e fixtures;
6. executar spike de ref React 19/styled-components;
7. registrar ADR curta da decisão de ref.

## Checks focados

- type tests positivos/negativos
- unit tests de helpers
- API declaration diff
- build/package/SSR consumers
- Storybook pilot stories

## Done

- zero contract copiado;
- dependency direction verde;
- public API preservada salvo decisão versionada;
- ref pattern documentado por evidence.

## Resultado

- `AccessibleName` XOR e `mergeIdRefs` agora pertencem a `foundations/accessibility`; os public
  props que antes aceitavam ambos os nomes usam uma compat type central até um épico major, enquanto
  IconButton preserva o XOR que já publicava;
- field size/style recipe saiu de `atoms/fieldControlStyles.ts` para `foundations/fields`; todas as
  imports foram invertidas e `FieldControlSize` continua exportado com o mesmo nome no entrypoint;
- `ChoiceValue`/`ChoiceOption` saíram de `molecules/choice.ts` para `foundations/selection`; o strict
  `AccessibleChoiceOption` foi provado, mas o contract público compatível foi mantido para não
  introduzir breaking type neste épico;
- accessibility e selection possuem type/unit tests positivos e negativos; IDREF normaliza e
  deduplica mantendo ordem;
- o audit de layers agora prova também as proibições foundation→atom, primitive→atom e
  internal→molecule, totalizando 13 negative contracts;
- a ADR `decisions/ref-pattern.md` mantém refs nativos em leaves e `forwardRef` onde há
  interceptação/merge; object ref, callback ref, `styled(...)` e SSR passaram na fixture dedicada;
- public declaration manteve os mesmos exports; somente a origem declarativa de
  `FieldControlSize` mudou;
- 24 unit files/59 tests, 63 story tests/axe, architecture audit, typecheck, lint, library build,
  tarball consumer build/SSR e 48 cenários de layout focados passaram;
- bundle permaneceu 37,69 kB / 8,20 kB gzip.

## Rollback

Re-exports permitem reverter a movimentação interna sem consumer migration.
