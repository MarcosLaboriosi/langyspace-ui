# T06 — Segunda adoção Admin em Alunos

## Objetivo

Validar densidade, sorting, navegação e estados financeiros da mesma API em `/alunos`.

## Trabalho

- migrar headers/cells/actions para OperationalList;
- manter derivação, filters, monthly payment state e drawers;
- controlar sort no Admin por descriptors;
- substituir pseudo-link de row por navigation descriptor;
- manter navegação do cadastro na primary cell, mapear WhatsApp como quick e Agenda/Arquivar como
  overflow;
- preservar next-action tone e conteúdo como nodes do consumer;
- remover somente selectors sem callsite após busca exata.

## Estados e larguras

- todas, pagamento em dia, vence hoje, atrasado e cancelado;
- default, loading, error, empty, filtered empty e extreme;
- 390, 768, 1281, 1551, 1552 e 2048 px.

## Aceite

- sorting e drawer navigation equivalentes;
- nenhum click/keydown no row;
- pagamento/status/recorrência permanecem domínio do Admin;
- cells compostas não estouram nem sobrepõem actions;
- API não cresce com prop específica de aluno.

## Validação

- tests focados de `/alunos` e keyboard;
- a11y/design-system/layout cases focados;
- `pnpm run validate:ui` Admin completo;
- screenshots before/after e diff review.
