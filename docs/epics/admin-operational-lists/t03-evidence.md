# Evidência T03 — OperationalList e responsividade

## Veredito

T03 aprovada. `OperationalList<Item>` foi implementado como molecule genérica sobre uma única
`table` semântica, com layout tabular amplo e recipe de cards por container query. O componente
consome `ActionMenu` por import local e mantém somente um overflow aberto por lista.

Isso autoriza iniciar T04. `ActionMenu` e `OperationalList` ainda não estão no root export, manifesto,
bundle slice, README ou package smoke tipado; a abertura pública continua deliberadamente atômica
em T04.

## Arquivos

- `src/molecules/OperationalList/types.ts`: contrato genérico e unions de navegação/ações;
- `src/molecules/OperationalList/normalizeActions.ts`: normalização pura da hierarquia;
- `src/molecules/OperationalList/index.tsx`: semântica, sorting, ações e lifecycle do menu;
- `src/molecules/OperationalList/styles.ts`: tabela/cards, densidades e container queries;
- `src/molecules/OperationalList/OperationalList.test.tsx`: unit, tipos, SSR e refs;
- `src/molecules/OperationalList/OperationalList.stories.tsx`: 11 cenários de produto sintéticos;
- `scripts/layout-audit/rules.mjs`: roles reais, associations, overflow, overlap, foco e exclusividade.

Os spikes privados de T01 foram removidos. Sua cobertura agora pertence ao componente real e ao
layout runner do repositório.

## Contrato implementado

- `primaryColumn` singular com title, leading, description, meta e navigation descriptor;
- `columns` ordenadas com `id`, label, align, importance, renderer e sort controlado;
- `items`, `getItemKey(item)` e índice visível nos renderers/actions;
- navegação por `href` nativo ou command button somente no título;
- `getActions(item, index)` avaliado uma vez por row render;
- action union que exige icon em quick e rejeita danger em primary/quick;
- accessible name estrito movido do root para a table;
- native div props/ref, density, emptyState e footer.

Não foram adicionados row click, router adapter, key posicional, prop de breakpoint/largura,
visibilidade por coluna, permission DSL, bulk selection ou renderActions livre.

## Semântica e comportamento comprovados

- uma única table DOM em todos os layouts;
- primary body cell é `th scope="row"`; data/actions são `td`;
- IDs partem de `useId` e item/column IDs codificados;
- cada data/action cell referencia row e column headers existentes;
- empty state permanece dentro de uma cell com `colSpan` e table nomeada;
- static `thead` fica visually-hidden no card, nunca `display: none`;
- sortable headers formam uma única barra compacta, sem controles duplicados;
- sort permanece controlled e chama `onToggle` uma vez;
- action column é omitida completamente quando todas as rows não têm ações;
- primeira primary e primeiras duas quick ficam visíveis;
- primary/quick excedentes viram overflow neutral; explicit overflow preserva ordem; danger termina
  em grupo separado;
- primary/loading e quick/disabled bloqueiam somente o controle afetado;
- trocar o menu aberto preserva no máximo um popup; remover a row fecha o popup no mesmo render;
- SSR contém table e conteúdo completo; object/callback refs e styled composition passaram.

## Responsividade e revisão visual

Recipe por largura do container:

- `>= 72rem`: table com header e cells alinhadas;
- `48rem–71.99rem`: cards com duas colunas e primary/actions em largura completa;
- `< 48rem`: cards de uma coluna e primary action full width.

Nenhuma coluna some ou muda de ordem. `importance` altera somente o span no card intermediário.

O audit focado passou em 126 cenários para as 11 stories, incluindo motion normal/reduced e todas as
boundary widths configuradas. As novas checagens usam Playwright `getByRole` em cada largura, além
de confirmar associations, ausência de overflow/overlap e focus indicator.

Capturas inspecionadas:

- `DefaultLeads` em 390 e 1281 px;
- `NarrowCards` em 1281 px;
- `LongLocalizedContent` em 390 px;
- `Sortable` em 390 px;
- `ActionHierarchy` em 1281 px com popup aberto.

Foi confirmada a mesma hierarquia nos três recipes, labels compactas legíveis, conteúdo longo sem
corte, ação primária estável, quick/overflow sem colisão e popup dentro da viewport.

## Storybook

- `DefaultLeads`;
- `DenseStudents`;
- `Sortable`;
- `ActionHierarchy`;
- `DangerOverflow`;
- `DisabledAndLoading`;
- `Empty`;
- `NarrowCards`;
- `LongLocalizedContent`;
- `NoActions`;
- `FiftyRows`.

As 11 interaction/a11y story tests passaram. Leads e Alunos usam a mesma API genérica com fixtures
sintéticas e nenhuma regra de domínio no package.

## Gates

### Focados

- 9 unit/type/SSR tests passaram;
- 11 Storybook tests passaram;
- typecheck, ESLint e Prettier passaram;
- layout audit: 126 cenários, 11 stories, zero issues.

### `pnpm run validate:ui`

- architecture audit: 123 production files;
- 59 test files e 213 tests;
- coverage global: 96,38% statements, 92,28% branches, 99,54% functions e 98,06% lines;
- coverage `OperationalList`: 100% statements/functions/lines e 85,39% branches;
- build, API report, bundle budgets, tarball consumer e SSR smoke passaram;
- layout global: 942 cenários, 105 stories, zero issues.

O primeiro gate intermediário detectou a política React contra setState síncrono em effect. O
lifecycle foi simplificado para invalidar a key removida no mesmo render, sem effect ou listener.
O API report recebeu somente as quatro declarations geradas de `OperationalList`, além das quatro
de `ActionMenu` já revisadas na T02.

## Package boundary e handoff para T04

- `src/index.ts`, `quality/component-manifest.ts`, bundle entries e smoke consumer continuam sem os
  dois componentes;
- nenhum candidate, tag, release ou consumer foi criado;
- nenhum arquivo do Admin foi alterado;
- nenhuma dependência foi adicionada.

T04 deve abrir os dois componentes juntos no root, manifesto e bundle slice, mover os type contracts
públicos para o smoke adequado, medir o bundle real e documentar o package candidate. Não alterar o
recipe ou ampliar as APIs sem evidência nova.
