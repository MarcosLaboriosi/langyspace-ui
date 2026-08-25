# T05 — A11y e interaction tests

## Objetivo

Transformar stories em contracts executáveis de uso, sem duplicar unit tests.

## Matriz obrigatória

- actions: native semantics, busy/disabled, focus e loading slots;
- SearchInput: type, clear e focus restoration;
- fields: label, hint/error, described-by e invalid;
- FilterPills/Segmented: selected/disabled/click/keyboard;
- AuthTokenDigits: paste, backspace, focus, controlled state;
- Spinner/loading: accessible owner e reduced motion.

## Passos

1. configurar addon oficial de a11y em modo blocking;
2. integrar story tests ao Vitest/CI;
3. adicionar `play` functions somente para behaviors reais;
4. documentar checks manuais fora do alcance de axe;
5. criar processo de exception com owner/reason/expiry;
6. validar output de falha acionável.

## Done

- todas as stories aplicáveis passam axe;
- interaction matrix passa em browser;
- nenhum `a11y: off` global;
- unit e story tests têm fronteiras claras.

## Resultado

- Storybook, addon a11y e addon Vitest foram fixados na mesma versão `10.5.10`;
- o project `storybook` do Vitest executa as 63 stories em Chromium real e mantém os 54 unit tests
  no project `unit`/jsdom;
- `parameters.a11y.test = 'error'` torna axe blocking em todas as stories, sem `off`, `todo` ou
  exception local;
- sete contracts possuem `play`: busy/loading de Button e IconButton, edição/clear/focus de
  SearchInput, click/keyboard/disabled de FilterPills, click/keyboard de SegmentedControl,
  paste/backspace/focus controlled de AuthTokenDigits e label/hint/error de FieldRoot;
- `pnpm run test:storybook`: 20 files e 63 tests passed; `pnpm run test:unit`: 21 files e 54 tests
  passed; typecheck e lint também passaram;
- reduced motion continua coberto no unit contract do Spinner e no browser matrix existente; sua
  migração para o runner orientado a stories pertence à T06.

## Checks manuais preservados

- ordem de leitura e qualidade do nome anunciado em screen reader real;
- contraste/compreensão fora das combinações isoladas do catálogo;
- visibilidade do foco com zoom, high contrast mode e navegação somente por teclado;
- movimento percebido além da regra computável `prefers-reduced-motion`;
- semântica no contexto final do produto. Axe é gate automático, não substitui esses checks.

## Exceptions

Não há exception. Uma futura exception deverá ficar na story específica com rule, owner, reason e
expiry; desligar a11y globalmente permanece proibido.

## Rollback

Reverter a integração do addon sem apagar stories/unit tests; CI volta ao gate anterior.
