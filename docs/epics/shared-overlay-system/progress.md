# Progresso

## Status

Planejamento de produto, refinamento de requisitos, plano técnico, breakdown e revisão crítica
concluídos. T01–T02 concluídas e T03 em andamento.

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

## Próxima subtask

T03.1 — integrar Dialog/Drawer ao entrypoint, manifesto, peers e smokes públicos.

## Blockers

Nenhum.

## Descobertas

- Admin já contém a seed comportamental e cinco testes fortes;
- Teacher repete Escape/scrim sem trap/retorno em vários drawers;
- Student CheckoutDialog possui trap e scroll lock próprios;
- Teacher e Student não possuem `#overlay-root`; o package usará `document.body` como fallback;
- Student precisará atualizar de `@langyspace/ui@1.0.0` diretamente para o release desta family.

## Evidência visual

Pendente em T01. Nenhum código visual foi editado até este ponto.
