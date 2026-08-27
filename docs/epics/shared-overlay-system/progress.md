# Progresso

## Status

Foundation e adoção cross-portal concluídas e publicadas. T04 permanece aberta apenas para os
shells legados do monólito Admin que não pertenciam ao corte compartilhado entre os três portais.

## Baseline

| Item                             | Valor                                           |
| -------------------------------- | ----------------------------------------------- |
| Worktree root                    | `/private/tmp/langyspace-next-component.s0jagm` |
| UI                               | `cc1cdfe` / `@langyspace/ui@1.2.0`              |
| Admin                            | `9d685c4`                                       |
| Teacher                          | `226bccd`                                       |
| Student                          | `ee243e7`                                       |
| Impacto visual                   | direct                                          |
| Shells qualificados preliminares | Admin 11 / Teacher 6 / Student 3                |

## Concluído

- `origin/main` dos quatro repositórios fetched e worktrees clean confirmados;
- inventário preliminar comparou markup, behavior, styles e callsites;
- `ModalLayer -> Drawer/Dialog` aprovado como próxima family;
- overlays parecidos mas não modais foram excluídos;
- cinco documentos e sete tasks dependency-ordered concluídos;
- revisão crítica de Product, Tech Lead, Senior React e QA registrada no plano técnico;
- impacto visual, routes/states/content extremes/widths e estratégia de audit documentados.
- inventário final registrado em `inventory.md`, incluindo exceções semânticas;
- Admin baseline: 45 cenários isolados de design system, zero issue;
- Teacher ClassDrawer baseline: 12 cenários em 390/1281/2048, zero issue;
- Student checkout baseline: 18 cenários em 390/1281/2048, zero issue;
- screenshots mobile/dense/wide dos três produtos inspecionadas.
- T02 adicionou tokens mínimos de overlay/shadow, stack e ModalLayer interno, Dialog e Drawer;
- seis unit tests passaram para foco, Escape, backdrop, blocked, SSR, stack e panel hooks;
- sete story/axe cases passaram após a otimização inicial de `react-dom` estabilizar;
- 54 cenários focados de layout passaram para cinco stories em 390/768/1281/2048 e motion
  normal/reduced;
- screenshots de Dialog stress e Drawer default em mobile/dense/wide foram inspecionadas sem corte,
  overflow ou hierarquia regressiva.
- `validate:ui` da library passou com 171 testes, cobertura acima de 92% em todos os eixos, package
  smoke, SSR, bundle budgets e 726 cenários visuais;
- release `v1.3.0` publicado; tarball remoto e candidate têm SHA-256
  `a481d9d1c25990858ee495badb07d020cb597043eb961b78b0fd901adc6a11bd`;
- Admin removeu sua cópia de ModalLayer/Dialog/Drawer e migrou todos os consumers dessa seed;
- Teacher migrou Notification, ProblemReport, AvailabilitySettings, SlotAction, StudentProfile e
  ClassDrawer;
- Student migrou Notification, ProblemReport e CheckoutDialog, removendo trap/scroll lock/Escape
  locais;
- a inspeção visual encontrou e corrigiu o toast mobile que cobria as ações do checkout;
- gates finais: Admin 228 testes, 13 fluxos a11y, 45 cenários DS e 1.820 cenários de layout; Teacher
  270 cenários; Student 648 cenários; zero problema geométrico;
- mains publicadas em Admin `fc94915`, Teacher `3331dab` e Student `f60d82c`;
- Hosting live publicado nos três targets; HTML HTTP 200, bundle servido idêntico ao `dist` e marker
  `lsui-sc-modal-panel` presente em Admin, Teacher e Student.

## Próxima subtask

T04.2 — decompor e migrar, em corte próprio, os shells `.drawer/.confirm` ainda embutidos no
`AdminPortal/index.tsx`.

## Blockers

Nenhum para o corte publicado.

## Descobertas

- Admin já contém a seed comportamental e cinco testes fortes;
- Teacher repete Escape/scrim sem trap/retorno em vários drawers;
- Student CheckoutDialog possui trap e scroll lock próprios;
- Teacher e Student não possuem `#overlay-root`; o package usará `document.body` como fallback;
- Student precisará atualizar de `@langyspace/ui@1.0.0` diretamente para o release desta family.

## Evidência visual

Passed. Screenshots mobile/dense/wide inspecionadas; checkout mobile, ClassDrawer e consumers Admin
sem corte, overflow ou ação encoberta após a correção do toast.
