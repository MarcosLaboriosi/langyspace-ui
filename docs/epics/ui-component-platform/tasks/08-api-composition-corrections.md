# T08 — Correções de API e composição

## Objetivo

Resolver os contracts implícitos ou contraditórios encontrados na investigação.

## Subtasks independentes

- T08.1: combinar/deduplicar `aria-describedby`;
- T08.2: decidir e implementar disabled/invalid ownership de CompoundControl;
- T08.3: modelar SearchInput clear action sem default de idioma;
- T08.4: aplicar AccessibleName/ChoiceOption contracts;
- T08.5: fechar AuthTokenDigits length/focus/keyboard;
- T08.6: remover external spacing de AuthNotice e decidir fonte info;
- T08.7: manter um único owner de `title` no StatusChip.

## Regra de execução

Cada subtask começa com failing unit/story/type test, usa o menor diff e possui commit próprio.
Antes de fechar types, buscar todos os callsites nos cinco products e instalar tarball candidate
quando houver risco de source incompatibility.

## Checks

- focused unit/type/story/a11y
- screenshots do component e composição relevante
- package + SSR smoke
- consumer typecheck/build aplicável

## Done

- contracts não dependem de disciplina silenciosa do consumidor;
- copy localizada permanece no owner;
- nenhum breaking change acidental;
- regressão visual/a11y bloqueada.

## Rollback

Reverter uma subtask por vez; manter re-exports/compat type quando necessário até release major.
