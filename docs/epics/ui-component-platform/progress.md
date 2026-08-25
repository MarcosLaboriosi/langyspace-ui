# Progresso

## Status

Investigação, refinamento de produto, refinamento técnico, breakdown, revisão crítica e T01–T07
concluídos. T08 é a única task em andamento.

## Baseline

| Item                  | Valor                                                                |
| --------------------- | -------------------------------------------------------------------- |
| Repository            | `MarcosLaboriosi/langyspace-ui`                                      |
| Base                  | `origin/main` em `ae654a7`                                           |
| Worktree              | `/private/tmp/langyspace-ui-component-platform.xn8HG1/langyspace-ui` |
| Branch                | `codex/ui-component-platform-epic-20260825`                          |
| Package               | `@langyspace/ui@1.0.0`                                               |
| Public components     | 19                                                                   |
| TS/TSX source files   | 78                                                                   |
| TS/TSX source lines   | 3.608                                                                |
| Unit test files/tests | 11/46                                                                |
| Stories               | 0                                                                    |
| Showcase              | 457 lines                                                            |
| Layout runner         | 422 lines / 36 default scenarios                                     |

## Evidência desta etapa

- `pnpm install --frozen-lockfile`: passed;
- `pnpm run typecheck`: passed;
- `pnpm test`: 11 files, 46 tests passed;
- todos os source/test/showcase/audit/package/release files relevantes foram inventariados;
- component-by-component coverage matrix registrada em `investigation.md`;
- Storybook/Ladle/Cosmos/showcase comparados e Storybook React/Vite recomendado;
- 34 requirements e 13 dependency-ordered tasks definidos;
- plano criticamente revisado sob product, React, design system, QA, UX, a11y, performance,
  security e operations;
- nenhuma implementação de component, dependency ou workflow foi feita.
- T01 adicionou um manifesto test-only tipado com as 19 exports, layer, owner, runtime marker e
  ownership explícito dos gaps T02/T04/T10;
- o contract test da T01 passou com quatro casos, `typecheck` e `build` passaram e o tarball foi
  inspecionado sem `quality` ou outro tooling novo publicado;
- o build baseline permaneceu em 37,69 kB / 8,20 kB gzip.
- T02 renomeou as onze suites antigas e adicionou owners pequenos para os oito components antes
  cobertos indiretamente; agora os 19 components públicos possuem `Component.test.tsx`;
- jest-dom/cleanup passaram para um setup único do Vitest; 21 files e 54 tests passaram, sem
  `index.test.tsx`, e typecheck, lint e build permaneceram verdes com o mesmo bundle baseline.
- T03 aprovou Storybook 10.5.10 com React/Vite na stack real usando Button, FieldRoot e
  AuthTokenDigits como pilotos; typecheck, lint, Storybook build e library build passaram;
- nove cenários headless dos três pilotos em 390/1281/2048 passaram sem overflow ou page error e
  screenshots mobile/dense/wide foram inspecionados;
- a inspeção encontrou declarations de stories no primeiro tarball; `tsconfig.build.json` passou a
  excluí-las e o tarball repetido ficou sem Storybook, stories ou quality tooling;
- o bundle runtime permaneceu em 37,69 kB / 8,20 kB gzip; a spike recebeu go para T04.
- T04 adicionou story co-localizada aos 19 components e uma page de foundations/tokens, totalizando
  63 stories isoladas com default, variations, states, stress e compositions aplicáveis;
- fixtures sintéticas comuns cobrem surfaces clara/escura, icons, narrow containers e content
  extremo sem dado real ou request externo;
- o catalog audit executou 189 cenários (63 stories em 390/1281/2048) sem overflow, empty render ou
  page error; screenshots de status stress, fields/compound, segmented inverse, state panels,
  filter scroll e tokens foram inspecionados;
- manifesto, typecheck, lint e Storybook build passaram; o showcase permanece como oracle até T06.
- T05 adicionou os addons oficiais de a11y e Vitest em `10.5.10`, com axe global em modo `error` e
  sem exception;
- as 63 stories passaram como component tests em Chromium/Playwright e os sete fluxos interativos
  críticos ganharam `play` contracts para busy, focus, clear, selection, keyboard, paste e field
  associations;
- os 54 unit tests permanecem isolados no project jsdom; ambos os projects, typecheck e lint
  passaram.
- T06 comprovou o runner legado verde em 36 cenários antes de substituí-lo; o novo runner passou em
  534 cenários isolados das 63 stories, incluindo motion normal/reduced e boundaries declaradas;
- 57 screenshots determinísticos foram produzidos e amostras em 390/1281/2048 de actions, fields,
  selection, auth, states e tokens foram revisadas sem regressão;
- showcase, `index.html` e runners transitórios foram removidos somente depois da paridade; o
  typecheck explicitou e recebeu o `vite-env` próprio do Storybook.
- T07 moveu accessibility, field recipes e selection contracts para foundations, preservando os
  public type contracts compatíveis e reservando tightenings breaking para um épico major;
- o layer audit subiu para 13 negative contracts e passou em 88 production source files;
- a ADR de refs foi comprovada por object/callback refs, styled composition e SSR; 24 unit files/59
  tests, 63 story/axe tests, tarball consumer build/SSR e 48 cenários focados passaram;
- o bundle permaneceu em 37,69 kB / 8,20 kB gzip e o entrypoint não perdeu exports.

## Próxima subtask

T08 — corrigir contratos de composição em subtasks pequenas, começando por `aria-describedby`.

## Blockers

Nenhum. GitHub Pages ainda não está configurado e não bloqueia o build/artifact do catálogo.

## Decisões abertas controladas

- ref pattern final;
- CompoundControl disabled ownership;
- AuthTokenDigits supported lengths/keyboard;
- SegmentedControl narrow layout;
- token versus private constant por literal;
- tooling de API diff/bundle;
- Pages versus CI artifact na primeira publicação;
- family piloto da próxima onda.

Cada item possui task, evidence e acceptance; nenhum bloqueia a baseline.

## Veredito visual atual

Passed: 63 stories passaram em 534 cenários headless; 57 screenshots foram gerados e amostras em
390/1281/2048 foram inspecionadas sem overflow, corte, perda de ação ou regressão hierárquica.
